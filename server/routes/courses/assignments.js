import express from "express";
import path from "path";
import fs from "fs";
import os from "os";

const courseAssignmentRouters = express.Router();

function getPath(config, ...paths) {
  const expandedRoot = path.join(os.homedir(), config.root.replace(/^~[\/\\]?/, ""));
  return path.join(expandedRoot, ...paths);
}

async function getItemsInFolder(directoryPath, getFiles = true) {
  const files = await fs.promises.readdir(directoryPath);

  const notesList = files
    .filter(file => {
      const fullPath = path.join(directoryPath, file);
      if (getFiles) return fs.statSync(fullPath).isFile() && file !== "README.md";
      return fs.statSync(fullPath).isDirectory() && file !== "README.md";
    })
    .map(file => path.join(directoryPath, file));

  return notesList;
}

function replaceString(string, search) {
  return string.replace(new RegExp(`.*${search}`), "")
}

export default function createCourseAssignmentRouters(config, courseName) {
  courseAssignmentRouters.get("/", async (req, res) => {
    const coursePath = getPath(config, courseName);

    const courseSearchString = "current-course/";
    const myAssignmentsSearchString = "my-assignments/"

    const gradedAss = config.graded_assignments_folder;
    const myAss = config.my_assignments_folder;
    const onlineAss = config.online_assignments_folder;
    const latexAss = config.my_assignments_latex_folder;
    const yamlAss = config.my_assignments_yaml_folder;
    const pdfAss = config.my_assignments_pdf_folder;

    const gradedPath = path.join(coursePath, replaceString(gradedAss, courseSearchString));
    const myPath = path.join(coursePath, replaceString(myAss, courseSearchString));
    const onlinePath = path.join(coursePath, replaceString(onlineAss, courseSearchString));

    const gradedList = await getItemsInFolder(gradedPath);
    const onlineList = await getItemsInFolder(onlinePath);

    const latexPath = path.join(myPath, replaceString(latexAss, myAssignmentsSearchString));
    const yamlPath = path.join(myPath, replaceString(yamlAss, myAssignmentsSearchString));
    const pdfPath = path.join(myPath, replaceString(pdfAss, myAssignmentsSearchString));

    const latexList = await getItemsInFolder(latexPath);
    const yamlList = await getItemsInFolder(yamlPath);
    const pdfList = await getItemsInFolder(pdfPath);

    const notes = {
      gradedAssignments: gradedList,
      onlineAssignments: onlineList,
      myAssignments: {
        latex: latexList,
        yaml: yamlList,
        pdf: pdfList,
      },
    };

    res.send(notes);
  });

  return courseAssignmentRouters;
}

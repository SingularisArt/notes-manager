import express from "express";
import { spawn } from "child_process";
import path from "path";
import YAML from "yamljs";
import fs from "fs";
import os from "os";

import createCourseAssignmentRouters from "./courses/assignments.js";
import createCourseFigureRouters from "./courses/figures.js";
import createCourseNoteRouters from "./courses/notes.js";

const courseRouters = express.Router();

function getPath(config, ...paths) {
  const expandedRoot = path.join(os.homedir(), config.root.replace(/^~[\/\\]?/, ""));
  return path.join(expandedRoot, ...paths);
}

function getCourseInfo(config, courseName) {
  const coursePath = path.join(os.homedir(), config.root.replace(/^~[\/\\]?/, ""), courseName);
  return YAML.load(path.join(coursePath, "info.yaml"));
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

function getNumFolders(fullPath, numFolders = 2) {
  const pathComponents = fullPath.split('/');
  const numComponents = Math.max(0, pathComponents.length - numFolders);
  const resultPath = pathComponents.slice(numComponents).join('/');

  return resultPath;
};

function processFileList(fileList, type, numFolders = 2) {
  return fileList.map((file) => {
    const currentFile = file.replace(/\.[^/.]+$/, "");
    const tex = fs.existsSync(currentFile + ".tex");
    const pdf = fs.existsSync(currentFile + ".pdf");

    let name = "";
    if (tex) {
      const texContent = fs.readFileSync(currentFile + ".tex", 'utf8').split("\n")[0];
      const match = texContent.match(/\\nte\[[^\]]*\]{[^}]*}{([^}]*)}/);
      name = match ? match[1] : "";
    }

    return {
      name: name,
      tex,
      texPath: tex ? getNumFolders(currentFile + ".tex", numFolders) : "",
      pdf,
      pdfPath: pdf ? getNumFolders(currentFile + ".pdf", numFolders) : "",
      type: type,
    };
  });
}

export default function createCourseRouters(config) {
  courseRouters.get("/", (_, res) => {
    const expandedDirectory = getPath(config, "");
    const courses = fs.readdirSync(expandedDirectory, { withFileTypes: true });

    const filteredCourses = courses
      .filter(course => {
        const coursePath = path.join(expandedDirectory, course.name);
        return fs.statSync(coursePath).isDirectory();
      })
      .map(course => ({
        name: course.name,
        path: path.join(expandedDirectory, course.name)
      }))
      .filter(course => course.path !== path.join(os.homedir(), config.templates_dir.replace(/^~[\/\\]?/, "")));

    res.send(filteredCourses);
  });

  courseRouters.get("/:courseName", (req, res) => {
    res.send(getCourseInfo(config, req.params.courseName));
  });

  courseRouters.use("/:courseName/assignments", (req, res, next) => {
    createCourseAssignmentRouters(config, req.params.courseName)(req, res, next);
  });
  // courseRouters.use("/:courseName/exams", (req, res, next) => {
  //   createCourseExamRouters(config, req.params.courseName)(req, res, next);
  // });
  courseRouters.use("/:courseName/figures", (req, res, next) => {
    createCourseFigureRouters(config, req.params.courseName)(req, res, next);
  });
  courseRouters.use("/:courseName/notes", (req, res, next) => {
    createCourseNoteRouters(config, req.params.courseName)(req, res, next);
  });
  // courseRouters.use("/:courseName/todos", (req, res, next) => {
  //   createCourseTodoRouters(config, req.params.courseName)(req, res, next);
  // });

  return courseRouters;
}

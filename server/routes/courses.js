import express from "express";
import { spawn } from "child_process";
import { fileURLToPath } from "url";
import path from "path";
import YAML from "yamljs";
import fs from "fs";
import os from "os";

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

function getFigurePath(config, courseName, figureName, week) {
  const coursePath = getPath(config, courseName);

  const courseSearchString = "current-course/";
  const incompleteFigurePath = path.join(
    coursePath,
    replaceString(config.figures_dir, courseSearchString)
  );

  let figureDirectoryPath;
  const courseConfig = getCourseInfo(config, courseName);
  if (courseConfig.notes_type === "lectures")
    figureDirectoryPath = path.join(incompleteFigurePath, `lec-${week}`);
  else
    figureDirectoryPath = path.join(incompleteFigurePath, `chap-${week}`);

  return path.join(figureDirectoryPath, figureName);
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

  // Get the exams for a course

  // Get the notes for a course
  courseRouters.get("/:courseName/notes", async (req, res) => {
    const courseName = req.params.courseName;
    const courseInfo = getCourseInfo(config, courseName);
    const coursePath = getPath(config, courseName);

    const notesType = courseInfo.notes_type;

    const notesPath = path.join(coursePath, notesType);
    const onlineNotesPath = path.join(coursePath, `online-${notesType.slice(0, -1)}-notes`);
    const examReviewAnswersPath = path.join(coursePath, "exam-review", "answers");
    const examReviewPracticePath = path.join(coursePath, "exam-review", "practice");

    const notesList = await getItemsInFolder(notesPath);
    const onlineNotesList = await getItemsInFolder(onlineNotesPath);
    const examReviewList = await getItemsInFolder(examReviewAnswersPath)
    const examReviewPracticeList = await getItemsInFolder(examReviewPracticePath)

    const masterTexExists = fs.existsSync(path.join(coursePath, "master.tex"));
    const masterPdfExists = fs.existsSync(path.join(coursePath, "master.pdf"));

    if (masterTexExists) notesList.push(path.join(coursePath, "master.tex"));
    if (masterPdfExists) notesList.push(path.join(coursePath, "master.pdf"));

    const notes = {
      notes: notesList,
      onlineNotes: onlineNotesList,
      examReviews: [
        ...examReviewList,
        ...examReviewPracticeList
      ]
    };

    res.send(notes);
  });

  // Get the assignments for a course
  courseRouters.get("/:courseName/assignments", async (req, res) => {
    const courseName = req.params.courseName;
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

  // Get the figures for a course
  courseRouters.get("/:courseName/figures", async (req, res) => {
    const courseName = req.params.courseName;
    const coursePath = getPath(config, courseName);

    const courseSearchString = "current-course/";
    const figuresPath = path.join(
      coursePath,
      replaceString(config.figures_dir, courseSearchString)
    );

    const figures = {};
    const figuresList = await getItemsInFolder(figuresPath, false);
    for (const figure of figuresList) {
      const figureItems = await getItemsInFolder(figure);
      const figureData = [];
      const number = Number(figure.slice(-2));

      for (const item of figureItems) {
        if (item.slice(-3) === "svg") {
          const svgCode = fs.readFileSync(item, "utf8");
          const title = item.replace(/^.*[\\\/]/, "").replace(".svg", "").replace(/-/gi, " ");
          const uppercaseTitle = title.replace(/(^\w{1})|(\s+\w{1})/g, letter => letter.toUpperCase());

          figureData.push({
            title: uppercaseTitle,
            content: svgCode,
          });
        }
      }

      if (figureData.length !== 0) figures[number] = figureData;
    }

    res.send(figures);
  });

  courseRouters.get("/:courseName/figures/open-figure", async (req, res) => {
    const courseName = req.params.courseName;
    const figureName = req.query["figure-name"];
    const weekNumber = req.query["week-number"];

    const formattedWeekNumber = weekNumber < 10 ? `0${weekNumber}` : weekNumber;
    const figurePath = getFigurePath(config, courseName, figureName, formattedWeekNumber);

    const inkscape = spawn("inkscape", [figurePath], {
      detached: true,
      stdio: "ignore",
    });

    inkscape.unref();

    res.send("Opening figure in the background with Inkscape");
  });

  courseRouters.get("/:courseName/figures/get-figure-data", async (req, res) => {
    const courseName = req.params.courseName;
    const figureName = req.query["figure-name"];
    const weekNumber = req.query["week-number"];

    const formattedWeekNumber = weekNumber < 10 ? `0${weekNumber}` : weekNumber;
    const figurePath = getFigurePath(config, courseName, figureName, formattedWeekNumber);
    const svgCode = fs.readFileSync(figurePath, "utf8");

    res.send(svgCode);
  });

  courseRouters.get("/:courseName/figures/create-figure", async (req, res) => {
    const courseName = req.params.courseName;
    const figureName = req.query["figure-name"];
    const weekNumber = req.query["week-number"];

    const formattedWeekNumber = weekNumber < 10 ? `0${weekNumber}` : weekNumber;
    const figurePath = getFigurePath(config, courseName, figureName, formattedWeekNumber);

    const currentModuleURL = import.meta.url;
    const currentModulePath = fileURLToPath(currentModuleURL);
    const src = path.join(path.dirname(currentModulePath), "../../src/data/template-figure.svg");

    fs.mkdirSync(path.dirname(figurePath), { recursive: true });
    fs.copyFileSync(src, figurePath);

    res.send(figurePath);
  });

  // Get the todo's for a course
  courseRouters.get("/:courseName/todo", async (req, res) => {
    res.send("todo");
  });

  return courseRouters;
}

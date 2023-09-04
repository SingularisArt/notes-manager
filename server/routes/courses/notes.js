import express from "express";
import { spawn } from "child_process";
import path from "path";
import YAML from "yamljs";
import fs from "fs";
import os from "os";

const courseNoteRouters = express.Router();

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

export default function createCourseNoteRouters(config, courseName) {
  courseNoteRouters.get("/", async (req, res) => {
    const courseInfo = getCourseInfo(config, courseName);
    const coursePath = getPath(config, courseName);

    const notesType = courseInfo.notes_type;

    const notesPath = path.join(coursePath, notesType);
    const onlineNotesPath = path.join(coursePath, `online-${notesType.slice(0, -1)}-notes`);
    const examReviewAnswersPath = path.join(coursePath, "exam-review", "answers");
    const examReviewPracticePath = path.join(coursePath, "exam-review", "practice");

    const [notesList, onlineNotesList, examReviewPracticesList, examReviewAnswersList] = await Promise.all([
      getItemsInFolder(notesPath),
      getItemsInFolder(onlineNotesPath),
      getItemsInFolder(examReviewPracticePath),
      getItemsInFolder(examReviewAnswersPath),
    ]);

    const notesData = processFileList(notesList, "lecture");
    const onlineNotesData = processFileList(onlineNotesList, "online-lecture");
    const examReviewPracticeData = processFileList(examReviewPracticesList, "practice", 3);
    const examReviewAnswersData = processFileList(examReviewAnswersList, "answer", 3);
    const examReviewNotesData = examReviewPracticeData.concat(examReviewAnswersData);

    const masterTexExists = fs.existsSync(path.join(coursePath, "master.tex"));
    const masterPdfExists = fs.existsSync(path.join(coursePath, "master.pdf"));

    if (masterTexExists) notesData.unshift({
      name: "Master Note",
      tex: masterTexExists,
      texPath: getNumFolders("master.tex"),
      pdf: masterPdfExists,
      pdfPath: getNumFolders("master.pdf"),
      type: "",
    });

    const notes = {
      notesData: { ...notesData },
      onlineNotesData: { ...onlineNotesData },
      examReviewNotesData: { ...examReviewNotesData },
    };

    res.send(notes);
  });

  courseNoteRouters.get("/open-note", async (req, res) => {
    const coursePath = getPath(config, courseName);
    const noteName = req.query["note-name"];
    const type = req.query["type"];
    const notePath = path.join(coursePath, noteName);

    const cmd = type === "pdf" ? "zathura" : "kitty nvim";
    const process = spawn("sh", ["-c", `${cmd} "${notePath}"`], {
      detached: true,
      stdio: "ignore",
    });

    process.unref();

    res.send(`Opening note in the background with ${cmd}`);
  });

  return courseNoteRouters;
}

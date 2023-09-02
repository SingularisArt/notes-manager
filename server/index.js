import express from "express";
import cors from "cors";

import { spawn } from "child_process";

import path from "path";
import YAML from "yamljs";
import fs from "fs";
import os from "os";

const configPath = path.join(process.env.HOME, ".config/lesson-manager/config.yaml");
const config = YAML.load(configPath);

const app = express()

app.use(cors());
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.set("view engine", "ejs");

app.get("/yaml", (_, res) => {
  res.send(config);
});

function getPath(...paths) {
  const expandedRoot = path.join(os.homedir(), config.root.replace(/^~[\/\\]?/, ""));
  return path.join(expandedRoot, ...paths);
}

function getCourseInfo(courseName) {
  const coursePath = path.join(os.homedir(), config.root.replace(/^~[\/\\]?/, ""), courseName);
  return YAML.load(path.join(coursePath, "info.yaml"));
}

async function getItemsInFolder(directoryPath, getFiles = true) {
  try {
    const files = await fs.promises.readdir(directoryPath);

    const notesList = files
      .filter(file => {
        const fullPath = path.join(directoryPath, file);
        if (getFiles) return fs.statSync(fullPath).isFile() && file !== "README.md";
        return fs.statSync(fullPath).isDirectory() && file !== "README.md";
      })
      .map(file => path.join(directoryPath, file));

    return notesList;
  } catch (err) {
    console.error("Error reading directory:", err);
    throw err;
  }
}

function replaceString(string, search) {
  return string.replace(new RegExp(`.*${search}`), "")
}

app.get("/courses", (_, res) => {
  const expandedDirectory = getPath("");
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

app.get("/courses/:courseName", (req, res) => {
  res.send(getCourseInfo(req.params.courseName));
});

// Get the exams for a course

// Get the notes for a course
app.get("/courses/:courseName/notes", async (req, res) => {
  try {
    const courseName = req.params.courseName;
    const courseInfo = getCourseInfo(courseName);
    const coursePath = getPath(courseName);

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
  } catch (err) {
    console.error("Error:", err);
    res.status(500).send("Internal Server Error");
  }
});

// Get the assignments for a course
app.get("/courses/:courseName/assignments", async (req, res) => {
  try {
    const courseName = req.params.courseName;
    const coursePath = getPath(courseName);

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
  } catch (err) {
    console.error("Error:", err);
    res.status(500).send("Internal Server Error");
  }
});

// Get the figures for a course
app.get("/courses/:courseName/figures", async (req, res) => {
  try {
    const courseName = req.params.courseName;
    const coursePath = getPath(courseName);

    const courseSearchString = "current-course/";
    const figuresPath = path.join(
      coursePath,
      replaceString(config.figures_dir, courseSearchString)
    );

    const figures = {};
    const figuresList = await getItemsInFolder(figuresPath, false);
    const tempPath = figuresList[0].slice(0, -2);
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

    figures["figuresTempPath"] = tempPath;
    res.send(figures);
  } catch (err) {
    console.error("Error:", err);
    res.status(500).send("Internal Server Error");
  }
});

app.get("/courses/:courseName/figures/:path", async (req, res) => {
  try {
    const figurePath = req.params.path;
    const svgCode = fs.readFileSync(figurePath, "utf8");
    res.send(svgCode);
  } catch (err) {
    console.error("Error:", err);
    res.status(500).send("Internal Server Error");
  }
});

// Get the todo's for a course
// TODO: Work on getting the information from the mariadb database.

// Open a pdf
app.get("/cmd/open-pdf/:pdfLocation", (req, res) => {
  const pdfLocation = req.params.pdfLocation;
  const zathura = spawn("zathura", [pdfLocation], {
    detached: true,
    stdio: "ignore",
  });

  zathura.unref();

  res.send("Opening PDF in the background with Zathura");
});

// Open a file
app.get("/cmd/open-file/:fileLocation", (req, res) => {
  const fileLocation = req.params.fileLocation;
  const kitty = spawn("sh", ["-c", `kitty nvim "${fileLocation}"`], {
    detached: true,
    stdio: "ignore",
  });

  kitty.unref();

  res.send("Opening file in the background with kitty nvim");
});

// Run a bash command
app.get("/cmd/command/:cmd", (req, res) => {
  const cmd = req.params.cmd;
  const process = spawn("sh", ["-c", cmd], {
    detached: true,
    stdio: ["ignore", "pipe", "pipe"],
  });

  let output = "";

  process.stdout.on("data", (data) => {
    output += data.toString();
  });

  process.stderr.on("data", (data) => {
    output += data.toString();
  });

  process.on("exit", (code) => {
    if (code === 0) {
      res.send(`Command executed successfully:\n${output}`);
    } else {
      res.status(500).send(`Command failed with error code ${code}:\n${output}`);
    }
  });

  process.unref();
});

app.listen(3000);

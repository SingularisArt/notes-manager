import express from "express";
import { spawnSync } from "child_process";
import { fileURLToPath } from "url";
import path from "path";
import YAML from "yamljs";
import fs from "fs";
import os from "os";
import clipboardy from "clipboardy";

const courseFigureRouters = express.Router();

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

function beautifyFileName(base) {
  const name = base.replace(/-/gi, " ").replace(/_/gi, " ");
  const uppercaseName = name.replace(/(^\w{1})|(\s+\w{1})/g, letter => letter.toUpperCase());
  const title = uppercaseName.replace(/\b\w/g, (match) => match.toUpperCase());

  return title;
}

export default function createCourseFigureRouters(config, courseName) {
  courseFigureRouters.get("/", async (req, res) => {
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

  courseFigureRouters.get("/open-figure", async (req, res) => {
    const figureName = req.query["figure-name"];
    const weekNumber = req.query["week-number"];

    const formattedWeekNumber = weekNumber < 10 ? `0${weekNumber}` : weekNumber;
    const figurePath = getFigurePath(config, courseName, figureName, formattedWeekNumber);

    spawnSync("inkscape", [figurePath], {
      stdio: "pipe",
      encoding: "utf-8",
    });

    res.send(fs.readFileSync(figurePath, "utf8"));
  });

  courseFigureRouters.get("/get-figure-data", async (req, res) => {
    const figureName = req.query["figure-name"];
    const weekNumber = req.query["week-number"];

    const formattedWeekNumber = weekNumber < 10 ? `0${weekNumber}` : weekNumber;
    const figurePath = getFigurePath(config, courseName, figureName, formattedWeekNumber);
    const svgCode = fs.readFileSync(figurePath, "utf8");

    res.send(svgCode);
  });

  courseFigureRouters.get("/create-figure", async (req, res) => {
    const figureName = req.query["figure-name"];
    const weekNumber = req.query["week-number"];

    const formattedWeekNumber = weekNumber < 10 ? `0${weekNumber}` : weekNumber;
    const figurePath = getFigurePath(config, courseName, figureName, formattedWeekNumber);

    const currentModuleURL = import.meta.url;
    const currentModulePath = fileURLToPath(currentModuleURL);
    const src = path.join(path.dirname(currentModulePath), "../../../src/data/template-figure.svg");
    const base = path.basename(figurePath).replace(".svg", "");

    fs.mkdirSync(path.dirname(figurePath), { recursive: true });
    fs.copyFileSync(src, figurePath);

    const incfigCommand = [
      "\\begin{figure}[ht]",
      "  \\centering",
      `  \\incfig{${base}}`,
      `  \\caption{${beautifyFileName(base)}}`,
      `  \\label{fig:${base.replace(/-/gi, "_")}}`,
      "\\end{figure}",
    ];
    clipboardy.writeSync(incfigCommand.join("\n"));

    res.send(beautifyFileName(base));
  });

  courseFigureRouters.get("/rename-figure", async (req, res) => {
    const oldName = req.query["old-name"];
    const newName = req.query["new-name"];
    const weekNumber = req.query["week-number"];

    const formattedWeekNumber = weekNumber < 10 ? `0${weekNumber}` : weekNumber;
    const oldPath = getFigurePath(config, courseName, oldName, formattedWeekNumber);
    const newPath = getFigurePath(config, courseName, newName, formattedWeekNumber);

    fs.renameSync(oldPath, newPath);

    res.send(newPath);
  });

  return courseFigureRouters;
}

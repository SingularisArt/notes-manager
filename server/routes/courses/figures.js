import express from 'express';
import path from 'path';
import fs from 'fs';
import clipboardy from 'clipboardy';
import * as glob from 'glob';
import { spawnSync } from 'child_process';
import { fileURLToPath } from 'url';
import {
  getPath,
  getItemsInFolder,
  replaceString,
  getFigurePath,
  beautifyFileName,
  getTrashDir,
  getWildCard,
  getCourseInfo,
} from '../../utils.js';

const courseFigureRouters = express.Router();

export default function createCourseFigureRouters(config) {
  courseFigureRouters.get('/:courseName/figures', async (req, res) => {
    const courseName = req.params.courseName;
    const coursePath = getPath(config, courseName);

    const courseSearchString = 'current-course/';
    const figuresPath = path.join(
      coursePath,
      replaceString(config.figures_dir, courseSearchString),
    );

    const figures = {};
    const figuresList = await getItemsInFolder(figuresPath, false);
    for (const figure of figuresList) {
      const figureItems = await getItemsInFolder(figure);
      const figureData = [];
      const number = Number(figure.slice(-2));

      for (const item of figureItems) {
        if (item.slice(-3) === 'svg') {
          const svgCode = fs.readFileSync(item, 'utf8');
          const title = item
            .replace(/^.*[\\\/]/, '')
            .replace('.svg', '')
            .replace(/-/gi, ' ');
          const uppercaseTitle = title.replace(
            /(^\w{1})|(\s+\w{1})/g,
            (letter) => letter.toUpperCase(),
          );

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

  courseFigureRouters.get(
    '/:courseName/figures/open-figure',
    async (req, res) => {
      const courseName = req.params.courseName;
      const figureName = req.query['figure-name'];
      const weekNumber = req.query['week-number'];

      const formattedWeekNumber =
        weekNumber < 10 ? `0${weekNumber}` : weekNumber;
      const figurePath = getFigurePath(
        config,
        courseName,
        figureName,
        formattedWeekNumber,
      );

      spawnSync('inkscape', [figurePath], {
        stdio: 'pipe',
        encoding: 'utf-8',
      });

      res.send(fs.readFileSync(figurePath, 'utf8'));
    },
  );

  courseFigureRouters.get(
    '/:courseName/figures/get-figure-data',
    async (req, res) => {
      const courseName = req.params.courseName;
      const figureName = req.query['figure-name'];
      const weekNumber = req.query['week-number'];

      const formattedWeekNumber =
        weekNumber < 10 ? `0${weekNumber}` : weekNumber;
      const figurePath = getFigurePath(
        config,
        courseName,
        figureName,
        formattedWeekNumber,
      );
      const svgCode = fs.readFileSync(figurePath, 'utf8');

      res.send(svgCode);
    },
  );

  courseFigureRouters.get(
    '/:courseName/figures/create-figure',
    async (req, res) => {
      const courseName = req.params.courseName;
      const figureName = req.query['figure-name'];
      const weekNumber = req.query['week-number'];

      const formattedWeekNumber =
        weekNumber < 10 ? `0${weekNumber}` : weekNumber;
      const figurePath = getFigurePath(
        config,
        courseName,
        figureName,
        formattedWeekNumber,
      );

      const currentModuleURL = import.meta.url;
      const currentModulePath = fileURLToPath(currentModuleURL);
      const src = path.join(
        path.dirname(currentModulePath),
        '../../../src/data/template-figure.svg',
      );
      const base = path.basename(figurePath).replace('.svg', '');

      fs.mkdirSync(path.dirname(figurePath), { recursive: true });
      fs.copyFileSync(src, figurePath);

      const incfigCommand = [
        '\\begin{figure}[ht]',
        '  \\centering',
        `  \\incfig{${base}}`,
        `  \\caption{${beautifyFileName(base)}}`,
        `  \\label{fig:${base.replace(/-/gi, '_')}}`,
        '\\end{figure}',
      ];
      clipboardy.writeSync(incfigCommand.join('\n'));

      res.send(beautifyFileName(base));
    },
  );

  courseFigureRouters.get(
    '/:courseName/figures/rename-figure',
    async (req, res) => {
      const courseName = req.params.courseName;
      const oldName = req.query['old-name'];
      const newName = req.query['new-name'];
      const weekNumber = req.query['week-number'];

      const formattedWeekNumber =
        weekNumber < 10 ? `0${weekNumber}` : weekNumber;
      const oldPath = getFigurePath(
        config,
        courseName,
        oldName,
        formattedWeekNumber,
      );

      const matchingFiles = glob.globSync(`${oldPath}.*`);
      if (matchingFiles.length === 0) {
        return res.send('No matching files');
      }

      for (const file of matchingFiles) {
        const destDir = path.dirname(file);
        const extension = path.parse(file).ext;

        const destPath = path.join(destDir, `${newName}${extension}`);

        fs.renameSync(file, destPath);
      }

      res.send('Success');
    },
  );

  courseFigureRouters.get(
    '/:courseName/figures/delete-figure',
    async (req, res) => {
      const courseName = req.params.courseName;
      const courseConfig = getCourseInfo(config, courseName);
      const name = req.query['name'];
      const weekNumber = req.query['week-number'];

      const formattedWeekNumber =
        weekNumber < 10 ? `0${weekNumber}` : weekNumber;
      const figurePath = getFigurePath(
        config,
        courseName,
        name,
        formattedWeekNumber,
      );

      let lecOrChap;
      if (courseConfig.notes_type === 'lectures')
        lecOrChap = `lec-${weekNumber}`;
      else lecOrChap = `chap-${weekNumber}`;

      const wildCardPath = getWildCard(figurePath);
      const trashDir = getTrashDir(config, courseName, `figures/${lecOrChap}`);

      const matchingFiles = glob.globSync(wildCardPath);
      if (matchingFiles.length === 0) {
        return res.send('No matching files');
      }

      for (const file of matchingFiles) {
        const fileName = path.basename(file);
        const destinationFilePath = path.join(trashDir, fileName);

        fs.renameSync(file, destinationFilePath);
      }

      res.send('Success');
    },
  );

  return courseFigureRouters;
}

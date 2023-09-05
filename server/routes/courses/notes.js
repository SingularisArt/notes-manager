import express from 'express';
import { spawn } from 'child_process';
import path from 'path';
import fs from 'fs';
import {
  getPath,
  getCourseInfo,
  getItemsInFolder,
  getNumFolders,
  processFileList,
} from '../../utils.js';

const courseNoteRouters = express.Router();

export default function createCourseNoteRouters(config) {
  courseNoteRouters.get('/:courseName/notes', async (req, res) => {
    const courseName = req.params.courseName;
    const courseInfo = getCourseInfo(config, courseName);
    const coursePath = getPath(config, courseName);

    const notesType = courseInfo.notes_type;

    const notesPath = path.join(coursePath, notesType);
    const onlineNotesPath = path.join(
      coursePath,
      `online-${notesType.slice(0, -1)}-notes`,
    );
    const examReviewAnswersPath = path.join(
      coursePath,
      'exam-review',
      'answers',
    );
    const examReviewPracticePath = path.join(
      coursePath,
      'exam-review',
      'practice',
    );

    const [
      notesList,
      onlineNotesList,
      examReviewPracticesList,
      examReviewAnswersList,
    ] = await Promise.all([
      getItemsInFolder(notesPath),
      getItemsInFolder(onlineNotesPath),
      getItemsInFolder(examReviewPracticePath),
      getItemsInFolder(examReviewAnswersPath),
    ]);

    const notesData = processFileList(notesList, 'lecture', 2, true);
    const onlineNotesData = processFileList(onlineNotesList, 'online-lecture');
    const examReviewPracticeData = processFileList(
      examReviewPracticesList,
      'practice',
      3,
    );
    const examReviewAnswersData = processFileList(
      examReviewAnswersList,
      'answer',
      3,
    );
    const examReviewNotesData = examReviewPracticeData.concat(
      examReviewAnswersData,
    );

    const masterTexExists = fs.existsSync(path.join(coursePath, 'master.tex'));
    const masterPdfExists = fs.existsSync(path.join(coursePath, 'master.pdf'));

    if (masterTexExists)
      notesData.unshift({
        name: 'Master Note',
        tex: masterTexExists,
        texPath: getNumFolders('master.tex'),
        pdf: masterPdfExists,
        pdfPath: getNumFolders('master.pdf'),
        type: '',
      });

    const notes = {
      notesData: { ...notesData },
      onlineNotesData: { ...onlineNotesData },
      examReviewNotesData: { ...examReviewNotesData },
    };

    res.send(notes);
  });

  courseNoteRouters.get(
    '/:courseName/notes/open-note/:noteName',
    async (req, res) => {
      const courseName = req.params.courseName;
      const coursePath = getPath(config, courseName);
      const noteName = req.params.noteName;

      const notePath = path.join(coursePath, noteName);

      const type = notePath.slice(-3) === 'pdf' ? 'pdf' : 'tex';
      const cmd = type === 'pdf' ? 'zathura' : 'kitty nvim';

      const process = spawn('sh', ['-c', `${cmd} "${notePath}"`], {
        detached: true,
        stdio: 'ignore',
      });

      process.unref();

      res.send(`Opening note in the background with ${cmd}`);
    },
  );

  courseNoteRouters.get(
    '/:courseName/notes/create-note/:noteName',
    async (req, res) => {
      const courseName = req.params.courseName;
      const coursePath = getPath(config, courseName);
      const noteName = req.params.noteName;

      res.send('Creating note');
    },
  );

  courseNoteRouters.get(
    '/:courseName/notes/delete-note/:noteName',
    async (req, res) => {
      const courseName = req.params.courseName;
      const coursePath = getPath(config, courseName);
      const noteName = req.params.noteName;

      res.send('Deleting note');
    },
  );

  courseNoteRouters.get('/:courseName/notes/move-note', async (req, res) => {
    res.send('Moving note');
  });

  courseNoteRouters.get(
    '/:courseName/notes/renumber-note',
    async (req, res) => {
      const courseName = req.params.courseName;
      const coursePath = getPath(config, courseName);
      const courseConfig = getCourseInfo(config, courseName);

      const oldNumber = req.query['old-number'];
      const newNumber = req.query['new-number'];

      const oldFormattedNumber = oldNumber.toString().padStart(2, '0');
      const newFormattedNumber = newNumber.toString().padStart(2, '0');

      const noteType = courseConfig.notes_type;

      const noteSuffix = noteType === 'lectures' ? 'lec' : 'chap';
      const oldNotePath = path.join(
        coursePath,
        noteType,
        `${noteSuffix}-${oldFormattedNumber}.tex`,
      );
      const newNotePath = path.join(
        coursePath,
        noteType,
        `${noteSuffix}-${newFormattedNumber}.tex`,
      );

      if (fs.existsSync(newNotePath)) {
        res.send('Exists');
        return;
      }
      fs.renameSync(oldNotePath, newNotePath);

      const fileContent = fs.readFileSync(newNotePath, 'utf8').split('\n');
      fileContent[1] = fileContent[1].replace(oldFormattedNumber, newFormattedNumber);
      fs.writeFileSync(newNotePath, fileContent.join('\n'), 'utf8');

      res.send("Success");
    },
  );

  courseNoteRouters.get('/:courseName/notes/retitle-note', async (req, res) => {
    const courseName = req.params.courseName;
    const noteNumber = req.query['note-number'];
    const newTitle = req.query['new-title'];

    const coursePath = getPath(config, courseName);
    const courseConfig = getCourseInfo(config, courseName);
    const formattedNoteNumber = noteNumber.toString().padStart(2, '0');

    const noteType = courseConfig.notes_type;
    const noteSuffix = noteType === 'lectures' ? 'lec' : 'chap';

    const notePath = path.join(
      coursePath,
      noteType,
      `${noteSuffix}-${formattedNoteNumber}.tex`,
    );

    const fileContent = fs.readFileSync(notePath, 'utf8').split('\n');

    const texContent = fileContent[0];
    const match = texContent.match(/\\nte\[([^\]]*)\]{([^}]*)}{([^}]*)}/);

    const note = match ? match[1] : '';
    const date = match ? match[2] : '';

    const newTitleFormat = `\\nte[${note}]{${date}}{${newTitle}}`;
    const newTitleLabel = `\\label{nte_${formattedNoteNumber}:${newTitle
      .replace(/ /g, '_')
      .toLowerCase()}}`;

    fileContent[0] = newTitleFormat;
    fileContent[1] = newTitleLabel;

    fs.writeFileSync(notePath, fileContent.join('\n'), 'utf8');

    res.send('Retitling note');
  });

  return courseNoteRouters;
}

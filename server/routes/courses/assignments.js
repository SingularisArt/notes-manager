import express from 'express';
import path from 'path';
import { getPath, getItemsInFolder, replaceString } from '../../utils.js';

const courseAssignmentRouters = express.Router();

export default function createCourseAssignmentRouters(config, courseName) {
  courseAssignmentRouters.get('/', async (req, res) => {
    const coursePath = getPath(config, courseName);

    const courseSearchString = 'current-course/';
    const myAssignmentsSearchString = 'my-assignments/';

    const gradedAss = config.graded_assignments_folder;
    const myAss = config.my_assignments_folder;
    const onlineAss = config.online_assignments_folder;
    const latexAss = config.my_assignments_latex_folder;
    const yamlAss = config.my_assignments_yaml_folder;
    const pdfAss = config.my_assignments_pdf_folder;

    const gradedPath = path.join(
      coursePath,
      replaceString(gradedAss, courseSearchString),
    );
    const myPath = path.join(
      coursePath,
      replaceString(myAss, courseSearchString),
    );
    const onlinePath = path.join(
      coursePath,
      replaceString(onlineAss, courseSearchString),
    );

    const gradedList = await getItemsInFolder(gradedPath);
    const onlineList = await getItemsInFolder(onlinePath);

    const latexPath = path.join(
      myPath,
      replaceString(latexAss, myAssignmentsSearchString),
    );
    const yamlPath = path.join(
      myPath,
      replaceString(yamlAss, myAssignmentsSearchString),
    );
    const pdfPath = path.join(
      myPath,
      replaceString(pdfAss, myAssignmentsSearchString),
    );

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

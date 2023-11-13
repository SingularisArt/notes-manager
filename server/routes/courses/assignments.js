import express from 'express';
import path from 'path';
import { getPath, getItemsInFolder } from '../../utils.js';

const courseAssignmentRouters = express.Router();

export default function createCourseAssignmentRouters(config, _) {
  courseAssignmentRouters.get('/:courseName/assignments', async (req, res) => {
    const courseName = req.params.courseName;
    const coursePath = getPath(config, courseName);

    const myAssignmentFolders = config.assignment_folders;

    const assignmentsDir = path.join(
      coursePath,
      path.basename(config.assignments_dir),
    );

    const assignments = {};
    for (const folder in myAssignmentFolders) {
      const folderPath = path.join(assignmentsDir, myAssignmentFolders[folder]);
      assignments[folder] = await getItemsInFolder(folderPath);
    }

    const pathsWithoutExtensions = [];
    for (const folder in assignments) {
      if (assignments.hasOwnProperty(folder)) {
        assignments[folder].forEach((path) => {
          const pathWithoutExtension = path.split('.').slice(0, -1).join('.');
          pathsWithoutExtensions.push(pathWithoutExtension);
        });
      }
    }
    const filePaths = [...new Set(pathsWithoutExtensions)];

    const keyFilePaths = {};
    const keys = Object.keys(assignments);
    filePaths.forEach((filePath) => {
      const fileName = path.basename(filePath, path.extname(filePath));

      keyFilePaths[fileName] = {};
      keys.forEach((key) => {
        const folderPath = assignments[key].find((p) => p.includes(fileName));

        keyFilePaths[fileName][key] = folderPath || '';
      });
    });

    res.send(keyFilePaths);
  });

  return courseAssignmentRouters;
}

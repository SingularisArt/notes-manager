import express from 'express';
import path from 'path';
import fs from 'fs';
import os from 'os';
import createCourseAssignmentRouters from './courses/assignments.js';
import createCourseExamRouters from './courses/exams.js';
import createCourseFigureRouters from './courses/figures.js';
import createCourseNoteRouters from './courses/notes.js';
import createCourseTodoRouters from './courses/todos.js';
import { getPath, getCourseInfo } from '../utils.js';

const courseRouters = express.Router();

export default function createCourseRouters(config) {
  courseRouters.get('/', (_, res) => {
    const expandedDirectory = getPath(config, '');
    const courses = fs.readdirSync(expandedDirectory, { withFileTypes: true });

    const filteredCourses = courses
      .filter((course) => {
        const coursePath = path.join(expandedDirectory, course.name);
        return fs.statSync(coursePath).isDirectory();
      })
      .map((course) => ({
        name: course.name,
        path: path.join(expandedDirectory, course.name),
      }))
      .filter(
        (course) =>
          course.path !==
          path.join(
            os.homedir(),
            config.templates_dir.replace(/^~[\/\\]?/, ''),
          ),
      );

    res.send(filteredCourses);
  });

  courseRouters.get('/:courseName', (req, res) => {
    res.send(getCourseInfo(config, req.params.courseName));
  });

  courseRouters.use('/', (req, res, next) => {
    createCourseAssignmentRouters(config, req.params.courseName)(
      req,
      res,
      next,
    );
  });
  courseRouters.use('/', (req, res, next) => {
    createCourseExamRouters(config, req.params.courseName)(req, res, next);
  });
  courseRouters.use('/', (req, res, next) => {
    createCourseFigureRouters(config, req.params.courseName)(req, res, next);
  });
  courseRouters.use('/', (req, res, next) => {
    createCourseNoteRouters(config, req.params.courseName)(req, res, next);
  });
  courseRouters.use('/', (req, res, next) => {
    createCourseTodoRouters(config, req.params.courseName)(req, res, next);
  });

  return courseRouters;
}

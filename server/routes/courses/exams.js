import express from 'express';

const courseExamRouters = express.Router();

export default function createCourseExamRouters(config, courseName) {
  courseExamRouters.get('/:courseName/exams', async (req, res) => {
    console.log(config, courseName);

    res.send('Exams');
  });

  return courseExamRouters;
}

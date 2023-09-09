import express from 'express';

const courseTodoRouters = express.Router();

export default function createCourseTodoRouters(config, courseName) {
  courseTodoRouters.get('/:courseName/todos', async (req, res) => {

    res.send('Todos');
  });

  return courseTodoRouters;
}

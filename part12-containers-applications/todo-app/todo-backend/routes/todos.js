const express = require('express');
const { Todo } = require('../mongo')
const router = express.Router();
const redis = require('../redis/index')

const TODO_COUNTER_KEY = 'todo_counter';


/* GET todos listing. */
router.get('/', async (_, res) => {
  const todos = await Todo.find({})
  res.send(todos);
});

/* POST todo to listing. */
router.post('/', async (req, res) => {
  const todo = new Todo({
    text: req.body.text,
    done: false
  });
  await todo.save();
  res.send(todo);
});

/* POST todo store in redis. */
router.post('/todo_counter', async (req, res) => {
  try {
  let todoCount = await redis.getAsync(TODO_COUNTER_KEY);
  todoCount = todoCount ? parseInt(todoCount, 10) + 1 : 1;
  await redis.setAsync(TODO_COUNTER_KEY, todoCount);
  res.json({ message: 'Todo Created', todo_count: todoCount });
  } catch (err) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Route to get the current todo count
router.get('/get_todo_count', async (req, res) => {
  try {
    let todoCount = await getAsync(TODO_COUNTER_KEY);
    todoCount = todoCount ? parseInt(todoCount, 10) : 0;

    res.json({ todo_count: todoCount });
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


/* GET todo */
router.get('/:id', async (req, res) => {
  const { id } = req.params
  const todo = await Todo.findById(id)
  if (!todo) return res.sendStatus(404)
  res.send(todo);
});

/* PUT todo. */
router.put('/:id', async (req, res) => {
  const newTodo = await Todo.findByIdAndUpdate(req.body.id, {
    text: req.body.text,
    done: req.body.done
  })
  res.send(newTodo);
});

const singleRouter = express.Router();

const findByIdMiddleware = async (req, res, next) => {
  const { id } = req.params
  req.todo = await Todo.findById(id)
  if (!req.todo) return res.sendStatus(404)

  next()
}

/* DELETE todo. */
singleRouter.delete('/', async (req, res) => {
  await req.todo.delete()  
  res.sendStatus(200);
});

/* GET todo. */
singleRouter.get('/', async (req, res) => {
  res.sendStatus(405); // Implement this
});

/* PUT todo. */
singleRouter.put('/', async (req, res) => {
  res.sendStatus(405); // Implement this
});

router.use('/:id', findByIdMiddleware, singleRouter)


module.exports = router;

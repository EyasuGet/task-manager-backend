import { Router } from 'express';
import { getTasks, addTask, completeTask, deleteTask } from '../controller/task.controller.js';

const taskRouter = Router();

taskRouter.get('/', getTasks);
taskRouter.post('/', addTask);
taskRouter.put('/:id', completeTask);
taskRouter.delete('/:id', deleteTask);

export default taskRouter;
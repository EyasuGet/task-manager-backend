import { Router } from 'express';
import { getTasks, addTask, completeTask, deleteTask, updateTaskStatus } from '../controller/task.controller.js';

const taskRouter = Router();

taskRouter.get('/', getTasks);
taskRouter.post('/', addTask);
taskRouter.put('/:id', completeTask);
taskRouter.delete('/:id', deleteTask);
taskRouter.patch('/:id/status', updateTaskStatus)


export default taskRouter;
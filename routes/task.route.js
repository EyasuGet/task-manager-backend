import { Router } from 'express';
import { getTasks, addTask, completeTask, deleteTask, updateTaskStatus, getProfile } from '../controller/task.controller.js';
import verifyToken from '../middleware/auth.middleware.js';

const taskRouter = Router();

taskRouter.get('/',verifyToken, getTasks);
taskRouter.post('/',verifyToken, addTask);
taskRouter.put('/:id', completeTask);
taskRouter.delete('/:id', deleteTask);
taskRouter.patch('/:id/status', updateTaskStatus)
taskRouter.get('/profile',verifyToken, getProfile)


export default taskRouter;
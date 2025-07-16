import express, { json } from 'express';
import dotenv from "dotenv"
import taskRouter from './routes/task.route.js';
import { connectDB } from "./config/db.js";
import authRouter from './routes/auth.route.js';

const app = express();

dotenv.config()
app.use(json());
app.use(express.json());

// API is running page
app.get('/', (req, res) => {
  res.send('<h1>API is running</h1>');
});

// Task routes
app.use('/api/tasks', taskRouter);
app.use("/auth", authRouter)

const port = process.env.PORT || 5000;

app.listen(port, () => {
    connectDB();
    console.log(`server started at http://localhost:${port}`);
});
import Task from '../models/task.model.js';

// Get all tasks
export async function getTasks(req, res) {
  try {
    const { completed } = req.query;
    let filter = {};
    if (completed === "true") filter.completed = true;
    else if (completed === "false") filter.completed = false;
    const tasks = await Task.find(filter);
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ error: 'Server error', details: error.message });
  }
}

// Add a new task
export async function addTask(req, res) {
  try {
    const { title } = req.body;
    if (!title || typeof title !== "string" || title.trim() === "") {
      return res.status(400).json({ error: 'Title is required and must not be empty' });
    }
    const newTask = new Task({ title: title.trim() });
    await newTask.save();
    res.status(201).json(newTask);
  } catch (error) {
    res.status(500).json({ error: 'Server error', details: error.message });
  }
}

// Mark a task as completed
export async function completeTask(req, res) {
  try {
    const { id } = req.params;
    const task = await Task.findById(id);
    if (!task) {
      return res.status(404).json({ error: 'Task not found' });
    }
    task.completed = true;
    await task.save();
    res.json(task);
  } catch (error) {
    res.status(500).json({ error: 'Server error', details: error.message });
  }
}

// Delete a task
export async function deleteTask(req, res) {
  try {
    const { id } = req.params;
    const task = await Task.findByIdAndDelete(id);
    if (!task) {
      return res.status(404).json({ error: 'Task not found' });
    }
    
    res.status(200).json({
            message: "Task Deleted!"
    })
  } catch (error) {
    res.status(500).json({ error: 'Server error', details: error.message });
  }
}
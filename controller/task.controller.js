import Task from '../models/task.model.js';
import User from '../models/user.model.js';

// Get all tasks
export async function getTasks(req, res) {
  try {
    const { completed, status, search = '', page = 1, limit = 3 } = req.query;
    let filter = {};

    filter.user = req.user._id;

    if (status) {
      const statusArr = status.split(',').map(s => s.trim());
      filter.status = { $in: statusArr };
    } else if (completed === "true") {
      filter.completed = true;
    } else if (completed === "false") {
      filter.completed = false;
    }

    if (search) filter.name = { $regex: search, $options: 'i' };

    const skip = (Number(page) - 1) * Number(limit);

    const tasks = await Task.find(filter).skip(skip).limit(Number(limit));
    const total = await Task.countDocuments(filter);

    res.json({ tasks, total });
  } catch (error) {
    res.status(500).json({ error: 'Server error', details: error.message });
  }
}
// Add a new task
export async function addTask(req, res) {
  try {
    const { name } = req.body; 
    if (!name || typeof name !== "string" || name.trim() === "") {
      return res.status(400).json({ error: 'Name is required and must not be empty' });
    }
    const newTask = new Task({ name: name.trim() });
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
    const { status } = req.body;
    const task = await Task.findById(id);
    if (!task) {
      return res.status(404).json({ error: 'Task not found' });
    }
    if (status === "completed" || status === undefined) {
      task.completed = true;
    }
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

export const getProfile = async (req, res) => {
  const userId = req.user._id;
  console.log("req.user:", req.user);

  try {
    const user = await User.findById(userId).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ message: "User profile fetched", data: user });
  } catch (error) {
    console.error("Failed to get user profile:", error.message);
    res.status(500).json({ message: "Server error" });
  }
};

export async function logout(req, res) {
  try {
    if (req.session) {
      req.session.destroy(err => {
        if (err) {
          return res.status(500).json({ error: 'Logout failed', details: err.message });
        }
        res.clearCookie('connect.sid');
        res.json({ message: 'Logged out successfully' });
      });
    } else {
      res.status(200).json({ message: 'No active session' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Server error', details: error.message });
  }
}


export async function updateTaskStatus(req, res) {
  try {
    const { id } = req.params;
    const { status } = req.body;
    const validStatuses = ["pending", "inprogress", "completed"];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({ error: 'Invalid status value' });
    }
    const task = await Task.findById(id);
    if (!task) {
      return res.status(404).json({ error: 'Task not found' });
    }
    task.status = status;
    task.completed = status === "completed";
    await task.save();
    res.json(task);
  } catch (error) {
    res.status(500).json({ error: 'Server error', details: error.message });
  }
}
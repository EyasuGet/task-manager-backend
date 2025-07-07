import mongoose, { Schema, model } from 'mongoose';

const TaskSchema = new Schema({
  title: { type: String, required: true },
  completed: { type: Boolean, default: false }
},{
  timestamps: true
});

const Task = mongoose.model('Task', TaskSchema)

export default Task
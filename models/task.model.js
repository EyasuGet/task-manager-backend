import mongoose, { Schema, model } from 'mongoose';

const TaskSchema = new Schema({
  name: { type: String, required: true },
  status: { type: String, enum: ['pending', 'inprogress', 'completed'], default: 'pending' },
  completed: { type: Boolean, default: false },
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true }
},{
  timestamps: true
});

const Task = mongoose.model('Task', TaskSchema)

export default Task
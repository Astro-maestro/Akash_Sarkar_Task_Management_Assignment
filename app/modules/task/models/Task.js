const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

const taskSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      maxLength: 100,
    },
    description: {
      type: String,
      default: "", 
    },
    status: {
      type: String,
      enum: ['TODO', 'IN_PROGRESS', 'COMPLETED'],
      default: 'TODO', 
    },
    priority: {
      type: String,
      enum: ['LOW', 'MEDIUM', 'HIGH'], 
      required: true,
    },
    dueDate: {
      type: Date, 
    },
    isDeleted: {
      type: Boolean,
      default: false,  // Indicates whether the task is soft deleted or not
    },
    deletedAt: {
      type: Date,
      default: null,  // Timestamp of when the task was soft deleted
    },
  },
  {
    timestamps: true, 
  }
);

taskSchema.plugin(mongoosePaginate); // Add the plugin to the schema
const Task = mongoose.model('Task', taskSchema);

module.exports = Task;

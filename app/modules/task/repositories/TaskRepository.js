const Task = require("../models/Task");
const taskValidationSchema = require("../validators/taskValidator");



class TaskRepository {
  async createTask(data) {
    try {
      // Validate user input
      const validatedData = await taskValidationSchema.validateAsync(data);
      const task = new Task(validatedData);
      return await task.save();
    } catch (error) {
      throw new Error("Failed to Create Task" + error.message);
    }
  }

  async getTaskById(id) {
    try {
      const task = await Task.findById(id);
      if (!task) throw new Error("Task not found");
      return task;
    } catch (error) {
      throw new Error("Failed to Get Task" + error.message);
    }
  }

  async updateTask(id, updatedData) {
    try {
      // Validate user input
      const validatedData = await taskValidationSchema.validateAsync(
        updatedData
      );
      const updatedTask = await Task.findByIdAndUpdate(id, validatedData, {
        new: true,
      }); // the updatedAt field is automatically updated because of {new : true}
      if (!updatedTask) throw new Error("Task not found");
      return updatedTask;
    } catch (error) {
      throw new Error("Failed to Update Task" + error.message);
    }
  }

  async deleteTask(id) {
    try {
      const deletedTask = await Task.findByIdAndDelete(id);
      if (!deletedTask) throw new Error("Task not found");
      return deletedTask;
    } catch (error) {
      throw new Error("Failed to delete Task" + error.message);
    }
  }

  async softDeleteTask(id) {
    try {
      const softDeletedTask = await Task.findByIdAndUpdate(
        id,
        {
          isDeleted: true,
          deletedAt: new Date(),
        },
        { new: true }
      );
      if(!softDeletedTask) throw new Error("Task not found");
      return softDeletedTask;
    } catch (error) {
      throw new Error("Failed to soft delete Task" + error.message);
    }
  }

  async getFilteredTasks(query) {
    try {
      const {
        status,
        priority,
        sort = "createdAt",
        order = "asc",
        limit = 10,
        page = 1,
      } = query;
  
      // Validate and construct match stage
      const matchStage = {};
      if (status) matchStage.status = status;
      if (priority) matchStage.priority = priority;
  
      // Handle sort order
      const sortOrder = order.toLowerCase() === "desc" ? -1 : 1;
  
      // Calculate pagination
      const skip = (page - 1) * limit;
  
      // Build aggregation pipeline
      const tasksPipeline = [
        { $match: matchStage },
        { $sort: { [sort]: sortOrder } },
        { $skip: skip },
        { $limit: Number(limit) },
      ];
  
      // Count pipeline
      const countPipeline = [{ $match: matchStage }, { $count: "totalTasks" }];
  
      // Execute pipelines
      const [tasks, totalCount] = await Promise.all([
        Task.aggregate(tasksPipeline),
        Task.aggregate(countPipeline),
      ]);
  
      const totalTasks = totalCount.length > 0 ? totalCount[0].totalTasks : 0;
  
      return {
        tasks,
        totalTasks,
        totalPages: Math.ceil(totalTasks / limit),
        currentPage: Number(page),
      };
    } catch (error) {
      throw new Error("Failed to fetch tasks: " + error.message);
    }
  }
  

  async getAllTasks() {
    try {
      return await Task.find();
    } catch (error) {
      throw new Error("Failed to fetch all tasks: " + error.message);
    }
  }

  // Get all tasks, excluding soft-deleted ones
  async getTasks() {
    try {
      return await Task.find({ isDeleted: false });
    } catch (error) {
      throw new Error("Failed to fetch active tasks: " + error.message);
    }
  }
}

module.exports = new TaskRepository();

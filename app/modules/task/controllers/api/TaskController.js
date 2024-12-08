const TaskRepository = require('../../repositories/TaskRepository');
const logger = require('../../../../utils/logger');

class TaskController {

  async createTask(req, res) {
    try {
      const data = req.body;
      const newTask = await TaskRepository.createTask(data);
      logger.info(`Task created successfully: ${newTask._id}`);
      res.status(201).json(newTask);
    } catch (error) {
      logger.error(`Failed to create task: ${error.message}`);
      res.status(500).json({ message: error.message });
    }
  }

  async getTaskById(req, res) {
    try {
      const { id } = req.params;
      const task = await TaskRepository.getTaskById(id);
      if(!task){
        logger.warn(`Task not found with id: ${id}`);
        return res.status(404).json({ message: "Task not found" });
      }
      logger.info(`Task found with id: ${task.id}`);
      res.status(200).json(task);
    } catch (error) {
      logger.error(`Error fetching task by id: ${error.message}`);
      res.status(404).json({ message: error.message });
    }
  }

  async updateTask(req, res) {
    try {
      const { id } = req.params;
      const updatedData = req.body;
      const updatedTask = await TaskRepository.updateTask(id, updatedData);
      logger.info(`Task updated with id: ${id}`);
      res.status(200).json(updatedTask);
    } catch (error) {
      logger.error('Failed to update task');
      res.status(500).json({ message: error.message });
    }
  }

  async deleteTask(req, res) {
    try {
      const { id } = req.params;
      const deletedTask = await TaskRepository.deleteTask(id);
      // Check if the task is successfully deleted
    if (!deletedTask) {
        logger.warn(`Task not found with id: ${id}`);
        return res.status(404).json({ message: "Task not found" });
      }
      logger.info(`Task deleted with id: ${id}`);
      // Return 204 No Content for successful deletion with no response body
      return res.status(204).send(); // 204 No Content
    } catch (error) {
      logger.error('Failed to delete task');
      res.status(500).json({ message: error.message });
    }
  }


  async softDeleteTask(req, res) {
    try {
      const { id } = req.params;
      const softDeletedTask = await TaskRepository.softDeleteTask(id);
      // Check if the task is successfully deleted
    if (!softDeletedTask) {
        logger.warn(`Task not found with id: ${id}`);
        return res.status(404).json({ message: "Task not found" });
      }
      logger.info(`Task soft deleted with id: ${id}`);
      // Return 204 No Content for successful deletion with no response body
      return res.status(204).send(); // 204 No Content
    } catch (error) {
      logger.error('Failed to soft delete task');
      res.status(500).json({ message: error.message });
    }
  }

  async getFilteredTasks(req, res) {
    try {
      const query = req.query;
      const tasksData = await TaskRepository.getFilteredTasks(query);
      logger.info('Filtered Task found');
      res.status(200).json(tasksData);
    } catch (error) {
      logger.error('Failed to fetch filtered tasks');
      res.status(500).json({ message: error.message });
    }
  }

  async getAllTasks(req, res) {
    try {
      const tasks = await TaskRepository.getAllTasks();
      logger.info('All tasks fetched');
      res.status(200).json(tasks);
    } catch (error) {
      logger.error('Failed to fetch all tasks');
      res.status(500).json({ message: error.message });
    }
  }

  async getActiveTasks(req, res) {
    try {
      const tasks = await TaskRepository.getTasks();
      logger.info('Active tasks fetched');
      res.status(200).json(tasks);
    } catch (error) {
      logger.error('Failed to fetch active tasks');
      res.status(500).json({ message: error.message });
    }
  }
}

module.exports = new TaskController();

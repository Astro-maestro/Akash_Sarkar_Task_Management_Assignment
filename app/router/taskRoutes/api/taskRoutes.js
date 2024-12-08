/**
 * @swagger
 * components:
 *   securitySchemes:
 *     xAccessToken:
 *       type: apiKey
 *       in: header
 *       name: x-access-token
 *   schemas:
 *     Task:
 *       type: object
 *       required:
 *         - title
 *         - priority
 *       properties:
 *         title:
 *           type: string
 *           description: The title of the task
 *           maxLength: 100
 *         description:
 *           type: string
 *           description: A detailed description of the task
 *           default: ""
 *         status:
 *           type: string
 *           description: The current status of the task
 *           enum: [TODO, IN_PROGRESS, COMPLETED]
 *           default: "TODO"
 *         priority:
 *           type: string
 *           description: The priority of the task
 *           enum: [LOW, MEDIUM, HIGH]
 *         dueDate:
 *           type: string
 *           format: date
 *           description: The due date of the task
 *         isDeleted:
 *           type: boolean
 *           description: Indicates if the task is soft deleted
 *           default: false
 *         deletedAt:
 *           type: string
 *           format: date
 *           description: Timestamp when the task was soft deleted
 *           default: null
 */

/**
 * @swagger
 * /tasks:
 *   post:
 *     summary: Create a new task
 *     description: Create a new task by providing the necessary details.
 *     security:
 *       - xAccessToken: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Task'
 *     responses:
 *       201:
 *         description: Task created successfully
 *       400:
 *         description: Invalid input data
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /tasks/{id}:
 *   get:
 *     summary: Get a task by ID
 *     description: Fetch a task using its unique ID.
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID of the task to fetch
 *     security:
 *       - xAccessToken: []
 *     responses:
 *       200:
 *         description: Task found successfully
 *       404:
 *         description: Task not found
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /tasks/{id}:
 *   put:
 *     summary: Update a task by ID
 *     description: Update an existing task by providing the new data.
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID of the task to update
 *     security:
 *       - xAccessToken: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Task'
 *     responses:
 *       200:
 *         description: Task updated successfully
 *       404:
 *         description: Task not found
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /tasks/{id}:
 *   delete:
 *     summary: Delete a task by ID
 *     description: Permanently delete a task using its ID.
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID of the task to delete
 *     security:
 *       - xAccessToken: []
 *     responses:
 *       204:
 *         description: Task deleted successfully (No Content)
 *       404:
 *         description: Task not found
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /tasks/{id}/soft-delete:
 *   patch:
 *     summary: Soft delete a task by ID
 *     description: Mark a task as deleted without permanently removing it.
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID of the task to soft delete
 *     security:
 *       - xAccessToken: []
 *     responses:
 *       204:
 *         description: Task soft deleted successfully (No Content)
 *       404:
 *         description: Task not found
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /filteredTasks:
 *   get:
 *     summary: Get filtered tasks
 *     description: Fetch tasks based on filter criteria (e.g., status, priority).
 *     parameters:
 *       - name: status
 *         in: query
 *         description: Filter tasks by status (TODO, IN_PROGRESS, COMPLETED)
 *       - name: priority
 *         in: query
 *         description: Filter tasks by priority (LOW, MEDIUM, HIGH)
 *       - name: sort
 *         in: query
 *         description: Sort tasks by a field (default is createdAt)
 *       - name: order
 *         in: query
 *         description: Sort order (asc or desc)
 *       - name: limit
 *         in: query
 *         description: Number of tasks per page (default is 10)
 *       - name: page
 *         in: query
 *         description: Page number for pagination (default is 1)
 *     security:
 *       - xAccessToken: []
 *     responses:
 *       200:
 *         description: Filtered tasks retrieved successfully
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /tasks:
 *   get:
 *     summary: Get all tasks
 *     description: Fetch all tasks including those that are deleted.
 *     security:
 *       - xAccessToken: []
 *     responses:
 *       200:
 *         description: Tasks fetched successfully
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /getTasks:
 *   get:
 *     summary: Get tasks
 *     description: Fetch tasks that are not soft-deleted.
 *     security:
 *       - xAccessToken: []
 *     responses:
 *       200:
 *         description: Active tasks retrieved successfully
 *       500:
 *         description: Internal server error
 */

const express = require('express');
const TaskController = require('../../../modules/task/controllers/api/TaskController');
const authenticateToken = require('../../../middleware/authenticate'); // Middleware to authenticate JWT
const router = express.Router();


router.post('/tasks',authenticateToken, TaskController.createTask);  // Create a new task
router.get('/tasks/:id',authenticateToken, TaskController.getTaskById);  // Get task by ID
router.put('/tasks/:id',authenticateToken, TaskController.updateTask);  // Update task by ID
router.delete('/tasks/:id',authenticateToken, TaskController.deleteTask);  // Delete task by ID
router.patch('/tasks/:id/soft-delete',authenticateToken, TaskController.softDeleteTask);  // Soft delete task by ID
router.get('/filteredTasks',authenticateToken, TaskController.getFilteredTasks);  // Get filtered tasks
router.get('/tasks',authenticateToken, TaskController.getAllTasks);  // Get all tasks
router.get('/getTasks',authenticateToken, TaskController.getActiveTasks);  // Get active tasks excluding soft-deleted


module.exports = router;
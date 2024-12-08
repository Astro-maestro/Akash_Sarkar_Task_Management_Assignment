const express = require('express');
const AuthController = require('../../../modules/auth/controllers/api/AuthController');
const authenticateToken = require('../../../middleware/authenticate'); // Middleware to authenticate JWT
const router = express.Router();
const uploadUserImage = require('../../../helper/UserImageUpload');

/**
 * @swagger
 * components:
 *   securitySchemes:
 *     xAccessToken: 
 *       type: apiKey
 *       in: header
 *       name: x-access-token
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - name
 *         - email
 *         - password
 *       properties:
 *         name:
 *           type: string
 *         email:
 *           type: string
 *         password:
 *           type: string
 *         role:
 *           type: string
 *           enum: [Admin, Manager, Employee]
 *         image:
 *           type: string
 *           default: "https://www.jotform.com/blog/wp-content/uploads/2022/12/how-to-add-link-to-google-form-1280x500.jpg"
 */

/**
 * @swagger
 * /register:
 *   post:
 *     summary: Register a new user
 *     description: Register a new user with name, email, password, and role
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       201:
 *         description: User registered successfully
 *       400:
 *         description: Invalid input data
 *       500:
 *         description: Registration failed
 */
router.post('/register', uploadUserImage.single('image'), AuthController.register);
/**
 * @swagger
 * /login:
 *   post:
 *     summary: User login
 *     description: Login user with email and password
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: User logged in successfully
 *       400:
 *         description: Missing email or password
 *       401:
 *         description: Invalid credentials
 */
router.post('/login', AuthController.login);
/**
 * @swagger
 * /dashboard:
 *   get:
 *     summary: Get user dashboard
 *     description: Fetch user data for the dashboard
 *     security:
 *       - xAccessToken: []  # Apply the 'x-access-token' scheme
 *     responses:
 *       200:
 *         description: User dashboard information
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                 name:
 *                   type: string
 *                 email:
 *                   type: string
 *                 role:
 *                   type: string
 *       401:
 *         description: Unauthorized access (invalid token or missing token)
 *       500:
 *         description: Error fetching user data
 */
router.get('/dashboard', authenticateToken, AuthController.dashboard);

/**
 * @swagger
 * /logout:
 *   post:
 *     summary: Logout user
 *     description: Logout the user by deleting their session token
 *     security:
 *       - xAccessToken: []  # Apply the 'x-access-token' scheme
 *     responses:
 *       200:
 *         description: User logged out successfully
 *       401:
 *         description: Unauthorized access (invalid token or missing token)
 *       500:
 *         description: Error during logout
 */

router.post('/logout', authenticateToken, AuthController.logout);


module.exports = router;
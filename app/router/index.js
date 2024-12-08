const express = require('express');
const authRoutes = require('../router/authRoutes/api/authRoutes');
const taskRoutes = require('../router/taskRoutes/api/taskRoutes');

const router = express.Router();

router.use('/api',authRoutes);
router.use('/api',taskRoutes);


module.exports = router;
const mongoose = require('mongoose');
const logger = require('../utils/logger');

async function connectDB() {
    mongoose.connect(process.env.MONGODB_URL).then((res)=>{
        console.log('Database connected successfully!');
        logger.info('Server started successfully');
    }).catch((err)=>{
        logger.error('An error occurred while processing the request');
        console.log('Error while connecting database: ', err);
        
    })
}

module.exports = connectDB
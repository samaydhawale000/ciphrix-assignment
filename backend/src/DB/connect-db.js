const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

const DB_URL = process.env.DB_URL; 

const connectToDatabase = async () => {
    try {
        await mongoose.connect(DB_URL);
        console.log('Connected to the database');
    } catch (error) {
        console.error('Error connecting to the database:', error.message);
        process.exit(1); 
    }
};

module.exports = {
    connectToDatabase,
};
const mongoose = require('mongoose');

const db = async () => {
    try {
        await mongoose.connect(process.env.DB_URL);
        console.log('Connected to database');
    } catch (error) {
        console.error('Error connecting to database: ', error);
    }
};

module.exports = db;
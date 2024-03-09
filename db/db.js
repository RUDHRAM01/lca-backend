const mongoose = require('mongoose');

const db = async () => {
    try {
        await mongoose.connect('mongodb://localhost:27017/lca');
        console.log('Connected to database');
    } catch (error) {
        console.error('Error connecting to database: ', error);
    }
};

module.exports = db;
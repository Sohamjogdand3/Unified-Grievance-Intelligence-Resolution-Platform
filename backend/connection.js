const mongoose = require('mongoose');
require('dotenv').config();

const connectDB = async (customUri) => {
    try {
        let uri = customUri || process.env.MONGO_URI || 'mongodb://localhost:27017';
        if (!uri.includes('/nagrikconnect') && !uri.includes('?')) {
            uri = uri.replace(/\/+$/, '') + '/nagrikconnect';
        }
        await mongoose.connect(uri);
        console.log('✅ MongoDB connected to local database: nagrikconnect');
        console.log('📍 Database location: mongodb/data/');
    } catch (err) {
        console.error('❌ MongoDB connection error:', err.message);
        console.error('⚠️  Make sure MongoDB is running! Run: setup-mongodb.bat');
        process.exit(1);
    }
};

module.exports = { connectDB };
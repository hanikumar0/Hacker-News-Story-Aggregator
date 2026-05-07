const mongoose = require('mongoose');

mongoose.set('strictQuery', true);

let isConnected = false; // Track connection state for serverless

const connectDB = async () => {
    if (isConnected) {
        console.log('MongoDB already connected.');
        return;
    }

    try {
        if (!process.env.MONGO_URI) {
            throw new Error('MONGO_URI is missing in environment variables');
        }

        const conn = await mongoose.connect(process.env.MONGO_URI, {
            serverSelectionTimeoutMS: 10000,
            socketTimeoutMS: 45000,
            family: 4 // Use IPv4, skip trying IPv6
        });

        isConnected = conn.connections[0].readyState === 1;
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.error(`MongoDB Connection Error: ${error.message}`);
        // Do not exit process in serverless environments
        if (process.env.NODE_ENV !== 'production') {
            process.exit(1);
        } else {
            throw error; // Let the calling middleware handle it
        }
    }
};

module.exports = connectDB;

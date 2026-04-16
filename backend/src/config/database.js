const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        // تأكد أن الاسم هنا MONGODB_URI (نفس اللي في الملف الجديد)
        const uri = process.env.MONGODB_URI; 
        
        await mongoose.connect(uri);
        console.log('✅ MongoDB Connected Successfully');
    } catch (error) {
        console.error('❌ MongoDB Connection Error:', error.message);
        process.exit(1);
    }
};

module.exports = connectDB;
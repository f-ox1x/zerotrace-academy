const mongoose = require('mongoose');

const lessonSchema = new mongoose.Schema({
    title: { type: String, required: true },
    content: { type: String, required: true },
    videoUrl: String,
    duration: Number,
    order: Number,
    quiz: {
        questions: [{
            question: String,
            options: [String],
            correctAnswer: Number
        }]
    }
});

const courseSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    level: {
        type: String,
        enum: ['Beginner', 'Intermediate', 'Advanced'],
        required: true
    },
    category: String,
    duration: String,
    lessons: [lessonSchema],
    price: { type: Number, default: 0 },
    certificatePrice: { type: Number, required: true },
    image: String,
    students: { type: Number, default: 0 },
    rating: { type: Number, default: 0 },
    isActive: { type: Boolean, default: true },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Course', courseSchema);
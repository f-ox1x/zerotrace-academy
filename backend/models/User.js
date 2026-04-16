const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: [true, 'Full name is required'],
        trim: true
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
        lowercase: true,
        trim: true
    },
   
    password: {
        type: String,
        required: function () {
            return !this.googleId && !this.facebookId;
        },
        minlength: 6
    },
    firebaseUid: {
        type: String,
        default: null
    },
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user'
    },
    provider: {
        type: String,
        enum: ['local', 'google', 'facebook'],
        default: 'local'
    },
    googleId: String,
    facebookId: String,
    avatar: String,
    isActive: {
        type: Boolean,
        default: true
    },
    enrolledCourses: [{
        courseId: { type: mongoose.Schema.Types.ObjectId, ref: 'Course' },
        progress: { type: Number, default: 0 },
        completedLessons: [{ type: mongoose.Schema.Types.ObjectId }],
        enrolledAt: { type: Date, default: Date.now }
    }],
    certificates: [{
        certificateId: { type: mongoose.Schema.Types.ObjectId, ref: 'Certificate' },
        issuedAt: Date
    }],
    idCardImage: String,
    idCardVerified: { type: Boolean, default: false },
    createdAt: { type: Date, default: Date.now },
    lastLogin: Date
});

// Hash password before saving
userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();
    this.password = await bcrypt.hash(this.password, 12);
    next();
});

// Compare password method
userSchema.methods.comparePassword = async function (candidatePassword) {
    return await bcrypt.compare(candidatePassword, this.password);
};

module.exports = mongoose.model('User', userSchema);
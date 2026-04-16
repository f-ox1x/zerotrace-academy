const mongoose = require('mongoose');

const certificateSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    courseId: { type: mongoose.Schema.Types.ObjectId, ref: 'Course', required: true },
    certificateNumber: { type: String, unique: true },
    status: {
        type: String,
        enum: ['pending', 'approved', 'rejected'],
        default: 'pending'
    },
    idCardImage: String,
    paymentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Payment' },
    pdfUrl: String,
    qrCode: String,
    issuedAt: Date,
    expiresAt: Date,
    verifiedCount: { type: Number, default: 0 },
    adminNotes: String
});

certificateSchema.pre('save', async function (next) {
    if (!this.certificateNumber) {
        this.certificateNumber = `ZT-${Date.now()}-${Math.random().toString(36).substr(2, 6).toUpperCase()}`;
    }
    next();
});

module.exports = mongoose.model('Certificate', certificateSchema);
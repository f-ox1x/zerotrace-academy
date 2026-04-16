const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    amount: { type: Number, required: true },
    currency: { type: String, default: 'USD' },
    method: {
        type: String,
        enum: ['bank_kreimi', 'bank_aden', 'bank_qutaybi', 'kak_bank', 'binance', 'bybit', 'okx', 'manual'],
        required: true
    },
    status: {
        type: String,
        enum: ['pending', 'confirmed', 'rejected'],
        default: 'pending'
    },
    proofImage: String,
    transactionId: String,
    bankName: String,
    accountNumber: String,
    referenceNumber: String,
    adminNotes: String,
    createdAt: { type: Date, default: Date.now },
    confirmedAt: Date,
    confirmedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
});

module.exports = mongoose.model('Payment', paymentSchema);
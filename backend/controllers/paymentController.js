const Payment = require('../models/Payment');
const User = require('../models/User');
const upload = require('../middleware/upload');

// Create payment request
const createPayment = async (req, res) => {
    try {
        const { amount, method, bankName, accountNumber } = req.body;
        const proofImage = req.file ? req.file.path : null;

        const payment = await Payment.create({
            userId: req.user.id,
            amount,
            method,
            bankName,
            accountNumber,
            proofImage,
            status: 'pending'
        });

        res.status(201).json({ success: true, payment });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get user payments
const getUserPayments = async (req, res) => {
    try {
        const payments = await Payment.find({ userId: req.user.id })
            .sort({ createdAt: -1 });

        res.json({ success: true, payments });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get payment methods
const getPaymentMethods = async (req, res) => {
    const methods = [
        { id: 'bank_kreimi', name: 'بنك الكريمي', icon: '🏦', type: 'bank' },
        { id: 'bank_aden', name: 'بنك عدن الإسلامي', icon: '🏦', type: 'bank' },
        { id: 'bank_qutaybi', name: 'بنك القطيبي', icon: '🏦', type: 'bank' },
        { id: 'kak_bank', name: 'كاك بنك', icon: '🏦', type: 'bank' },
        { id: 'binance', name: 'Binance Pay', icon: '₿', type: 'crypto' },
        { id: 'bybit', name: 'Bybit', icon: '₿', type: 'crypto' },
        { id: 'okx', name: 'OKX', icon: '₿', type: 'crypto' },
        { id: 'manual', name: 'تحويل يدوي', icon: '💵', type: 'manual' }
    ];

    res.json({ success: true, methods });
};

module.exports = { createPayment, getUserPayments, getPaymentMethods };
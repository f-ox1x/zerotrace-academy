const express = require('express');
const router = express.Router();
const upload = require('../middleware/upload');
const { protect } = require('../middleware/auth');
const Payment = require('../models/Payment');

// Get payment methods
router.get('/methods', async (req, res) => {
  const methods = [
    { id: 'bank_kreimi', name: 'بنك الكريمي', icon: '🏦', type: 'bank', account: '123456789' },
    { id: 'bank_aden', name: 'بنك عدن الإسلامي', icon: '🏦', type: 'bank', account: '987654321' },
    { id: 'bank_qutaybi', name: 'بنك القطيبي', icon: '🏦', type: 'bank', account: '456789123' },
    { id: 'kak_bank', name: 'كاك بنك', icon: '🏦', type: 'bank', account: '789123456' },
    { id: 'binance', name: 'Binance Pay', icon: '₿', type: 'crypto', account: 'binance@zerotrace.com' },
    { id: 'bybit', name: 'Bybit', icon: '₿', type: 'crypto', account: 'bybit@zerotrace.com' },
    { id: 'okx', name: 'OKX', icon: '₿', type: 'crypto', account: 'okx@zerotrace.com' },
    { id: 'manual', name: 'تحويل يدوي', icon: '💵', type: 'manual' }
  ];
  
  res.json({ success: true, methods });
});

// Create payment
router.post('/create', protect, upload.single('proofImage'), async (req, res) => {
  try {
    const { amount, method, bankName, accountNumber, transactionId } = req.body;
    const proofImage = req.file ? req.file.path : null;
    
    const payment = await Payment.create({
      userId: req.user.id,
      amount,
      method,
      bankName,
      accountNumber,
      transactionId,
      proofImage,
      status: 'pending'
    });
    
    res.status(201).json({ success: true, payment });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get user payments
router.get('/my-payments', protect, async (req, res) => {
  try {
    const payments = await Payment.find({ userId: req.user.id })
      .sort({ createdAt: -1 });
    
    res.json({ success: true, payments });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
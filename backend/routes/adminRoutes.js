const express = require('express');
const router = express.Router();
const { protect, adminOnly } = require('../middleware/auth');
const User = require('../models/User');
const Payment = require('../models/Payment');
const Certificate = require('../models/Certificate');

// Get all users
router.get('/users', protect, adminOnly, async (req, res) => {
    try {
        const users = await User.find().select('-password').sort({ createdAt: -1 });
        res.json({ success: true, users });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Update user status
router.put('/users/:id', protect, adminOnly, async (req, res) => {
    try {
        const { isActive, role } = req.body;
        const user = await User.findByIdAndUpdate(
            req.params.id,
            { isActive, role },
            { new: true }
        ).select('-password');

        res.json({ success: true, user });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Get all payments
router.get('/payments', protect, adminOnly, async (req, res) => {
    try {
        const payments = await Payment.find()
            .populate('userId', 'fullName email')
            .sort({ createdAt: -1 });

        res.json({ success: true, payments });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Update payment status
router.put('/payments/:id', protect, adminOnly, async (req, res) => {
    try {
        const { status, adminNotes } = req.body;
        const payment = await Payment.findByIdAndUpdate(
            req.params.id,
            {
                status,
                adminNotes,
                confirmedAt: status === 'confirmed' ? new Date() : null,
                confirmedBy: req.user.id
            },
            { new: true }
        );

        res.json({ success: true, payment });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Get all certificate requests
router.get('/certificates', protect, adminOnly, async (req, res) => {
    try {
        const certificates = await Certificate.find()
            .populate('userId', 'fullName email idCardVerified')
            .populate('courseId', 'title')
            .sort({ createdAt: -1 });

        res.json({ success: true, certificates });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Approve certificate
router.put('/certificates/:id/approve', protect, adminOnly, async (req, res) => {
    try {
        const certificate = await Certificate.findById(req.params.id)
            .populate('userId')
            .populate('courseId');

        certificate.status = 'approved';
        certificate.issuedAt = new Date();
        await certificate.save();

        // Generate PDF (you can implement this)

        res.json({ success: true, certificate });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Reject certificate
router.put('/certificates/:id/reject', protect, adminOnly, async (req, res) => {
    try {
        const { adminNotes } = req.body;
        const certificate = await Certificate.findByIdAndUpdate(
            req.params.id,
            { status: 'rejected', adminNotes },
            { new: true }
        );

        res.json({ success: true, certificate });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
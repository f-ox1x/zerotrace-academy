const express = require('express');
const router = express.Router();
const { register, login, googleAuth, facebookAuth, getMe, checkEmail } = require('../controllers/authController');
const { protect } = require('../middleware/auth');
const User = require('../models/User');  

router.post('/register', register);
router.post('/login', login);
router.post('/google', googleAuth);
router.post('/facebook', facebookAuth); 
router.get('/me', protect, getMe);
router.get('/check-email', checkEmail);

// تحديث كلمة المرور (يُستخدم بعد إعادة التعيين)
router.post('/update-password', async (req, res) => {
    try {
        const { email, password } = req.body;
        
        // البحث عن المستخدم
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        
        // تحديث كلمة المرور
        user.password = password;
        await user.save();
        
        res.json({ success: true, message: 'Password updated successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
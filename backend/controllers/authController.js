const User = require('../models/User');
const jwt = require('jsonwebtoken');
const { OAuth2Client } = require('google-auth-library');

// ✅ دالة إنشاء التوكن - مدة صلاحية مختلفة حسب نوع المستخدم
const generateToken = (id, provider) => {
    let expiresIn = '30d'; 
    
    if (provider === 'local') {
        expiresIn = '1d'; 
    }

    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: expiresIn
    });
};

// Register user
const register = async (req, res) => {
    try {
        const { fullName, email, phone, password, firebaseUid } = req.body;

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        const user = await User.create({
            fullName,
            email,
            phone: phone || '',
            password,
            firebaseUid,
            provider: 'local'
        });

        // ✅ تمرير provider إلى الدالة
        const token = generateToken(user._id, user.provider);

        res.status(201).json({
            success: true,
            token,
            user: {
                id: user._id,
                fullName: user.fullName,
                email: user.email,
                role: user.role
            }
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Login user
const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        const isPasswordMatch = await user.comparePassword(password);
        if (!isPasswordMatch) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        user.lastLogin = new Date();
        await user.save();

        // ✅ تمرير provider إلى الدالة
        const token = generateToken(user._id, user.provider);

        res.json({
            success: true,
            token,
            user: {
                id: user._id,
                fullName: user.fullName,
                email: user.email,
                role: user.role
            }
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Google Auth 
const googleAuth = async (req, res) => {
    try {
        const { email, name, photo, password } = req.body;

        console.log('Google auth request:', { email, name, photo });

        if (!email) {
            return res.status(400).json({ message: 'Email is required' });
        }

        let user = await User.findOne({ email });

        if (!user) {
            user = await User.create({
                fullName: name || 'Google User',
                email: email,
                phone: '',
                provider: 'google',
                avatar: photo || '',
                password: password || Math.random().toString(36)
            });
        } else if (password && !user.password) {
            user.password = password;
            await user.save();
        }

        // ✅ تمرير provider إلى الدالة
        const token = generateToken(user._id, user.provider);

        res.json({
            success: true,
            token,
            user: {
                id: user._id,
                fullName: user.fullName,
                email: user.email,
                role: user.role,
                avatar: user.avatar
            }
        });
    } catch (error) {
        console.error('Google auth error:', error);
        res.status(500).json({ message: error.message });
    }
};

// Facebook Auth
const facebookAuth = async (req, res) => {
    try {
        console.log('Facebook auth request body:', req.body);

        const { email, name, photo } = req.body;

        if (!email) {
            console.error('No email received from Facebook');
            return res.status(400).json({ message: 'Email is required from Facebook' });
        }

        let user = await User.findOne({ email });

        if (!user) {
            user = await User.create({
                fullName: name || 'Facebook User',
                email: email,
                phone: '',
                provider: 'facebook',
                avatar: photo || '',
                password: Math.random().toString(36)
            });
        }

        // ✅ تمرير provider إلى الدالة
        const token = generateToken(user._id, user.provider);

        res.json({
            success: true,
            token,
            user: {
                id: user._id,
                fullName: user.fullName,
                email: user.email,
                role: user.role,
                avatar: user.avatar
            }
        });
    } catch (error) {
        console.error('Facebook auth error:', error);
        res.status(500).json({ message: error.message });
    }
};

// Get current user
const getMe = async (req, res) => {
    try {
        const user = await User.findById(req.user.id)
            .select('-password')
            .populate('enrolledCourses.courseId');

        res.json({ success: true, user });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Check if email exists
const checkEmail = async (req, res) => {
    try {
        const { email } = req.query;
        const user = await User.findOne({ email });
        res.json({ exists: !!user });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { register, login, googleAuth, facebookAuth, getMe, checkEmail };
const Certificate = require('../models/Certificate');
const Course = require('../models/Course');
const User = require('../models/User');
const PDFDocument = require('pdfkit');
const QRCode = require('qrcode');
const fs = require('fs');
const path = require('path');

// Request certificate
const requestCertificate = async (req, res) => {
    try {
        const { courseId } = req.body;
        const idCardImage = req.file ? req.file.path : null;

        // Check if user completed the course
        const user = await User.findById(req.user.id);
        const enrolledCourse = user.enrolledCourses.find(
            c => c.courseId.toString() === courseId
        );

        if (!enrolledCourse || enrolledCourse.progress < 100) {
            return res.status(400).json({ message: 'You must complete the course first' });
        }

        // Check if certificate already requested
        const existingCert = await Certificate.findOne({
            userId: req.user.id,
            courseId
        });

        if (existingCert && existingCert.status !== 'rejected') {
            return res.status(400).json({ message: 'Certificate already requested' });
        }

        const certificate = await Certificate.create({
            userId: req.user.id,
            courseId,
            idCardImage,
            status: 'pending'
        });

        res.status(201).json({ success: true, certificate });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Generate PDF Certificate
const generatePDF = async (certificate, user, course) => {
    return new Promise(async (resolve, reject) => {
        try {
            const doc = new PDFDocument({ size: 'A4', layout: 'landscape' });
            const filename = `certificate-${certificate.certificateNumber}.pdf`;
            const filepath = path.join(__dirname, '../uploads', filename);

            const writeStream = fs.createWriteStream(filepath);
            doc.pipe(writeStream);

            // Generate QR Code
            const verifyUrl = `${process.env.FRONTEND_URL}/verify/${certificate.certificateNumber}`;
            const qrCodeBuffer = await QRCode.toBuffer(verifyUrl);

            // Design certificate
            doc.rect(0, 0, doc.page.width, doc.page.height).fill('#0a0a0f');

            // Border
            doc.rect(20, 20, doc.page.width - 40, doc.page.height - 40)
                .stroke('#06b6d4');

            // Title
            doc.fontSize(40)
                .fillColor('#06b6d4')
                .text('CERTIFICATE OF COMPLETION', 0, 100, { align: 'center' });

            doc.fontSize(20)
                .fillColor('#ffffff')
                .text('This certificate is proudly presented to', 0, 180, { align: 'center' });

            // Name
            doc.fontSize(36)
                .fillColor('#3b82f6')
                .text(user.fullName, 0, 240, { align: 'center' });

            // Course
            doc.fontSize(18)
                .fillColor('#ffffff')
                .text(`for successfully completing the course`, 0, 320, { align: 'center' });

            doc.fontSize(28)
                .fillColor('#06b6d4')
                .text(course.title, 0, 370, { align: 'center' });

            // Date
            doc.fontSize(12)
                .fillColor('#666666')
                .text(`Certificate Number: ${certificate.certificateNumber}`, 50, 500);

            doc.text(`Issue Date: ${new Date().toLocaleDateString()}`, 50, 520);

            // QR Code
            doc.image(qrCodeBuffer, doc.page.width - 200, 450, { width: 120 });

            doc.end();

            writeStream.on('finish', () => resolve(filepath));
            writeStream.on('error', reject);
        } catch (error) {
            reject(error);
        }
    });
};

// Get user certificates
const getUserCertificates = async (req, res) => {
    try {
        const certificates = await Certificate.find({ userId: req.user.id })
            .populate('courseId')
            .sort({ createdAt: -1 });

        res.json({ success: true, certificates });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Verify certificate (public)
const verifyCertificate = async (req, res) => {
    try {
        const { certificateNumber } = req.params;

        const certificate = await Certificate.findOne({ certificateNumber })
            .populate('userId')
            .populate('courseId');

        if (!certificate || certificate.status !== 'approved') {
            return res.status(404).json({
                success: false,
                message: 'Certificate not found or not verified'
            });
        }

        // Increment verify count
        certificate.verifiedCount += 1;
        await certificate.save();

        res.json({
            success: true,
            certificate: {
                number: certificate.certificateNumber,
                holder: certificate.userId.fullName,
                course: certificate.courseId.title,
                issuedAt: certificate.issuedAt,
                verifiedCount: certificate.verifiedCount
            }
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { requestCertificate, getUserCertificates, verifyCertificate };
const mongoose = require('mongoose');
const Course = require('../models/Course');
const Lesson = require('../models/Lesson');
const Lab = require('../models/Lab');
const connectDB = require('../config/database');

const seedDatabase = async () => {
    try {
        await connectDB();
        
        // حذف البيانات القديمة
        await Course.deleteMany();
        await Lesson.deleteMany();
        await Lab.deleteMany();
        
        // إنشاء المسارات
        const courses = await Course.create([
            {
                title: 'Linux Fundamentals',
                description: 'Learn Linux basics for cybersecurity',
                level: 'beginner',
                duration_hours: 10,
                thumbnail_url: '/images/linux-course.jpg'
            },
            {
                title: 'Web Hacking',
                description: 'Master web application security',
                level: 'intermediate',
                duration_hours: 20,
                thumbnail_url: '/images/web-course.jpg'
            },
            {
                title: 'Advanced Exploitation',
                description: 'Learn advanced exploitation techniques',
                level: 'advanced',
                duration_hours: 30,
                thumbnail_url: '/images/advanced-course.jpg'
            }
        ]);
        
        // إنشاء دروس لكل مسار
        const lessons = [];
        
        // دروس Linux
        lessons.push(await Lesson.create({
            course_id: courses[0]._id,
            title: 'Introduction to Linux',
            content: 'Linux is a Unix-like operating system...',
            order_number: 1,
            commands: [
                { command: 'ls', description: 'List directory contents' },
                { command: 'cd', description: 'Change directory' }
            ]
        }));
        
        lessons.push(await Lesson.create({
            course_id: courses[0]._id,
            title: 'File System Navigation',
            content: 'Understanding the Linux file system...',
            order_number: 2,
            commands: [
                { command: 'pwd', description: 'Print working directory' },
                { command: 'mkdir', description: 'Create directory' }
            ]
        }));
        
        // دروس Web Hacking
        lessons.push(await Lesson.create({
            course_id: courses[1]._id,
            title: 'SQL Injection',
            content: 'SQL injection is a code injection technique...',
            order_number: 1,
            quiz: {
                questions: [
                    {
                        question: 'What does SQL stand for?',
                        options: ['Structured Query Language', 'Simple Query Language', 'Standard Query Language'],
                        correct_answer: 0
                    }
                ],
                passing_score: 70
            }
        }));
        
        // ربط الدروس بالمسارات
        await Course.findByIdAndUpdate(courses[0]._id, {
            $push: { lessons: { $each: [lessons[0]._id, lessons[1]._id] } }
        });
        
        await Course.findByIdAndUpdate(courses[1]._id, {
            $push: { lessons: lessons[2]._id }
        });
        
        // إنشاء مختبرات
        await Lab.create([
            {
                title: 'Basic Linux Command Lab',
                description: 'Practice basic Linux commands',
                difficulty: 'easy',
                target_ip: '10.0.0.1',
                flag: 'FLAG{linux_basics_mastered}',
                points: 50,
                hints: ['Try using ls command', 'Check hidden files']
            },
            {
                title: 'SQL Injection Challenge',
                description: 'Find the admin password using SQL injection',
                difficulty: 'medium',
                target_ip: '10.0.0.2',
                flag: 'FLAG{sql_injection_success}',
                points: 100,
                hints: ['Try using OR 1=1', 'Check the login form']
            }
        ]);
        
        console.log('✅ Database seeded successfully!');
        process.exit(0);
    } catch (error) {
        console.error('❌ Error seeding database:', error);
        process.exit(1);
    }
};

seedDatabase();
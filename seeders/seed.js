const mongoose = require('mongoose');
const USER = require('../models/user');
const POST = require('../models/post');
const COMMENT = require('../models/comment');

async function seed() {
    await mongoose.connect('mongodb://localhost:27017/post_comment_demo');

    const user = await USER.create({
        _id: '666abc1234567890abcdef01',
        firstName: 'Aakash',
        lastName: 'Yadav',
        email: 'aakash@gmail.com',
        password: '123456',
        role: 'user'
    });

    const comment1 = await COMMENT.create({ content: 'Thanks for the Node.js tutorial!' });
    const comment2 = await COMMENT.create({ content: 'Can you also cover Express.js next?' });

    await POST.create({
        title: 'How to Learn Node.js',
        content: 'Node.js is a runtime environment...',
        author: user._id,
        likes: [user._id],
        Comments: [comment1._id, comment2._id]
    });

    console.log('✅ Seed data inserted');
    process.exit();
}

seed();

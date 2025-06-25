const router = require('express').Router();
const POST = require('../models/post');

router.get('/', async (req, res) => {
    try {
        const posts = await POST.find().populate('author'); // include author details
        console.log(posts);

        res.render('post/list', { title: 'All Posts', posts }); // 👈 Pass posts here
    } catch (err) {
        res.status(500).send('Error loading posts');
    }
});

module.exports = router;
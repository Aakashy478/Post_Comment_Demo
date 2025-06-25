const router = require('express').Router();

router.use('/user', require('./users'));
router.use('/post', require('./post'));

module.exports = router;
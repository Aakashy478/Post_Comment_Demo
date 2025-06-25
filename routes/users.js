const router = require('express').Router();
const { validate } = require('express-validation');
const USER = require('../controllers/user');
const { registerUser, loginUser } = require('../validations/user');
const upload = require('../middlewares/fileUploading');

// User routes
router.get('/register', (req, res) => {
    res.render('user/register', { error: null }); // Send error if needed
});

router.get('/login', (req, res) => {
    res.render('user/login', { error: null }); // Send error if needed
});

router.post('/register', upload.single('profileImage'), validate(registerUser), USER.registerUser);
router.post('/login', validate(loginUser), USER.loginUser);
router.post('/logout', USER.logoutUser);

module.exports = router;
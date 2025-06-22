require('dotenv').config();
const express = require('express');
const app = express();

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

// Routes
const router = require('./routes/index');
app.use('/api', router);

app.get('/welcome', (req, res) => {
    res.status(200).json({ message: 'Welcome to the API!' });
});

// 404 Not Found Handler
app.use((req, res, next) => {
    res.status(404).json({ message: 'Route Not Found' });
});

// Error Handler
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Something went wrong!' });
});

// Start Server
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});

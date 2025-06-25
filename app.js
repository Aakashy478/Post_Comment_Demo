require('dotenv').config();
const express = require('express');
const connectDB = require('./config/db');
const path = require('path');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const logger = require('./utils/logger'); // Import the logger

const app = express();

// Middlewares
// Use morgan middleware for logging 
app.use(morgan('dev')); // logs method, URL, status, response time
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Database Connection
connectDB();

app.use((req, res, next) => {
    logger.info(`${req.method} ${req.url}`);
    next();
});

// Routes
const router = require('./routes/index');
const errorHandler = require('./middlewares/errorHandler');

app.use('/api', router);

// 404 Not Found Handler
app.use((req, res, next) => {
    res.status(404).json({ message: 'Route Not Found' });
});

// Error Handler
app.use(errorHandler);

module.exports = app;
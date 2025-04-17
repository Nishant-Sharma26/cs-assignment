const express = require('express');
const serverless = require('serverless-http');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const authRoutes = require('../routes/auth');
const agentRoutes = require('../routes/agents');
const listRoutes = require('../routes/lists');
const connectDB = require('../config/db');

dotenv.config();

const app = express();

// CORS Configuration
app.use(cors({
  origin: '*', // OR restrict to your frontend domain
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

// Middleware
app.use(express.json());

// Connect to DB
connectDB();

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/agents', agentRoutes);
app.use('/api/lists', listRoutes);

module.exports = app;
module.exports.handler = serverless(app);

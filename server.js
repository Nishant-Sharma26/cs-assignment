const express = require('express');
const serverless = require('serverless-http');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const authRoutes = require('./routes/auth');
const agentRoutes = require('./routes/agents');
const listRoutes = require('./routes/lists');
const connectDB = require('./config/db');

dotenv.config();

const app = express();
app.use(express.json());

app.use(cors({
    origin: (origin, callback) => {
      const allowedOrigins = [
        "http://localhost:3000", // Local frontend
        "https://crm-frontend-umber-rho.vercel.app" // Deployed frontend
      ];

      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    methods: ["GET", "POST", "PUT", "DELETE"], // Allowed methods
    credentials: true, // Allow credentials (e.g., Authorization header)
  }));
  



// Connect to DB
connectDB();

app.use('/api/auth', authRoutes);
app.use('/api/agents', agentRoutes);
app.use('/api/lists', listRoutes);

module.exports = app;
module.exports.handler = serverless(app);



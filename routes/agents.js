const express = require('express');
const bcrypt = require('bcryptjs');
const Agent = require('../models/agent');
const authMiddleware = require('../middleware/auth');

const router = express.Router();


router.post('/', authMiddleware, async (req, res) => {
  const { name, email, mobile, password } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const agent = new Agent({ name, email, mobile, password: hashedPassword });
    await agent.save();
    res.status(201).json({ message: 'Agent created' });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});


router.get('/', authMiddleware, async (req, res) => {
  try {
    const agents = await Agent.find();
    res.json(agents);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
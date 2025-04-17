const express = require('express');
const multer = require('multer');
const csvParser = require('csv-parser');
const fs = require('fs');
const Agent = require('../models/agent');
const List = require('../models/List');
const authMiddleware = require('../middleware/auth');

const router = express.Router();

const upload = multer({ dest: 'uploads/' });

router.post('/upload', authMiddleware, upload.single('file'), async (req, res) => {
  if (!req.file) return res.status(400).json({ message: 'No file uploaded' });
  const fileExt = req.file.originalname.split('.').pop();
  if (!['csv', 'xlsx', 'xls'].includes(fileExt)) {
    fs.unlinkSync(req.file.path);
    return res.status(400).json({ message: 'Invalid file format' });
  }

  const items = [];
  fs.createReadStream(req.file.path)
    .pipe(csvParser())
    .on('data', (row) => {
      const phone = String(row.phone_number || '').trim();
      if (
        row.name &&
        phone &&
        /^\d{10}$/.test(phone) &&
        (row.notes !== undefined || row.notes === '')
      ) {
        items.push({
          firstName: row.name,
          phone: parseInt(phone),
          notes: row.notes || '',
        });
      }
    })
    .on('end', async () => {
      fs.unlinkSync(req.file.path);
      try {
        if (items.length === 0) {
          return res.status(400).json({ message: 'No valid rows in CSV' });
        }

        const agents = await Agent.find().limit(20);
        if (agents.length === 0) {
          return res.status(400).json({ message: 'Add agents first' });
        }

        const itemsPerAgent = Math.floor(items.length / agents.length);
        const remainder = items.length % agents.length;

        let itemIndex = 0;
        for (let i = 0; i < agents.length; i++) {
          const agentItemsCount = itemsPerAgent + (i < remainder ? 1 : 0);
          for (let j = 0; j < agentItemsCount && itemIndex < items.length; j++) {
            try {
              await List.create({
                agentId: agents[i]._id,
                firstName: items[itemIndex].firstName,
                phone: items[itemIndex].phone,
                notes: items[itemIndex].notes,
              });
              itemIndex++;
            } catch (createErr) {
              console.error('Error creating list:', createErr.message, createErr.stack);
              return res.status(400).json({ message: `Failed to save row: ${createErr.message}` });
            }
          }
        }
        res.json({ message: 'Lists distributed successfully' });
      } catch (err) {
        console.error('Error distributing lists:', err.message, err.stack);
        res.status(500).json({ message: err.message || 'Server error' });
      }
    })
    .on('error', (err) => {
      fs.unlinkSync(req.file.path);
      res.status(500).json({ message: 'Error parsing CSV file' });
    });
});

router.get('/', authMiddleware, async (req, res) => {
  try {
    const lists = await List.find().populate('agentId', 'name');
    if (!lists.length) {
      return res.json({});
    }
    const result = {};
    lists.forEach((list) => {
      const agentName = list.agentId?.name || 'Unknown';
      if (!result[agentName]) result[agentName] = [];
      result[agentName].push({ firstName: list.firstName, phone: list.phone, notes: list.notes });
    });
    res.json(result);
  } catch (err) {
    console.error('Error fetching lists:', err.message, err.stack);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
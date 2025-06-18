const express = require('express');
const router = express.Router();
const User = require('../models/User');

router.post('/register', async (req, res) => {
  const { name, role, location } = req.body;
  const user = await User.create({ name, role, location });
  res.json(user);
});

module.exports = router;

const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');
const sanitize = require('sanitize')();

function generateAccessToken(id, name) {
  return jwt.sign({ userId: id, name: name }, 'secretkey');
}

exports.signup = async (req, res) => {
  // Sanitize inputs
  req.body.username = sanitize.value(req.body.username, 'str');
  req.body.email = sanitize.value(req.body.email, 'email');
  req.body.password = sanitize.value(req.body.password, 'str');

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { username, email, password } = req.body;

    const existingUser = await User.findOne({ email: email });
    if (existingUser) {
      return res.status(409).json({ message: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ username: username, email: email, password: hashedPassword });
    await newUser.save();

    const token = generateAccessToken(newUser._id, newUser.username);
    res.status(201).json({ message: 'User created successfully', token: token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

exports.signin = async (req, res) => {
  // Sanitize inputs
  req.body.email = sanitize.value(req.body.email, 'email');
  req.body.password = sanitize.value(req.body.password, 'str');

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email: email });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Incorrect password' });
    }

    const token = generateAccessToken(user._id, user.username);
    res.json({ message: 'Login successful', token: token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

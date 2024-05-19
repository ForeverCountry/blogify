const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { saltRounds, jwtSecret } = require('../utils/config');

const register = async (req, res) => {
  const { username, password } = req.body;
  try {
    const hashedPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(saltRounds));
    const userDoc = await User.create({ username, password: hashedPassword });
    res.json(userDoc);
  } catch (e) {
    console.log(e);
    res.status(400).json(e);
  }
};

const login = async (req, res) => {
  const { username, password } = req.body;
  const userDoc = await User.findOne({ username });
  if (userDoc && bcrypt.compareSync(password, userDoc.password)) {
    jwt.sign({ username, id: userDoc._id }, jwtSecret, {}, (err, token) => {
      if (err) throw err;
      res.cookie('token', token).json({ id: userDoc._id, username });
    });
  } else {
    res.status(400).json('wrong credentials');
  }
};

const profile = (req, res) => {
  const { token } = req.cookies;
  jwt.verify(token, jwtSecret, {}, (err, info) => {
    if (err) throw err;
    res.json(info);
  });
};

const logout = (req, res) => {
  res.cookie('token', '').json('ok');
};

module.exports = { register, login, profile, logout };

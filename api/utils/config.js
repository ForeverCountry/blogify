require('dotenv').config();

module.exports = {
  saltRounds: 10,
  jwtSecret: process.env.JWT_SECRET,
  mongoUri: process.env.MONGO_URI
};

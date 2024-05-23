const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const { connectDB } = require('./utils/db');
const authRoutes = require('./routes/auth');
const postRoutes = require('./routes/posts');
require('dotenv').config();

const app = express();

app.use(cors({ credentials: true, origin: 'http://localhost:5173' }));
app.use(express.json());
app.use(cookieParser());
app.use('/uploads', express.static(__dirname + '/uploads'));

connectDB();

app.use('/auth', authRoutes);
app.use('/posts', postRoutes);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log('Server is running on port 4000');
});

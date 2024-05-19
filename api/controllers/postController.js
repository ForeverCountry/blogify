const fs = require('fs');
const jwt = require('jsonwebtoken');
const Post = require('../models/Post');
const { jwtSecret } = require('../utils/config');

const createPost = async (req, res) => {
  const { originalname, path } = req.file;
  const ext = originalname.split('.').pop();
  const newPath = `${path}.${ext}`;
  fs.renameSync(path, newPath);

  const { token } = req.cookies;
  jwt.verify(token, jwtSecret, {}, async (err, info) => {
    if (err) throw err;
    const { title, summary, content } = req.body;
    const postDoc = await Post.create({
      title,
      summary,
      content,
      cover: newPath,
      author: info.id
    });
    res.json(postDoc);
  });
};

const updatePost = async (req, res) => {
  let newPath = null;
  if (req.file) {
    const { originalname, path } = req.file;
    const ext = originalname.split('.').pop();
    newPath = `${path}.${ext}`;
    fs.renameSync(path, newPath);
  }

  const { token } = req.cookies;
  jwt.verify(token, jwtSecret, {}, async (err, info) => {
    if (err) throw err;
    const { id, title, summary, content } = req.body;
    const postDoc = await Post.findById(id);
    if (postDoc.author.toString() !== info.id) {
      return res.status(400).json('you are not the author');
    }
    await postDoc.update({
      title,
      summary,
      content,
      cover: newPath || postDoc.cover
    });
    res.json(postDoc);
  });
};

const getPosts = async (req, res) => {
  const posts = await Post.find().populate('author', ['username']).sort({ createdAt: -1 }).limit(20);
  res.json(posts);
};

const getPostById = async (req, res) => {
  const { id } = req.params;
  const post = await Post.findById(id).populate('author', ['username']);
  res.json(post);
};

module.exports = { createPost, updatePost, getPosts, getPostById };

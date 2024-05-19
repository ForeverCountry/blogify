const express = require('express');
const { createPost, updatePost, getPosts, getPostById } = require('../controllers/postController');
const { uploadMiddleware } = require('../middleware/middleware');

const router = express.Router();

router.post('/', uploadMiddleware.single('file'), createPost);
router.put('/', uploadMiddleware.single('file'), updatePost);
router.get('/', getPosts);
router.get('/:id', getPostById);

module.exports = router;

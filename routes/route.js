const express = require('express');

const feedController = require('../controllers/controller');

const isAuth = require("../middleware/is-auth")

const router = express.Router();

// GET /feed/posts
router.get('/posts', feedController.readAllRequest);

router.post('/posts', feedController.createPost);

// POST /feed/post
router.post('/post', feedController.getPost);

module.exports = router;
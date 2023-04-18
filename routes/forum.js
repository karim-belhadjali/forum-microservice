// routes/forum.js
const express = require('express');
const router = express.Router();

const forumController = require('../controllers/forumController');

router.post('/posts', forumController.createPost);
router.get('/posts', forumController.getPosts);
router.put('/posts/:id', forumController.updatePost);
router.delete('/posts/:id', forumController.deletePost);

router.post('/posts/:postId/comments', forumController.createComment);
router.get('/posts/:postId/comments', forumController.getComments);
router.put('/posts/:postId/comments/:id', forumController.updateComment);
router.delete('/posts/:postId/comments/:id', forumController.deleteComment);

router.post('/likes', forumController.createLike);
router.get('/likes', forumController.getLikes);
router.delete('/likes/:id', forumController.deleteLike);

module.exports = router;

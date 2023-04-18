// controllers/forumController.js
const Post = require('../models/posts');
const Comment = require('../models/comments');
const Like = require('../models/like');

// Post controllers
exports.createPost = async (req, res) => {
    try {
        const post = new Post(req.body);
        const savedPost = await post.save();
        res.status(201).json(savedPost);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.getPosts = async (req, res) => {
    try {
        const posts = await Post.find().populate('likes').populate('comments');
        res.status(200).json(posts);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.updatePost = async (req, res) => {
    try {
        const updatedPost = await Post.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.status(200).json(updatedPost);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.deletePost = async (req, res) => {
    try {
        await Post.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: 'Post deleted' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Comment controllers
exports.createComment = async (req, res) => {
    try {
        const post = await Post.findById(req.params.postId);
        if (!post) {
            res.status(404).json({ error: 'Post not found' });
            return;
        }

        const comment = new Comment(req.body);
        const savedComment = await comment.save();
        post.comments.push(savedComment._id);
        await post.save();
        res.status(201).json(savedComment);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.getComments = async (req, res) => {
    try {
        const post = await Post.findById(req.params.postId).populate('comments');
        if (!post) {
            res.status(404).json({ error: 'Post not found' });
            return;
        }
        res.status(200).json(post.comments);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.updateComment = async (req, res) => {
    try {
        const updatedComment = await Comment.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.status(200).json(updatedComment);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.deleteComment = async (req, res) => {
    try {
        const post = await Post.findById(req.params.postId);
        if (!post) {
            res.status(404).json({ error: 'Post not found' });
            return;
        }

        await Comment.findByIdAndDelete(req.params.id);
        post.comments.pull(req.params.id);
        await post.save();
        res.status(200).json({ message: 'Comment deleted' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Like controllers
exports.createLike = async (req, res) => {
    try {
        const { targetType, targetId } = req.body;
        const like = new Like(req.body);
        const savedLike = await like.save();

        let target;
        if (targetType === 'post') {
            target = await Post.findById(targetId);
        } else if (targetType === 'comment') {
            target = await Comment.findById(targetId);
        } else {
            res.status(400).json({ error: 'Invalid target type' });
            return;
        }

        if (!target) {
            res.status(404).json({ error: 'Target not found' });
            return;
        }

        target.likes.push(savedLike._id);
        await target.save();
        res.status(201).json(savedLike);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.getLikes = async (req, res) => {
    try {
        const { targetType, targetId } = req.query;

        let target;
        if (targetType === 'post') {
            target = await Post.findById(targetId).populate('likes');
        } else if (targetType === 'comment') {
            target = await Comment.findById(targetId).populate('likes');
        } else {
            res.status(400).json({ error: 'Invalid target type' });
            return;
        }

        if (!target) {
            res.status(404).json({ error: 'Target not found' });
            return;
        }

        res.status(200).json(target.likes);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.deleteLike = async (req, res) => {
    try {
        const like = await Like.findById(req.params.id);
        if (!like) {
            res.status(404).json({ error: 'Like not found' });
            return;
        }

        const { targetType, targetId } = like;
        let target;
        if (targetType === 'post') {
            target = await Post.findById(targetId);
        } else if (targetType === 'comment') {
            target = await Comment.findById(targetId);
        } else {
            res.status(400).json({ error: 'Invalid target type' });
            return;
        }

        if (!target) {
            res.status(404).json({ error: 'Target not found' });
            return;
        }

        await Like.findByIdAndDelete(req.params.id);
        target.likes.pull(req.params.id);
        await target.save();
        res.status(200).json({ message: 'Like deleted' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};


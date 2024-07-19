const express = require('express');
const postController = require('../controllers/post.controller');
const { isLogin } = require('../middleware/authMiddleware');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });

const router = express.Router();

router.post('/upload', isLogin, upload.single('image'), postController.uploadImage);
router.get('/images', postController.getAllImages);
router.post('/like/:postId', isLogin, postController.likePost);
router.delete('/like/:postId', isLogin, postController.unlikePost);
router.post('/comment/:postId', isLogin, postController.commentPost);

module.exports = router;





const Post = require('../models/post');
const cloudinary = require('../config/cloudinary');
const upload = multer({ dest: './uploads' });
const fs = require('fs');

exports.post('/upload', upload.single('image'), async (req, res) => {
    try {
      const file = req.file;
      if (!file) {
        return res.status(400).json({ error: 'No file uploaded' });
      }
  
      // Upload image to Cloudinary
      const result = await cloudinary.uploader.upload(file.path, { resource_type: 'auto' });
  
      // Delete the temporary file uploaded by multer
      fs.unlinkSync(file.path);
  
      // Create new post object
      const newPost = new Post({
        user: req.userId, // Assuming req.userId is set correctly in your middleware
        imageUrls: [result.secure_url],
        public_id: result.public_id,
        caption: req.body.caption || ''
      });
  
      // Save post to MongoDB
      await newPost.save();
  
      // Respond with success and new post data
      res.status(201).json({ post: newPost });
    } catch (error) {
      console.error('Error uploading image:', error);
      res.status(500).json({ error: 'Failed to upload image', details: error.message });
    }
  });


exports.getAllImages = async (req, res) => {
    try {
        const posts = await Post.find().populate('user', 'username');
        res.json({ posts });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error', details: error.message });
    }
};

exports.likePost = async (req, res) => {
    const postId = req.params.postId;

    try {
        const post = await Post.findById(postId);
        if (!post) {
            return res.status(404).json({ error: 'Post not found' });
        }

        post.likeCount += 1;
        await post.save();

        req.io.emit('likeCountUpdated', { postId: postId, likes: post.likeCount });

        res.json({ likes: post.likeCount });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to like post', details: error.message });
    }
};

exports.unlikePost = async (req, res) => {
    const postId = req.params.postId;

    try {
        const post = await Post.findById(postId);
        if (!post) {
            return res.status(404).json({ error: 'Post not found' });
        }

        if (post.likeCount > 0) {
            post.likeCount -= 1;
            await post.save();
        }

        req.io.emit('likeCountUpdated', { postId: postId, likes: post.likeCount });

        res.json({ likes: post.likeCount });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to unlike post', details: error.message });
    }
};

exports.commentPost = async (req, res) => {
    const postId = req.params.postId;
    const { comment } = req.body;

    try {
        const post = await Post.findById(postId);
        if (!post) {
            return res.status(404).json({ error: 'Post not found' });
        }

        post.comments.push({ user: req.userId, content: comment });

        await post.save();

        req.io.emit('commentSubmitted', { postId, comment });

        res.status(200).json({ success: true, postId, comment });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to save comment', details: error.message });
    }
};


// const Post = require('../models/post');
// const cloudinary = require('../config/cloudinary');

// exports.uploadImage = async (req, res) => {
//   const file = req.file;
//   if (!file) {
//       return res.status(400).json({ error: 'No file uploaded' });
//   }

//   try {
//       const result = await cloudinary.uploader.upload(file.path, { resource_type: 'auto' });

//       const imageUrl = result.secure_url;
//       const public_id = result.public_id;

//       const newPost = new Post({
//           user: req.userId,
//           imageUrls: [imageUrl],
//           public_id: public_id,
//           caption: req.body.caption || ''
//       });

//       await newPost.save();

//       res.status(201).json({ post: newPost });
//   } catch (error) {
//       console.error(error);
//       res.status(500).json({ error: 'Failed to upload image', details: error.message });
//   }
// };

// exports.getAllImages = async (req, res) => {
//     try {
//         const posts = await Post.find().populate('user', 'username');
//         res.json({ posts });
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ error: 'Internal server error', details: error.message });
//     }
// };

// exports.likePost = async (req, res) => {
//     const postId = req.params.postId;

//     try {
//         const post = await Post.findById(postId);
//         if (!post) {
//             return res.status(404).json({ error: 'Post not found' });
//         }

//         post.likeCount += 1;
//         await post.save();

//         req.io.emit('likeCountUpdated', { postId: postId, likes: post.likeCount });

//         res.json({ likes: post.likeCount });
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ error: 'Failed to like post', details: error.message });
//     }
// };

// exports.unlikePost = async (req, res) => {
//     const postId = req.params.postId;

//     try {
//         const post = await Post.findById(postId);
//         if (!post) {
//             return res.status(404).json({ error: 'Post not found' });
//         }

//         if (post.likeCount > 0) {
//             post.likeCount -= 1;
//             await post.save();
//         }

//         req.io.emit('likeCountUpdated', { postId: postId, likes: post.likeCount });

//         res.json({ likes: post.likeCount });
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ error: 'Failed to unlike post', details: error.message });
//     }
// };

// exports.commentPost = async (req, res) => {
//     const postId = req.params.postId;
//     const { comment } = req.body;

//     try {
//         const post = await Post.findById(postId);
//         if (!post) {
//             return res.status(404).json({ error: 'Post not found' });
//         }

//         post.comments.push({ user: req.userId, content: comment });

//         await post.save();

//         req.io.emit('commentSubmitted', { postId, comment });

//         res.status(200).json({ success: true, postId, comment });
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ error: 'Failed to save comment', details: error.message });
//     }
// };

const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    imageUrls: {
        type: [String],
        required: true
    },
    caption: {
        type: String,
        trim: true
    },
    likeCount: {
        type: Number,
        default: 0
    },
    comments: [{
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },
        content: {
            type: String,
            required: true
        },
        timestamp: {
            type: Date,
            default: Date.now
        }
    }],
    public_id: {
        type: String
    }
}, { timestamps: true });

const Post = mongoose.model('Post', postSchema);

module.exports = Post;

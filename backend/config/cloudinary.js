const cloudinary = require('cloudinary').v2;

cloudinary.config({
    cloud_name: 'djwcs2cet',
    api_key: '262741452366958',
    api_secret: 'o1xpAGHy6e32WosVbheHGyC7FWQ'
});

module.exports = cloudinary;

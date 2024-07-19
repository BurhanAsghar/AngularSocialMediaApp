const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const http = require('http');
const socketIO = require('socket.io');
const mongoose = require('mongoose');
const cors = require('cors');
const multer = require('multer'); // Import multer
const PORT = 3000;

const corsOptions = {
  origin: "http://localhost:4200", // Adjust this to match the URL of your Angular app
  optionsSuccessStatus: 200,
};

const postRoutes = require('./routes/postRoutes'); // Adjust path if necessary
const userRoutes = require('./routes/userRoutes'); // Assuming you have a user routes file

const app = express();
const httpServer = http.createServer(app);
const io = socketIO(httpServer);

const dbUrl = 'mongodb://localhost:27017/SocialMediaApp'; // Replace with your actual database URL

// Connect to MongoDB
mongoose.connect(dbUrl, {
  useNewUrlParser: true,
  useUnifiedTopology: true // Add this option to suppress deprecation warnings
});

mongoose.connection.on('connected', () => {
  console.log('Connected to MongoDB');
});

mongoose.connection.on('error', (err) => {
  console.error('MongoDB connection error:', err);
});

const uploadDir = './uploads'; 

if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

// Multer setup for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDir); // Destination directory
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + '-' + file.originalname); // Unique filename
  }
});


// Middleware setup
app.use(cors(corsOptions)); // Add CORS middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Middleware to attach socket.io to requests
app.use((req, res, next) => {
  req.io = io;
  next();
});

// Use multer middleware for handling file uploads
const upload = multer({ storage: storage }); // Use 'storage' instead of 'dest' to specify destination
app.use(upload.single('image')); // 'image' should match the field name in your form data

// Use routes
app.use('/api/posts', postRoutes);
app.use('/api/users', userRoutes);

// Basic error handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

// 404 handling
app.use((req, res, next) => {
  res.status(404).send('Endpoint not found');
});

httpServer.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});


// const express = require('express');
// const path = require('path');
// const bodyParser = require('body-parser');
// const http = require('http');
// const socketIO = require('socket.io');
// const mongoose = require('mongoose');
// const cors = require('cors');
// const PORT = 3000;

// const corsOptions = {
//   origin: "http://localhost:4200", // Adjust this to match the URL of your Angular app
//   optionsSuccessStatus: 200,
// };

// const postRoutes = require('./routes/postRoutes'); // Adjust path if necessary
// const userRoutes = require('./routes/userRoutes'); // Assuming you have a user routes file

// const app = express();
// const httpServer = http.createServer(app);
// const io = socketIO(httpServer);

// const dbUrl = 'mongodb://localhost:27017/SocialMediaApp'; // Replace with your actual database URL

// // Connect to MongoDB
// mongoose.connect(dbUrl, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true // Add this option to suppress deprecation warnings
// });

// mongoose.connection.on('connected', () => {
//   console.log('Connected to MongoDB');
// });

// mongoose.connection.on('error', (err) => {
//   console.error('MongoDB connection error:', err);
// });

// // Middleware setup
// app.use(cors(corsOptions)); // Add CORS middleware
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));

// // Middleware to attach socket.io to requests
// app.use((req, res, next) => {
//   req.io = io;
//   next();
// });

// // Use routes
// app.use('/api/posts', postRoutes);
// app.use('/api/users', userRoutes);

// // Basic error handling
// app.use((err, req, res, next) => {
//   console.error(err.stack);
//   res.status(500).send('Something broke!');
// });

// httpServer.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });

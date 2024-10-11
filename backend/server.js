const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();
const path = require('path');

// Database connection (use require for CommonJS)
require('./config/db.js');

const app = express();

// Middleware setup
app.use(cors());
app.use(express.json());
app.use(bodyParser.json()); // Parse application/json

// Port
const PORT = process.env.PORT || 8000;

// Import routers
const BlogRouter = require('./routes/Blog.js');
const commentRoutes = require('./routes/comments');
const newsRoutes = require('./routes/newsRoutes');
// Serve static files for blog images
app.use('/BlogImages', express.static(path.join(__dirname, 'BlogImages')));

// Routes
app.use('/Blog', BlogRouter); // Blog routes
app.use('/comments', commentRoutes); // Comment routes

// Start server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

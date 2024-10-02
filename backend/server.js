const express = require('express');
const cors = require('cors');
const path = require('path');
const { initializeDatabase } = require('./config/database');
const userRoutes = require('./routes/userRoutes');
const { errorHandler } = require('./middleware/errorMiddleware');

const app = express();

// Updated CORS configuration
app.use(cors({
  origin: 'http://localhost:8080', // Replace with your frontend URL
  credentials: true,
}));

app.use(express.json());

// Serve static files from the React app
// Update this path to where your built React app is located
const buildPath = path.join(__dirname, '..', 'dist');
app.use(express.static(buildPath));

// API routes
app.use('/api/users', userRoutes);

// Handle GET requests to /api route
app.get('/api', (req, res) => {
  res.json({ message: 'Welcome to the OPlus Telemedicine API' });
});

// Handle GET request to root route and any other client-side routes
app.get('*', (req, res) => {
  res.sendFile(path.join(buildPath, 'index.html'));
});

app.use(errorHandler);

const PORT = process.env.PORT || 5000;

let server;

async function startServer() {
  await initializeDatabase();
  server = app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
  return server;
}

function closeServer() {
  return new Promise((resolve) => {
    server.close(() => {
      resolve();
    });
  });
}

if (require.main === module) {
  startServer();
}

module.exports = { app, startServer, closeServer };
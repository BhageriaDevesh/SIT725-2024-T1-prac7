const express = require('express');
const app = express();
const http = require('http').Server(app); // Import and create HTTP server
let io = require('socket.io')(http); // Initialize Socket.IO with the HTTP server
const path = require('path');
const dbConnection = require('./dbconnection');
const routes = require('./routers/routes');

io.on('connection', (socket) => {
    console.log('a user connected');
    socket.on('disconnect', () => {
        console.log('user disconnected');
    });
    setInterval(() => {
        socket.emit('number', parseInt(Math.random() * 10));
    }, 1000);
});

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// Middleware to parse JSON and URL-encoded bodies
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Use routes
app.use('/api', routes);

// Start the server
const port = process.env.PORT || 3000;
http.listen(port, () => {
    console.log("App listening on port:", port);
});

module.exports = app;

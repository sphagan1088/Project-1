// Require dependencies
const bodyParser = require('body-parser');
const express = require('express');
const path = require('path');

// Initialize express app
const app = express();
const PORT = process.env.PORT || 5000;

// Import API Routes
const API = require('./routes/api-routes');

// Use body parser to parse incoming requests as json
app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: 'application/vnd.api+json' }));

// Serve files from the public folder
app.use(express.static(path.resolve(__dirname, 'public')));


// Set up express routes
app.use('/api', API);

// Serve home page
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'));
});

// Handle 404 NOT FOUND
app.use((req, res)=> {
    res.status(404).send('404: Sorry the page you requested is not on this server.');
});

// Handle 500 INTERNAL SERVER ERROR
app.use(function(error, req, res) {
    res.status(500).send('500: Internal Server Error');
});

// Start server
app.listen(PORT, ()=>{
    console.log(`The server is listening on port ${PORT}`);
});

const express = require("express");
const connectToMongo = require("./db");
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

// Middleware to parse JSON requests
app.use(express.json());
connectToMongo();

// Basic route for the root URL
app.get('/', (req, res) => {
    res.send('Hello, World!');
});

// A route to return a list of items
app.get('/items', (req, res) => {
    const items = [
        { id: 1, name: 'Item 1' },
        { id: 2, name: 'Item 2' },
        { id: 3, name: 'Item 3' },
    ];
    res.json(items);
});

// A route to create a new item
app.post('/items', (req, res) => {
    const newItem = req.body;
    // Here you would typically save the item to a database
    console.log('New item created:', newItem);
    res.status(201).json(newItem);
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});

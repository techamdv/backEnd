const express = require("express");
const connectToMongo = require("./db");
require('dotenv').config();
const {router} = express.Router
const auth = require("./Routes/auth")
const notes = require("./Routes/notes")


const app = express();
const port = process.env.PORT || 3000;

// Middleware to parse JSON requests
app.use(express.json());
connectToMongo();

app.use("/api/auth",auth)
app.use("/api/notes",notes);

// Basic route for the root URL
app.get('/', (req, res) => {
    res.send('Hello, World!');
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});

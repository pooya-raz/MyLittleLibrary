"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// lib/app.ts
const cookieParser = require("cookie-parser");
const express = require("express");
const path = require("path");
const PORT = process.env.PORT || 3000;
// Create a new express application instance
const app = express();
//Setup
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
//Routes
var booksRouter = require('./books/booksRoutes');
//View engine
app.use('/api/books', booksRouter);
if (process.env.NODE_ENV === 'production') {
    // Handle React routing, return all requests to React app
    app.use(express.static(path.join(__dirname, '/../client/build')));
    app.get('*', function (req, res) {
        res.sendFile(path.join(__dirname, '/../client/build', 'index.html'));
    });
}
app.listen(PORT, () => {
    console.log(`MyLittleLibrary start at localhost:${PORT}`);
});
module.exports = app;

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sqlite3 = require("sqlite3");
const db = new sqlite3.Database("./db/mylittlelibrary.db", (err) => {
    if (err) {
        console.error(err.message);
    }
    else {
        console.log("Connected to the MyLittleLibrary database.");
    }
});
module.exports = db;

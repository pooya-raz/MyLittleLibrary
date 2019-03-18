import sqlite3 = require("sqlite3");
const db = new sqlite3.Database("../db/mylittlelibrary.db", (err) => {
    if (err) {
      console.error(err.message);
    }
    console.log("Connected to the MyLittleLibrary database.");
  });

module.exports = db;

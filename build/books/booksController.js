"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var db = require("../databaseConnection");
exports.index = function (req, res) {
    db.all(`SELECT book_title, location_id FROM books;`, [], (_err, rows) => {
        return res.send(rows);
    });
};
// Display list of all books.
exports.book_list = function (req, res) {
    db.all(`SELECT book_title, location_id FROM books;`, [], (_err, rows) => {
        return res.send(rows);
    });
};
// Display detail page for a specific book.
exports.book_detail = function (req, res) {
    db.get(`SELECT book_title, location_id FROM books WHERE book_id = ?;`, [req.params.id], (_err, row) => {
        return row
            ? res.send(row)
            : res.send(`No book found with the id ${req.params.id}`);
    });
};
// Display book create form on GET.
exports.book_create_get = function (req, res) {
    res.send('NOT IMPLEMENTED: Book create GET');
};
// Handle book create on POST.
exports.book_create_post = function (req, res) {
    //create book json
    var book = {
        book_title: req.body.book_title,
        location_id: req.body.location_id,
        book_id: 0
    };
    // insert one row into the books table
    db.run(`INSERT INTO books(book_title,location_id) VALUES(?,?)`, [book.book_title, book.location_id], function (err) {
        if (err) {
            return console.log(err.message);
        }
        // get the last insert id
        book.book_id = this.lastID;
        return res.json(book);
    });
};
// Display book delete form on GET.
exports.book_delete_get = function (req, res) {
    res.send('NOT IMPLEMENTED: Book delete GET');
};
// Handle book delete on POST.
exports.book_delete_post = function (req, res) {
    // delete a row based on id
    db.run(`DELETE FROM books WHERE rowid=?`, req.params.id, function (err) {
        if (err) {
            return console.error(err.message);
        }
        res.send(`Book deleted ${this.changes}`);
    });
};
// Display book update form on GET.
exports.book_update_get = function (req, res) {
    res.send('NOT IMPLEMENTED: Book update GET');
};
// Handle book update on POST.
exports.book_update_post = function (req, res) {
    res.send('NOT IMPLEMENTED: Book update POST');
};

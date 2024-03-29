import express = require("express");
import booksController = require("./booksController");

const router = express.Router();
// GET request for creating a Book. NOTE This must come before routes that display Book (uses id).
router.get("/add-book", booksController.book_create_get);

// POST request for creating Book.
router.post("/add-book", booksController.book_create_post);

// GET request to delete Book.
router.get("/:id/delete", booksController.book_delete_get);

// POST request to delete Book.
router.post("/:id/delete", booksController.book_delete_post);

// GET request to update Book.
router.get("/:id/update", booksController.book_update_get);

// POST request to update Book.
router.post("/:id/update", booksController.book_update_post);

// GET request for one Book.
router.get("/:id", booksController.book_detail);

// GET request for list of all Book items.
router.get("/", booksController.book_list);

module.exports = router;

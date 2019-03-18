/* Replace with your SQL commands */

CREATE TABLE locations (
 location_id INTEGER PRIMARY KEY,
 location_name TEXT NOT NULL
);

CREATE TABLE contacts(
 contact_id INTEGER PRIMARY KEY,
 contace_name TEXT NOT NULL
);

CREATE TABLE users(
 user_id INTEGER PRIMARY KEY,
 user_name TEXT NOT NULL
);

CREATE TABLE books (
 book_id INTEGER PRIMARY KEY,
 book_title TEXT NOT NULL,
 book_image TEXT,
 location_id INTEGER,
 FOREIGN KEY(location_id) REFERENCES locations(location_id)
);
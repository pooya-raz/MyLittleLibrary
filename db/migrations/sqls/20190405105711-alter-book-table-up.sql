/* Replace with your SQL commands */

ALTER TABLE books RENAME TO oldbooks;

CREATE TABLE authors (
    id INTEGER PRIMARY KEY,
    name TEXT NOT NULL,
    book_id INTEGER,
    FOREIGN KEY(book_id) REFERENCES books(id)
);

CREATE TABLE industry_identifiers (
    id INTEGER PRIMARY KEY,
    type TEXT,
    identifier TEXT,
    book_id INTEGER,
    FOREIGN KEY(book_id) REFERENCES books(id) 
);

CREATE TABLE books (
 id INTEGER PRIMARY KEY,
 title TEXT NOT NULL,
 image_url TEXT,
 location_id INTEGER,
 published_date INTEGER,
 publisher TEXT,
 FOREIGN KEY(location_id) REFERENCES locations(location_id)
);

INSERT INTO books (title, id, location_id) SELECT book_title, book_id, location_id FROM oldbooks;



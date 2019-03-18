var db = require("../databaseConnection.ts");
interface Books {
    book_title: string,
    book_id: number,
    location_id:number
}

exports.index = function(_req: any, res: { send: (arg0: any) => void; }) {
    db.all(`SELECT book_title, location_id FROM books;`, [], (_err: any,rows: any) => {
        return res.send(rows);
    });
};

// Display list of all books.
exports.book_list = function(_req: any, res: { send: (arg0: any) => void; }) {
    db.all(`SELECT book_title, location_id FROM books;`, [], (_err: any,rows: any) => {
        return res.send(rows);
    });
};

// Display detail page for a specific book.
exports.book_detail = function(req: { params: { id: any; }; }, res: { send: { (arg0: any): void; (arg0: string): void; }; }) {
    db.get(`SELECT book_title, location_id FROM books WHERE book_id = ?;`, [req.params.id], (_err: any,row: any) => {
        return row
            ? res.send(row)
            : res.send(`No book found with the id ${req.params.id}`)
    });
};

// Display book create form on GET.
exports.book_create_get = function(_req: any, res: { send: (arg0: string) => void; }) {
    res.send('NOT IMPLEMENTED: Book create GET');
};

// Handle book create on POST.
exports.book_create_post = function(req: { body: { book_title: any; location_id: any; }; }, res: { send: (arg0: { book_title: any; location_id: any; }) => void; }) {
    //create book json
    var book = {
        book_title: req.body.book_title,
        location_id: req.body.location_id,
        book_id: 0
      };
    // insert one row into the books table
    db.run(`INSERT INTO books(book_title,location_id) VALUES(?,?)`, [book.book_title, book.location_id], function(err: { message: any; }) {
    if (err) {
      return console.log(err.message);
    }
    // get the last insert id
    book["book_id"] = this.lastID;
    return res.send(book);
  });
    
};

// Display book delete form on GET.
exports.book_delete_get = function(_req: any, res: { send: (arg0: string) => void; }) {
    res.send('NOT IMPLEMENTED: Book delete GET');
};

// Handle book delete on POST.
exports.book_delete_post = function(req: { params: { id: any; }; }, res: { send: (arg0: string) => void; }) {
    // delete a row based on id
    db.run(`DELETE FROM books WHERE rowid=?`, req.params.id, function(err: { message: any; }) {
        if (err) {
          return console.error(err.message);
        }
        res.send(`Book deleted ${this.changes}`);
      });
       
};

// Display book update form on GET.
exports.book_update_get = function(_req: any, res: { send: (arg0: string) => void; }) {
    res.send('NOT IMPLEMENTED: Book update GET');
};

// Handle book update on POST.
exports.book_update_post = function(_req: any, res: { send: (arg0: string) => void; }) {
    res.send('NOT IMPLEMENTED: Book update POST');
};
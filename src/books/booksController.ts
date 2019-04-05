import { Request, Response} from 'express';
import { getBook, insertBook} from './sqliteController';
import {Book} from './Book';
var db = require("../databaseConnection");

interface BookParams{
    title: string,
    location_id: number,
}

export const index = function(req: Request, res: Response) {
    db.all(`SELECT book_title, location_id FROM books;`, [], (err: any,rows: any) => {
        return res.send(rows);
    });
};

// Display list of all books.
export const book_list = function(req: Request, res: Response) {
    db.all(`SELECT book_title, location_id FROM books;`, [], (err: Error,rows: any) => {
        if (err){
            console.log(err)
        } else{
            return res.send(rows);
        }
    });
};

// Display detail page for a specific book.
export const book_detail = function(req: Request, res: Response):void {
    //Book -> Response
    // Get Book from database-service and pass it to response
    getBook(req.params.id).then(row => {
        if (row) {
            let book = new Book(row);
            res.send(book)
        } else {
            res.status(404)        // HTTP status 404: NotFound
            .send('Not found');
        }
    })
    /*
    db.get(`SELECT book_id, book_title, location_id, book_image FROM books WHERE book_id = ?`, [req.params.id], (err: Error,row: Book) => {
        return row
            ? res.send(row)
            : res.status(404)        // HTTP status 404: NotFound
                .send('Not found');
    });
    */
};

// Display book create form on GET.
export const book_create_get = function(req: Request, res: Response) {
    res.send('NOT IMPLEMENTED: Book create GET');
};

// Handle book create on POST.

export const book_create_post = function(req:Request, res:Response):void {

    insertBook(req.body).then(book => {res.json(book)});
   /* 
    //create book json
    var book_params:BookParams = {
        title: req.body.title,
        location_id: req.body.location_id
      };
    
    // insert one row into the books table
    db.run(`INSERT INTO books(title,location_id) VALUES(?,?)`, [book_params.title, book_params.location_id], function(this:{lastID:number}, err: { message: any; }) {
    if (err) {
      return console.log(err.message);
    }
    // get the last insert id
    const book = {
        title: req.body.title,
        location_id: req.body.location_id,
        book_id: this.lastID
    }
    */
    
};

// Display book delete form on GET.
export const book_delete_get = function(req: Request, res: Response) {
    res.send('NOT IMPLEMENTED: Book delete GET');
};

// Handle book delete on POST.
export const book_delete_post = function(req: Request, res: Response) {
    // delete a row based on id
    db.run(`DELETE FROM books WHERE rowid=?`, req.params.id, function(this:{changes:number},err: { message: any; }) {
        if (err) {
          return console.error(err.message);
        }
        res.send(`Book deleted ${this.changes}`);
      });
       
};

// Display book update form on GET.
export const book_update_get = function(req: Request, res: Response) {
    res.send('NOT IMPLEMENTED: Book update GET');
};

// Handle book update on POST.
export const book_update_post = function(req: Request, res: Response) {
    res.send('NOT IMPLEMENTED: Book update POST');
};

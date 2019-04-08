import { Book } from "./Book";

var db = require("../databaseConnection");

export const getBook = (id: string): Promise<Book> => {
    return new Promise(function (resolve) {
        db.get(`SELECT id, title, published_date, publisher, location_id FROM books WHERE id=?`, id, (err: Error, row: any) => {
            if (err) {
                console.log(err)
            } else if (row === undefined) {
                resolve(row)
            } else {
                let book = new Book(row)
                resolve(book)
            }
        })
    })
}

// Book -> Book
// Inserts book to database, then returns book with id
export const insertBook = (book: Book): Promise<any> => {
    let newbook = new Book(book);
    return new Promise((resolve) => {
        db.run(`INSERT INTO books(title,publisher, published_date, image_url) VALUES(?,?,?,?)`,
            [book.title, book.publisher, book.published_date, book.image_url], function (this: { lastID: number }, err: { message: any; }) {
                if (err) {
                    return console.log(err.message);
                }
                // get the last insert id
                newbook['id'] = this.lastID
                return resolve(newbook);
            });
    })
}

export const updateBook = (field: any): Promise<any> => {
    return new Promise((resolve) => {
        //
        let data = ['Hello From Express', 6];
        let sql = `UPDATE books
            SET title = ?
            WHERE id = ?`;

        db.run(sql, data,(err:any) => {
            if (err) {
                return resolve(err.message);
            }
            return resolve({wasUpdated:true});

        });

    })
}

export const deleteBook= (id:number): Promise<any> => {
    return new Promise((resolve) => {
        //
        let data = id;
        let sql = `DELETE FROM books
            WHERE id = ?`;

        db.run(sql, data,(err:any) => {
            if (err) {
                return resolve(err.message);
            }
            return resolve({wasDeleted:true});

        });

    })
}
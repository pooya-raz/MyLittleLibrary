import { Book } from "./Book";

var db = require("../databaseConnection");

export const getBook = (id: string):Promise<Book>=> {
    return new Promise(function (resolve) {
        db.get(`SELECT id, title, published_date, publisher, location_id FROM books WHERE id=?`, id, (err: Error, row: any) => {
            if (err) {
                console.log(err)
            } else if (row === undefined) {
                resolve(row)
            } else {
                let book = new Book (row)
                resolve(book)
            }
        })
    })
}
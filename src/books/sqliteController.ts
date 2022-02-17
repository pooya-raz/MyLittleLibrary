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
//Field -> SetSQLFragment
// Converts a field key-value pair in into a set fragment of SQL statement
const fieldToSetSQLFragment = (field:any):string => {
    if (Object.keys(field).length === 0 && field.constructor === Object){
    throw('Empty object not allowed');
    } else if (Object.keys(field).length > 1 ) {
    let number = Object.keys(field).length
    throw(`Expected 1 field received ${number}`);
    } else{
    let key = Object.keys(field)[0]
    let value = field[key]
    let SetSQLFragment = `${key} = '${value}'`;
    return SetSQLFragment
    }
}
//[SetSQLFragment] -> UpdateSQLStatment
//Collects an array of SetSQLFragments and returns a complete SQL UPDATE statement
export const setFragmentsToSqlStatement = (setFragments:Array<string>):string =>{
    if (setFragments.length === 0){
        throw 'Cannot be an empty array'
    }
    let setString = ""
    setFragments.forEach(frag => {setString = setString + frag + ', '})
    setString = setString.slice(0, -2);
    let SQLStatement = "UPDATE books SET " + setString + ' WHERE id = ?'
    return SQLStatement
}

//Book -> UpdateSQLStatement
//Transforms a variety of fields from a book to an SQL Statment
export const bookToSQL = (book:any) => {
    let fieldArray = []
    for (const key of Object.keys(book)) {
        fieldArray.push(fieldToSetSQLFragment({key: book[key]}));
    }
    return fieldArray
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
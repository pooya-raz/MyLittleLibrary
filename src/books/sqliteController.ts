var db = require("../databaseConnection");
export const getBook = (id: string) => {
    return new Promise(function (resolve) {
        db.get(`SELECT book_id, book_title, location_id, book_image FROM books WHERE book_id = ?`, id, (err: Error, row: any) => {
            if (err) {
                console.log(err)
            } else {
                resolve(row)
            }
        })
    })
}

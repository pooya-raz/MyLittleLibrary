import sqliteController = require('./sqliteController');
import { Book } from './Book';

describe('book_detail', () => {

    it('Should return JSON details of an existing book', () => {
        expect.assertions(1);
        return sqliteController.getBook('27')
            .then(res => {
                expect(res)
                    .toEqual({ "authors": undefined, "id": 27, "image_url": undefined, "industryIdentifier": undefined, "location_id": null, "published_date": null, "publisher": null, "title": "2314" })
            });
    });
    it('should return undefined for non-existing book', () => {
        expect.assertions(1);
        return sqliteController.getBook('9999999999')
            .then(res => {
                expect(res)
                    .toEqual(undefined)
            });
    });

});

describe('Insert a book to SQLite', () => {
    it('should succesfuly insert a book and return with book including id', () => {
        const fakeBook: Book = {
            title: "hello",
            published_date: 2020,
            publisher: "Fake Publisher",
            image_url: "Fake-url.com"
        }
        expect.assertions(2);
        return sqliteController.insertBook(fakeBook)
            .then(res => {
                expect(res)
                    .toBeInstanceOf(Book);
                var type = typeof res.id;
                expect(type).toBe("number");
            });
    });
})

describe('Edit a book', () => {
    it('Should edit the title of book', () => {
        expect.assertions(1);
        return sqliteController.updateBook({ title: "Updated title" })
            .then(res => {
                expect(res).toEqual({ wasUpdated: true });
            })
    })
})
describe('Edit a book', () => {
    it('Should edit the title of book', () => {
        expect.assertions(1);
        return sqliteController.deleteBook(6)
            .then(res => {
                expect(res).toEqual({ wasDeleted: true });
            })
    })
});

describe.only('tester', () => {
    it('Should return a SQL string given an array of strings', () => {
        let frags0 = []
        let frags1 = ["title = 'Happy Title'"]
        let frags2 = ["title = 'Happy Title'", "publisher = 'Happy Publisher'"]
        expect(sqliteController.setFragmentsToSqlStatement(frags1))
            .toEqual("UPDATE books SET title = 'Happy Title' WHERE id = ?")
        expect(sqliteController.setFragmentsToSqlStatement(frags2))
            .toEqual("UPDATE books SET title = 'Happy Title', publisher = 'Happy Publisher' WHERE id = ?")
    })
    it('Should return a SQL UPDATE statement', () => {
        let field1:any= {title:"New Title"}
        let field2= {title: "New Title", publisher: "New Publisher"}
        expect(sqliteController.bookToSQL(field1))
            .toEqual("UPDATE books SET title = 'New Title' WHERE id = ?");
    })
})
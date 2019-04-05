import sqliteController = require('./sqliteController');

describe('book_detail', () => {
    it('should return JSON details of the book', () => {
        expect.assertions(1);
        return sqliteController.getBook('27')
            .then(res => {
                expect(res)
                    .toEqual({
                        "book_id": 27,
                        "book_image": null,
                        "book_title": "2314",
                        "location_id": null
                    })
            });
    });
});
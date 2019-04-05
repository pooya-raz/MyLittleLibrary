import sqliteController = require('./sqliteController');

describe('book_detail', () => {
    
    it('Should return JSON details of an existing book', () => {
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
    it('should return undefined for non-existing book', () => {
        expect.assertions(1);
        return sqliteController.getBook('9999999999')
            .then(res => {
                expect(res)
                    .toEqual(undefined)
            });
    });
});
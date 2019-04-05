import sqliteController = require('./sqliteController');

describe('book_detail', () => {
    
    it('Should return JSON details of an existing book', () => {
        expect.assertions(1);
        return sqliteController.getBook('27')
            .then(res => {
                expect(res)
                    .toEqual({"authors": undefined, "id": 27, "image_url": undefined, "industryIdentifier": undefined, "location_id": null, "published_date": null, "publisher": null, "title": "2314"})
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
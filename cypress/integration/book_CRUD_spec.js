const book1 = {book_title: "Cypress Book1"};
const book2 = {book_title: "Cypress Book2", location_id: "1"};
const book3 = {book_title: "Cypress Book2", author:"Batman"};

describe('create a new book', () => {
    it('Sends a JSON and returns a JSON', () => {
        cy
            .request('POST', 'http://127.0.0.1:3000/books/create', book1)
            .then((response) => {
            // response.body is automatically serialized into JSON
            expect(response.body).to.have.property('book_title', book1.book_title);
        });
    });
});

describe('see if new book is available', () => {
    it('returns JSON', () => {
        cy.request('http://127.0.0.1:3000/books')
            .its('headers')
            .its('content-type')
            .should('include', 'application/json');
    });
    it('should have the newly added book', () => {
        cy.request('http://127.0.0.1:3000/books')
          .its('body')
          .should('include',{book_title: "Cypress Book1", location_id: null});
      });
    /* You can also write this test with expect
     it('should have the newly added book', () => {
         cy.request('http://127.0.0.1:3000/books')
         .then((response) => {
            expect(response.body).to.include({book_title: "Cypress Book1", location_id: null});
         });
     });
      */

});

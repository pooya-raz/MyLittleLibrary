const url = Cypress.env('api_server')

const book1 = {book_title: "Cypress Book1"};
const book2 = {book_title: "Cypress Book2", location_id: "1"};
const book3 = {book_title: "Cypress Book2", author:"Batman"};

describe('create a new book', () => {
    it('Sends a JSON and returns a JSON', () => {
        cy
            .request('POST', url + '/books/add-book', book1)
            .then((response) => {
            // response.body is automatically serialized into JSON
            expect(response.body).to.have.property('book_title', book1.book_title);
        });
    });
});

describe('see if new book is available', () => {
    it('returns JSON', () => {
        cy.request(url + '/books')
            .its('headers')
            .its('content-type')
            .should('include', 'application/json');
    });
    it('should have the newly added book', () => {
        cy.request(url + '/books')
          .its('body')
          .should('include',{book_title: "Cypress Book1", location_id: null});
      });
});

describe.only('Requesting a record that is not available', () => {
    it('Should return a 404 status', () => {
        cy.request({url: url+'/books/9999999', failOnStatusCode: false})
            .its('status')
            .should('equal', 404);
    });
});

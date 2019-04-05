const url = Cypress.env('api_server');

const book1 = {title: "Cypress Book1"};
const book2 = {title: "Cypress Book2", location_id: "1"};
const book3 = {title: "Cypress Book2", author:"Batman"};
const book4 = {title:""};

describe('create a new book', () => {
    it('Sends a JSON and returns a JSON', () => {
        cy
            .request('POST', url + '/books/add-book', book1)
            .then((response) => {
            // response.body is automatically serialized into JSON
            expect(response.body).to.have.property('title', book1.title);
        });
    });
    it('Should throw an error when posting a book with empty string as title', () => {
        cy
            .request({method: 'POST', url: url + '/books/add-book', body: book4, failOnStatusCode: false})
            .then((response) => {
            // response.body is automatically serialized into JSON
            expect(response).to.have.property('status', 500);
        });
    });
});

describe.skip('see if new book is available', () => {
    it('returns JSON', () => {
        cy.request(url + '/books/29')
            .its('headers')
            .its('content-type')
            .should('include', 'application/json');
    });
    it('should have the newly added book', () => {
        cy.request(url + '/books/29')
          .its('body')
          .should('include',{book_title: "Cypress Book1", location_id: null});
      });
});

describe('Requesting a record that is not available', () => {
    it('Should return a 404 status', () => {
        cy.request({url: url+'/books/9999999', failOnStatusCode: false})
            .its('status')
            .should('equal', 404);
    });
});

describe('Get book details', () => {
    it('returns JSON', () => {
        cy.request(url + '/books/29')
            .its('headers')
            .its('content-type')
            .should('include', 'application/json');
    });
    it('should have the newly added book', () => {
        cy.request(url + '/books/29')
          .its('body')
          .should('include',{title: "Maunual", location_id: null});
      });
});
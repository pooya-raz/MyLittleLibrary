const url = Cypress.env('react');

//This is the book that is populated from the API response
// It is then passed around to other tests to make sure correct
// details are returned
let response_book= {
    book_id: 0,
    book_title: ""
};
describe('User wants to create a new book', () => {
    it('Begins at the homepage', () => {
        cy.visit(url);
    });
    it("Clicks on the 'add book' button", () => {
        cy.contains('Add Book').click();
        cy.url().should('include', '/books/create');
    });
    it('should autofocus on the formTitle', () => {
        cy
            .focused()
            .should('have.id', 'formTitle');
    });
    it('submit a form', () => {
        const book_title = 'Cypress is Awesome!';
        cy.server();
        cy.route('POST', '/api/books/create').as('create');
        cy.get('#formTitle').as('formSubmit')
            .type(book_title)
            .type('{enter}');

        cy.wait('@create').then(response => {
            response_book.book_id = response.response.body.book_id;
            response_book.book_title = response.response.body.book_title;
        });
    });
    it('then redirect to the book page', () => {
        cy.location('pathname').should('eq', `/books/${response_book.book_id}`);
    });
    it('should have the new data entered', () => {
        cy.get('.book-details_title');
    });


});

describe('User wants to see details of a book', () => {
    it('directly visits the book url', () => {
        cy.visit(url + `/books/${response_book.book_id}`);
    });
    it('has the detail of the book', () => {
        cy.get('.book-details.title')
        .contains(response_book.book_title);
    });
});



import { isContext } from "vm";

const url = Cypress.env('react');
var response_book = {
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


});
it('then redirect to the book page', () => {
    cy.location('pathname').should('eq', `/books/${response_book.book_id}`);
});
it('should have the new data entered', () => {
    cy.get('#bookTitle');
});

describe('User creates a new book from form', () => {
    it('submit a form', () => {
        const book_title = 'Cypress is Awesome!';
        cy.visit(url + '/books/create');
        cy.server();
        cy.route('POST', '/api/books/create', {
            book_id: 1,
            book_title: book_title
        }).as('create');
        cy.get('#formTitle').as('formSubmit')
            .type(book_title)
            .type('{enter}');

        cy.wait('@create').then(response => {
            response_book.book_id = response.response.body.book_id;
            response_book.book_title = response.response.body.book_title;
        });
    });

    it('Should redirect to the new page', () => {
        cy.url().should('eq', `http://${url}/books/${response_book.book_id}`);
    });
    it('Should have the id of the new book', () => {
        cy.get('#book_title');
    });
});

describe.only("User vists the page of a book",() => {
    it('Should have book details', () => {
;
    cy.server();
    cy.route('GET', '/api/books/1', {
        book_id: "1",
        book_title: "Cypress is Awesome!",
        location_id: "1",
        book_image: "http://facebook.com"
    }).as('create');
    cy.visit(`${url}/books/1`)
    cy.get('.book_title').contains('Cypress is Awesome!' );
    });
});
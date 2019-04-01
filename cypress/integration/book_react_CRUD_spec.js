const url = Cypress.env('react');
describe('User wants to create a new book', () => {
    let book_id = 0;
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
            book_id = response.response.body.book_id;
        });
    });
    it('then redirect to the book page', () => {
        cy.location('pathname').should('eq', `/books/${book_id}`);
    });
    it('should have the new data entered', () => {
        cy.get('#bookTitle');
    })
});


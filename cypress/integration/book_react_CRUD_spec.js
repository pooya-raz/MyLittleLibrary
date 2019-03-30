const url = Cypress.env('react');
describe('New Book Page', () => {
    it('should autofocus on the formTitle', () => {
        cy
            .visit(url + '/new_book')
            .focused()
            .should('have.id', 'formTitle');
        });
    it('accepts input', () => {
        cy.visit(url + '/new_book');
        cy.get('.formTitle');

    })

    });
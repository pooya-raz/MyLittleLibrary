const url = Cypress.env('react');
describe('New Book Page', () => {
    beforeEach(() => {
        cy.visit(url + '/new_book');
    })
    it('should autofocus on the formTitle', () => {
        cy
            .focused()
            .should('have.id', 'formTitle');
        });
    it('accepts input', () => {
        const typedText = 'Cypress is Awesome!';
        cy.get('#formTitle')
          .type(typedText)
          .should('have.value', typedText);
    });
    context('Form Submission', () => {
        it('Should submit a form', () => {
            cy.get('#formTitle')
            .type('Cypress is Awesome!')
            .type('{enter}');
        });
    });

    });
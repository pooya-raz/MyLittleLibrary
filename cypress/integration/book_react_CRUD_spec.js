import { isContext } from "vm";

const url = Cypress.env('react');
var api_response = {};
describe('User wants to create a new book', () => {
    it('Begins at the homepage', ()=> {
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
        const fullurl = url + '/api/books/create';
        const book_title = 'Cypress is Awesome!';
        cy.server();
        cy.route('POST', fullurl).as('create');
        cy.get('#formTitle').as('formSubmit')
            .type(book_title)
            .type('{enter}');
        cy.wait('@create').then(function (response) {
                api_response = response;
                expect(response.body).to.have.property('book_title',book_title) ;
    });
});
    it('then redirect to the book page', () => {
        cy.location('pathname').should('eq', '/books/'+api_response.book_id);
    });
    it('should have the new data entered', () => {
        cy.get('#bookTitle');
    })
});


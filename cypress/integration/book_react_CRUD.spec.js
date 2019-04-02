import { isContext } from "vm";

const url = Cypress.env('react');
var response_book = {
    book_id: 0,
    book_title: ""
};

describe.only('User creates a new book from form', () => {
    const book_title = 'Cypress is Awesome!';

    it('should see form on add_book page', ()=>{
        cy.visit(url + '/books/create');
        cy.get('#formTitle');
   });
   it('should be able to type in text', ()=>{
        cy.get('#formTitle').as('formSubmit')
            .type(book_title);
   })
   it('should click the submit button and submit', () => {
        cy.server();
        cy.route('POST', '/api/books/create', {
            book_id: 1,
            book_title: book_title
        }).as('create');
        cy.get('button').click();

        cy.wait('@create').then(response => {
            response_book.book_id = response.response.body.book_id;
            response_book.book_title = response.response.body.book_title;
        });
    });

    it('Should redirect to the new page', () => {
        cy.url().should('eq', `http://${url}/books/${response_book.book_id}`);
    });
    it('Should have the id of the new book', () => {
        cy.get('.book-details_title');
    });
});

describe("User vists the page of a book",() => {
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
    cy.get('.book-details_title').contains('Cypress is Awesome!' );
    });

    context("but the api is down",() => {
        it('Should respond with an error message', () => {
    ;
        cy.server();
        cy.route({
            method:'GET', 
            url: '/api/books/1', 
            status: 500,
            response: {}
        }).as('create');
        cy.visit(`${url}/books/1`)
        cy.get('.error').should('be.visible' );
        });
    });
});

describe("User visits book page and wants to delete a book",() => {
    it('It should have a delete button', () => {
    cy.server();
    cy.route('GET', '/api/books/1', {
        book_id: "1",
        book_title: "Cypress is Awesome!",
        location_id: "1",
        book_image: "http://facebook.com"
    }).as('getBook');
    cy.visit(`${url}/books/1`);
    cy.wait('@getBook')
    cy.get('.book-details_delete_button').contains('Delete');
    });

    context("but the api is down",() => {
        it('Should respond with an error message', () => {
    ;
        cy.server();
        cy.route({
            method:'GET', 
            url: '/api/books/1', 
            status: 500,
            response: {}
        }).as('create');
        cy.visit(`${url}/books/1`)
        cy.get('.error').should('be.visible' );
        });
    });
});


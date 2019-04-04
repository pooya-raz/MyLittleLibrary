const url = Cypress.env('react');
var response_book = {
    book_id: 0,
    book_title: ""
};

describe('User creates a new book from the form', () => {
    const book_title = 'Cypress is Awesome!';

    it('should see form on add_book page', () => {
        cy.visit(url + '/books/add-book');
        cy.get('#formTitle');
    });
    it('should be able to type in text', () => {
        cy.get('#formTitle').as('formSubmit')
            .type(book_title);
    })
    it('should click the submit button and submit', () => {
        cy.server();
        cy.route('POST', '/api/books/add-book', {
            book_id: 1,
            book_title: book_title
        }).as('create');
        cy.get('button').contains('Add Book').click();

        cy.wait('@create').then(response => {
            response_book.book_id = response.response.body.book_id;
            response_book.book_title = response.response.body.book_title;
        });
    });

    it('Should redirect to the new page', () => {
        cy.url().should('eq', `http://${url}/books/${response_book.book_id}`);
    });
    it('Show a confirmation', () => {
        cy.get('.alert-success').should('be.visible');

    });
    it('Confirmation should disappear after 4 seconds', () => {
        cy.wait(4000);
        cy.get('.alert-success').should('not.be.visible');

    });
    it('Should have the id of the new book', () => {
        cy.get('.book-details_title');
    });
});

describe("User visits the page of a book", () => {
    it('Should have book details', () => {
        ;
        cy.server();
        cy.route('GET', '/api/books/1', {
            book_id: "1",
            book_title: "Cypress is Awesome!",
            location_id: "1",
            book_image: "http://facebook.com"
        }).as('create');
        cy.visit(`${url}/books/1`);
        cy.get('.book-details_title').contains('Cypress is Awesome!');
    });

    it('Should have a delete button', () => {

        cy.get('.book-details_delete-button')
            .contains('Delete');
    });

    context("but the api is down", () => {
        it('Should respond with an error message', () => {
            ;
            cy.server();
            cy.route({
                method: 'GET',
                url: '/api/books/1',
                status: 500,
                response: {}
            }).as('create');
            cy.visit(`${url}/books/1`);
            cy.get('.error').should('be.visible');
        });
    });
});

describe("User wants to delete a book", () => {
    it('Should load books details page', () => {
        cy.server();
        cy.route('GET', '/api/books/1', {
            book_id: "1",
            book_title: "Cypress is Awesome!",
            location_id: "1",
            book_image: "http://facebook.com"
        }).as('getBook');
        cy.visit(`${url}/books/1`);
        cy.wait('@getBook');
    });

    it('Clicking delete should reveal modal', () => {

        cy.get('.book-details_delete-button').click();
        cy.get('.modal-title')
            .should('be.visible')
            .contains('Delete Confirmation');
    });
    it('When delete button is clicked, it should delete book', () => {
        cy.server();
        cy.route({
            method: 'POST',
            url: '/api/books/1/delete',
            status: 200,
            response: {}
        }).as('delete');
        cy.get('.js-delete-book').click();
    });
    it('Should then redirect to the Search page', () => {
        cy.url().should('eq', `http://${url}/`);
    });
    it('Show a confirmation', () => {
        cy.get('.alert-success').should('be.visible');

    });
    it('Confirmation should disappear after 4 seconds', () => {
        cy.wait(4000);
        cy.get('.alert-success').should('not.be.visible');

    });
    context("but the api is down", () => {
        it('Should respond with an error message', () => {
            ;
            cy.server();
            cy.route({
                method: 'GET',
                url: '/api/books/1',
                status: 500,
                response: {}
            }).as('create');
            cy.visit(`${url}/books/1`);
            cy.get('.error').should('be.visible');
        });
    });
});


describe("User wants details of a book that doesn't exist", () => {
    it('Should give an error saying the book does not exist', () => {

            cy.visit(`${url}/books/999999`);
            
    });
});

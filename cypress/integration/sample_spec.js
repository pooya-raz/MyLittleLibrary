describe('My First Test', function () {
    it('Get a list of books', function () {
        cy.request('http://127.0.0.1:3000/books')
    })
})

describe('books API', () => {
    it('returns JSON', () => {
        cy.request('http://127.0.0.1:3000/books')
            .its('headers')
            .its('content-type')
            .should('include', 'application/json')
    })
    it('loads 2 items', () => {
        cy.request('http://127.0.0.1:3000/books')
          .its('body')
          .should('have.length', 2)
      })
})
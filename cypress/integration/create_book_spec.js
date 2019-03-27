describe('create a new book', () => {
    it('Sends a JSON and returns a JSON', () => {
        cy
            .request('POST', 'http://127.0.0.1:3000/books/create', { book_title: "Cypress Testing API" })
            .then((response) => {
            // response.body is automatically serialized into JSON
            expect(response.body).to.have.property('book_title', "Cypress Testing API");
        })
    })
})

/*
cy
    .request('POST', 'http://localhost:8888/users/admin', { name: 'Jane' })
    .then((response) => {
        // response.body is automatically serialized into JSON
        expect(response.body).to.have.property('name', 'Jane') // true
    })
    */
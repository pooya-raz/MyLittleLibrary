describe('Visit the homepage', () => {
    it.only('have the name MyLittleLibrary', () => {
        cy
            .visit('http://127.0.0.1:3001/new_book')
            .focused()
            .should('have.id', 'formTitle');
        });
    });
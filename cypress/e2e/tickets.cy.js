describe('Tickets', () => {
    const data = require("../fixtures/data.json")

    data.forEach((item, index) => {
        it(`${index +1} - fills and submits the form based on a predefined list of data`, () => {
            cy.visit('https://bit.ly/2XSuwCW')
    
            cy.get('#first-name').type(item.firstName)
            cy.get('#last-name').type(item.lastName)
            cy.get('#email').type(item.email)
            cy.get('#agree').check()

            cy.get('.agreement > fieldset')
                .should('be.visible')
                .and('contain', `I, ${item.firstName} ${item.lastName}, wish to buy`)

            cy.get('[type="submit"]').click()
    
            cy.get('.success')
              .should('be.visible')
              .and('contain', 'Ticket(s) successfully ordered.')
        })
    })

    
})
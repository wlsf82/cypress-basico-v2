Cypress.Commands.add('preencherFormsCompleto', function(name, lastName, email, comentario, ) {
     
     cy.get('#firstName').type(name)
     cy.get('#lastName').should('be.visible').type(lastName)
     cy.get('#email').should('be.visible').type(email)
     // cy.get('input[id="phone"]').should('be.visible').type('85988998899')
    
     cy.get('textarea[id="open-text-area"]').click().should('be.visible').type(comentario)

     cy.get('button[type="submit"]').click()
     // cy.get('.button').click()

     cy.get('.success').should('be.visible')
})

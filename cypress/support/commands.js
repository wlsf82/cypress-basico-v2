Cypress.Commands.add('fillMandatoryFieldsAndSubmit', function(){
        cy.get('#firstName').type ("Moana")
        cy.get('#lastName').type ("Santos")
        cy.get('#email').type ("moana@email.com")
        cy.get('#open-text-area').type ('teste')
        cy.contains('button', 'Enviar').click()
})
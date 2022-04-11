Cypress.Commands.add('fillMandatoryFieldsAndSubmit', function() {
    cy.get('#firstName').type('Hélvio')
    cy.get('#lastName').type('Poletti')    
    cy.get('#email').type('teste@teste.com')
    cy.get('#open-text-area').type('teste 123')
    cy.contains('button', 'Enviar').click()
})
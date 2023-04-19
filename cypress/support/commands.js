Cypress.Commands.add('fillMandatoryFieldsAndSubmit', function() {
    cy.get('#firstName').type('Luiz')
    cy.get('#lastName').type('Carlos')
    cy.get('#email').type('teste@email.com')
    cy.get('#open-text-area').type('Teste de área de texto')
    
    cy.contains('button', 'Enviar').click()
})
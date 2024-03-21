Cypress.Commands.add('fillMandatoryFieldsAndSubmit', function() {
    cy.get('#firstName').type('Wesley')
    cy.get('#lastName').type('Coutinho')
    cy.get('#email').type('Wesley_teste@gmail.com')
    cy.get('#open-text-area').type('Teste')
    cy.contains('button', 'Enviar').click()
})
Cypress.Commands.add('fillMandatoryFieldsAndSubmit', function() {
    cy.get('#firstName').type('Rodrigo')
    cy.get('#lastName').type('Cardozo')
    cy.get('#email').type('rodrigo@test.com')
    cy.get('#open-text-area').type('Test')
    cy.contains('button', 'Enviar').click()
})
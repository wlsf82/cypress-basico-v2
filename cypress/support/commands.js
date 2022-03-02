Cypress.Commands.add('fillMandatoryFieldsAndSubmit', function() {
  cy.get('#firstName').type('Walmyr')
  cy.get('#lastName').type('Filho')
  cy.get('#email').type('walmyr@exemplo.com')
  cy.get('#open-text-area').type('Teste')
  cy.contains('button', 'Enviar').click()
})

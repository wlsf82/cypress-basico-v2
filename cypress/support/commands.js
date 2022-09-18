Cypress.Commands.add('fillMandatoryFieldsAndSubmit', function() {
  cy.get('#firstName').type('Nilton')
  cy.get('#lastName').type('Santos')
  cy.get('#email').type('niltongomessantos@yahoo.com.br')
  cy.get('#open-text-area').type('texto')
  cy.get('button[type=submit]').click()
})
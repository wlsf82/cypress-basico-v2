Cypress.Commands.add('fillMandatoryFields', function(fieldsVals = {}) {
  const {
    firstName = 'Walmyr',
    lastName= 'Filho',
    email = 'walmyr@exemplo.com',
    openText = 'Teste - Cypress Básico - Escola TAT'
  } = fieldsVals
  cy.get('#firstName').type(firstName)
  cy.get('#lastName').type(lastName)
  cy.get('#email').type(email)
  cy.get('#open-text-area').type(openText)
})

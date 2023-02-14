Cypress.Commands.add('fillMandatoryFieldsAndSubmit', function(fieldsVals = {}) {
  const {
    firstName = 'Walmyr',
    lastName = 'Filho',
    email = 'walmyr@exemplo.com',
    openText = 'Teste',
  } = fieldsVals
  cy.get('#firstName').type(firstName)
  cy.get('#lastName').type(lastName)
  cy.get('#email').type(email)
  cy.get('#open-text-area').type(openText)
  cy.contains('button', 'Enviar').click()
})

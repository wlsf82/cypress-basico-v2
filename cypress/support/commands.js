Cypress.Commands.add('fillMandatoryFieldsAndSubmit', function(){
  cy.get('#firstName').type('Augusto')

  cy.get('#lastName').type('Hassan')

  cy.get('#email').type('gutex@mail.com')

  cy.get('#open-text-area').type('Teste 123456')

  cy.get('.button[type="submit"]').click()
})
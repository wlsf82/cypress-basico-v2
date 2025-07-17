Cypress.Commands.add('fillMandatoryFieldsAndSubmit', (user ={
    firstName: 'Son',
    lastName: 'Goku',
    email: 'goku@kamehameha.com',
    text:'kamehameha'
}) => {

  cy.get('#firstName').type(user.firstName)
  cy.get('#lastName').type(user.lastName)
  cy.get('#email').type(user.email)
  cy.get('input[type="number"]').type('kksaksk').should('not.have.value')
  cy.get('#open-text-area').type(user.text)
  cy.get('button[type="submit"]').click('')
})
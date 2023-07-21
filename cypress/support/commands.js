Cypress.Commands.add('fillMandatoryFieldsAndSubmit', () => {
  cy.get('#firstName').type('John');
  cy.get('#lastName').type('Doe');
  cy.get('#email').type('john.doe@mail.com');
  cy.get('#open-text-area').type('Teste');
  cy.get('button[type="submit"').click();
});
Cypress.Commands.add('fillMandatoryFieldsAndSubmit', function () {
  cy.get("#firstName").type("Alice");
  cy.get("#lastName").type("Silva");
  cy.get("#email").type("e@mail.com");
  cy.get("#open-text-area").type('teste');
  cy.contains('button','Enviar').click();
});

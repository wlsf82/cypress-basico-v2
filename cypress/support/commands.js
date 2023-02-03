Cypress.Commands.add("fillMandatoryFieldsAndSubmit", function () {
  cy.get("#firstName").type("Marcello");
  cy.get("#lastName").type("Vasquez");
  cy.get("#email").type("marcello@example.com");
  cy.get("#open-text-area").type("teste`");
  cy.contains("button", "Enviar").click();
});

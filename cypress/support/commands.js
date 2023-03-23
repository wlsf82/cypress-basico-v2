Cypress.Commands.add("fillMandatoryFieldsAndSubmit", function () {
  cy.get("#firstName")
    .should("be.visible")
    .type("Victor")
    .should("have.value", "Victor");

  cy.get("#lastName")
    .should("be.visible")
    .type("Ross")
    .should("have.value", "Ross");

  cy.get("#email")
    .should("be.visible")
    .type("email@teste.com")
    .should("have.value", "email@teste.com");

  cy.get("#open-text-area")
    .should("be.visible")
    .type("Teste")
    .should("have.value", "Teste");

  cy.contains('button', 'Enviar').should("be.visible").click();
});

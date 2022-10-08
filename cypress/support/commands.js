Cypress.Commands.add("fillMandatoryFieldsAndSubmit", () => {
  cy.get("#firstName")
    .should("be.visible")
    .type("Guilherme")
    .should("have.value", "Guilherme");

  cy.get("#lastName")
    .should("be.visible")
    .type("Lima")
    .should("have.value", "Lima");

  cy.get("#email")
    .should("be.visible")
    .type("guibiel-10@hotmail.com")
    .should("have.value", "guibiel-10@hotmail.com");

  cy.get("#phone-checkbox").click();

  cy.get("#phone")
    .should("be.visible")
    .type("11994306108")
    .should("have.length", 1);

  cy.get("#open-text-area")
    .should("be.visible")
    .type(
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
      {
        delay: 0,
      }
    )
    .should(
      "have.value",
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
    );

  cy.get(".button").should("be.visible").click();

  cy.get(".success").should("be.visible");
});

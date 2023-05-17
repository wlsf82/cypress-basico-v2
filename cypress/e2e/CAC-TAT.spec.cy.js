/// <reference types="Cypress" />

describe("Central de Atendimento ao Cliente TAT", () => {
  beforeEach(() => {
    cy.visit("./src/index.html");
  });

  it("verifica o título da aplicação", () => {
    cy.title().should("be.equal", "Central de Atendimento ao Cliente TAT");
  });

  it("preenche os campos obrigatórios e envia o formulário", () => {
    cy.get("#firstName").should("be.visible").type("Daniel");
    cy.get("#lastName").should("be.visible").type("Silva");
    cy.get("#email").should("be.visible").type("dfsilva.dxp@gmail.com");
    cy.get("#open-text-area")
      .should("be.visible")
      .type("Solicito o reset da senha de meu user dfsilva");

    cy.get("button[type=submit]").click();

    cy.get(".success").should("be.visible");
  });
});

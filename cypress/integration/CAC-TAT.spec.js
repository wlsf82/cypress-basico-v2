/// <reference types="Cypress" />

describe("Central de Atendimento do Cliente TAT", function () {
  beforeEach(() => {
    cy.visit("./src/index.html");
  });
  it("verifivar titulo da aplicação", function () {
    cy.title().should("be.equal", "Central de Atendimento ao Cliente TAT");
  });

  it("preenche os campos obrigatórios e envia o formulário", function () {
    const longText =
      "Lorem ipsum dolor sit amet. Sit omnis delectus id voluptatem facilis aut molestias vitae ut saepe dolores et dolore corrupti? Ad doloremque quasi quo neque nesciunt ea sunt officiis aut velit sunt vel corporis dolorum";
    cy.get("#firstName").type("Alice");
    cy.get("#lastName").type("Silva");
    cy.get("#email").type("e@mail.com");
    cy.get("#open-text-area").type(longText, { delay: 0 });
    cy.get('button[type="submit"]').click();
    cy.get(".success").should("be.visible");
  });

  it("exibe mensagem de erro ao submeter o formulário com um email com formatação inválida", function () {
    cy.get("#firstName").type("Alice");
    cy.get("#lastName").type("Silva");
    cy.get("#email").type("e@com");
    cy.get("#open-text-area").type("Entre em contato");
    cy.get('button[type="submit"]').click();
    cy.get(".error").should("be.visible");
  });

  it("validar que, se um valor não numérico for digitado, seu valor continuará vazio.", function () {
    cy.get("#phone").type("eteste").should("have.value", "");
  });

  it("exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário", function () {
    cy.get("#firstName").type("Alice");
    cy.get("#lastName").type("Silva");
    cy.get("#email").type("e@test.com.br");
    cy.get("#phone-checkbox").click();
    cy.get("#open-text-area").type("Entre em contato");
    cy.get('button[type="submit"]').click();
    cy.get(".error").should("be.visible");
  });

  it("preenche e limpa os campos nome, sobrenome, email e telefone", function () {
    cy.get("#firstName")
      .type("Alice")
      .should("have.value", "Alice")
      .clear()
      .should("have.value", "");
    cy.get("#lastName")
      .type("Silva")
      .should("have.value", "Silva")
      .clear()
      .should("have.value", "");
    cy.get("#email")
      .type("e@test.com.br")
      .should("have.value", "e@test.com.br")
      .clear()
      .should("have.value", "");
    cy.get("#phone")
      .type("31996055668")
      .should("have.value", "31996055668")
      .clear()
      .should("have.value", "");
  });

  it.only("exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios", function () {
    cy.get('button[type="submit"]').click();
    cy.get('.error').should('be.visible');
  });
});

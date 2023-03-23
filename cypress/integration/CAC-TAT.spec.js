/// <reference types="Cypress" />

// O bloco describe define a suíte de testes, e o bloco it, define um caso de teste.

describe("Central de Atendimento ao Cliente TAT", function () {
  this.beforeEach(() => cy.visit("./src/index.html"));

  it("verifica o título da aplicação", function () {
    cy.title().should("be.equal", "Central de Atendimento ao Cliente TAT");
  });

  it("preenche os campos obrigatórios e envia o formulário", () => {
    const longText = 'Texto de teste para a área "como podemos ajudar".';

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
      .type(longText, { delay: 0 })
      .should(
        "have.value",
        'Texto de teste para a área "como podemos ajudar".'
      );

      cy.contains('button', 'Enviar').should("be.visible").click();

    cy.get(".success").should("be.visible");
  });

  it("exibe mensagem de erro ao submeter o formulário com um email com formatação inválida", () => {
    cy.get("#firstName").type("Victor");
    cy.get("#lastName").type("Ross");
    cy.get("#email").type("email@teste,com");
    cy.get("#open-text-area").type("Teste");
    cy.contains('button', 'Enviar').click();

    cy.get(".error").should("be.visible");
  });

  it("campo telefone continua vazio quando preenchido com valor não numérico", () => {
    cy.get("#phone")
      .should("be.visible")
      .type("abcdefghij")
      .should("have.value", "");
  });

  it("campo telefone exibe somente o numero quando preenchido com valores numéricos e não numéricos", () => {
    cy.get("#phone")
      .should("be.visible")
      .type("abc00912344321")
      .should("have.value", "00912344321");
  });

  it("exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário", () => {
    cy.get("#firstName").type("Victor");
    cy.get("#lastName").type("Ross");
    cy.get("#email").type("email@teste.com");
    cy.get("#phone-checkbox").click();
    cy.get("#open-text-area").type("Teste");
    cy.contains('button', 'Enviar').click();

    cy.get(".error").should("be.visible");
  });

  it("preenche e limpa os campos nome, sobrenome, email e telefone", () => {
    cy.get("#firstName")
      .type("Victor")
      .should("have.value", "Victor")
      .clear()
      .should("have.value", "");
    cy.get("#lastName")
      .type("Ross")
      .should("have.value", "Ross")
      .clear()
      .should("have.value", "");
    cy.get("#email")
      .type("email@teste.com")
      .should("have.value", "email@teste.com")
      .clear()
      .should("have.value", "");
    cy.get("#phone")
      .type("00912344321")
      .should("have.value", "00912344321")
      .clear()
      .should("have.value", "");
  });

  it("exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios", () => {
    cy.contains('button', 'Enviar').click();
    cy.get(".error").should("be.visible");
  })

  it("envia o formuário com sucesso usando um comando customizado", () => {
    // fillMandatoryFieldsAndSubmit criado em support/commands.js
    cy.fillMandatoryFieldsAndSubmit();

    cy.get(".success").should("be.visible");
  })
});

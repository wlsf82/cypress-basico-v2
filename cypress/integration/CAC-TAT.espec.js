/// <reference types="Cypress" />


describe("Central de Atendimento ao Cliente TAT", function () {
  beforeEach(function () {
    cy.visit("./src/index.html");
  });

  it("Verifica o título da aplicação", function () {
    cy.title().should("eq", "Central de Atendimento ao Cliente TAT");
  });

  it("Deve preencher os campos obrigatórios e envia o formulário", function () {
    const TestText =
      "Teste para solicitação de ajuda. Teste para solicitação de ajuda. Teste para solicitação de ajuda. Teste para solicitação de ajuda";
    cy.get('[data-test="input-name"]').should("be.visible").type("Isadora");
    cy.get('[data-test="input-last-name"]').should("be.visible").type("Dias");
    cy.get('[data-test="input-email"]')
      .should("be.visible")
      .type("diasfisadora@gmail.com");
    cy.get('[data-test="input-help"]')
      .should("be.visible")
      .type(TestText, { delay: 0 });
    cy.contains('button', 'Enviar').click();
    cy.get(".success").should("be.visible");
  });

  it("Exibe mensagem de erro ao submeter o formulário com um email com formatação inválida", function () {
    cy.get('[data-test="input-name"]').should("be.visible").type("Isadora");
    cy.get('[data-test="input-last-name"]').should("be.visible").type("Dias");
    cy.get('[data-test="input-email"]')
      .should("be.visible")
      .type("diasfisadora.gmail.com");
    cy.get('[data-test="input-help"]').should("be.visible").type("Teste");
    cy.contains('button', 'Enviar').click();
    cy.get(".error").should("be.visible");
  });

  it("Campo telefone continua vazio quando recebe input não-numérico", function () {
    cy.get("#phone").type("asdfghjklç").should("have.value", "");
  });

  it("Exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário", function () {
    cy.get('[data-test="input-name"]').should("be.visible").type("Isadora");
    cy.get('[data-test="input-last-name"]').should("be.visible").type("Dias");
    cy.get('[data-test="input-email"]')
      .should("be.visible")
      .type("diasfisadora@gmail.com");
    cy.get('[data-test="input-help"]').should("be.visible").type("Teste");
    cy.get("#phone-checkbox").click();
    cy.contains('button', 'Enviar').click();
    cy.get(".error").should("be.visible");
  });

  it("Preenche e limpa os campos nome, sobrenome, email e telefone", function () {
    cy.get('[data-test="input-name"]')
      .type("Isadora")
      .should("have.value", "Isadora")
      .clear()
      .should("have.value", "");
    cy.get('[data-test="input-last-name"]')
      .type("Dias")
      .should("have.value", "Dias")
      .clear()
      .should("have.value", "");
    cy.get('[data-test="input-email"]')
      .type("diasfisadora@gmail.com")
      .should("have.value", "diasfisadora@gmail.com")
      .clear()
      .should("have.value", "");
    cy.get("#phone")
      .type("12345678")
      .should("have.value", "12345678")
      .clear()
      .should("have.value", "");
  });

  it("Exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios", function () {
    cy.contains('button', 'Enviar').click();
    cy.get(".error").should("be.visible");
  });

  it('Envia o formuário com sucesso usando um comando customizado', function() {
    cy.fillMandatoryFieldsAndSubmit()
    cy.get('.success').should("be.visible")
  })
});

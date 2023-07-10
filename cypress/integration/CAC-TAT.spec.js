/// <reference types="Cypress" />

const { should } = require("chai");

describe("Central de Atendimento ao Cliente TAT", () => {
  beforeEach(() => {
    cy.visit("./src/index.html");
  });

  it("verifica o título da aplicação", () => {
    cy.title().should("be.equal", "Central de Atendimento ao Cliente TAT");
  });

  it("preenche os campos obrigatórios e envia o formulário", () => {
    const longText = `testar bem testado é muito bom porque teste testa testando tudo que precisa de teste então teste, teste teste
    teste git --testar bem testado é muito bom porque teste testa testando tudo que precisa de teste então teste, teste teste
    testar bem testado é muito bom porque teste testa testando tudo que precisa de teste então teste, teste teste`;
    cy.get("#firstName").type("Cristiano");
    cy.get("#lastName").type("Muroni");
    cy.get("#email").type("muroni@hotmail$com");
    cy.get("#phone").type("19999887788");
    cy.get("#open-text-area").type(longText, { delay: 0 });
    cy.get('button[type="submit"]').click();
    cy.get(".error").should("be.visible");
  });

  it("exibe mensagem de erro ao submeter o formulário com um email com formatação inválida", () => {
    cy.get("#firstName").type("Cristiano");
    cy.get("#lastName").type("Muroni");
    cy.get("#email").type("muroni@hotmail¨¨com");
    cy.get("#phone").type("19999887788");
    cy.get("#open-text-area").type("teste");
    cy.get('button[type="submit"]').click();
    cy.get(".error").should("be.visible");
  });

  it("Campo telefone continua vazio quando preenchido com valor não-numérico", () => {
    cy.get("#phone").type("abcdefghih").should("have.value", '');
  });

  it("exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário", () => {
    cy.get("#firstName").type("Cristiano");
    cy.get("#lastName").type("Muroni");
    cy.get("#email").type("muroni@hotmail.com");
    cy.get('#phone-checkbox').click();   
    cy.get("#open-text-area").type("teste");
    cy.get('button[type="submit"]').click();
    cy.get(".error").should("be.visible");
  });

  it("preenche e limpa os campos nome, sobrenome, email e telefone", () => {
    cy.get('#firstName')
      .type('Cristiano')
      .should('have.value', 'Cristiano')
      .clear()
      .should('have.value', '')

    cy.get('#lastName')
      .type('Muroni')
      .should('have.value', 'Muroni')
      .clear()
      .should('have.value', '')
    
    cy.get("#email")
      .type('teste@teste.com')
      .should('have.value', 'teste@teste.com')
      .clear()
      .should('have.value', '')

      cy.get("#phone")
      .type('12345678')
      .should('have.value', '12345678')
      .clear()
      .should('have.value', '')

    cy.get("#open-text-area")
      .type('teste')
      .should('have.value', 'teste')
      .clear()
      .should('have.value', '')
  })
  it.only('exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', () => {
    cy.get('button[type="submit"]').click();
    cy.get(".error").should("be.visible");
  })
});

/// <reference types="Cypress" />

const { should } = require("chai");

describe("Central de Atendimento ao Cliente TAT", () => {
  beforeEach(() => {
    cy.visit('./src/index.html');
  });

  it("verifica o título da aplicação", () => {    
    cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT');
  });

  it("preenche os campos obrigatórios e envia o formulário", () => {
    
  })
});

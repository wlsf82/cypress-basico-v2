/// <reference types="Cypress" />

const { should } = require("chai")

describe("Central de Atendimento ao Cliente TAT", () => {
  beforeEach(() => {
    cy.visit('./src/index.html')
  })

  it("verifica o título da aplicação", () => {    
    cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT')
  })

  it("preenche os campos obrigatórios e envia o formulário", () => {
    const longText = `testar bem testado é muito bom porque teste testa testando tudo que precisa de teste então teste, teste teste
    testar bem testado é muito bom porque teste testa testando tudo que precisa de teste então teste, teste teste
    testar bem testado é muito bom porque teste testa testando tudo que precisa de teste então teste, teste teste`
    cy.get('#firstName').type('Cristiano')
    cy.get('#lastName').type("Muroni")
    cy.get('#email').type('muroni@hotmail$com')
    cy.get('#phone').type("19999887788")
    cy.get('#open-text-area').type(longText, { delay: 0 });
    cy.get('button[type="submit"]').click()
    cy.get('.error').should('be.visible')
  })

  it("exibe mensagem de erro ao submeter o formulário com um email com formatação inválida", () => {
    
    cy.get('#firstName').type('Cristiano')
    cy.get('#lastName').type("Muroni")
    cy.get('#email').type('muroni@hotmail¨¨com')
    cy.get('#phone').type("19999887788")
    cy.get('#open-text-area').type('teste')
    cy.get('button[type="submit"]').click()
    cy.get('.error').should('be.visible')
  })
})

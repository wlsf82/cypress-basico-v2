// CAC-TAT.spec.js created with Cypress
//
// Start writing your Cypress tests below!
// If you're unfamiliar with how Cypress works,
// check out the link below and learn how to write your first test:
// https://on.cypress.io/writing-first-test

/// <reference types="Cypress" />

describe('Central de Atendimento ao Cliente TAT', function () {
  beforeEach(function () {
    cy.visit('src/index.html')
  })
  it('verifica o título da aplicação', function () {
    cy.title()
      .should('be.equal', 'Central de Atendimento ao Cliente TAT')
  })
  // Prenche campos Obrigatórios
  it.only('Verifica e Prenche campos Obrigatórios', function () {
    cy.get('#firstName')
      .type('Eduardo')
    cy.get('#lastName')
      .type('Manoel')
    cy.get('#email')
      .type('eduardomanoelnn@yahoo.com.br')
    cy.get('#phone')
      .type('982070081')
    cy.get('#open-text-area')
      .type('Não sei')
    cy.get('button[type="submit"]')
      .click()
    cy.get('.success')
      .should('be.visible')
  })
})
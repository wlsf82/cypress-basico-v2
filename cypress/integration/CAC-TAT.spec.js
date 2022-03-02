/// <reference types="Cypress" />

describe('Central de Atendimento ao Cliente TAT', function() {
  it('verifica o título da aplicação', function() {
    cy.visit('./src/index.html')

    cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT')
  })
})

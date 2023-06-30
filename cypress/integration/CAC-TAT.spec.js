// CAC-TAT.spec.js created with Cypress
//
// Start writing your Cypress tests below!
// If you're unfamiliar with how Cypress works,
// check out the link below and learn how to write your first test:
// https://on.cypress.io/writing-first-test
/// <reference types="Cypress" />


describe('Central de Atendimento ao Cliente TAT', function() {
 
  beforeEach(() => {
    cy.visit('./src/index.html')
  })
    it('verifica o título da aplicação', function() {
      cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT')
    })
    it('preenche os campos obrigatórios e envia o formulário', () => {
      cy.get('#firstName').type('Ana')
      cy.get('#lastName').type('Silva')
      cy.get('#email').type('ana@email.com')
      cy.get('#phone').type('55999899658')
      cy.get('#open-text-area').type('Testes com cypress curso Walmyr')
      cy.get('.button[type="submit"]').click({forece: true})

      cy.get('.success').should('be.visible')
    })
  })
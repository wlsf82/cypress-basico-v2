// teste.js created with Cypress
//
// Start writing your Cypress tests below!
// If you're unfamiliar with how Cypress works,
// check out the link below and learn how to write your first test:
// https://on.cypress.io/writing-first-test
/// <reference types="Cypress" />

describe('Google', function() {
  beforeEach(function() {
    cy.visit('www.google.com.br')
  })
    it('verifica o título da aplicação', function() {
      cy.title().should('be.equal','Google')
    //Pesquisa Google
    it.only('Pesquisa Google', function() {
      cy.get('.gLFyf').type(Polyana)
    })
    })
  })
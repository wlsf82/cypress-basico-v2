// teste.js created with Cypress
//
// Start writing your Cypress tests below!
// If you're unfamiliar with how Cypress works,
// check out the link below and learn how to write your first test:
// https://on.cypress.io/writing-first-test
/// <reference types="Cypress" />

describe('Teste automatizado na página 4ALLTEST', function () {
  beforeEach(function() {
    cy.visit('http://aprendendotestar.com.br/treinar-automacao.php')
  })
  it('Verifica o título da aplicação', function() {
    cy.title() .should('be.equal','Sobre - Aprendendo a Testar - Um guia para você aprender sobre testes de Software')
  })
  it('Prenchendo os campos',function(){
    cy.get(':nth-child(2) > td > input') .type ('Eduardo')
    cy.get(':nth-child(4) > td > input') .type('12345')
    cy.get(':nth-child(6) > td > input').type('Eduardo Manoel')
    cy.get('td > .btn').click()
    cy.wait(5000) 
    cy.get(':nth-child(2) > :nth-child(5) > a').click()
  })
}) 


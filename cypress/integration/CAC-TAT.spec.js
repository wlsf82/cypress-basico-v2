// <reference types="Cypress" />

describe('Central de Atendimento ao Cliente TAT', function() {
  beforeEach(function(){ //bloco de pre condição para reapoveitar os códigos
    cy.visit('./src/index.html')
  })

  it('verificax o título da aplicação', function() {
    cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT');
  })

  it.only('preenche os campos obrigatórios e envia o formulário', function(){
    cy.get('#firstName').type('Tks')
    cy.get('#lastName').type('exemplo super')    
    cy.get('#email').type('Tks@exemplo.super.br')
    cy.get('#open-text-area').type('Tks super obrigado man')  
    cy.get('button[type="submit"]').click()

    cy.get('.success').should('be.visible')
  
  })

})
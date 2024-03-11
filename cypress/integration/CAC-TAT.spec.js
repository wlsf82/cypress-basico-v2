// <reference types="Cypress" />

describe('Central de Atendimento ao Cliente TAT', function() {
    beforeEach(function() {
        cy.visit('./src/index.html');
    });
    
    it('verifica o título da aplicação', function() {
        cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT')
    })

    it('preenche os campos obrigatórios e envia o formulário', function() {
        cy.get('#firstName').type('Wyldvan')
        cy.get('#lastName').type('Lima')
        cy.get('#email').type('Wyldvan08@gmail.com')
        cy.get('#open-text-area').type('nada dos nada dos nada haver!')
        cy.get('button[type="submit"]').click()
        cy.get('.success').should('be.visible')
    })
  })
/// <reference types="Cypress" />

describe('Central de Atendimento ao Cliente TAT', function() {
    beforeEach(function() {
        //Antes de cada teste, abre o navegador
        cy.visit('./src/index.html')
    })

    it('verifica o título da aplicação', function() {
        cy.title().should('be.equal','Central de Atendimento ao Cliente TAT')
    })

    it.only('preenche os campos obrigatórios e envia o formulário', function(){
        cy.get('#firstName').type('Walid')
        cy.get('#lastName').type('Arnous')
        cy.get('#email').type('walid@teste.com.br')
        cy.get('#open-text-area').type('Teste Campo')
        cy.get('button[type="submit"]').click()

        cy.get('.success').should('be.visible')
    })
})
  
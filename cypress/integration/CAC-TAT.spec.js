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
        const longText = 'Teste Teste, Teste Teste Teste Teste, Teste Teste Teste Teste, Teste Teste Teste Teste, Teste Teste Teste Teste, Teste Teste Teste Teste, Teste Teste Teste Teste, Teste Teste Teste Teste, Teste Teste Teste Teste, Teste Teste Teste Teste, Teste Teste Teste Teste'
        cy.get('#firstName').type('Walid')
        cy.get('#lastName').type('Arnous')
        cy.get('#email').type('walid@teste.com.br')
        //Usar o Delay para poder copiar e colar o conteúdo, para não perder tempo "digitando"
        cy.get('#open-text-area').type(longText, {delay: 0})
        cy.get('button[type="submit"]').click()

        cy.get('.success').should('be.visible')
    })
})
  
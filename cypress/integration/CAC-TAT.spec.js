/// <reference types="Cypress" />

describe('Central de Atendimento ao Cliente TAT', function() {
    beforeEach(function() {
        //Antes de cada teste, abre o navegador
        cy.visit('./src/index.html')
    })

    it('verifica o título da aplicação', function() {
        cy.title().should('be.equal','Central de Atendimento ao Cliente TAT')
    })
    
    //#1
    it('preenche os campos obrigatórios e envia o formulário', function(){
        const longText = 'Teste Teste, Teste Teste Teste Teste, Teste Teste Teste Teste, Teste Teste Teste Teste, Teste Teste Teste Teste, Teste Teste Teste Teste, Teste Teste Teste Teste, Teste Teste Teste Teste, Teste Teste Teste Teste, Teste Teste Teste Teste, Teste Teste Teste Teste'
        cy.get('#firstName').type('Walid')
        cy.get('#lastName').type('Arnous')
        cy.get('#email').type('walid@teste.com.br')
        //Usar o Delay para poder copiar e colar o conteúdo, para não perder tempo "digitando"
        cy.get('#open-text-area').type(longText, {delay: 0})
        cy.get('button[type="submit"]').click()

        cy.get('.success').should('be.visible')
    })

    //#2
    it('exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', function(){
        cy.get('#firstName').type('Walid')
        cy.get('#lastName').type('Arnous')
        cy.get('#email').type('walid...teste.com.br')
        cy.get('#open-text-area').type('Teste')
        cy.get('button[type="submit"]').click()

        cy.get('.error').should('be.visible')
    })
    
    //#3
    it('campo telefone continua vazio quando preenchido com valor não-numérico', function(){
        cy.get('#phone')
            .type('abcdefghij')
            .should('have.value', '')
    })

    //#4
    it.only('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', function(){
        cy.get('#firstName').type('Walid')
        cy.get('#lastName').type('Arnous')
        cy.get('#email').type('walid@teste.com.br')
        cy.get('#open-text-area').type('Teste')
        cy.get('#phone-checkbox').click()
        cy.get('button[type="submit"]').click()

        cy.get('.error').should('be.visible')
    })


})
  
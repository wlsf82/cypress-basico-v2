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
    it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', function(){
        cy.get('#firstName').type('Walid')
        cy.get('#lastName').type('Arnous')
        cy.get('#email').type('walid@teste.com.br')
        cy.get('#open-text-area').type('Teste')
        cy.get('#phone-checkbox').click()
        cy.get('button[type="submit"]').click()

        cy.get('.error').should('be.visible')
    })

    //#5
    it('preenche e limpa os campos nome, sobrenome, email e telefone', function(){
        cy.get('#firstName')
            .type('Walid')
            .should('have.value', 'Walid')
            .clear()
            .should('have.value', '')

        cy.get('#lastName')
            .type('Arnous')
            .should('have.value', 'Arnous')
            .clear()
            .should('have.value', '')

        cy.get('#email')
            .type('walid@teste.com.br')
            .should('have.value', 'walid@teste.com.br')
            .clear()
            .should('have.value', '')
       
        cy.get('#phone')
            .type('123456789')
            .should('have.value', '123456789')
            .clear()
            .should('have.value', '')    
    })
    
    //#6
    it('exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatório', function(){
        cy.get('button[type="submit"]').click()

        cy.get('.error').should('be.visible')
    })

    //#7
    it('envia o formuário com sucesso usando um comando customizado', function(){
        cy.fillMandatoryFieldsAndSubmit()

        cy.get('.success').should('be.visible')
    })
})
  
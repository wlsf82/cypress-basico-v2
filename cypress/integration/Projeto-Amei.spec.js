/// <reference types="Cypress" />


describe('Projeto Amei', function() {
    beforeEach(function(){
        cy.visit('http://193.123.96.208:4200')   
    })

    it('verifica o título da aplicação', function() {
        cy.title().should('be.equal', 'Amei!')
    })

    it('sair do campo "E-mail", sem digitá-lo corretamente', function(){
        cy.get('#email')
        .should('be.visible')
        .type('exemplo')
        .clear()
        cy.get('#password')
        .type('sdfs')
        
        cy.get('.alert-label')
        .should('be.visible', 'Digite seu e-mail')
    })

    it('sair do campo "E-mail", sem digitá-lo corretamente', function(){
        cy.get('#email')
        .should('be.visible')
        .type('exemplo')
        cy.get('#password')
        .type('sdfs')
        
        cy.get('.alert-label')
        .should('be.visible', 'Digite seu e-mail')
    })

    it('fazer login com e-mail e senha inválidos', function(){
        cy.get('#email')
        .should('be.visible')
        .type('exemplo@exemplo,com')
        cy.get('#password')
        .should('be.visible')
        .type('123')
        cy.get('.btn-login')
        .click()
        
        cy.get('.alert-unathorized')
        .should('be.visible', 'Usuário ou senha incorretos, não autorizado')        
    })

    it('fazer login com e-mail válido', function(){
        cy.get('#email')
        .should('be.visible')
        .type('usuario2@email.com')
        cy.get('#password')
        .should('be.visible')
        .type('@Password2')
        cy.get('.btn-login')
        .click()
        
        cy.get('.home')
        .should('be.visible', 'Home')
    })
})

/// <reference types="Cypress" />


describe('Projeto Amei', function() {
    beforeEach(function(){
        cy.visit('http://193.123.96.208:4200')   
    })

    it('verifica o título da aplicação', function() {
        cy.title().should('be.equal', 'AmeiFront')
    })

    it.only('sair do campo "E-mail", sem digitá-lo corretamente', function(){
        cy.get('#email')
        .should('be.visible')
        .type('exemplo')
        .clear()
        cy.get('#password')
        .type('sdfs')
        
        cy.get('.alert-label')
        .should('be.visible', 'Digite seu e-mail')
    })

    it.only('sair do campo "E-mail", sem digitá-lo corretamente', function(){
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
        .should('be.visible', 'Usuário ou senha incorretos, não autorizado ng-invalid')        
    })

    it('fazer login com e-mail válido', function(){
        cy.get('#email')
        .should('be.visible')
        .type('usuario@email.com')
        cy.get('#password')
        .should('be.visible')
        .type('@Password')
        cy.get('.btn-login')
        .click()
        
        cy.get('.home')
        .should('be.visible', 'Home')
    })
})

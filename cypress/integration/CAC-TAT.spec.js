/// <reference types="Cypress" />

describe('Central de Atendimento ao Cliente TAT', function(){
    beforeEach(function(){
        cy.visit('./src/index.html')
    })
    
    it('Validar o título da aplicação', function(){      
        cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT')
    })

    it('Validar preenchimento dos campos obrigatórios e envio do formulário', function() {
        cy.get('#firstName').type('Gabriel')
        cy.get('#lastName').type('Martins')
        cy.get('#email').type('gabriel@yopmail.com')
        cy.get('#open-text-area').type('Teste')
        cy.get('button[type="submit"]').click()
    })
})
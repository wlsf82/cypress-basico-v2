/// <reference types="Cypress" />

// O bloco DESCRIBE define a suíte de testes, e o bloco IT, define um caso de teste.

describe('Central de Atendimento ao Cliente TAT', function() {
    beforeEach(function() {
        cy.visit('./src/index.html')
    })

    it('verifica o título da aplicação', function() {      
        cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT')
    })

    it.only('preenche os campos obrigatórios e envia o formulário', function() {
        cy.get('#firstName').type('Luiz')
        cy.get('#lastName').type('Carlos')
        cy.get('#email').type('teste@email.com')
        cy.get('#open-text-area').type('Teste de área de texto')
        
        cy.get('button[type="submit"]').click()
    })
})


/// <reference types="Cypress" />

describe('Central de Atendimento ao Cliente TAT', function () {
    beforeEach(function(){
        // antes de cada teste, roda esta funcao
        cy.visit('./src/index.html')
    })

    it('verifica o título da aplicação', function () {
        cy.title()
        .should('be.equal', 'Central de Atendimento ao Cliente TAT')
    })

    it.only('preenche os campos obrigatórios e envia o formulário', function () {
           //cy.get('input[type="text"]').should('be.visible').type('Olá mundo!').should('have.value', 'Olá mundo!')
           cy.get('#firstName').should('be.visible').type('Patricia').should('have.value', 'Patricia')
           cy.get('#lastName').should('be.visible').type('Possari').should('have.value', 'Possari')
           cy.get('#email').should('be.visible').type('patricia.possari@teste.com').should('have.value', 'patricia.possari@teste.com')
           cy.get('#open-text-area').should('be.visible').type('Teste de envio').should('have.value', 'Teste de envio')
           cy.get('button[type="submit"]').click()
           cy.get('.success').should('be.visible')



    })
   
})

/// <reference types="Cypress"/>

describe('Central de Atendimento ao cliente TAT', function(){
    beforeEach(function(){
        cy.visit('../../src/index.html')
    })
    it('verfica o titulo da aplicação', function(){
        cy.title().should('be.equal','Central de Atendimento ao Cliente TAT')
    });
    it.only('preenche os campos obrigatórios e envia formulário',function(){
        cy.get('#firstName').type('Mateus')
        cy.get('#lastName').type('Araujo')
        cy.get('#email').type('mateus@gmail.com')
        cy.get('#open-text-area').type('#endRegion')
        cy.get('button[type="submit"]').click()
        cy.get('.success').should('be.visible')
    });
});
/// <reference types="Cypress" />

describe('Central de Atendimento ao Cliente TAT', function() {
   beforeEach(function(){
    cy.visit('./src/index.html')
   })
    it('verifica o título da aplicação', function() {
        cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT')
    })
    it('preenche os campos e envia o formulário', function() {
        cy.get('#firstName').type('Ana Maria')
        cy.get('#lastName').type('Teste da Silva Sauro')
        cy.get('#email').type('testezinhos@gmail.com')
        cy.get('#phone').type('44998219935')
        cy.get('#support-type > :nth-child(3)').click()
        cy.get('#phone-checkbox').click()
        cy.get('#open-text-area').type('primeiro teste da ana')
        cy.get('button[type="submit"]').click()

    })
})

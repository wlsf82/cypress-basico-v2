/// <reference types="Cypress" />

describe('Central de Atendimento ao Cliente TAT', () => {
    beforeEach(() => {
        cy.visit('./src/index.html')
    })
    it('verificar o titulo da aplicação', () => {
        cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT')
    })

    it.only('Preenche os campos obrigatórios e envia o formulário', () => {
        cy.get('#firstName').type('Wilson')
        cy.get('#lastName').type('Pereira')
        cy.get('#email').type('wilson@gmail.com')
        cy.get('#phone').type('11995758400')
        cy.get('#open-text-area').type('esse é um texto longo para ser digitado sem delay', {delay: 0})
        cy.get('button[type="submit"]').click()

        cy.get('.success').should('be.visible')
    })
})
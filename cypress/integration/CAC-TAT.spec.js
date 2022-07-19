/// <reference types="Cypress"./>

describe('Central de Atendimento ao Cliente TAT', function() {
    //cada teste esta dentro de um it
    it('verificar o titulo da aplicação', function() {
        cy.visit('./src/index.html')

        cy.title(). should('be.equal', 'Central de Atendimento ao Cliente TAT')
    })
})
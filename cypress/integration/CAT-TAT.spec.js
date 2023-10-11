/// <reference types="Cypress" />

describe('Central de Atendimento ao Cliente TAT', function () {
    beforeEach(function () {
        cy.visit('./src/index.html')
    })

    it('verifica o titula da aplicação', function () {
        cy.title().should('eq', 'Central de Atendimento ao Cliente TAT')
    })

    it('preenche os campos obrigatórios e envia o formulário', function () {
        cy.get('#firstName')
            .type('Lucas')
            .should('have.value', 'Lucas')

        cy.get('#lastName')
            .type('da Silva')
            .should('have.value', 'da Silva')

        cy.get('#email')
            .type('lucas2000544@gmail.com')
            .should('have.value', 'lucas2000544@gmail.com')

        cy.get('#open-text-area')
            .type('Estou apenas realizando o exercicio da TAT')
            .should('have.value', 'Estou apenas realizando o exercicio da TAT')

        cy.get('.button')
        .click();    

        cy.get('.success')
        .should('be.visible')
    })
})
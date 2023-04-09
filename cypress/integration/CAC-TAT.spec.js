/// <reference types="Cypress" />

beforeEach(function () {
    cy.visit('./src/index.html');
})

describe('Central de Atendimento ao Cliente TAT', function () {
    it('verifica o título da aplicação', function () {
        cy.title().should('equal', 'Central de Atendimento ao Cliente TAT')
    })

    /** Exercicio 00
        Digitar dados nos campos:
        - Nome
        - Sobrenome
        - Email
        - Como podemos te ajudar?
        
        O teste deve clicar no botão Enviar após preencher os campos.

        Depois do clique, uma mensagem de sucesso deve ser exibida
     */
    it('preenche os campos obrigatórios e envia o formulário', function () {
        cy.get('form').within(function () {
            cy.get('input[name="firstName"]')
                .should('be.visible')
                .type('Marcos')
                .should('have.value', 'Marcos');

            cy.get('input[name="lastName"]')
                .should('be.visible')
                .type('Santos')
                .should('have.value', 'Santos');


            cy.get('input[type="email"]')
                .should('be.visible')
                .type('marcos@gmail.com')
                .should('have.value', 'marcos@gmail.com');

            cy.get('textarea[name="open-text-area"]')
                .should('be.visible')
                .type('Esse é um teste de escrita no text-area')
                .should('have.value', 'Esse é um teste de escrita no text-area');

            cy.get('button[type="submit"]')
                .should('be.visible')
                .click();
        })

        cy.get('.success')
            .should('be.visible');
    })
})

/// <reference types='Cypress' />

describe('Central de Atendimento ao Cliente TAT', function(){

    beforeEach(() => {
        cy.visit('./src/index.html');
    });

    it('Verifica o título da aplicação', function(){
        cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT');
    })

    it.only('Preenche os campos obrigatórios e envia o formulário', () => {
        
        cy.get('#firstName').should('be.visible')
        .type('Bruno')
        .should('have.value', 'Bruno');

        cy.get('#lastName').should('be.visible')
        .type('Faria')
        .should('have.value', 'Faria');

        cy.get('#email').should('be.visible')
        .type('brunoluizb@hotmail.com')
        .should('have.value', 'brunoluizb@hotmail.com');

        cy.get('#open-text-area').should('be.visible')
        .type('Apenas rodando o cypress')
        .should('have.value', 'Apenas rodando o cypress');        
        
        cy.get('.button').click();

        cy.get('.success').should('be.visible')

    });
})
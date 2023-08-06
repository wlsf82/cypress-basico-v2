/// <reference types='Cypress' />

describe('Central de Atendimento ao Cliente TAT', function(){

    beforeEach(() => {
        cy.visit('./src/index.html');
    });

    it('Verifica o título da aplicação', function(){
        cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT');
    })

    it('Preenche os campos obrigatórios e envia o formulário', () => {
        const longText = "Teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste "
        
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
        .type(longText, {delay: 0})
        .should('have.value', longText);        
        
        cy.get('button[type="submit"]').click();

        cy.get('.success').should('be.visible')

    });

    it('Exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', () => {
    const longText = "Teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste "
    
    cy.get('#firstName').should('be.visible')
    .type('Bruno')
    .should('have.value', 'Bruno');

    cy.get('#lastName').should('be.visible')
    .type('Faria')
    .should('have.value', 'Faria');

    cy.get('#email').should('be.visible')
    .type('brunoluizbhotmail.com')
    .should('have.value', 'brunoluizbhotmail.com');

    cy.get('#open-text-area').should('be.visible')
    .type(longText, {delay: 0})
    .should('have.value', longText);        
    
    cy.get('button[type="submit"]').click();

    cy.get('.error').should('be.visible') 
    })
    
})
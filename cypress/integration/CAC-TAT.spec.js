/// <reference types="Cypress" />

describe('Central de Atendimento ao Cliente TAT', function() {
    beforeEach(function(){
        cy.visit('./src/index.html');
    }); 
    it('Verifica o título da aplicação', function() {
        
        cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT')
    }) 

    it.only('Preenche os campos obrigatórios e envia o formulário', function(){
        cy.get('#firstName').type('Leonardo');
        cy.get('#lastName').type('Gutierrez');
        cy.get('#email').type('gutierrez.medeiros12@gmail.com');
        cy.get('#open-text-area').type('Me ajude comprando um saco de pão');
        cy.get('button[type="submit"]').click();
        cy.get('.success').should('be.visible', 'Mensagem enviada com sucesso.');
    })
})
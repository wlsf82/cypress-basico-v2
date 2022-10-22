/// <reference types="Cypress" />

describe('Central de Atendimento ao Cliente TAT', function()
{
    beforeEach(() => {
        cy.visit('./src/index.html');
    })

    it('verificar o título da aplicação', function()
    {
        cy.title().should('be.equal','Central de Atendimento ao Cliente TAT');
    }) 

    it('preenche os campos obrigatórios e envia o formulário', function()
    {
        cy.get('#firstName').should('be.visible').type('Rhemerson').should('have.value', 'Rhemerson');
        cy.get('#lastName').should('be.visible').type('Monteiro').should('have.value', 'Monteiro');
        cy.get('#email').should('be.visible').type('teste@gmail.com').should('have.value', 'teste@gmail.com');
        cy.get('#open-text-area').should('be.visible').
            type('Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc bibendum metus tincidunt dolor dapibus, eu mattis nulla posuere. Integer posuere efficitur quam, bibendum aliquam orci venenatis sit amet. Duis pulvinar congue tincidunt. Quisque eleifend venenatis urna, vel sodales sem consequat non. Vivamus condimentum scelerisque magna posuere rutrum.', {delay:0}).
            should('not.have.value');
        cy.get('.button').should('be.visible').click();
    }) 

    it('exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', function()
    {
        cy.get('#firstName').should('be.visible').type('Rhemerson').should('have.value', 'Rhemerson');
        cy.get('#lastName').should('be.visible').type('Monteiro').should('have.value', 'Monteiro');
        cy.get('#email').should('be.visible').type('testegmail.com').should('have.value', 'testegmail.com');
        cy.get('#open-text-area').should('be.visible').
            type('Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc bibendum metus tincidunt dolor dapibus, eu mattis nulla posuere. Integer posuere efficitur quam, bibendum aliquam orci venenatis sit amet. Duis pulvinar congue tincidunt. Quisque eleifend venenatis urna, vel sodales sem consequat non. Vivamus condimentum scelerisque magna posuere rutrum.', {delay:0}).
            should('not.have.value');
        cy.get('.button').should('be.visible').click();
        cy.get('.error').should('be.visible');
    })     

    it('preenche e limpa os campos nome, sobrenome, email e telefone', function(){
        cy.get('#firstName').should('be.visible').type('Rhemerson').should('have.value', 'Rhemerson')
            .clear().should('have.value', '');
        cy.get('#lastName').should('be.visible').type('Monteiro').should('have.value', 'Monteiro')
            .clear().should('have.value', '');
        cy.get('#email').should('be.visible').type('teste@gmail.com').should('have.value', 'teste@gmail.com')
            .clear().should('have.value', '');
        cy.get('#phone').should('be.visible').type('62999999999').should('have.value', '62999999999')
            .clear().should('have.value', '')
    })

    it('exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', function(){
        cy.get('.button').should('be.visible').click();
        cy.get('.error').should('be.visible');
    })


})
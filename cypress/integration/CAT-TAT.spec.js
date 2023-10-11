/// <reference types="Cypress" />

describe('Central de Atendimento ao Cliente TAT', function () {
    beforeEach(function () {
        cy.visit('./src/index.html')
    })

    it('verifica o titula da aplicação', function () {
        cy.title().should('eq', 'Central de Atendimento ao Cliente TAT')
    })

    it('preenche os campos obrigatórios e envia o formulário', function () {
        const longText = 'Meu nome e Lucas e quero ser um dos melhores QAs, para ter um grande futuro na área e ajudar todos que gosto.';
        cy.get('#firstName')
            .type('Lucas')

        cy.get('#lastName')
            .type('da Silva')

        cy.get('#email')
            .type('lucas2000544@gmail.com')

        cy.get('#open-text-area')
            .type(longText, {delay:0})

        cy.contains('button', 'Enviar')
            .click();

        cy.get('.success')
            .should('be.visible')
    })

    it('exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', function(){
        const longText = 'Meu nome e Lucas e quero ser um dos melhores QAs, para ter um grande futuro na área e ajudar todos que gosto.';
        cy.get('#firstName')
            .type('Lucas')

        cy.get('#lastName')
            .type('da Silva')

        cy.get('#email')
            .type('lucas2000544@gmail,com')

        cy.get('#open-text-area')
            .type(longText, {delay:0})

        cy.contains('button', 'Enviar')
            .click();

        cy.get('.error')
            .should('be.visible')
    })

    it('campo telefone continua vazio quando preenchido com valor não-númerico', function() {
        cy.get('#phone')
        .type('abcdefghij')
        .should('have.value', '')
    })

    it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', function() {
        cy.get('#firstName').type('Lucas')

        cy.get('#lastName').type('da Silva')

        cy.get('#email').type('lucas2000544@gmail.com')

        cy.get('#open-text-area').type('teste')

        cy.get('#phone-checkbox').click()

        cy.contains('button', 'Enviar').click();

        cy.get('.error').should('be.visible')
    })

    it('preenche e limpa os campos nome, sobrenome, email e telefone', function(){
        cy.get('#firstName')
        .type('Lucas')
        .should('have.value', 'Lucas')
        .clear().should('have.value', '')

        cy.get('#lastName')
        .type('da Silva')
        .should('have.value', 'da Silva')
        .clear().should('have.value', '')

        cy.get('#email')
        .type('teste@gmail.com')
        .should('have.value', 'teste@gmail.com')
        .clear().should('have.value', '')

        cy.get('#phone-checkbox').click()

        cy.get('#phone')
        .type('40028922')
        .should('have.value', '40028922')
        .clear().should('have.value', '')
    })

    it('exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', function() {
        cy.contains('button', 'Enviar').click()
        cy.get('.error').should('be.visible')
    })

    it('envia o formuário com sucesso usando um comando customizado', () => {
        cy.fillMandatoryFieldsAndSubmit()
        cy.get('.success').should('be.visible')
    })
})
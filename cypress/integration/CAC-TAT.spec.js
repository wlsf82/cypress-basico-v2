/// <reference types="Cypress" />

describe('Central de Atendimento ao Cliente TAT', function() {
    beforeEach(function() {

           cy.visit('./src/index.html')
        })

    it('Verifica o título da aplicação', function() {

        cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT')
    })

    it('Preenche os campos obrigatórios e envia o formulário', function() {

        const longText = 'Teste Variável LongText 123456789123456789123456789123456789123456789123456789123456789123456789123456789'
        
        cy.get('#firstName')
            .type('Gabriel')
            .should('have.value', 'Gabriel')

        cy.get('#lastName')
            .type('Pena')
            .should('have.value', 'Pena')

        cy.get('#email')
            .type('gabrielpenamessi@gmail.com')
            .should('have.value', 'gabrielpenamessi@gmail.com')

        cy.get('#open-text-area')
            .type(longText, { delay: 0 })
            .should('have.value', longText)

        cy.get('.button[type="submit"]')
            .click()

        cy.get('.success').should('be.visible')
    })    

    it('Exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', function() {
        
        cy.get('#firstName')
            .type('Gabriel')
            .should('have.value', 'Gabriel')

        cy.get('#lastName')
            .type('Pena')
            .should('have.value', 'Pena')

        cy.get('#email')
            .type('gabrielpenamessi@gmail,com')

        cy.get('#phone-checkbox')
            .click()

        cy.get('#phone')
            .type('11987795322')

        cy.get('#open-text-area')
            .type('Vai toma no cu framengo')
            .should('have.value', 'Vai toma no cu framengo')

        cy.get('.button[type="submit"]')
            .click()

        cy.get('.error')
        .should('be.visible')
    })    

    it('Campo Telefone continua vazio quando preenchido com valor não-numérico', function() {

        cy.get('#phone')
            .type('abcdefghijkl')
            .should('have.value', '')
    })

    it('Exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', function() {

        cy.get('#firstName')
            .type('Gabriel')
            .should('have.value', 'Gabriel')

        cy.get('#lastName')
            .type('Pena')
            .should('have.value', 'Pena')

        cy.get('#email')
            .type('gabrielpenamessi@gmail.com')

        cy.get('#phone-checkbox')
            .click()

        cy.get('#open-text-area')
            .type('Vai toma no cu framengo')
            .should('have.value', 'Vai toma no cu framengo')

        cy.get('.button[type="submit"]')
            .click()

        cy.get('.error')
        .should('be.visible')
    })

    it('Preenche e limpa os campos nome, sobrenome, email e telefone', function(){

        cy.get('#firstName')
            .type('Gabriel')
            .should('have.value', 'Gabriel')
            .clear()
            .should('have.value', '')

        cy.get('#lastName')
            .type('Pena')
            .should('have.value', 'Pena')
            .clear()
            .should('have.value', '')

        cy.get('#email')
            .type('gabrielpenamessi@gmail.com')
            .clear()
            .should('have.value', '')

        cy.get('#phone')
            .type('12345678')
            .clear()
            .should('have.value', '')
    })

    it('Exibe mensagem de erro ao submeter o formulário sem, preencher os campos obrigatórios', function() {
        
        cy.get('.button[type="submit"]').click()
        
        cy.get('.error').should('be.visible')
    })

    it.only('Envia o formulário com sucesso usando um comando customizado', function() {
        cy.teste()

        cy.get('.success').should('be.visible')
    })
});

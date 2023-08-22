/// <reference types="Cypress" />

describe('Central de Atendimento ao Cliente TAT', function () {

    beforeEach(() => {
        cy.visit('./src/index.html')
    })

    it('verifica o título da aplicação', function () {
        cy.title()
            .should('be.equal', 'Central de Atendimento ao Cliente TAT')

    })

    it('Preenchendo campos obrigatorios do formulario', function () {
        cy.get('input[name="firstName"]').type('Cat')
        cy.get('input[name="lastName"]').type('TAT')
        cy.get('#email').type('Cattat@gmail.com')
        cy.get('#open-text-area').type('Teste de envio')
        cy.get('.button').click()
        cy.get('.success').click().should('be.visible')
    })

    it('Exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', function () {
        cy.get('.button').click()
        cy.get('.error').should('be.visible')
    })

    it('Valida telefone vazio', function () {
        cy.get('#phone').type('teste')
        cy.get('#phone').should('have.value', '')
    })

    it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', function () {
        cy.get('input[name="firstName"]').type('Cat')
        cy.get('input[name="lastName"]').type('TAT')
        cy.get('#phone-checkbox').click()
        cy.get('#email').type('Cattat@gmail.com')
        cy.get('#open-text-area').type('Teste de envio')
        cy.get('.button').click()
        cy.get('.error').click().should('be.visible')
    })

    it('preenche e limpa os campos nome, sobrenome, email e telefone', function () {
        cy.get('input[name="firstName"]').type('Cat').should('have.value', 'Cat')
        cy.get('input[name="lastName"]').type('TAT').should('have.value', 'TAT')
        cy.get('#email').type('Cattat@gmail.com').should('have.value', 'Cattat@gmail.com')
        cy.get('#phone').type('1122334455').should('have.value', '1122334455')

        cy.get('input[name="firstName"]').clear().should('have.value', '')
        cy.get('input[name="lastName"]').clear().should('have.value', '')
        cy.get('#email').clear().should('have.value', '')
        cy.get('#phone').clear().should('have.value', '')

    })
    it('envia o formuário com sucesso usando um comando customizado', function () {
        cy.fillMandatoryFieldsAndSubmit()
        cy.get('.success').click().should('be.visible')
    })

    it('Usando contains no formulario', function (){
        cy.get('input[name="firstName"]').type('Cat')
        cy.get('input[name="lastName"]').type('TAT')
        cy.get('#email').type('Cattat@gmail.com')
        cy.get('#open-text-area').type('Teste de envio')
        cy.contains('.button','Enviar').click()
        cy.get('.success').click().should('be.visible')
    })
})
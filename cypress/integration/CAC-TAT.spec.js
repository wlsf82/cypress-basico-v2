/// <reference types="Cypress" />

describe('Central de Atendimento ao Cliente TAT', function() {
    beforeEach(function() {
        cy.visit('./src/index.html')
    })
    it('verifica o título da aplicação', function() { //Aqui vem o testcase
        cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT')
    })
    it('preenche os campos obrigatórios e envia o formulario', function() {
        const longText = 'Texto longo, texto longo, texto longo, texto longo, texto longo.'
    //task('Quando o usuario preenche os campos obrigatórios e submete o formulário')
    cy.fillMandatoryFieldsAndSubmit()
   // task('Então a mensagem de sucesso é visivél')
        cy.get('.success').should('be.visible')
    }) 

    it('exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', function() {
        cy.get('#firstName').type('Willames')
        cy.get('#lastName').type('Vital')
        cy.get('#email').type('willames@test,com')
        cy.get('#open-text-area').type('teste')
        cy.contains('button', 'Enviar').click()

        cy.get('.error').should('be.visible')

    })

    it('campo telefonico continua vazio quando preenchido com valor não-numerico', function() {
      cy.get('#phone')
        .type('abcdefghij')
        .should('have.value', '')
    })

    it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', function() {
        cy.get('#firstName').type('Willames')
        cy.get('#lastName').type('Vital')
        cy.get('#email').type('willames@test,com')
        cy.get('#open-text-area').type('teste')
        cy.contains('button', 'Enviar').click()

        cy.get('#phone-checkbox').click()

        cy.get('.error').should('be.visible')
        
      })

    it('preenche e limpa os campos nome, sobrenome, email e telefone', function() {
        cy.get('#firstName')
        .type('Willames')
        .should('have.value', 'Willames')
        .clear()
        .should('have.value', '')

        cy.get('#lastName')
        .type('Vital')
        .should('have.value', 'Vital')
        .clear()
        .should('have.value', '')

        cy.get('#email')
        .type('willames@test.com')
        .should('have.value', 'willames@test.com')
        .clear()
        .should('have.value', '')

        cy.get('#phone-checkbox')
        .click()

        cy.get('#phone')
        .type('123456789')
        .should('have.value', '123456789')
        .clear()
        .should('have.value', '')

    })

    it('exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', function() {
        cy.contains('button', 'Enviar').click()

        cy.get('.error').should('be.visible')
    })

    it('envia o formuário com sucesso usando um comando customizado', function() {
        cy.fillMandatoryFieldsAndSubmit()

        cy.get('.success').should('be.visible')        
    })

    it('envia o formuário com sucesso usando um comando customizado', function() {
    
    })
})
  
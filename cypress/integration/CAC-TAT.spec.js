/// <reference types="Cypress" />

const firstName = "Ana"
const lastName = "Carolina Stadelhofer"
const email = "ana.stadelhofer@cypress.com"
const phone = "123456789"

describe('Central de Atendimento ao Cliente TAT', function() {
    beforeEach(() => {
        cy.visit('./src/index.html')
    })
    it('Verifica o título da aplicação', function() {
        cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT')
    })
    it('Preenche os campos obrigatórios e envia o formulário', function() {
        cy.get('#firstName').type('Ana')
        cy.get('#lastName').type('Carolina Stadelhofer')
        cy.get('#email').type('ana.stadelhofer@cypress.com')
        cy.get('#open-text-area').type('Gostaria de fazer um pedido de atendimento, porém estou com dificuldades de realizar o contato.')
        cy.get('.button').click()
        cy.get('.success').should('be.visible')
    })

    it('Alterado o delay da digitação', function() {
        const longText = 'Texto longo, Texto longo, Texto longo, Texto longo, Texto longo, Texto longo, Texto longo, Texto longo, Texto longo, Texto longo, Texto longo, Texto longo, Texto longo, Texto longo, Texto longo, Texto longo, Texto longo, Texto longo, Texto longo, Texto longo, Texto longo, Texto longo, Texto longo'
        cy.get('#open-text-area').type(longText, { delay: 0 })
    })

    it('Exibe mensagem de erro ao submeter o formulário com um email com formatação inválid', function() {
        cy.get('#firstName').type('Ana')
        cy.get('#lastName').type('Carolina Stadelhofer')
        cy.get('#email').type('ana.stadelhofer')
        cy.get('#open-text-area').type('Gostaria de fazer um pedido de atendimento, porém estou com dificuldades de realizar o contato.')
        cy.get('.button').click()
        cy.get('.error').should('be.visible')
    })

    it('Verificar valores númericos em campo telefone do usuário', function() {
        cy.get('#phone').type('abcdef').should('have.value', '')
        cy.get('#phone').type('12345678').should('have.value', 12345678)
    })

    it('Exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', function(){
        cy.get('#firstName').type('Ana')
        cy.get('#lastName').type('Carolina Stadelhofer')
        cy.get('#email').type('ana.stadelhofer@cypres.com')
        cy.get('#phone-checkbox').check()
        cy.get('#open-text-area').type('Gostaria de fazer um pedido de atendimento, porém estou com dificuldades de realizar o contato.')
        cy.get('.button').click()
        cy.get('.error').should('be.visible')
    })

    it('Preencher os campos nome, sobrenome, email e telefone, após isso limpar os campos', function() {
        cy.get('#firstName').type(firstName).should('have.value', firstName)
        cy.get('#lastName').type(lastName).should('have.value', lastName)
        cy.get('#email').type(email).should('have.value', email)
        cy.get('#phone').type(phone).should('have.value', phone)
        // Clear inputs
        cy.get('#firstName').clear().should('have.value', '')
        cy.get('#lastName').clear().should('have.value', '')
        cy.get('#email').clear().should('have.value', '')
        cy.get('#phone').clear().should('have.value', '')
    })

    it('Exibir mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', function() {
        cy.get('.button').click()
        cy.get('.error').should('be.visible')
    })

    it('Enviar o formuário com sucesso usando um comando customizado', function() {
        cy.fillMandatoryFields()
        cy.get('.button').click()
        cy.get('.success').should('be.visible')
    })

    it('Enviar fórmulário utilizando o .contains()', function() {
        cy.fillMandatoryFields()
        cy.contains('button', 'Enviar').click()
        cy.get('.success').should('be.visible')
    })
  })
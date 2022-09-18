/// <reference types="Cypress" />

describe('Central de Atendimento ao Cliente TAT', function() {
    beforeEach(function() {
        cy.visit('./src/index.html')
    })

    it('verifica o título da aplicação', function() {   
        cy.title().should('be.equal','Central Atendimento ao Cliente TAT')
    })



    it('preenche os campos obrigatórios e envia o formulário', function() {
        cy.get('#firstName').type('Nilton')
        cy.get('#lastName').type('Santos')
        cy.get('#email').type('niltongomessantos@yahoo.com.br')
        cy.get('#open-text-area').type('texto')
        cy.contains('button', 'Enviar').click()

        cy.get('.success').should('be.visible')
    })

    it('exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', function() {
        cy.get('#firstName').type('Nilton')
        cy.get('#lastName').type('Santos')
        cy.get('#email').type('niltongomessantosyahoo.com.br')
        cy.get('#open-text-area').type('texto')
        cy.get('button[type=submit]').click()

        cy.get('.success').should('be.visible')
    })

    it('campo telefone continua vazio quando preenchido com valor não numerico', function() {
        cy.get('#phone').type('asdfghjk').should('have.value', '')
    })

    it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', function(){
        cy.get('#firstName').type('Nilton')
        cy.get('#lastName').type('Santos')
        cy.get('#email').type('niltongomessantos@yahoo.com.br')
        cy.get('#phone-checkbox').check()
        cy.get('#open-text-area').type('texto')
        cy.get('button[type=submit]').click()

        cy.get('.error').should('be.visible')
    })

    it('exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios.', function() {
        cy.get('button[type=submit]').click()
        cy.get('.error').should('be.visible')
    })

    it('envia o formuário com sucesso usando um comando customizado', function() {
        cy.fillMandatoryFieldsAndSubmit()
        cy.get('.success')
          .should('be.visible')
    })

    it('seleciona um produto (YouTube) por seu texto', function() {

        cy.get('#product')
          .select('YouTube')
          .should('have.value', 'youtube')
    })
    
    it('seleciona um produto (Mentoria) por seu valor (value)', function() {
        cy.get('#product')
        .select('mentoria')
        .should('have.value', 'mentoria')
    })

    it('seleciona um produto (Blog) por seu índice', function() {
        cy.get('#product')
          .select(1)
          .should('have.value','blog')
    })

    it('marca o tipo de atendimento Feedback', function() {
        cy.get('input[type="radio"][value="feedback"]')
          .check()
          .should('have.value', 'feedback')
    })

    it('marca cada tipo de atendimento', function() {
        cy.get('input[type="radio"]')
          .should('have.length', 3)
          .each(function($radio) {
            cy.wrap($radio).check()
            cy.wrap($radio).should('be.checked')
          })
    })

    it('marca ambos checkboxes, depois desmarca o último', function() {
        cy.get('input[type="checkbox"]')
          .check().should('be.checked')
          .last()
          .uncheck().should('not.be.checked')




    })


  })

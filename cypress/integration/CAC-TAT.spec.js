// CAC-TAT.spec.js created with Cypress
//
// Start writing your Cypress tests below!
// If you're unfamiliar with how Cypress works,
// check out the link below and learn how to write your first test:
// https://on.cypress.io/writing-first-test

/// <reference types="cypress"/>

const cypress = require("cypress")

describe('Central de Atendimento ao Cliente TAT', function() { //aqui é minha suite de testes
    this.beforeEach(function() {
        cy.viewport(1024, 768)
        cy.visit('./src/index.html')
            })
            
    it('verifica o título da aplicação', function() { // aqui é o caso de teste "it" 
        cy.visit ('./src/index.html')
        cy.title().should('eq', 'Central de Atendimento ao Cliente TAT')
    })
    it.only ('preenche os campos obrigatorios e envia o form', function() { // .only para executar somente etste teste
        cy.get('#firstName').type('Claudio')
        cy.get('#lastName').type('Feitosa')
        cy.get('#email').type('claudio.cpf.cpf@gmail.com')
        cy.get('#open-text-area').type("Teste")
        cy.contains('button','Enviar').click() // pegando o botão enviar usando o conteins
        cy.get('.success').should('be.visible')
    })
    it('usando o delay- Exercicio extra1', function(){
        const longtext = "Lorem ipsum dolor sit amet esse enim laborum Excepteur exercitation aliquip ex velit consectetur adipiscing tempor quis Duis do magnment---Excepteur exercitation aliquip ex velit consectetur adipiscing tempor quis Duis do magnment"
        cy.get('#open-text-area').type(longtext,{delay : 0}) // a proprieadade 'delay' altera a velocidade da digitação

    })
    it('EX2 - exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', function(){
        cy.get('#firstName').type('Claudio')
        cy.get('#lastName').type('Feitosa')
        cy.get('#email').type('claudio.cpf.cpf@gmail,com')
        cy.get('#open-text-area').type("Teste")
        cy.get('button[type="submit"]').click() /// exemplo de como pegar o botão usando o get
        cy.get('.error').should('be.visible')
    })

    it('Ex3 - Telefone invalido', function(){
      
        cy.get('#phone').type('aaaaa')
        cy.get('#phone').should('have.value', '') // aqui pego o valor depois de digitar, caso vazio ok caso contrario o caso passa 
    })

    it('ex4 - telefone obrigatorio porem esta em branco', function(){
        cy.get('#firstName').type('Claudio').clear()
        cy.get('#lastName').type('Feitosa')
        cy.get('#email').type('claudio.cpf.cpf@gmail,com')
        cy.get('#phone-checkbox').check()
        cy.get('#open-text-area').type("Teste")
        cy.contains('button','Enviar').click()
        cy.get('.error').should('be.visible')
    })
    it('ex5 - preenche e limpa os campos nome, sobrenome, email e telefone', function(){
        cy.get('#firstName').type('Claudio')
        .should('have.value','Claudio')
        .clear()
        .should('have.value','')

        cy.get('#lastName').type('Feitosa')
        .should('have.value', 'Feitosa')
        .clear()
        .should('have.value','')

        cy.get('#email').type('claudio.cpf.cpf@gmail,com')
        .should('have.value','claudio.cpf.cpf@gmail,com')
        .clear()
        .should('have.value', '')

        cy.get('#phone').type('1234567')
        .should('have.value','1234567')
        .clear()
        .should('have.value', '')        
    })

    it('ex6 -exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', function(){
        cy.contains('button', 'Enviar').click()
        cy.get('.error').should('be.visible')
    })
    it('ex7 envia o formualrio com sucesso usando comando customizado',function(){
        cy.fillMandatoryFieldsAndSubmit()
        cy.get('.success').should('be.visible')
    
    })

    it('seleciona um produto(Youtube) por seu texto', function(){
        cy.get('#product')
        .select('YouTube')
        .should('have.value','youtube')       
    })

    
    it ('seleciona um produto(Mentoria) por seu value', function(){
        cy.get('#product')
        .select('mentoria')
        .should('have.value','mentoria')       
    })

    it ('seleciona um produto(Blog) por seu indice', function(){
        cy.get('#product')
        .select(1)
        .should('have.value','blog')       
    })

    it('seleciona um produto(Blog) por seu indice', function(){
        cy.get('#product')
        .select(1)
        .should('have.value','blog')       
    })

// marcando input do tipo radio
    it ('Marca tipo de atendimento feedback', function(){
        cy.get('input[type="radio"]').check('feedback')
        .should('be.visible','feedback')
    })

    // selecionar cada item do radio button
    it ('Marca cada tipo de entendimento', function() {
        cy.get('input[type="radio"]')
          .should('have.length',3)
          .each(function($radio){
            cy.wrap($radio).check()
            cy.wrap($radio).should('be.checked')
        })
    })

    it('marca todos os checkboxes e desmarca o ultimo', function(){
        cy.get('input[type="checkbox"]').check()
        .should('be.visible')
        
        cy.get('input[type="checkbox"] ').uncheck('phone')
        .should('not.be.checked')
    })

    it('marca todos os checkboxes e desmarca o ultimo- professor', function(){
        cy.get('input[type="checkbox"]')
        .check()
        .should('be.visible')
        .last()
        .uncheck()
        .should('not.be.checked')
    })

    it('- Aula 6 ex1: Seleciona um arquivo da pasta fixtures', function() { 
        cy.get('input[type="file"]')
          .should('not.have.value')
          .selectFile('./cypress/fixtures/example.json')
          .should(function($input){
            console.log($input)
            expect($input[0].files[0].name).to.equal('example.json')
            
            //(input[0].files[0].name).to.equal('example.json')
        })

    })
})

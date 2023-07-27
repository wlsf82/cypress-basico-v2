// CAC-TAT.spec.js created with Cypress
//
// Start writing your Cypress tests below!
// If you're unfamiliar with how Cypress works,
// check out the link below and learn how to write your first test:
// https://on.cypress.io/writing-first-test

/// <reference types="cypress"/>

describe('Central de Atendimento ao Cliente TAT', function() { //aqui é minha suite de testes
    this.beforeEach(function() {
        cy.visit('./src/index.html')
            })
    it('verifica o título da aplicação', function() { // aqui é o caso de teste "it" 
        cy.visit ('./src/index.html')
        cy.title().should('eq', 'Central de Atendimento ao Cliente TAT')
    })
    it ('preenche os campos obrigatorios e envia o form', function() { // .only para executar somente etste teste
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
      
        cy.get('#phone').type('')
        cy.get('#phone').should('have.value', '') // aqui pego o valor depois de digitar, caso vazio ok caso contrario o caso passa 
    })

    it('ex4 - telefone obrigatorio porem esta em branco', function(){
        cy.get('#firstName').type('Claudio').clear()
        cy.get('#lastName').type('Feitosa')
        cy.get('#email').type('claudio.cpf.cpf@gmail,com')
        cy.get('#phone').type('sss')
        cy.get('#open-text-area').type("Teste")
        cy.get('#phone-checkbox').click()
        cy.contains('button','enviar').click()
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
  })
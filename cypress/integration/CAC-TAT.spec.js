/// <reference types="Cypress" />

// O bloco DESCRIBE define a suíte de testes, e o bloco IT, define um caso de teste.

describe('Central de Atendimento ao Cliente TAT', function() {
    beforeEach(function() {
        cy.visit('./src/index.html')
    })

    it('verifica o título da aplicação', function() {      
        cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT')
    })

    // Exercício 1
    it('preenche os campos obrigatórios e envia o formulário', function() {
        cy.get('#firstName').type('Luiz')
        cy.get('#lastName').type('Carlos')
        cy.get('#email').type('teste@email.com')
        cy.get('#open-text-area').type('Teste de área de texto', { delay: 0 })
        
        cy.contains('button', 'Enviar').click()

        cy.get('.success').should('be.visible')
    })

    // Exercício 2
    it('exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', function() {
        cy.get('#firstName').type('Luiz')
        cy.get('#email').type('teste@email.com')
        cy.get('#open-text-area').type('Teste de área de texto', { delay: 0 })
        
        cy.contains('button', 'Enviar').click()

        cy.get('.error').should('be.visible')
    })

    // Exercício 3
    it('campo telefone continua vazio quando preenchido com valor não-numérico', function() {
        cy.get('#phone')
          .type('abcdefghij')
          .should('have.value', '')
    })

    // Exercício 4
    it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', function() {
        cy.get('#firstName').type('Luiz')
        cy.get('#lastName').type('Carlos')
        cy.get('#email').type('teste@email.com')
        cy.get('#phone-checkbox').click()
        cy.get('#open-text-area').type('Teste de área de texto')
        
        cy.contains('button', 'Enviar').click()

        cy.get('.error').should('be.visible')
    })

    // Exercício 5
    it('preenche e limpa os campos nome, sobrenome, email e telefone', function() {
        cy.get('#firstName')
          .type('Luiz')
          .should('have.value', 'Luiz')
          .clear()
          .should('have.value', '')

        cy.get('#lastName')
          .type('Carlos')
          .should('have.value', 'Carlos')
          .clear()
          .should('have.value', '')

        cy.get('#email')
          .type('teste@email.com')
          .should('have.value', 'teste@email.com')
          .clear()
          .should('have.value', '')

        cy.get('#phone')
          .type('61984848484')
          .should('have.value', '61984848484')
          .clear()
          .should('have.value', '')

        cy.get('#open-text-area')
          .type('Teste de área de texto')
          .should('have.value', 'Teste de área de texto')
          .clear()
          .should('have.value', '')
    })

    // Exercício 6
    it('exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', function() {
      cy.contains('button', 'Enviar').click()

      cy.get('.error').should('be.visible')
    })

    // Exercício 7 - Custom Commands
    it('envia o formulário com sucesso usando um comando customizado', function() {
      cy.fillMandatoryFieldsAndSubmit()

      cy.get('.success').should('be.visible')
    }) 


})


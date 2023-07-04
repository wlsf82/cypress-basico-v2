// CAC-TAT.spec.js created with Cypress
//
// Start writing your Cypress tests below!
// If you're unfamiliar with how Cypress works,
// check out the link below and learn how to write your first test:
// https://on.cypress.io/writing-first-test
/// <reference types="Cypress" />


describe('Central de Atendimento ao Cliente TAT', function() {

  beforeEach(() => {
    cy.visit('./src/index.html')
  })
    it('verifica o título da aplicação', function() {
      cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT')
    })
     //Exercício aula 1
    it('preenche os campos obrigatórios e envia o formulário', () => {
      const longText = 'vita frui quia brevis est sicut fulgur cum advenerit, terremur et subito dilabimur spectaculum erat cum cognovimus'

      cy.get('#firstName').type('Ana')
      cy.get('#lastName').type('Silva')
      cy.get('#email').type('ana@email.com')
      cy.get('#phone').type('55999899658')
      cy.get('#open-text-area').type('longText', {delay: 0})
      cy.get('.button[type="submit"]').click({forece: true})

      cy.get('.success').should('be.visible')
    })
    //exercio extra 2
    it('exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', () => {
      cy.get('#firstName').type('Ana')
      cy.get('#lastName').type('Silva')
      cy.get('#email').type('ana@.com')
      cy.get('#phone').type('55999899658')
      cy.get('.button[type="submit"]').click({forece: true})
      
      cy.get('.error').should('be.visible')
    })
    //exercio extra 3
    it('verifica se o campo telefone contém apenas valores numéricos', () => {
      cy.get('#phone').type('ana').should('have.value', '')     
    })
    //exercio extra 4
    it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', () => {
      cy.get('#firstName').type('Ana')
      cy.get('#lastName').type('Silva')
      cy.get('#email').type('ana@email.com')
      cy.get('#phone-checkbox').click({force:true})
      cy.get('#open-text-area').type('Teste de digitação')
      cy.get('.button[type="submit"]').click({forece: true})
      
      cy.get('.error').should('be.visible')
    })
    //exercio extra 5
    it('preenche e limpa os campos nome, sobrenome, email e telefone', () => {
      cy.get('#firstName').type('Ana').should('have.value', 'Ana').clear().should('have.value', '')
      cy.get('#lastName').type('Silva').should('have.value', 'Silva').clear().should('have.value', '')
      cy.get('#email').type('ana@email.com').should('have.value', 'ana@email.com').clear().should('have.value', '')
      cy.get('#open-text-area').type('Teste de digitação').should('have.value', 'Teste de digitação').clear().should('have.value', '')
      cy.get('.button[type="submit"]').click({forece: true})
      
      cy.get('.error').should('be.visible')
    })
    //exercicio extra 6
    it('exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', () => {
      cy.get('.button[type="submit"]').click({forece: true})
      cy.get('.error').should('be.visible')

    })
    //exercicio extra 7 - comandos customizados
    it('envia o formuário com sucesso usando um comando customizado', () => {
      cy.fillMandatoryFieldsAndSubmit()

      cy.get('.success').should('be.visible')
    }) 
    //exercício extra 8 - utilizar o cy.contains()
    it('utilizar cy.contains para o botão enviar', () => {
      cy.get('#firstName').type('Ana').should('have.value', 'Ana').clear().should('have.value', '')
      cy.get('#lastName').type('Silva').should('have.value', 'Silva').clear().should('have.value', '')
      cy.get('#email').type('ana@email.com').should('have.value', 'ana@email.com').clear().should('have.value', '')
      cy.get('#open-text-area').type('Teste de digitação').should('have.value', 'Teste de digitação').clear().should('have.value', '')
      cy.contains('button', 'Enviar').click({forece: true})
    })
  })
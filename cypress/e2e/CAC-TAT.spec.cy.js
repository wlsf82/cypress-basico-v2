/// <reference types="Cypress" />

describe('Central de Atendimento ao Cliente TAT', function() {
  beforeEach(function(){
    cy.visit('./src/index.html')

  })

  it('verifica o título da aplicação', function() {
    cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT')
  })

  it('preenche os campos obrigatórios e envia o formulário', () => {
    cy.get('#firstName').type('Henrique')
    cy.get('#lastName').type('Marcossi')
    cy.get('#email').type('hmarcossi@gmail.com')
    cy.get('#open-text-area').type('Teste', {delay: 0})
    cy.contains('button', 'Enviar').click()
    cy.get('.success').should('be.visible')
  });

  it('Exibe mensagem de erro ao informar email inválido', () => {
    cy.get('#firstName').type('Henrique')
    cy.get('#lastName').type('Marcossi')
    cy.get('#email').type('hmarcossi@gmail,com')
    cy.contains('button', 'Enviar').click()
    cy.get('.error').should('be.visible')
  });

  it('Campo telefone vaziu ao preencher com valor não númerico', () => {
    cy.get('#phone')
      .type('abcde')
      .should('have.value','')
  });

  it('Telefone obrigátorio mas sem preenchimento-Valida msg de erro', () => {
    cy.get('#firstName').type('Henrique')
    cy.get('#lastName').type('Marcossi')
    cy.get('#email').type('hmarcossi@gmail.com')
    cy.get('#phone-checkbox').click()
    cy.get('#open-text-area').type('Teste', {delay: 0})
    cy.contains('button', 'Enviar').click()
    cy.get('.error').should('be.visible')
  });

  it('Preenche e limpa os campos: nome, sobrenome, email e telefone', () => {
    cy.get('#firstName')
      .type('Henrique')
      .should('have.value', 'Henrique')
      .clear()
      .should('have.value', '')
  });

  it('exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', () => {
    cy.contains('button', 'Enviar').click()
    cy.get('.error').should('be.visible')
  });

  it('Comando Customizado', () => {
    cy.fillMandatoryFieldsAndSubmit()
    cy.get('.success').should('be.visible')
  });






})
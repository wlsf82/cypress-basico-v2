/// <reference types="Cypress" />

describe('Central de Atendimento ao Cliente TAT', function() {

  beforeEach(function() {
    cy.visit('./src/index.html')
  })

  it('Verifica o título da aplicação', function() {
    cy.title()
      .should('be.equal', 'Central de Atendimento ao Cliente TAT')
  })

  it('Preenche os campos obrigatórios e envia o formulário',function() {
    const longText = 'Texto longo e bem descritoTexto longo e bem descrito, Texto longo e bem descrito, Texto longo e bem descrito, Texto longo e bem descrito'

    cy.get('#firstName')
      .should('be.visible')
      .type('Novo')
    cy.get('#lastName')
      .should('be.visible')
      .type('Usuário')
    cy.get('#email')
      .should('be.visible')
      .type('usuario@mail.com')
    cy.get('#open-text-area')
      .should('be.visible')
      .type(longText,{ delay:0 })
    cy.contains('Enviar')
      .should('be.visible')
      .click()

    cy.get('.success')
      .should('be.visible')
  })

  it('Exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', function() {
    cy.get('#firstName')
      .type('Novo')
    cy.get('#lastName')
      .type('Usuário')
    cy.get('#email')
      .type('usuario@mail,com')
    cy.get('#open-text-area')
      .type('teste')
    cy.contains('Enviar')
      .click()

    cy.get('.error')
      .should('be.visible') 

  })

  it('Verifica campo de telefone ao inserir valor não numérico', function() {
    cy.get('#phone')
      .type('ASDFGHJKL')
      .should('have.value', '')
    
  })
  it('Exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', function() {
    cy.get('#firstName')
      .type('Novo')
    cy.get('#lastName')
      .type('Usuário')
    cy.get('#email')
      .type('usuario@mail,com')
    cy.get('#phone-checkbox')
      .click()
    cy.get('#open-text-area')
      .type('teste')
    cy.contains('Enviar')
      .click()

    cy.get('.error')
      .should('be.visible') 

  })

  it('Preenche e limpa os campos nome, sobrenome, email e telefone', function(){
    cy.get('#firstName')
      .type('Novo')
      .should('have.value', 'Novo')
      .clear()
      .should('have.value', '')
    cy.get('#lastName')
      .type('Usuário')
      .should('have.value', 'Usuário')
      .clear()
      .should('have.value', '')
    cy.get('#email')
      .type('usuario@mail,com')
      .should('have.value', 'usuario@mail,com')
      .clear()
      .should('have.value', '')
    cy.get('#phone')
      .type('999999999')
      .should('have.value', '999999999')
      .clear()
      .should('have.value', '')
  })

  it('Exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', function(){
    cy.contains('Enviar')
      .click()

    cy.get('.error')
      .should('be.visible') 
  })

  it('Envia o formuário com sucesso usando um comando customizado', function(){
    cy.fillMandatoryFieldsAndSubmit()

    cy.get('.success')
      .should('be.visible')
  })

  it.only('Seleciona opção no select de "Produto" e envia formulário', function(){
    cy.fillselecAndSubmit()
    
    cy.get('.success')
      .should('be.visible')
  })


})


/// <reference types="Cypress" />

describe('Central de atendimento ao cliente TAT', () => {

  beforeEach(() => {
    cy.visit('./src/index.html')
  })

  it('Validando o titulo da pagina', () => {


    cy.title().should('eql', 'Central de Atendimento ao Cliente TAT')
  })


  it('preenche os campos obrigatórios e envia o formulário', () => {

    cy.get('#firstName').type('Marcos')
    cy.get('#lastName').type('Fideles')
    cy.get('#email').type('Email@gmail.com')
    cy.get('#open-text-area').type('preciso que voces resolvam meu problema de falta de emprego mandis', { delay: 0 })
    cy.get('button[type*="submit"]').click()
    cy.get('span[class*="success"]').should('be.visible')
      .contains('Mensagem enviada com sucesso.')

  })
  it('exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', () => {
    cy.get('#firstName').type('Marcos')
    cy.get('#lastName').type('Fideles')
    cy.get('#email').type('Email#gmail.com')
    cy.get('#open-text-area').type('preciso que voces resolvam meu problema de falta de emprego mandis', { delay: 0 })
    cy.get('button[type*="submit"]').click()
    cy.get('span[class*="error"]').should('be.visible')
      .contains('Valide os campos obrigatórios!')
  })

  it('exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', () => {
    cy.get('#firstName').type('Marcos')
    cy.get('#lastName').type('Fideles')
    cy.get('#email').type('Email@gmail.com')
    cy.get('#phone').type('--').should('be.empty')
    cy.get('#open-text-area').type('preciso que voces resolvam meu problema de falta de emprego mandis', { delay: 0 })
    cy.get('button[type*="submit"]').click()
    cy.get('span[class*="success"]').should('be.visible')

  })

  it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', () => {
    cy.get('#firstName').type('Marcos')
    cy.get('#lastName').type('Fideles')
    cy.get('#email').type('Email@gmail.com')
    cy.get('#phone-checkbox').click()
    cy.get('#open-text-area').type('preciso que voces resolvam meu problema de falta de emprego mandis', { delay: 0 })
    cy.get('button[type*="submit"]').click()
    cy.get('#phone').type('--').should('be.empty')
    cy.get('span[class*="error"]').should('be.visible').contains('Valide os campos obrigatórios!')

  })
  it('preenche e limpa os campos nome, sobrenome, email e telefone', () => {

    var longText = 'preciso que voces resolvam meu problema de falta de emprego mandis'
    cy.get('#firstName').type('Marcos').should('have.value', 'Marcos')
      .clear().should('to.be.empty')
    cy.get('#lastName').type('Fideles').should('have.value', 'Fideles')
      .clear().should('to.be.empty')
    cy.get('#email').type('Email@gmail.com').should('have.value', 'Email@gmail.com')
      .clear().should('to.be.empty')
    cy.get('#phone-checkbox').click()
    cy.get('#phone').type('1212121').should('have.value', '1212121')
      .clear().should('to.be.empty')
    cy.get('#open-text-area').type(longText, { delay: 0 }).should('have.value', longText)
      .clear().should('to.be.empty')
    cy.contains('button', 'Enviar').click()
    cy.get('span[class*="error"]').should('be.visible')
      .contains('Valide os campos obrigatórios!')

  })
  it('exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', () => {

    cy.contains('button', 'Enviar').click()
    cy.get('span[class*="error"]').should('be.visible')
      .contains('Valide os campos obrigatórios!')
  })

  it('envia o formuário com sucesso usando um comando customizado', () => {

    cy.fillMandatoryFieldsAndSubmit('Marcos', 'Fideles', 'email@gmail.com', '12121212')
  })



})


/// <reference types="Cypress" />

describe('Central de Atendimento ao Cliente TAT', () => {
  const THREE_SECONDS_IN_MS = 3000

  beforeEach(() => {
    cy.section('Pré-condições dos testes')
    cy.step('Visita aplicação em teste')
    cy.visit('./src/index.html')
    cy.step('Verifica que o título está correto')
    cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT')
    cy.step('Congela o relógio do navegador')
    cy.clock()
    cy.section('Fim das pré-condições')
  })

  it('exibe mensagem de sucesso ao preencher os campos obrigatórios e enviar o formulário', () => {
    cy.step('Preenche os campos obrigatórios e submete o formulário')
    cy.fillMandatoryFieldsAndSubmit()

    cy.step('Verifica que a mensagem de sucesso está visível')
    cy.get('.success').should('be.visible')

    cy.step('Avança o relógio do navegador em 3 segundos')
    cy.tick(THREE_SECONDS_IN_MS)
    cy.step('Verifica que a mensagem de sucesso não está mais visível')
    cy.get('.success').should('not.be.visible')
  })

  context('Cenários de erro', () => {
    it('exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', () => {
      const invalidEmailFormat = { email: 'walmyr$exemplo,com' }

      cy.step('Preenche os campos obrigatórios com um email inválido e submete o formulário')
      cy.fillMandatoryFieldsAndSubmit(invalidEmailFormat)

      cy.step('Verifica que a mensagem de erro está visível')
      cy.get('.error').should('be.visible')

      cy.step('Avança o relógio do navegador em 3 segundos')
      cy.tick(THREE_SECONDS_IN_MS)
      cy.step('Verifica que a erro de sucesso não está mais visível')
      cy.get('.error').should('not.be.visible')
    })

    it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', () => {
      cy.step('Marca o checkbox telefone')
      cy.get('#phone-checkbox').check()
      cy.step('Preench os campos obrigatórios (sem o telefone) e submete o formulário')
      cy.fillMandatoryFieldsAndSubmit()

      cy.step('Verifica que a mensagem de erro está visível')
      cy.get('.error').should('be.visible')

      cy.step('Avança o relógio do navegador em 3 segundos')
      cy.tick(THREE_SECONDS_IN_MS)
      cy.step('Verifica que a erro de sucesso não está mais visível')
      cy.get('.error').should('not.be.visible')
    })

    it('exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', () => {
      cy.step('Clica no botão enviar')
      cy.contains('button', 'Enviar').click()

      cy.step('Verifica que a mensagem de erro está visível')
      cy.get('.error').should('be.visible')

      cy.step('Avança o relógio do navegador em 3 segundos')
      cy.tick(THREE_SECONDS_IN_MS)
      cy.step('Verifica que a erro de sucesso não está mais visível')
      cy.get('.error').should('not.be.visible')
    })
  })
})

/// <reference types="Cypress" />

describe('Central de Atendimento ao Cliente TAT', () => {
  const THREE_SECONDS_IN_MS = 3000

  beforeEach(() => {
    cy.visit('./src/index.html')
    cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT')
    cy.clock()
  })

  it('exibe mensagem de sucesso ao preencher os campos obrigatórios e enviar o formulário', () => {
    cy.fillMandatoryFieldsAndSubmit()

    cy.get('.success').should('be.visible')

    cy.tick(THREE_SECONDS_IN_MS)
    cy.get('.success').should('not.be.visible')
  })

  context('Cenários de erro', () => {
    it('exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', () => {
      const invalidEmailFormat = { email: 'walmyr$exemplo,com' }

      cy.fillMandatoryFieldsAndSubmit(invalidEmailFormat)

      cy.get('.error').should('be.visible')

      cy.tick(THREE_SECONDS_IN_MS)
      cy.get('.error').should('not.be.visible')
    })

    it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', () => {
      cy.get('#phone-checkbox').check()
      cy.fillMandatoryFieldsAndSubmit()

      cy.get('.error').should('be.visible')

      cy.tick(THREE_SECONDS_IN_MS)
      cy.get('.error').should('not.be.visible')
    })

    it('exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', () => {
      cy.contains('button', 'Enviar').click()

      cy.get('.error').should('be.visible')

      cy.tick(THREE_SECONDS_IN_MS)
      cy.get('.error').should('not.be.visible')
    })
  })
})

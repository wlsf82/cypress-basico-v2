/// <reference types="Cypress" />

describe('Central de Atendimento ao Cliente TAT', function() {
  const THREE_SECONDS_IN_MS = 3000

  beforeEach(function() {
    cy.visit('./src/index.html')
    cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT')
    cy.contains('button', 'Enviar').as('sendButton')
    cy.clock()
  })

  it('exibe mensagem de sucesso ao preencher os campos obrigatórios e enviar o formulário', function() {
    cy.fillMandatoryFields()
    cy.get('@sendButton').click()

    cy.get('.success').should('be.visible')

    cy.tick(THREE_SECONDS_IN_MS)
    cy.get('.success').should('not.be.visible')
  })

  context('Cenários de erro', function() {
    beforeEach(function() {
      cy.get('.error').as('errorMsg')
    })

    it('exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', function() {
      const invalidEmailFormat = { email: 'walmyr@exemplo,com' }

      cy.fillMandatoryFields(invalidEmailFormat)
      cy.get('@sendButton').click()

      cy.get('@errorMsg').should('be.visible')

      cy.tick(THREE_SECONDS_IN_MS)
      cy.get('@errorMsg').should('not.be.visible')
    })

    it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', function() {
      cy.fillMandatoryFields()
      cy.get('#phone-checkbox').check()
      cy.get('@sendButton').click()

      cy.get('@errorMsg').should('be.visible')

      cy.tick(THREE_SECONDS_IN_MS)
      cy.get('@errorMsg').should('not.be.visible')
    })

    it('exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', function() {
      cy.get('@sendButton').click()

      cy.get('@errorMsg').should('be.visible')

      cy.tick(THREE_SECONDS_IN_MS)
      cy.get('@errorMsg').should('not.be.visible')
    })
  })
})

/// <reference types="Cypress" />

describe('Central de Atendimento ao Cliente TAT', function() {
    beforeEach(() => {
        cy.visit('./src/index.html')
    })
    it('Verifica o título da aplicação', function() {
        cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT')
    })
    it('Preenche os campos obrigatórios e envia o formulário', function() {
        cy.get('#firstName').type('Ana')
        cy.get('#lastName').type('Carolina Stadelhofer')
        cy.get('#email').type('ana.stadelhofer@cypress.com')
        cy.get('#open-text-area').type('Gostaria de fazer um pedido de atendimento, porém estou com dificuldades de realizar o contato.')
        cy.get('.button').click()
        cy.get('.success').should('be.visible')
    })

    it('Alterado o delay da digitação', function() {
        const longText = 'Texto longo, Texto longo, Texto longo, Texto longo, Texto longo, Texto longo, Texto longo, Texto longo, Texto longo, Texto longo, Texto longo, Texto longo, Texto longo, Texto longo, Texto longo, Texto longo, Texto longo, Texto longo, Texto longo, Texto longo, Texto longo, Texto longo, Texto longo'
        cy.get('#open-text-area').type(longText, { delay: 0 })
    })

    it('Exibe mensagem de erro ao submeter o formulário com um email com formatação inválid', function() {
        cy.get('#firstName').type('Ana')
        cy.get('#lastName').type('Carolina Stadelhofer')
        cy.get('#email').type('ana.stadelhofer')
        cy.get('#open-text-area').type('Gostaria de fazer um pedido de atendimento, porém estou com dificuldades de realizar o contato.')
        cy.get('.button').click()
        cy.get('.error').should('be.visible')
    })
  })
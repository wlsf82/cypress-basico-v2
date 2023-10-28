/// <reference types="Cypress" />

describe('Central de Atendimento ao Cliente TAT', function() {

  beforeEach(function(){
    cy.visit('./src/index.html')
  })

    it('verificar o titulo da aplicação', () => {
      cy.title().should('eq', 'Central de Atendimento ao Cliente TAT')
    })
  
  it('preenche os campos obrigatórios e envia o formulário', () => {
      
      cy.get('#firstName').type('jeniffer')
      cy.get('#lastName').type('souza')
      cy.get('#email').type('ajenifferbsouza@gmail.com')
      cy.get('#open-text-area').type('teste de n#01')
      cy.get('.button').click()
      cy.get('.success').should('be.visible')
  })

  
})

      //buscar como referencia os tipos do cypress (Algumas funcionaldiades)
/// <reference types="Cypress"/>  

describe('Customer Service Center TAT', () => {
  beforeEach(function(){
    cy.visit('./src/index.html')
  })

  it('Verify title of the application', () => {
    cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT')
  })

  it.only('Fills in the mandatory fields and submits the form',() => {
    cy.get('#firstName').type('Aline').should('have.value','Aline')
    cy.get('#lastName').type('Santos').should('have.value','Santos')
    cy.get('#email').type('ali.santos@gmail.com').should('have.value','ali.santos@gmail.com')
    cy.get('#phone').type('11955432930').should('have.value','11955432930')
    cy.get('#product').select('Cursos')
    cy.get('[value="elogio"]').check()
    cy.get('#email-checkbox').check()
    cy.get('#open-text-area').type('Agora quero falar algo para poder mostrar o quanto sou grata a tudo')
    cy.get('#file-upload').click()
    cy.get('button[type="submit"]').click()
    cy.get('.success').should('be.visible')
  })
})
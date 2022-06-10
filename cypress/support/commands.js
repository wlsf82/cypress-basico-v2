//AQUI TU CRIA TEUS SCRIPTS QUE SERÃO HERDADOS E SEMPRE REPETIDOS
Cypress.Commands.add('filMandatoryFieldsAndSubmit',function(){
    cy.get('#firstName').type('vi')
    cy.get('#lastName').type('gs')
    cy.get('#email').type('v.g@g.com')
    cy.get('#open-text-area').type('.', { delay:0})
    cy.contains('button','Enviar').click()
    cy.get('.success').should('be.visible')
})
// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

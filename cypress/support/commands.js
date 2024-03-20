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

Cypress.Commands.add('fillMandatoryFieldsAndSubmit', function(){
    cy.get('#firstName').type('Joao')
    cy.get('#lastName').type('da Silva')
    cy.get('#email').type('testmail@gmail.com')
    cy.get('#open-text-area').type('Muito obrigado')
    cy.get('.button').click()
})
Cypress.Commands.add('fillMandatoryFields', function(){
    cy.get('#firstName').type('Joao')
    cy.get('#lastName').type('da Silva')
    cy.get('#email').type('testmail@gmail.com')
    cy.get('#open-text-area').type('Muito obrigado')
    cy.get('.button').click()
})
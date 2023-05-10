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
Cypress.Commands.add('fillMandatoryFieldsAndSubmit', (nome, sobrenome, email,textbox) => { 
    cy.get('input[name="firstName"]')
    .should('be.visible')
    .type(nome)
    .should('have.value', nome)

    cy.get('input[name="lastName"]')
    .should('be.visible')
    .type(sobrenome)
    .should('have.value', sobrenome)

    cy.get('input[type="email"]')
    .should('be.visible')
    .type(email)
    .should('have.value', email)

    cy.get('textarea[name="open-text-area"]')
    .should('be.visible')
    .type(textbox)
    .should('have.value', textbox)

    cy.contains('button','Enviar')
    .click()

})
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

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

//fillMandatoryFieldsAndSubmit
Cypress.Commands.add('fillMandatoryFieldsAndSubmit', () => {
    cy.get('#firstName')
    .type('Michael')
    cy.get('#lastName')
    .type('Vargas da Silveira')
    cy.get('#email')
    .type('michael.silveira@cwi.com.br')
    cy.get('#open-text-area')
    .type('Customizado')
    // 'button[type="submit"]' outra forma de pegar o botão abaixo, segredo é colocar o nome do campo entre conchete
    cy.contains('#white-background > form > button','Enviar') 
    .click()
   
})
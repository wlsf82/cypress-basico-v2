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

const longtext= 'Executando teste de campo de texto de área para verificar quantos caracteres cabem no campo.'


Cypress.Commands.add('fiççMandatoryFieldAndSubmit',()=>{
    cy.get('#firstName').type('Wellington')
    cy.get('#lastName').type('Costa')
    cy.get('#email').type('wellington@cypress.com')

    // quando coloca texto muito longo, usa-se delay para diminuir tempo de teste
    cy.get('#open-text-area').type(longtext,{delay:0})    
    cy.contains('button','Enviar').click()
})
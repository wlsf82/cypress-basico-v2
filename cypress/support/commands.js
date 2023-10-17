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

Cypress.Commands.add('fillMandatoryFieldsAndSubmit',(name,lastName,email, number)=>{
    cy.get('#firstName').type(name)
    cy.get('#lastName').type(lastName)
    cy.get('#email').type(email)
    cy.get('#phone-checkbox').click()
    cy.get('#phone').type(number).should('have.value',number)
    cy.get('#open-text-area').type('preciso que voces resolvam meu problema de falta de emprego mandis', { delay: 0 })
    cy.get('button[type*="submit"]').click()
    cy.get('span[class*="success"]').should('be.visible')
      .contains('Mensagem enviada com sucesso.')

  })
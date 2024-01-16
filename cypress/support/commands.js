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

Cypress.Commands.add('preenchecamposobrigatoriosenvia', function(){
    const longText= 'primeiro teste da ana, Gostaria de enfatizar que o novo modelo estrutural aqui preconizado pode nos levar a considerar a reestruturação das posturas dos órgãos dirigentes com relação às suas atribuições, Caros amigos, a revolução dos costumes promove a alavancagem dos modos de operação convencionais.'
    cy.get('#firstName').type('Ana Maria')
    cy.get('#lastName').type('Teste da Silva Sauro')
    cy.get('#email').type('testezinhos@gmail.com')
    cy.get('#phone').type('44998219935')
    cy.get('#open-text-area').type(longText, {delay:0})
    cy.contains('button', 'Enviar').click()
})
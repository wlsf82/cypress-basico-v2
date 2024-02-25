const { CacTatObject } = require ('../pageobject/CAC-TAT-objects');

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

Cypress.Commands.add('sendForm', function(name, lastName, email, txt){
  const cacTatObject = new CacTatObject()
                      .inputFirstName(name)
                      .inputLastName(lastName)
                      .inputEmail(email)
                      .selectEmailToPreferentialCommunication()
                      .boxTextHowCanWeHelpYou(txt,0)
                      .buttonSend()
})
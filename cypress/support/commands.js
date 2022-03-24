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

Cypress.Commands.add("fillMandatoryFieldsAndSubmit", () => {
  cy.get("#firstName").type("Bruno");
  cy.get("#lastName").type("Bacelar");
  cy.get("#email").type("bruno.bacelar@live.com");
  cy.get("#open-text-area").type(
    "Mussum Ipsum, cacilds vidis litro abertis. Admodum accumsan disputationi eu sit. Vide electram sadipscing et per.Mais vale um bebadis conhecidiss, que um alcoolatra anonimis.Diuretics paradis num copo é motivis de denguis.Vehicula non. Ut sed ex eros. Vivamus sit amet nibh non tellus tristique interdum.",
    { delay: 0 }
  );

  cy.get(".button[type='submit']").click();
});

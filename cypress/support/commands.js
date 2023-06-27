Cypress.Commands.add('fillMandatoryFieldsAndSubmit', () => {
    cy.get('#firstName').type('Jefferson')
    cy.get('#lastName').type('Ferreira')
    cy.get('#email').type('jefferson@exemplo.com')
    cy.get('#open-text-area').type('Teste')
}) 
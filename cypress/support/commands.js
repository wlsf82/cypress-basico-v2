Cypress.Commands.add('fillMandatoryFieldsAndSubmit', function () {
    cy.get('input[name="firstName"]')
        .should('be.visible')
        .type('Marcos')
        .should('have.value', 'Marcos');

    cy.get('input[name="lastName"]')
        .should('be.visible')
        .type('Santos')
        .should('have.value', 'Santos');


    cy.get('input[type="email"]')
        .should('be.visible')
        .type('marcos@gmail.com')
        .should('have.value', 'marcos@gmail.com');

    cy.get('textarea[name="open-text-area"]')
        .should('be.visible')
        .type('Esse é um teste de escrita no text-area')
        .should('have.value', 'Esse é um teste de escrita no text-area');

    cy.contains('button', 'Enviar')
        .should('be.visible')
        .click();
});
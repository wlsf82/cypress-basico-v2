Cypress.Commands.add('fillMandatoryFieldsAndSubmit', () => {
    cy.get('#firstName').type('Lucas')

    cy.get('#lastName').type('da Silva')

    cy.get('#email').type('lucas2000544@gmail.com')

    cy.get('#open-text-area').type('teste')

    cy.contains('button', 'Enviar').click();
})
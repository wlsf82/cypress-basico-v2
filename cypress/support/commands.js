
Cypress.Commands.add('fillMandatoryFieldsAndSubmit', (name, lastName, email, longText) => {
    cy.get('#firstName')
        .should('be.visible')
        .type(name)
        .should('have.value', name)

    cy.get('#lastName')
        .should('be.visible')
        .type(lastName)
        .should('have.value', lastName)

    cy.get('#email')
        .should('be.visible')
        .type(email)
        .should('have.value', email)

    cy.get('#open-text-area')
        .should('be.visible')
        .type(longText)
        .should('have.value', longText)

    cy.contains('button', 'Enviar')
        .should('be.visible')
        .click()

})

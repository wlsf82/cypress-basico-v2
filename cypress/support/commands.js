
Cypress.Commands.add('fillMandatoryFieldsAndSubmit', (name, lastName, email, longTest) => {
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
        .type(longTest)
        .should('have.value', longTest)

    cy.get('.button')
        .should('be.visible')
        .click()

})

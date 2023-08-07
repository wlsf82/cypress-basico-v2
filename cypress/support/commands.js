Cypress.Commands.add('fillMandatoryFieldsAndSubmit', (firstName, lastName, email, openTextArea) => {
    cy.get('#firstName').should('be.visible')
        .type(firstName)
        .should('have.value', firstName);

    cy.get('#lastName').should('be.visible')
        .type(lastName)
        .should('have.value', lastName);

    cy.get('#email').should('be.visible')
        .type(email)
        .should('have.value', email);

    cy.get('#open-text-area').should('be.visible')
        .type(openTextArea, { delay: 0 })
        .should('have.value', openTextArea);

    cy.get('button[type="submit"]').click();
})
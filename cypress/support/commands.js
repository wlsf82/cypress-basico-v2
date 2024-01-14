Cypress.Commands.add('fillMandatoryFieldsAndSubmit', project => {

    cy.get('#firstName').type(project.firstName).should('have.value', project.firstName)
    cy.get('#lastName').type(project.lastName).should('have.value', project.lastName)
    cy.get('#email').type(project.email).should('have.value', project.email)
    cy.get('#open-text-area').type(project.describe, { delay: 0 }).should('have.value', project.describe)
    cy.contains('button','Enviar').click()
})

Cypress.Commands.add('fillMandatoryFieldsAndSubmit', () => {
    cy.get('#firstName').type('gabriel')
    cy.get('#lastName ').type('reis')
    cy.get('#email').type('gabriel@emial.com')
    cy.get('#open-text-area').type('Teste')
    cy.contains('Enviar').click()
})
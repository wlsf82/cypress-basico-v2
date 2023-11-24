Cypress.Commands.add('fillMandatoryFieldsAndSubmit', function() {
    cy.get('#firstName').type('Diogo')
    cy.get('#lastName').type('Marques')
    cy.get('#email').type('diogo@exemplo.com')
    cy.get('#open-text-area').type('Teste')
    cy.get('button[type="submit"]').click()
})
Cypress.Commands.add('fillMandatoryFieldsAndSubmit', function() {
    cy.get('#firstName').type('Pedro')
    cy.get('#lastName').type('Monteiro')
    cy.get('#email').type('pedro@exemplo.com')
    cy.get('#open-text-area').type('Teste')
    cy.get('button[type="submit"]').click()

})
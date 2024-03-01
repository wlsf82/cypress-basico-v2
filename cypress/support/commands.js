Cypress.Commands.add('fillMandatoryFieldsAndSubmit', function() {
    cy.get('#firstName').type('Danilo')
    cy.get('#lastName').type('Sousa')
    cy.get('#email').type('dansousa19@hotmail.com')
    cy.get('#open-text-area').type('Teste')
    cy.get('button[type="submit"]').click()
})
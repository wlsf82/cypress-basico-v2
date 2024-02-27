Cypress.Commands.add('fillMandatoryFieldsAndSubmit', function() {
    cy.get('#firstName').type('Rafael')
    cy.get('#lastName').type('Lima')
    cy.get('#email').type('rafael.flima@outlook.com')
    cy.get('#open-text-area').type('Teste')
    cy.get('button[type="submit"]').click('')
})
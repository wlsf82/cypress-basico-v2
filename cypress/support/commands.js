Cypress.Commands.add('fillMandatoryFieldsAndSubmit', function(){
    cy.get('#firstName').type('Willames')
    cy.get('#lastName').type('Vital')
    cy.get('#email').type('willames@test.com')
    cy.get('#open-text-area').type('Test')
    cy.get('button[type="submit"]').click()
})
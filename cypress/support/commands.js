Cypress.Commands.add('filMandatoryFieldsAndSubmit', function(){
    cy.get('#firstName').type('Igor')
    cy.get('#lastName').type('Lima')
    cy.get('#email').type('igorlimamp1@gmail.com')
    cy.get('#open-text-area').type('Teste')
    cy.get('button[type="submit"]').click()
})
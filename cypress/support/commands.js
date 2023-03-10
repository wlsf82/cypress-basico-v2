Cypress.Commands.add('fillMandatoryFieldsAndSubmit', function() {
    cy.get('#firstName').type('Henrique')
    cy.get('#lastName').type('Marcossi')
    cy.get('#email').type('hmarcossi@gmail.com')
    cy.get('#open-text-area').type('Teste')
    cy.contains('button', 'Enviar').click()
})
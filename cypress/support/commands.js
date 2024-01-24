 Cypress.Commands.add('fillMandatoryFieldsAndSubmit', function() {
    cy.get('#firstName').type('Angelica')
    cy.get('#lastName').type('Farias')
    cy.get('#email').type('angelica@exemplo.com')
    cy.get('#open-text-area').type('Teste')
    cy.contains('button', 'Enviar').click()
 })

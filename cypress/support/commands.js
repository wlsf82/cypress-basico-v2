Cypress.Commands.add('fillMandatoryFieldsAndSubmit',function() {
    cy.get('#firstName').type('Vinicius')
        cy.get('#lastName').type('Souza')
            cy.get('#email').type('vinicius@exmeplo.com')
        cy.get('#open-text-area').type('Teste')
            cy.contains('button', 'Enviar').click()
})
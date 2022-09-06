Cypress.Commands.add('fillMandatoryFieldsAndSubmit', function() {
    cy.get('#firstName').type('Walmir');
        cy.get('#lastName').type('Filho');
        cy.get('#email').type('walmirfilho@gmail.com')
        cy.get('#open-text-area').type('Teste');
        cy.contains('button', 'Enviar').click()
})
Cypress.Commands.add('fillMandatoryFieldsAndSubmit', function(){ 
    cy.get('#firstName').type('Teste')
    cy.get('#lastName').type('genérico')
    cy.get('#email').type('teste@gmail.com')
    cy.get('#open-text-area').type('Teste')
    cy.contains('button', 'Enviar').click()
})
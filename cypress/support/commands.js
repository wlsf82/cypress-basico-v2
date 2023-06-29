Cypress.Commands.add('fillMandatoryFieldsAndSubmit', () =>  {
    cy.get('#firstName').type('Rayanne')
    cy.get('#lastName').type('Vieira')
    cy.get('#email').type('rayanne@teste.com')
    cy.get('#open-text-area').type('Teste') 
    cy.contains('button', 'Enviar').click()
})
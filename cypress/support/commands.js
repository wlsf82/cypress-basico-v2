Cypress.Commands.add('fillMandatoryFieldsAndSubmit', function() {
    cy.get('#firstName').type('Walmyr')
    cy.get('#lastName').type('Filho')
    cy.get('#email').type('walmyr@exemplo,com')
    cy.get('#phone-checkbox').click()
    cy.get('#open-text-area').type('Teste.')
    cy.get('button[type="submit"]').click()
    
})
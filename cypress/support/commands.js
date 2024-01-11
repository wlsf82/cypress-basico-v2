Cypress.Commands.add('fillMandatoryFieldsAndSubmit', function () {
    cy.get('input[id="firstName"]').type('Octávio')
    cy.get('input[id="lastName"]').type('Mangabeira')
    cy.get('input[id="email"]').type('qa@hotmail.com')
    cy.get('textarea[name="open-text-area"]').type('Teste')
    cy.contains('button', 'Enviar').click()
})

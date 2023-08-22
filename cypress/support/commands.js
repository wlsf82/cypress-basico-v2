Cypress.Commands.add('fillMandatoryFieldsAndSubmit', function () {
    cy.get('input[name="firstName"]').type('Cat')
    cy.get('input[name="lastName"]').type('TAT')
    cy.get('#email').type('Cattat@gmail.com')
    cy.get('#open-text-area').type('Teste de envio')
    cy.get('.button').click()
})
Cypress.Commands.add('fillMandatoryFieldsAndSubmit', function(){
    cy.get('#firstName').type('Victor')

    cy.get('#lastName').type('Sousa')

    cy.get('#email').type('victorquintanilhasousa@gmail.com')

    cy.get('#open-text-area').type('Teste')

    cy.contains('Enviar').click()
})
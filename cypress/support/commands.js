//Comando Customizado em hardcode para preencher
Cypress.Commands.add('fillMandatoryFieldsAndSubmit', function() {
    cy.get('#firstName').type('Walid')
    cy.get('#lastName').type('Arnous')
    cy.get('#email').type('walid@teste.com.br')
    cy.get('#open-text-area').type('Teste')
    cy.get('button[type="submit"]').click()
})
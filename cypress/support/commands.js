Cypress.Commands.add('fillMandatoryFieldsAndSubmit', function(){
    cy.get('#firstName').type("Leandro")
    cy.get('#lastName').type("Rodrigues")
    cy.get('#email').type("leandro@email.com.br")
    cy.get('#phone').type("11 973303008")
    cy.get('#open-text-area').type('O não você ja tem, agora falta buscar a humilhação!')
    cy.contains('button','Enviar').click()
})
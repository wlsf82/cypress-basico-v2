Cypress.Commands.add('filMandatorytoryAndSubmit', function(){
    cy.get('#firstName').type('Suelen')
    cy.get('#lastName').type('Marques')
    cy.get('#email').type('suelen@hotmail.com.br')
    cy.get('#open-text-area').type('teste')
    cy.contains('button', 'Enviar').click()
});

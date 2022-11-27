Cypress.Commands.add('fillMandatoryFieldsAndSubmit', function(){
    cy.get('#firstName').type('Isadora')
    cy.get('#lastName').type('Dias')
    cy.get('#email').type('diasfisadora@gmail.com')
    cy.get('#open-text-area').type('teste')
    cy.contains('button', 'Enviar').click();

})
Cypress.Commands.add('fillMandatoryFieldsAndSubmit', function(){
    cy.get('#firstName').type('Leonardo');
    cy.get('#lastName').type('Gutierrez');
    cy.get('#email').type('gutierrez.medeiros12@gmail.com');
    cy.get('#open-text-area').type('Me ajude comprando um saco de pão', {delay:0});
    cy.contains('button', 'Enviar').click();
})
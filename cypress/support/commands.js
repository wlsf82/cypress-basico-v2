Cypress.Commands.add('fillMandatoryFieldsAndSubmit', function(){
    cy.get('#firstName').type('Carlos');
    cy.get('#lastName').type('Benjamim');
    cy.get('#email').type('carlos@aulas.com.br');
    cy.get('#open-text-area').type('Lorem aliqua. Ut ulit anim id est laborum.',{delay:0});
    cy.get('.button').click();
})
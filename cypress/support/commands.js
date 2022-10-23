Cypress.Commands.add('fillMandatoryFieldsAndSubmit', function(){
    cy.get('#firstName').should('be.visible').type('Rhemerson').should('have.value', 'Rhemerson');
    cy.get('#lastName').should('be.visible').type('Monteiro').should('have.value', 'Monteiro');
    cy.get('#email').should('be.visible').type('teste@gmail.com').should('have.value', 'teste@gmail.com');
    cy.get('#open-text-area').should('be.visible').
       type('Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc bibendum metus tincidunt dolor dapibus, eu mattis nulla posuere. Integer posuere efficitur quam, bibendum aliquam orci venenatis sit amet. Duis pulvinar congue tincidunt. Quisque eleifend venenatis urna, vel sodales sem consequat non. Vivamus condimentum scelerisque magna posuere rutrum.', {delay:0}).
       should('not.have.value');
    cy.get('.button').should('be.visible').click();
})
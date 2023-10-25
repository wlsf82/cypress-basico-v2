Cypress.Commands.add('fillMandatoryFieldsAndSubmit', function(){
    cy.get('#firstName').type('Igor')
    cy.get('#lastName').type('Amorim')
    cy.get('#email').type('igor.teste@teste.com')
    cy.get('#open-text-area').type('Ajuda teste campo como podemos ajudar') 
    cy.contains('button', 'Enviar').click()


})
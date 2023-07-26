Cypress.Commands.add('PrencherFormularioEnviar', () => {   
 cy.get('#firstName').type('Jessica')
 cy.get('#lastName').type('Pinheiro')
 cy.get('#email').type('Jessp@gmail.com')
 cy.get('#phone').type('991223343') 
 cy.contains('.button','Enviar').click()
 
});
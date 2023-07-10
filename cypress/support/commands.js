Cypress.Commands.add('fillMandatoryFieldsAndSubmit', () => {
    cy.get("#firstName").type("Cristiano");
    cy.get("#lastName").type("Muroni");
    cy.get("#email").type("muroni@hotmail.com");      
    cy.get("#open-text-area").type("teste");
    cy.contains('button', 'Enviar').click();   
})

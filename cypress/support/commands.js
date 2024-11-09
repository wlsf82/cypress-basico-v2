Cypress.Commands.add('fillMandatoryFieldsAndSubmit', function () {
    cy.get('#firstName').type('Everaldo');
    cy.get('#lastName').type('Barros');
    cy.get('#email').type('everaldobarros2023@outlook.com');
    cy.get('#email-checkbox').click();
    cy.get('#open-text-area').type('Este exercício foi realizado com sucesso.', { delay: 0 });

    cy.contains('button', 'Enviar').click();
})
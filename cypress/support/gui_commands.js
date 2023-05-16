Cypress.Commands.add('enviaCamposObrigatorios', (nome, sobrenome, email, texto ) => {
    cy.get('#firstName')
        .type(nome);
    cy.get('#lastName')
        .type(sobrenome);
    cy.get('#email')
        .type(email);
    cy.get('#open-text-area')
        .type(texto, {delay: 0});
    cy.contains('button', 'Enviar')
        .click();
})
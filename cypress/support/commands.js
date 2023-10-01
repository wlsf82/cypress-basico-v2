// ***********************************************

Cypress.Commands.add('fillMandatoryFieldsAndSubmit', function(){
    cy.get('#firstName')
        .type('Novo')
    cy.get('#lastName')
        .type('Usuário')
    cy.get('#email')
        .type('usuario@mail.com')
    cy.get('#open-text-area')
        .type('Teste')
    cy.get('button[type="submit"]')
        .click()

})


Cypress.Commands.add('fillselecAndSubmit', function(){
    cy.get('#firstName')
        .type('Novo')
    cy.get('#lastName')
        .type('Usuário')
    cy.get('#email')
        .type('usuario@mail.com')
    cy.get('#open-text-area')
        .type('Teste')
    cy.get('select')
        .select('mentoria')
        .should('have.value', 'mentoria')
    cy.get('button[type="submit"]')
        .click()

})



cy.get('input[type="text"]')
  .type('Olá mundo!')
  .should('have.value', 'Olá mundo!')
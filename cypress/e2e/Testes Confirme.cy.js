describe('Login Test', () => {
  it('Efetuar login', () => {
    // Acessar o site
    cy.visit('https://confirme-frontend-dev.azurewebsites.net/auth/login');
    cy.title().should('be.equal', 'Confirme') 

    // Preencher os campos de login e senha
    cy.get('#mat-input-0')
    .type('JPEREIRA')
    cy.get('#mat-mdc-form-field-label-2 > [data-testid="password-label_input"]')
    //cy.get('#mat-input-1')
    .type('e2PcsBva',)
    cy.contains('ACESSAR' ) .click()

    // Enviar o formulário de login
    cy.get('button[type="submit"]').click();

    
   

  });
});


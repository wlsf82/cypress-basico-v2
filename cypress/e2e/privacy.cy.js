describe('Testa página de maneira independente', () => {
  it('testa a página da política de privacidade', () => {
    cy.visit('src/privacy.html')
  
    cy.contains('CAC TAT - Política de privacidade')
      .should('be.visible');
  });
});
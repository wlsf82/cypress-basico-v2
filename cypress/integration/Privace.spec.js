it('testa a página da política de privacidade de forma independente', () => {
    cy.visit('./src/privacy.html')
    cy.get('h1[id="title"]').should('have.text', 'CAC TAT - Política de privacidade').should('be.visible')
})
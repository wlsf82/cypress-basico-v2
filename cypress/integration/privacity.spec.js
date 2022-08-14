
    it('Testar a página da política de privavidade de forma independente', function() {
        cy.visit('../src/privacy.html')
        cy.contains('Talking About Testing').should('be.visible')
    })
it.only('Testa a página da politica de privacidade de forma independente', function(){
    cy.visit('src/privacy.html')
    .contains('h1', 'CAC TAT - Política de privacidade').should('be.visible')
    .contains('p', 'Talking About Testing').should('be.visible')
})
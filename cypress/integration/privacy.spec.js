it('Seção 08 - Exercicio extra 02 - Desafio - testa a página da política de privacidade de forma independente', function(){
    cy.visit('./src/privacy.html')
    cy.contains('Talking About Testing').should('be.visible')

})
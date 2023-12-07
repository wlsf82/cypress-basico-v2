it('Testa a página de política de privacidade de forma independente', function(){
    cy.visit ('./src/privacy.html')
    cy.contains('Talking About Testing')
    .should('be.visible')
})

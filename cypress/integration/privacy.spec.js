it('testa a página da política de privacidade de forma independente', function(){
   cy.visit('./src/privacy.html')
   cy.contains('HTML')
     .should('be.visible')
   cy.contains('CSS ')
     .should('be.visible') 
})

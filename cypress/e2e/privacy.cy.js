
Cypress._.times(5, function () {
    it('Testa a pagina de politica de privacidade de forma independente', function(){
        cy.visit('./src/privacy.html')
        cy.contains('Talking About Testing').should('be.visible')
    
    })

})

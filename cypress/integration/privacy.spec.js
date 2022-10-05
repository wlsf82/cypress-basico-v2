Cypress._.times(3, function() {
    it('testa a pagina de politica de privacidade de forma independente', function(){
        cy.visit('./src/privacy.html')

        cy.contains('Talking About Testing').should('be.visible')
    })

})
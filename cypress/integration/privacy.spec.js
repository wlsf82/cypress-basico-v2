describe('Política de Privacidade', function() {
    beforeEach(function() {
        cy.visit('./src/privacy.html')
    })

    it.only('testa a página da política de privacidade de forma independente', function() {
        cy.contains('Talking About Testing').should('be.visible')
    })

})
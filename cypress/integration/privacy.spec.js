it.only('testa a página da política de privacidade de forma independente', function(){
    cy.visit('./src/privacy.html')
    .contains('Talking About Testing').should('be.visible')
    cy.get('h1[id="title"]').contains('CAC TAT - Política de privacidade').should('be.visible')
    cy.title().should('be.equals', 'Central de Atendimento ao Cliente TAT - Política de privacidade')
    
})
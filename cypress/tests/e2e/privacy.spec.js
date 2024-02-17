it('Testar a página de política de privacidade de forma independente', function() {
    // Acessar diretamente a URL do privacy, sem clicar no link e remover o atributo target
    // visto que é um link que abre em outra página do navegador
    cy.visit('./src/privacy.html') // Alterou de "index" para "privacy"
    cy.contains('Talking About Testing').should('be.visible')
})

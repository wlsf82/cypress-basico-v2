it('Testando a página de politica de privacidade', () => {
     cy.visit('cypress-do-zero-a-nuvem/src/privacy.html')

     cy.title().should('be.equal','Central de Atendimento ao Cliente TAT - Política de Privacidade')

     cy.contains('h1','CAC TAT - Política de Privacidade').should('be.visible')
})
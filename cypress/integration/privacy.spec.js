describe('Testando de forma independente o privacy', function(){
    beforeEach(function(){
        cy.visit('./src/privacy.html');
    })

    it('Verificando o title da página', function(){
        cy.get('title').should('have.text', 'Central de Atendimento ao Cliente TAT - Política de privacidade')
    })

    it('Verificando o título', function(){
        cy.get('#title').should('be.visible');
        cy.get('#white-background').should('be.visible');
    })
})
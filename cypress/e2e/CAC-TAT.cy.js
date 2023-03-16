describe('', () => {
    beforeEach(() => {
        cy.visit('src/index.html');
    });

    it('Verificar title', () => {
        cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT')
    });
});
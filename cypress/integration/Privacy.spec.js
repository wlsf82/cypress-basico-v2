it('Testar A Pagina Politica De Privacidade De Forma Independente',function(){
    cy.visit('./src/privacy.html')
    cy.get('#privacy a')
    .invoke('removeAttr','target')
    .click() 
    cy.get('title')
    cy.contains('CAC TAT - Política de privacidade')
     .should('be.visible')
    cy.contains('Talking About Testing')
    .should('be.visible')
});
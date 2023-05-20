it('testa a página da política de privacidade de forma independente' , function(){
    cy.visit('./src/privacy.html')
    cy.contains('Talking About Testing').should('be.visible')
})


//Teste com Lodash Utilizando o Run Test Acima
//Realiza repetiçôes do mesmo teste varias vezes
//a quantidade de vezes que será rodado,
//está no número dentro do argumento .times
Cypress._.times(5, function(){
    it.only('testa a página da política de privacidade de forma independente' , function(){
        cy.visit('./src/privacy.html')
        cy.contains('Talking About Testing').should('be.visible')
    })
})


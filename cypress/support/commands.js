Cypress.Commands.add('PreencheOsCamposObrigatorioseEnviaComSucesso', function(){
    const longText= 'Teste teste teste Teste teste teste Teste teste teste Teste teste'
    cy.get('#firstName').type('Leonardo')
    cy.get('#lastName').type('Costa')
    cy.get('#email').type('leonardocaetanocosta2005@gmail.com')
    cy.get('#open-text-area').type(longText, {delay:0})
    cy.contains('button' , 'Enviar').click()
})
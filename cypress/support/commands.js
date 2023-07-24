Cypress.Commands.add('fillMandatoryFieldsAndSumit', function(){
    cy.clock()
 cy.get('#firstName').type('Alessandro')
 cy.get('#lastName').type('Melo')
 cy.get('#email').type('alessandromelo74@gmail.com')
 cy.get('#open-text-area').type('Teste de campo de Digitação', {delay: 5})
 cy.contains('button', 'enviar').click()
 cy.get('.success').should('be.visible')  
 cy.tick(THREE_SECONDS_IN_ML)
 cy.get('.success').should('not.be.visible')
})

Cypress.Commands.add('fillMandatoryFieldsAndSumit', function(){
    
})
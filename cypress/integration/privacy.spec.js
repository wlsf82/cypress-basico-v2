it.only('Deve acessar a politica de qualidade removendo o target', function(){
    cy.visit('./src/index.html')
    cy.get('#privacy a')
      .invoke('removeAttr', 'target')
      .click()
    cy.contains('Talking About Testing').should('be.visible')
  })
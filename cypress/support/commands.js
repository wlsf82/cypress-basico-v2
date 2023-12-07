Cypress.Commands.add('filMandatoryFieldsAndSubmit', function(){
    cy.get('#firstName').type('Igor')
    cy.get('#lastName').type('Lima')
    cy.get('#email').type('igorlimamp1@gmail.com')
    cy.get('#open-text-area').type('Teste')
    cy.get('button[type="submit"]').click()
})

Cypress.Commands.add('RealizaLogin', function() {
    cy.get('#usucpf').type('48361145869')
    cy.get('#ususenha').type('simecdti')
    cy.get('button[type="submit"]').click()
})

Cypress.on('uncaught:exception', (err, runnable) => {
    return false
})


Cypress.Commands.add('fillMandatoryFieldsAndSubmit', function(){
    cy.get('#firstName').type('Daniel')
    cy.get('#lastName').type('Fossali')
    cy.get('#email').type('danielfossali@suportetecnologias.com.br')
    cy.get('#open-text-area').type('teste')
    cy.get('button[type="submit"]').click()
    
})
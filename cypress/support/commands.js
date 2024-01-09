Cypress.Commands.add('fillMandatoryFieldsAndSubmit', function(){
    cy.get('#firstName').type('Thamires')
    cy.get('#lastName').type('Gualandi')
    cy.get('#email').type('thamiresgualandi@gmail.com')
    cy.get('#open-text-area').type('Teste')
    cy.get('#check > [for="phone"]')
    cy.get('#phone').type('000000000')
    cy.get('button[type="submit"]').click()
})
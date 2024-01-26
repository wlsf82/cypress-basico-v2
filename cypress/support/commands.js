Cypress.Commands.add('fillMandatoryFieldsAndSubmit',()=>{

    cy.get('#firstName').type('Bruno')
    cy.get('#lastName').type('Falanga')
    cy.get('#email').type('brunozxt@gmail.com')
    cy.get('#phone').type(2453653)
    cy.get('#open-text-area').type('wedwedfewfewfwegg')
    cy.contains('button','Enviar').click()

})




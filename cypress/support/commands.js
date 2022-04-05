Cypress.Commands.add('fillMandatoryFieldsAndSubmit', function(nome, sobrenome, email, telefone) {   
    cy.get('#firstName').type(nome)
    cy.get('#lastName').type(sobrenome)
    cy.get('#email').type(email)
    cy.get('#open-text-area').type(telefone)
    cy.contains('button', 'Enviar').click()
})

    Cypress.Commands.add('fillMandatoryFieldsAndSubmit', function(){
     cy.get('#firstName').type('Itamar')
     cy.get('#lastName').type('Santos')
     cy.get('#email').type('teste@teste.com')
     cy.get('#open-text-area').type('Teste')
     cy.contains('button', 'Enviar').click()
    })

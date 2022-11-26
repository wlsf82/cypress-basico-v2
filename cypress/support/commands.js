Cypress.Commands.add('fillMandatoryFieldsAndSubmit', function(){
    const longText = 'O comando cy.get() passa adiante ao próximo comando o elemento encontrado, e outros comandos, tais como o .type() e click() (dentre outros), também passam adiante o mesmo elemento, possibilitando encadearmos novos comandos, por exemplo, para fazer uma verificação.'
    cy.get('#firstName').type('Mateus')
    cy.get('#lastName').type('Araujo')
    cy.get('#email').type('mateus@gmail.com')
    cy.get('#open-text-area').type(longText, { delay: 0 })
    cy.contains('button', 'Enviar').click()
    cy.get('.success').should('be.visible') 
});
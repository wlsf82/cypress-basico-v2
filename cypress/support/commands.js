Cypress.Commands.add('fillMandatoryFieldsAndSubmit', () => {
    cy.get('#firstName').type('Ana')
    cy.get('#lastName').type('Silva')
    cy.get('#email').type('ana@email.com')
    cy.get('#phone').type('55999899658')
    cy.get('#open-text-area').type('Teste digitação texto')
    cy.get('.button[type="submit"]').click({forece: true})
})


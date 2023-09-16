// Login_Orion.js created with Cypress
//
// Start writing your Cypress tests below!
// If you're unfamiliar with how Cypress works,
// check out the link below and learn how to write your first test:
// https://on.cypress.io/writing-first-test


describe('visitar página do orion',function() {
  it('deveria visitar e testar login', function(){
      cy.visit('https://hml.orion.febrafar.com.br/login')
      
      cy.get('.bg-primary-500').click()

      cy.get('section.space-y-3 > :nth-child(1) > .flex > .w-full').type(' eric@febrafar.com.br')
      cy.get(':nth-child(2) > .flex').type('Teste@123')
      cy.get('section.space-y-3 > .select-none').click()
    })
})

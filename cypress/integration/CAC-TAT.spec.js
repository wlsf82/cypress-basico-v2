/// <reference types="Cypress" />

describe('Central de Atendimento ao Cliente TAT', function() {
    
    beforeEach(() => {
        cy.visit('./src/index.html');
    })

    it('verifica o título da aplicação', function() {  
        cy.title().should('eq', 'Central de Atendimento ao Cliente TAT');    
    });

    it('Preenche os campos obrigatórios e envia o formulário', () => {
        cy.get('#firstName').type('Rafael')
        cy.get('#lastName').type('Almeida')
        cy.get('#email').type('almeida@mail.com')
        cy.get('#open-text-area').type('Testando marotamente, fazendo um teste com uma linha maior', {delay: 1})
        cy.get('button[type="submit"]').click()
        cy.get('.success > strong').should('be.visible')
    }) 
  })
  

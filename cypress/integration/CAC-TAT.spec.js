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
    });
    
    it('exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', () => {
        cy.get('#firstName').type('Rafael')
        cy.get('#lastName').type('Almeida')
        cy.get('#email').type('almeidamail.com')
        cy.get('#open-text-area').type('Testando marotamente, fazendo um teste com uma linha maior')
        cy.get('button[type="submit"]').click()
        cy.get('.error > strong').should('be.visible')
    });

    it('Verificar se o campo de telefone aceita valor não-numérico', () => {
        cy.get('#phone')
            .type('uahushauihsa')
            .should('have.text', '');
    });

    it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', () => {
        cy.get('#firstName').type('Rafael')
        cy.get('#lastName').type('Almeida')
        cy.get('#email').type('almeida@mail.com')
        cy.get('button[type="submit"]').click()
        cy.get('#open-text-area').type('Teste')
        cy.get('#phone-checkbox').check()
        cy.get('.error > strong').should('be.visible')
        cy.get('.phone-label-span').should('be.visible')        
    });

    


  })
  


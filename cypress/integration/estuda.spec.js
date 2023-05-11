/// <reference types="Cypress" />

describe('Testando a minha empresa', function(){

    it('Login', function(){
        cy.Login();
    })

    it('Entra numa escola', function(){
        cy.Login()
        cy.EntrarEscola()
    })

    it('Adicionar uma avaliação', function(){
        cy.Login()
        cy.EntrarEscola()
        cy.contains('.xn-text', 'Avaliações').click()
        cy.get('a[data-gtm-menu="Adicionar Avaliação"]').click()
        cy.get('input[placeholder="Digite o título aqui"]').should('be.visible').type('Prova teste no cypress')
        cy.get('input[name="data_inicio"]').should('be.visible').type('10-05-2023')
        cy.AdicionarQuestao('Filosofia')
        cy.get('button[onclick="validarButton(document.frm_cadastro);"]').click()
    })
})
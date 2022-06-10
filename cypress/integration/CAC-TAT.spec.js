/// <reference types="Cypress" />
//const { first } = require("cypress/types/lodash")
describe('Central de Atendimento ao Cliente TAT ',function(){
        //boa prática para que seja realizado os testes (ele sempre volta pra ca/FUNÇAO DE CALLBACK()
    beforeEach(function(){
        cy.visit('./src/index.html')
    })
    //(nome da função, função de callback())
    it('verifica o título da aplicação', function(){
        //compara para ver se o título é igual ao passado
        cy.title().should('be.equal','Central de Atendimento ao Cliente TAT')
    })
    it('preencher os campos obrigatórios e acerta o email', function() {
        cy.get('#firstName').type('vi')
        cy.get('#lastName').type('gs')
        cy.get('#email').type('v.g@g.com')
        cy.get('#open-text-area').type('teste')
        cy.get('button[type="submit"]').click()
        cy.get('.success').should('be.visible')

    })

    it('preencher os campos obrigatórios e envia o formulário passa area errada', function(){
        cy.get('#firstName').type('vi')
        cy.get('#lastName').type('gs')
        cy.get('#email').type('v.g')
        cy.get('#open-text-area').type('teste')
        cy.get('button[type="submit"]').click()
        cy.get('.error').should('be.visible')
    })

    it('preencher o campo telefone com letra', function(){
        cy.get('#phone').type('vs').should('have.value','')
        /*é uma foma:cy.get('#phone').type('v.g')/cy.get('button[type="submit"]').click()/cy.get('.error').should('be.visible') */
    })

    it('tentar enviar o form sem o número, sendo que tu marcou número no checkbox', function(){
        cy.get('#phone-checkbox').click()
        cy.contains('button','Enviar').click()
        cy.get('.error').should('be.visible')
    })

    it('preenche e limpa os campos nome, sobrenome, email e telefone',function(){
        cy.get('#firstName').type('vi').should('have.value','vi').clear().should('have.value','')
        cy.get('#lastName').type('ge').should('have.value','ge').clear().should('have.value','')
        cy.get('#email').type('v@g.com').should('have.value','v@g.com').clear().should('have.value','')
        cy.get('#phone').type(9999).should('have.value',9999).clear().should('have.value','')
    })

    it('teste de verificação do envio de dados', function(){
        cy.contains('button','Enviar').click()
        cy.get('.error').should('be.visible')

        cy.get('#firstName').should('have.value' ,'')
        cy.get('#lastName').should('have.value' ,'')
        cy.get('#email').should('have.value' ,'')
        cy.get('#phone').should('have.value' ,'')
    })

    it('comandos personalizados',function(){
        cy.filMandatoryFieldsAndSubmit()
        cy.get('.success').should('be.visible')
    })
})


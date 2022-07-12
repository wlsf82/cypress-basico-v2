// CAT-TAT.spec.js created with Cypress
//
// Start writing your Cypress tests below!
// If you're unfamiliar with how Cypress works,
// check out the link below and learn how to write your first test:
// https://on.cypress.io/writing-first-test

///<reference types="Cypress"/>//

const longtext= 'Executando teste de campo de texto de área para verificar quantos caracteres cabem no campo.'

//Switch de teste
describe('Central de Atendiemtno ao Cliente TAT', function(){

    beforeEach(function(){
        //Acessando ao site 
        cy.visit('./src/index.html')
    })

    it('verifica o título da aplicação', () => {
        
        // Faz verificação com título do site
        cy.title().should('be.equal','Central de Atendimento ao Cliente TAT')

    })

    it('Preenche os campos obrigatórios da aplicação e envia o formulário', () => { 
        
       

        cy.get('#firstName').type('Wellington')
        cy.get('#lastName').type('Costa')
        cy.get('#email').type('wellington@cypress.com')

        // quando coloca texto muito longo, usa-se delay para diminuir tempo de teste
        cy.get('#open-text-area').type(longtext,{delay:0})    
        cy.get('button[type="submit"]').click()


        cy.get('.success').should('be.visible')

    })

    it('Preenche os campo e-mail com formatação inválida', () => { 
        
        cy.get('#firstName').type('Wellington')
        cy.get('#lastName').type('Costa')
        cy.get('#email').type('wellington,com')

        // quando coloca texto muito longo, usa-se delay para diminuir tempo de teste
        cy.get('#open-text-area').type(longtext)    
        cy.get('button[type="submit"]').click()


        cy.get('.error').should('be.visible')
    })

    it('Campo de telefone continua vazio quando preenchido com valor não numérico', () => { 
        
        cy.get('#phone')
            .type('dgdgdfhgfertet')
            .should('have.value','')       
    })

    it('Exibe menssagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do formulário', () => { 
        cy.get('#firstName').type('Wellington')
        cy.get('#lastName').type('Costa')
        cy.get('#email').type('wellington@cypress.com')
        cy.get('#phone-checkbox').click()
        // quando coloca texto muito longo, usa-se delay para diminuir tempo de teste
        cy.get('#open-text-area').type(longtext)    
        cy.get('button[type="submit"]').click()


        cy.get('.error').should('be.visible')

    })//fim

    it('Preenche e limpa os campos nome, sobrenome, email e telefone', ()=>{
        cy.get('#firstName').type('Wellington').should('have.value','Wellington').clear().should('have.value','')
       /* cy.get('#lastName').type('Costa')
        cy.get('#email').type('wellington@cypress.com')
        cy.get('#phone-checkbox').click()
        // quando coloca texto muito longo, usa-se delay para diminuir tempo de teste
        cy.get('#open-text-area').type(longtext)    
        cy.get('button[type="submit"]').click()


        cy.get('.error').should('be.visible')
        */
    })




})//Fim da switch de testes

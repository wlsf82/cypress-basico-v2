/// <reference types="Cypress" />

// import {commands} from "../../support/commands";

describe('Central de Atendimento ao Cliente TAT', function() {

    beforeEach(function() {
        cy.visit('./src/index.html') //ação
    })

    it('Seção 02 - verifica titulo aplicação', function() {
        cy.title().should('eq', 'Central de Atendimento ao Cliente TAT') //verificação
    })

    it('Seção 03 - Meu -  Preenche os campos obrigatórios e envia o formulário', function() {
        cy.get('#firstName')
            .click()
            .type('nome')

        cy.get('#lastName')
            .click()
            .type('sobrenome')

        cy.get('#email')
            .click()
            .type('email@com.br')
        
        cy.get('#open-text-area')
            .click()
            .type('texto texto')

        cy.get('.button[type="submit"]')
            .click()
    
        cy.get('.success > strong')
            .should('be.visible')

    })

    it('Seção 03 - Curso -  Preenche os campos obrigatórios e envia o formulário', function() {
        cy.get('#firstName').type('nome')
        cy.get('#lastName').type('sobrenome')
        cy.get('#email').type('teste@tes.te')
        cy.get('#open-text-area').type('teste')
        cy.get('button[type="submit"]').click()
    
        cy.get('.success').should('be.visible')
    })
    
    // it('Seção 03 - Meu -  Exercício extra 1 - delay', function() {
    //     cy.get('#firstName')
    //         .click()
    //         .type('nome')

    //     cy.get('#lastName')
    //         .click()
    //         .type('sobrenome')

    //     cy.get('#email')
    //         .click()
    //         .type('email@com.br')
        
    //     cy.get('#open-text-area')
    //         .click()
    //         .type({
    //             'É uma manifestação verbal ou escrita formada por um grupo de fonemas com uma significação. Do latim parábola. Palavra é um conjunto de sons articulados que expressam ideias e são representados por uma grafia, formada por uma reunião de letras, que quando agrupadas formam as frases.':'deplay=0'
    //         })

    //     cy.get('.button[type="submit"]')
    //         .click()

    //     cy.get('.success > strong')
    //         .should('be.visible')
    // })

    it('Seção 03 - Curso -  Exercício extra 1 - delay', function() {
        const longText = ('É uma manifestação verbal ou escrita formada por um grupo de fonemas com uma significação. Do latim parábola. Palavra é um conjunto de sons articulados que expressam ideias e são representados por uma grafia, formada por uma reunião de letras, que quando agrupadas formam as frases.')

        cy.get('#firstName').type('nome')
        cy.get('#lastName').type('sobrenome')
        cy.get('#email').type('teste@tes.te')
        cy.get('#open-text-area').type(longText, {delay:0})
        cy.get('button[type="submit"]').click()
    
        cy.get('.success').should('be.visible')
    })

    it('Seção 03 - Meu -  Exercício extra 2 - Exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', function() {
        cy.get('#firstName')
            .click()
            .type('nome')

        cy.get('#lastName')
            .click()
            .type('sobrenome')

        cy.get('#email')
            .click()
            .type('email.com.br')
        
        cy.get('#open-text-area')
            .click()
            .type('texto texto')

        cy.get('.button[type="submit"]')
            .click()

        cy.get('.error > strong')
            .should('be.visible')
    })
    
    it('Seção 03 - Curso -  Exercício extra 2 - Exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', function() {
        cy.get('#firstName').type('nome')
        cy.get('#lastName').type('sobrenome')
        cy.get('#email').type('email.com.br')        
        cy.get('#open-text-area').type('texto texto')
        cy.contains('button','Enviar').click()

        cy.get('.error').should('be.visible')
    })

    it('Seção 03 - Meu -  Exercício extra 3 - Telefone aceita somente números', function() {
        cy.get('#firstName')
            .click()
            .type('nome')

        cy.get('#lastName')
            .click()
            .type('sobrenome')

        cy.get('#email')
            .click()
            .type('email@com.br')

        cy.get('#phone')
            .click()
            .type('88888')
            // .should('have.value','123')
            
        cy.get('#open-text-area')
            .click()
            .type('texto texto')

        cy.get('.button[type="submit"]')
            .click()

        cy.get('.success > strong')
            .should('be.visible')
    })

    it('Seção 03 - Curso -  Exercício extra 3 - Telefone aceita somente números', function() {
        cy.get('#firstName').type('nome')
        cy.get('#lastName').type('sobrenome')
        cy.get('#email').type('email@com.br')
        cy.get('#phone')
            .type('abcdefej')
            .should('have.value', '')
        cy.get('#open-text-area').type('texto texto')
        cy.contains('button','Enviar').click()

        cy.get('.success').should('be.visible')
    })

    it('Seção 03 - Meu -  Exercício extra 4 - exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', function() {
        cy.get('#firstName')
            .click()
            .type('nome')

        cy.get('#lastName')
            .click()
            .type('sobrenome')

        cy.get('#email')
            .click()
            .type('email@com.br')
            
        cy.get('#phone-checkbox')
            .click()

        cy.get('#open-text-area')
            .click()
            .type('texto texto')

        cy.get('.button[type="submit"]')
            .click()

        cy.get('.error > strong')
            .should('be.visible')
    })

    it('Seção 03 - Curso -  Exercício extra 4 - exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', function() {
        cy.get('#firstName').type('nome')
        cy.get('#lastName').type('sobrenome')
        cy.get('#email').type('email@com.br')
        cy.get('#phone-checkbox').click()
        cy.get('#open-text-area').type('texto texto')
        cy.contains('button','Enviar').click()

        cy.get('.error').should('be.visible')
    })

    it('Seção 03 - Meu -  Exercício extra 5 - clear campo', function() {
        cy.get('#firstName')
            .click()
            .type('nome')

        cy.get('#lastName')
            .click()
            .type('sobrenome')

        cy.get('#email')
            .click()
            .type('email@com.br')
            
        cy.get('#phone')
            .click()
            .type('88888')
            .should('have.value','88888')
            .clear()
            .should('have.value','')

        cy.get('#open-text-area')
            .click()
            .type('texto texto')

        cy.get('.button[type="submit"]')
            .click()

        cy.get('.success > strong')
            .should('be.visible')
    })

    it('Seção 03 - Curso -  Exercício extra 5 - preenche e limpa os campos nome, sobrenome, email e telefone', function() {
        cy.get('#firstName')
            .type('nome')
            .should('have.value', 'nome')
            .clear()
            .should('have.value','')
        cy.get('#lastName')
            .type('sobrenome')
            .should('have.value', 'sobrenome')
            .clear()
            .should('have.value','')
        cy.get('#email')
            .type('email@com.br')
            .should('have.value','email@com.br')
            .clear()
            .should('have.value','')
        cy.get('#phone')
            .type('88888')
            .should('have.value','88888')
            .clear()
            .should('have.value','')
    })

    it('Seção 03 - Meu -  Exercício extra 6 - exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', function() {
        cy.get('#firstName')
            .click()

        cy.get('#lastName')
            .click()

        cy.get('#email')
            .click()
            
        cy.get('#phone')
            .click()

        cy.get('#open-text-area')
            .click()

        cy.get('.button[type="submit"]')
            .click()

        cy.get('.error > strong')
            .should('be.visible')
    })

    it('Seção 03 - Curso -  Exercício extra 6 - exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', function() {
        cy.contains('button','Enviar').click()
        cy.get('.error > strong').should('be.visible')
    })

    // it('Seção 03 - Meu -  Exercício extra 7 - envia o formuário com sucesso usando um comando customizado', function() {
    //     cy.get('#firstName')
    //         .click()

    //     cy.get('#lastName')
    //         .click()

    //     cy.get('#email')
    //         .click()
            
    //     cy.get('#phone')
    //         .click()

    //     cy.get('#open-text-area')
    //         .click()
            
    //     cy.filfillMandatoryFieldsAndSubmit()
    // })
    
    it('Seção 03 - Curso -  Exercício extra 7 - envia o formuário com sucesso usando um comando customizado', function() {
      cy.fillMandatoryFieldsAndSubmit()

      cy.get('.success').should('be.visible')
    })

    // it('Seção 03 - Meu -  Exercício extra 8 - contains', function() {
    //     cy.get('#firstName')
    //         .click()

    //     cy.get('#lastName')
    //         .click()

    //     cy.get('#email')
    //         .click()
            
    //     cy.get('#phone')
    //         .click()

    //     cy.get('#open-text-area')
    //         .click()

    //     cy.contains('input', 'Ajuda')

    //     cy.get('.button[type="submit"]')
    //         .click()

    //     cy.get('.error > strong')
    //         .should('be.visible')
    // })

    it('Seção 03 - Curso -  Exercício extra 8 - contains', function() {
        cy.get('#firstName').type('nome')
        cy.get('#lastName').type('sobrenome')
        cy.get('#email').type('teste@tes.te')
        cy.get('#open-text-area').type('teste')
        cy.contains('button','Enviar').click()

        cy.get('.success').should('be.visible')
    })

    it('Seção 04 - seleciona um produto (YouTube) por seu texto', function(){
        cy.get('#product')
            .select('YouTube') 
            .should('have.value', 'youtube')
    })

    it('Seção 04 - Exercício Extra 01 - seleciona um produto (Mentoria) por seu valor (value)', function(){        
        cy.get('#product')
            .select('mentoria') 
            .should('have.value', 'mentoria')
    })

    it('Seção 04 - Exercício extra 02 - seleciona um produto (Blog) por seu índice', function(){
        cy.get('#product')
            .select(1)
            .should('have.value', 'blog')
    })

    it('Seção 05 - Meu - marca o tipo de atendimento "Feedback"', function(){
        cy.get('input[type="radio"]')
            .check('feedback')
            .should('have.value','feedback')
    })

    it('Seção 05 - Curso - marca o tipo de atendimento "Feedback"', function(){
        cy.get('input[type="radio"][value="feedback"]')
            .check()
            .should('have.value','feedback')
    })

    it('Seção 05 - Meu - Exercício extra 01 - marca cada tipo de atendimento', function(){
        cy.get('input[type="radio"]')
            .check('ajuda')
            .should('be.checked')
        cy.get('input[type="radio"]')
            .check('elogio')
            .should('be.checked')
        cy.get('input[type="radio"]')
            .check('feedback')
            .should('be.checked')
    })

    it('Seção 05 - Curso - Exercício extra 01 - marca cada tipo de atendimento', function(){
        cy.get('input[type="radio"]')
            .should('have.length',3)
            .each(function($radio){
                cy.wrap($radio).check()
                cy.wrap($radio).should('be.checked')
            })
    })

    it('Seção 06 - Meu - marca ambos checkboxes, depois desmarca o último', function(){
        cy.get('input[type="checkbox"]')
            .should('have.length', 2)
            .each(function($radio){
                cy.wrap($radio).check()
                cy.wrap($radio).should('be.checked')
            })
        cy.get('input[type="checkbox"][value="phone"]').uncheck()
            

        cy.get('input[type="checkbox"]')
            .should('have.length', 2)
            .each(function($radio){
                cy.wrap($radio).last()
            })
    })

    it('Seção 06 - Curso - marca ambos checkboxes, depois desmarca o último', function(){
        cy.get('input[type="checkbox"]')
            .check()
            .should('be.checked')
            .last()
            .uncheck()
            .should('not.be.checked')
    })

    it('Seção 06 - Meu - exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', function() {
        cy.get('#firstName')
            .click()
            .type('nome')

        cy.get('#lastName')
            .click()
            .type('sobrenome')

        cy.get('#email')
            .click()
            .type('email@com.br')
            
        cy.get('#phone-checkbox')
            .check()

        cy.get('#open-text-area')
            .click()
            .type('texto texto')

        cy.get('.button[type="submit"]')
            .click()

        cy.get('.error > strong')
            .should('be.visible')
    })

    it('Seção 07 - seleciona um arquivo da pasta fixtures', function(){
        cy.get('input[type="file"]#file-upload')
            .should('not.have.value')
            .selectFile('./cypress/fixtures/example.json')
            .should(function($input){
                expect($input[0].files[0].name).to.equal('example.json')
            })        
    })

    it('Seção 07 - Exercicio extra 01 - seleciona um arquivo simulando um drag-and-drop', function(){
        cy.get('input[type="file"]#file-upload')
            .should('not.have.value')
            .selectFile('./cypress/fixtures/example.json', {action: 'drag-drop'})
            .should(function($input){
                expect($input[0].files[0].name).to.equal('example.json')
                expect
            })       
    })

    it('Seção 07 - Exercicio extra 02 - seleciona um arquivo utilizando uma fixture para a qual foi dada um alias', function(){
        cy.fixture('example.json', {encoding: null}).as('exampleFile')
        cy.get('input[type="file"]#file-upload')
            .should('not.have.value')
            .selectFile({
                contents: '@exampleFile'
            })
            .should(function($input){
                expect($input[0].files[0].name).to.equal('example.json')
                expect
            })       
    })

    it('Seção 08 - Meu - verifica que a política de privacidade abre em outra aba sem a necessidade de um clique', function(){
        cy.get('a').should('have.attr','target','_blank')
    })

    it('Seção 08 - Curso - verifica que a política de privacidade abre em outra aba sem a necessidade de um clique', function(){
        cy.get('#privacy a').should('have.attr','target','_blank')
    })

    it('Seção 08 - Exercicio extra 01 - acessa a página da política de privacidade removendo o target e então clicando no link', function(){
        cy.get('a').invoke('removeAttr','target').click()
        cy.contains('Talking About Testing').should('be.visible')
    })

    // it.only('Seção 08 - Exercicio extra 02 - Desafio - testa a página da política de privacidade de forma independente', function(){
    //     cy.get('a').click()
    // })
    it('Seção 08 - Exercicio extra 02 - Desafio - testa a página da política de privacidade de forma independente', function(){
        cy.visit('./src/privacy.html')
        cy.contains('Talking About Testing').should('be.visible')
    
    })
})
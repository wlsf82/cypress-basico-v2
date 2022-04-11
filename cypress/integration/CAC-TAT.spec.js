/// <reference types="Cypress" />

describe('Central de Atendimento ao Cliente TAT', function() {
    beforeEach(function(){
        cy.visit('./src/index.html')
    })
    it('verifica o título da aplicação', function() {
          cy.visit('./src/index.html')
          cy.title()
          .should('eq','Central de Atendimento ao Cliente TAT')
        })
    it ('preenche os campos obrigatórios e envia o formulário', function(){
       const longText = 'Teste 123.Teste 123.Teste 123.Teste 123.Teste 123.Teste 123.Teste 123.Teste 123.Teste 123.'
        cy.get('#firstName')
        .type('Hélvio')
        .should('have.value', 'Hélvio')
        cy.get('#lastName')
        .type('Poletti')    
        .should('have.value', 'Poletti')
        cy.get('#email')
        .type('teste@teste.com.br')
        .should('have.value', 'teste@teste.com.br')
        cy.get('#open-text-area')
        .type(longText,{delay:0})
        cy.get('button[type="submit"]').click()
        cy.get('.success')
        .should('be.visible')
    })  
    it('exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', function(){
        cy.get('#firstName')
        .type('Hélvio')
        cy.get('#lastName')
        .type('Poletti')    
        cy.get('#email')
        .type('teste@teste,com')
        cy.get('#open-text-area')
        .type('teste')
        cy.get('button[type="submit"]').click()
        cy.get('.error')
        .should('be.visible')
    })  
    it('Validação de Telefone', function(){
        cy.get('#phone')
        .type('abcdhij')
        .should('have.value', '')
    })
    it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', function(){
        cy.get('#firstName')
        .type('Hélvio')
        cy.get('#lastName')
        .type('Poletti')    
        cy.get('#email')
        .type('teste@teste.com')
        cy.get('#open-text-area')
        .type('teste 123')
        cy.get('#phone-checkbox')
        .click()
        cy.get('button[type="submit"]').click()
        cy.get('.error')
        .should('be.visible')
    })
    it('preenche e limpa os campos nome, sobrenome, email e telefone', function() {
        cy.get('#firstName')
        .type('Hélvio')
        .should('have.value', 'Hélvio')
        .clear()
        .should('have.value', '')
        cy.get('#lastName')
        .type('Poletti')   
        .should('have.value', 'Poletti') 
        .clear()
        .should('have.value', '')
        cy.get('#email')
        .type('teste@teste.com')
        .should('have.value', 'teste@teste.com')
        .clear()
        .should('have.value', '')
        cy.get('#phone')
        .type('123456789')
        .should('have.value', '123456789')
        .clear()
        .should('have.value', '')
    })
    it('exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', function() {
        cy.get('button[type="submit"]').click()
        cy.get('.error')
        .should('be.visible')
    })
    it('envia o formuário com sucesso usando um comando customizado',function() {
        cy.fillMandatoryFieldsAndSubmit()
        cy.get('.success').should('be.visible')
    })
    it('usar o contains', function() {       
        cy.contains('button','Enviar').click().should('be.visible')      
    })
    //Seção 4: Selecionando opções de campos de seleção
    it('seleciona um produto (YouTube) por seu texto', function() {
        cy.get('#product').select ('YouTube').should('have.value', 'youtube')
    })
    it('seleciona um produto (Mentoria) por seu valor (value)', function(){
        cy.get('#product').select ('mentoria').should('have.value', 'mentoria')
    })
    it('seleciona um produto (Blog) por seu índice', function(){
        cy.get('#product').select (1).should('have.value', 'blog')
    })
    //Seção 5: Marcando inputs do tipo Radio
    it('marca o tipo de atendimento "Feedback"', function(){
        cy.get('input[type="radio"]').check('feedback').should('have.value', 'feedback')
    })
    it('marca cada tipo de atendimento', function(){
        cy.get('input[type="radio"]')
        .should('have.length',3)
        .each(function($radio){
            cy.wrap($radio).check()
            cy.wrap($radio).should('be.checked')
        })
        })
    //Seçao 6: Marcando e desmarcando inputs do tipo checkbox
    it('marca ambos checkboxes, depois desmarca o último', function(){
        cy.get('input[type="checkbox"]')
        .check()
        .should('be.checked')
        .last()
        .uncheck()
        .should('not.be.checked')
    })
    it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', function(){
        cy.get('#firstName').type('Hélvio')
        cy.get('#lastName').type('Poletti')    
        cy.get('#email').type('teste@teste.com')
        cy.get('#open-text-area').type('teste 123')
        cy.get('#phone-checkbox').check()
        cy.get('button[type="submit"]').click()
        cy.get('.error').should('be.visible')
    })
    //Seção 7: Fazendo upload de arquivos com Cypress
    it('seleciona um arquivo da pasta fixtures', function(){
        cy.get('input[type=file]')
        .should('not.have.value')
        .selectFile('cypress/fixtures/example.json')
        .should(function(input){
            expect(input[0].files[0].name).to.equal('example.json')
        })
    })
    it('seleciona um arquivo simulando um drag-and-drop', function(){
        cy.get('input[type=file]')
        .should('not.have.value')
        .selectFile('cypress/fixtures/example.json', {action: 'drag-drop'})
        .should(function(input){
            expect(input[0].files[0].name).to.equal('example.json')
        })    
    })
    it('seleciona um arquivo utilizando uma fixture para a qual foi dada um alias', function (){
        cy.fixture('example.json').as('sampleFile')
        cy.get('input[type="file"]')
        .selectFile('@sampleFile')
        .should(function(input){
            expect(input[0].files[0].name).to.equal('example.json')
        })
      })
    it('verifica que a política de privacidade abre em outra aba sem a necessidade de um clique', function(){
        cy.get('#privacy a').should('have.attr', 'target', '_blank')
    })
    it('acessa a página da política de privacidade removendo o target e então clicanco no link', function(){
        cy.get('#privacy a').invoke('removeAttr', 'target').click()
        cy.contains('Talking About Testing'). should('be.visible')
    })
    it('testa a página da política de privavidade de forma independente', function(){
        cy.get('#privacy a').click()
    })
})
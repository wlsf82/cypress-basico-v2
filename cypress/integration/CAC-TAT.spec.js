/// <reference types="Cypress" />

describe ('Central de Atendimento ao Cliente TAT', function() {
    beforeEach(function() {
         cy.visit('./src/index.html')
    })
        it('verifica o título da aplicação', function() {
        cy.title().should('be.equal','Central de Atendimento ao Cliente TAT')

    })
    it('preencher campos obrigatórios', function() {
        const longText = 'teste,teste,teste,teste,teste,teste,teste,teste,teste,teste,teste,teste,teste,teste,teste,teste,'

        cy.get ('#firstName').type('Fabio')
        cy.get ('#lastName').type ('Cruz')
        cy.get ('#email').type ('fabio@gmail.com')
        cy.get ('#open-text-area').type (longText, {delay: 5})
        cy.get ('button[type="submit"]').click()
        cy.get ('.success').should('be.visible')
    })
    
    it ('Validar preenchimento do campo telefone', function(){
        cy.get ('#phone').type ('Abc')
        cy.get ('input').should ('have.value', '')
    })
    it ('Exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', function(){
        cy.get ('#firstName').type('Fabio')
        cy.get ('#lastName').type ('Cruz')
        cy.get ('#email').type ('fabiopiriripororo')
        cy.get ('#open-text-area').type ('text')
        cy.get ('button[type="submit"]').click()
        cy.get ('.error').should('be.visible')
    })
    it('Exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', function(){
        cy.get ('#firstName').type('Fabio')
        cy.get ('#lastName').type ('Cruz')
        cy.get ('#email').type ('fabio@gmail.com')
        cy.get ('#phone-checkbox').click()
        cy.get ('#open-text-area').type ('text')
        cy.get ('button[type="submit"]').click()
        cy.get ('.error').should('be.visible')
    })
    it ('preenche e limpa os campos nome, sobrenome, email e telefone', function(){
        cy.get ('#firstName').type('Fabio')
        .should ('have.value', 'Fabio')
        .clear()
        .should('have.value', '')

        cy.get ('#lastName').type ('Cruz')
          .should ('have.value', 'Cruz')
          .clear()
          .should('have.value', '')
        
          cy.get ('#email').type ('fabio@gmail.com')
          .should('have.value','fabio@gmail.com')
          .clear()
          .should ('have.value', '')
        
          cy.get ('#phone').type ('1199990000')
          .should ('have.value','1199990000')
          .clear ()
          .should('have.value', '')
          
    })
    it ('exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios.', function(){
        cy.get('button[type="submit"]').click()
        cy.get ('.error').should('be.visible')
    
    })
    it ('Envia o formuário com sucesso usando um comando customizado', function(){
        cy.fillMandatoryFieldsAndSubmit()
        cy.get ('.success').should('be.visible')
        
    })
    it ('Utilizando a função contains', function(){
        cy.fillMandatoryFieldsAndSubmit()
        cy.get('.success').should('be.visible')
    })
   it ('Seleciona um produto (Youtube', function(){
    cy.get('#product')
      .select ('YouTube')
      .should('have.value', 'youtube')
   })
   it ('seleciona um produto (Mentoria) por seu valor (value)', function(){
    cy.get('#product')
      .select('mentoria')
        .should('have.value', 'mentoria')

   })
   it('seleciona um produto (Blog) por seu índice', function(){
    cy.get ('#product')
        .select (1)
        .should('have.value', 'blog')
   })
   it('marca o tipo de atendimento "Feedback"', function(){
    cy.get('input[type="radio"][value="feedback"]')
      .check()
      .should ('have.value', 'feedback')
   })
   it('marca cada tipo de atendimento', function (){
    cy.get('input[type="radio"]')
        .should('have.length', 3)
        .each(function($radio) {
            cy.wrap($radio).check()
            cy.wrap($radio).should('be.checked')
        })
   })
   it ('marca ambos checkboxes, depois desmarca o último', function (){
    cy.get('input[type="checkbox"]')
        .check()
        .should('be.checked')
        .last()
        .uncheck()
        .should('not.be.checked')
    })
    it('Exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', function(){
        cy.get ('#firstName').type('Fabio')
        cy.get ('#lastName').type ('Cruz')
        cy.get ('#email').type ('fabio@gmail.com')
        cy.get ('#phone-checkbox').check()
        cy.get ('#open-text-area').type ('text')
        cy.get ('button[type="submit"]').click()
        cy.get ('.error').should('be.visible')
    })
    it('Seleciona arquivo da pasta fixture', function(){
        cy.get ('input[type="file"]#file-upload')
        .should('not.have.value')
        .selectFile ('./cypress/fixtures/example.json')
        .should(function($input){
            expect($input[0].files[0].name).to.equal('example.json')
        })
       
        })
        it('Seleciona arquivo simulando um drag-and-drop', function(){
            cy.get ('input[type="file"]#file-upload')
            .should('not.have.value')
            .selectFile ('./cypress/fixtures/example.json', {action:'drag-drop'})
            .should(function($input){
                expect($input[0].files[0].name).to.equal('example.json')
            })
           
            })
            it('Seleciona arquivo utilizando o arquivo no qual foi dado um alias', function(){
                cy.fixture('example.json').as('sampleFile')
                cy.get ('input[type="file"]#file-upload')
                            
                .selectFile ('@sampleFile') 
                .should(function($input){
                    expect($input[0].files[0].name).to.equal('example.json')
                })
               
                })
            it('Verifica que a politica de privacidade abre em outra aba sem a necessidade de um clique', function(){
                cy.contains('a', 'Política de Privacidade')
                    .should('have.attr', 'href', 'privacy.html')
                    .and('have.attr', 'target', '_blank')
            })
            it('acessa a pagina da politica de privacidade removendo o target e então clicando no link', function(){
                cy.contains('a', 'Política de Privacidade')
                .invoke('removeAttr', 'target')
                .click()
                cy.contains ('h1', 'CAC TAT - Política de privacidade').should('be.visible')
            })
            

    })
    



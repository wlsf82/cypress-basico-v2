/// <reference types="Cypress" />

describe('Central de Atendimento ao Cliente TAT', function() {
    
    beforeEach(function() {

        cy.visit('./src/index.html')

    })
    it('verifica o título da aplicação', function() {

        const longtext = 'criando um texto longo para o primeiro exercicio'

        cy.title()
        .should('be.equal','Central de Atendimento ao Cliente TAT')
       
        cy.get('input[name="firstName"]')
        .should('be.visible')
        .type(longtext,{delay:0})
        .should('have.value', longtext)
    })

    it('preenche os campos obrigatórios e envia o formulário', function(){

        cy.get('input[name="firstName"]')
        .should('be.visible')
        .type('Ronaldo')
        .should('have.value', 'Ronaldo')

        cy.get('input[name="lastName"]')
        .should('be.visible')
        .type('Gentil')
        .should('have.value', 'Gentil')

        cy.get('input[type="email"]')
        .should('be.visible')
        .type('ronaldogentil2@gmail.com')
        .should('have.value', 'ronaldogentil2@gmail.com')

        cy.get('textarea[name="open-text-area"]')
        .should('be.visible')
        .type('estou fazendo o curso')
        .should('have.value', 'estou fazendo o curso')

        cy.contains('button','Enviar')
        .click()

        cy.get('.success')
        .should('be.visible')

    })

    it('exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', function() {

        cy.get('input[name="firstName"]')
        .should('be.visible')
        .type('Ronaldo')
        .should('have.value', 'Ronaldo')

        cy.get('input[name="lastName"]')
        .should('be.visible')
        .type('Gentil')
        .should('have.value', 'Gentil')

        cy.get('input[type="email"]')
        .should('be.visible')
        .type('ronaldogentil2')
        .should('have.value', 'ronaldogentil2')

        cy.get('textarea[name="open-text-area"]')
        .should('be.visible')
        .type('estou fazendo o curso')
        .should('have.value', 'estou fazendo o curso')

        cy.contains('button','Enviar')
        .click()

        cy.get('.error')
        .should('be.visible')

    })

    
    it('validar que, se um valor não-numérico for digitado no telefone, seu valor continuará vazio', function() {

        cy.get('input[type="number"]')
        .should('be.visible')
        .type('Ronaldo')
        .should('have.value', '')

    })

    it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', function() {

        cy.get('input[name="firstName"]')
        .should('be.visible')
        .type('Ronaldo')
        .should('have.value', 'Ronaldo')

        cy.get('input[name="lastName"]')
        .should('be.visible')
        .type('Gentil')
        .should('have.value', 'Gentil')

        cy.get('input[type="email"]')
        .should('be.visible')
        .type('ronaldogentil2@gmail.com')
        .should('have.value', 'ronaldogentil2@gmail.com')

        cy.get('input[id="phone-checkbox"]')
        .should('be.visible')
        .check()

        cy.get('textarea[name="open-text-area"]')
        .should('be.visible')
        .type('estou fazendo o curso')
        .should('have.value', 'estou fazendo o curso')

        cy.contains('button','Enviar')
        .click()

        cy.get('span[class="error"')
        .should('be.visible')
        
    })

    it('preenche e limpa os campos nome, sobrenome, email e telefone', function() {

        cy.get('input[name="firstName"]')
        .should('be.visible')
        .type('Ronaldo')
        .should('have.value', 'Ronaldo')
        .clear()
        .should('have.value','')

        cy.get('input[name="lastName"]')
        .should('be.visible')
        .type('Gentil')
        .should('have.value', 'Gentil')
        .clear()
        .should('have.value','')

        cy.get('input[type="email"]')
        .should('be.visible')
        .type('ronaldogentil2@gmail.com')
        .should('have.value', 'ronaldogentil2@gmail.com')
        .clear()
        .should('have.value','')

        cy.get('input[type="number"]')
        .should('be.visible')
        .type('55642011')
        .clear()
        .should('have.value','')
        
    })

    it('exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios.', function() {

        cy.contains('button','Enviar')
        .click()

        cy.get('span[class="error"')
        .should('be.visible')
        
    })

    it('envia o formuário com sucesso usando um comando customizado', function() {

        cy.fillMandatoryFieldsAndSubmit('Ronaldo','Gentil', 'ronaldogentil2@gmail.com', 'estou fazendo o curso')

        cy.get('span[class="success"')
        .should('be.visible')
        
    })

    it('seleciona um produto (YouTube) por seu texto', function() {

       cy.get('#product')
        .select('YouTube')
        .should('have.value','youtube')
        
    })

    it('seleciona um produto (Mentoria) por seu valor (value)', function() {

        cy.get('#product')
         .select('mentoria')
         .should('have.value','mentoria')
         
     })

     it('seleciona um produto (Blog) por seu índice', function() {

        cy.get('#product')
         .select(1)
         .should('have.value','blog')
         
     })

     it('marca o tipo de atendimento "Feedback"', function() {

        cy.get('input[type="radio"]')
        .check('feedback')
        .should('have.value','feedback')
     })

     it('marca cada tipo de atendimento', function() {

        cy.get('input[type="radio"]')
        .should('have.length',3)
        .each(function($radio){
            cy.wrap($radio).check()
            cy.wrap($radio).should('be.checked')
        })
        
     })

     it('marca ambos checkboxes, depois desmarca o último', function() {

        cy.get('input[type="checkbox"]')
        .check()
        .should('be.checked')
        .last()
        .uncheck()
        .should('not.be.checked')
        
     })

     it('seleciona um arquivo da pasta fixtures', function() {

        cy.get('#file-upload')
        .should('not.have.value')
        .selectFile('cypress/fixtures/example.json')
        .should(function($input){
            expect($input[0].files[0].name).to.equal('example.json')
        })
        
     })

     it('seleciona um arquivo simulando um drag-and-drop', function() {

        cy.get('#file-upload')
        .should('not.have.value')
        .selectFile('cypress/fixtures/example.json',{action: 'drag-drop'})
        .should(function($input){
            expect($input[0].files[0].name).to.equal('example.json')
        })
        
     })

     it('seleciona um arquivo utilizando uma fixture para a qual foi dada um alias', function() {
        cy.fixture('example.json').as('arquivoExemplo')
        cy.get('#file-upload')
        .should('not.have.value')
        .selectFile('@arquivoExemplo')
        .should(function($input){
            expect($input[0].files[0].name).to.equal('example.json')
        })
        
     })

     it('verifica que a política de privacidade abre em outra aba sem a necessidade de um clique', function() {
        cy.get('#privacy a').should('have.attr', 'target', '_blank')
     })

     it('verifica que a política de privacidade abre em outra aba sem a necessidade de um clique', function() {
        cy.get('#privacy a')
         .invoke('removeAttr', 'target')
         .click()

        cy.get('#title')
         .should('have.text','CAC TAT - Política de privacidade')

        cy.contains('Talking About Testing').should('be.visible')
        
     })

     it('testa a página da política de privacidade de forma independente', function() {
        
        cy.visit('./src/privacy.html')
        
        cy.get('#title')
         .should('have.text','CAC TAT - Política de privacidade')

        cy.contains('Talking About Testing').should('be.visible')
        
     })


    
  })
  
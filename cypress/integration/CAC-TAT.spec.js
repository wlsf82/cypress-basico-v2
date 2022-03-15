/// <reference types="Cypress" />  

describe('Central de Atendimento ao Cliente TAT', function() {
    beforeEach(function(){
        cy.visit( './src/index.html')
    })    
    it('verifica o título da aplicação', function() {
        cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT')
    })

    //it.only -- para executar apenas um teste
    it('Exercício 1 - preenche os campos obrigtórios e envia o formulário', function() {
        const longText = 'teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, '
        cy.get('#firstName').type("ricardo")
        cy.get('#lastName').type("veiga")
        cy.get('#email').type("ricardo@gmail.com")
        cy.get('#open-text-area').type(longText, {delay:0}) //como se fosse um crtl v, para agilizar a inserção do texto
        cy.get('button[type="submit"]').click()

        cy.get('.success').should('be.visible')

    })

    it('Exercício 2 - exibe mensagem de erro ao submeter o formulário com um email com formato inválido', function() {
        
        cy.get('#firstName').type("ricardo")
        cy.get('#lastName').type("veiga")
        cy.get('#email').type("ricardo@gmail,xcom")
        cy.get('#open-text-area').type('teste') 
        cy.get('button[type="submit"]').click()

        cy.get('.error').should('be.visible')
    })

    it('Exercício 3 - campo telefone continua vazio quando preenchido com valor não numérico', function() {
    
        cy.get('#phone')
        .type("rgregerg")
        .should('have.value', '')
    })

    it('Exercício 4 - exibe mensagem de erro quando telefone se torna obrigatório mas não é preenchido', function() {
        
        cy.get('#firstName').type("ricardo")
        cy.get('#lastName').type("veiga")
        cy.get('#email').type("ricardo@gmail.com")
        cy.get('#phone-checkbox').check()
        cy.get('#open-text-area').type('teste') 
        cy.get('button[type="submit"]').click()

        cy.get('.error').should('be.visible')
    })

    it('Exercício 5 - preenche e limpa os campos nome, sobrenome, email e telefone', function() {
        cy.get('#firstName')
        .type('ricardo')
        .should('have.value', 'ricardo')
        .clear()
        .should('have.value', '')
        cy.get('#lastName')
        .type('veiga')
        .should('have.value', 'veiga')
        .clear()
        .should('have.value', '')
        cy.get('#email')
        .type('ricardo@gmail.com')
        .should('have.value', 'ricardo@gmail.com')
        .clear()
        .should('have.value', '')
        cy.get('#phone')
        .type('123456789')
        .should('have.value', '123456789')
        .clear()
        .should('have.value', '')
    })

    it('Exercício 6 - exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', function(){
        cy.get('button[type="submit"]').click()

        cy.get('.error').should('be.visible')
    })

    it('Exercício 7 - envia formulário com sucesso usando comando customizado', function(){
        cy.fillMandatoryFieldsAndSubmit()

        cy.get('.success').should('be.visible')
    })

    it('Exercício 8 - utilizar comando contains', function() {
        const longText = 'teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, '
        cy.get('#firstName').type("ricardo")
        cy.get('#lastName').type("veiga")
        cy.get('#email').type("ricardo@gmail.com")
        cy.get('#open-text-area').type(longText, {delay:0}) 
        cy.contains('button', 'Enviar').click()

        cy.get('.success').should('be.visible')

    })

    it('seleciona um produto (YouTube) por seu texto', function(){
        cy.get('#product')
        .select('YouTube')
        .should('have.value', 'youtube')
    })

    it('seleciona um produto (Mentoria) por seu valor (value)', function(){
        cy.get('#product')
        .select('mentoria')
        .should('have.value', 'mentoria')
    })

    it('seleciona um produto (Blog) por seu índice', function(){
        cy.get('#product')
        .select(1)
        .should('have.value', 'blog')
    })

    it('marca o tipo de atendimento "Feedback"', function(){
        cy.get('input[type="radio"][value="feedback"]')
        .check()
        .should('be.checked')
    })

    it('marca cada tipo de atendimento', function(){
        cy.get('input[type="radio"]')
        .should('have.length', 3)
        //Recebe uma função de callback
        .each(function($radio){  //passando por cada um dos elementos
            cy.wrap($radio).check()
            cy.wrap($radio).should('be.checked')
        })   
    })

    it('marca ambos checkboxes, depois desmarcar o último', function(){
        cy.get('input[type="checkbox"]')
        .check()
        .should('be.checked')
        .last()
        .uncheck()
        .should('not.be.checked')
    })
    
    it('marca somente checkbox telefone', function(){
        cy.get('input[type="checkbox"]')
        .last()
        .check()
        .should('be.checked')

    })

    it('marca somente checkbox email', function(){
        cy.get('input[type="checkbox"][value="email"]')
        .check()
        .should('be.checked')

    })
    it('seleciona um arquivo utilizando uma fixture para a qual foi dada um alias', function(){
        cy.get('input[type="file"]')
        .should('not.have.value')
        .selectFile('./cypress/fixtures/example.json')
        .should(function($input) {
            console.log($input) //ajudar verificar onde o example json está no input isos no console do browser
            expect($input[0].files[0].name).to.equal('example.json')
        })
    })

    it('seleciona um arquivo simulando um drag-and-drop', function(){
        cy.get('input[type="file"]')
        .should('not.have.value')
        .selectFile('./cypress/fixtures/example.json', { action: 'drag-drop'})
        .should(function($input) {
            console.log($input) //ajudar verificar onde o example json está no input isos no console do browser
            expect($input[0].files[0].name).to.equal('example.json')
        })
    })

    it('seleciona um arquivo utilizando uma fixture para a qual foi dada um alias', function(){
        cy.fixture('example.json').as('sampleFile')
        cy.get('input[type="file"]')
        .should('not.have.value')
        .selectFile('@sampleFile')
        .should(function($input) {
            console.log($input) //ajudar verificar onde o example json está no input isos no console do browser
            expect($input[0].files[0].name).to.equal('example.json')
        })
    })

    it('verifica que a política de privacidade abre em outra aba sem a necessidade de um clique', function(){
        //pega a div privacy onde dentro tem um a href
        cy.get('#privacy a').should('have.attr', 'target', '_blank')
   
    })

    it('acessa a página da política de privacidade removendo o target e então clicanco no link', function(){
        //pega a div privacy onde dentro tem um a href
        cy.get('#privacy a')
        .invoke('removeAttr', 'target')
        .click()

        cy.contains('Talking About Testing').should('be.visible')
    })

    it('acessa a página da política de privacidade removendo o target e então clicanco no link', function(){
    
        cy.get('#privacy a')
        .invoke('removeAttr', 'target')
        .click()

        cy.contains('Talking About Testing').should('be.visible')
    })

  

  })
  
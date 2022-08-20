/// < reference types ="Cypress" />


describe('Central de atendimento ao Consumidor',function () {
    beforeEach(function () {
        cy.visit('./src/index.html')
    })
    it('Verifica o titulo da aplicação', function () {   
        cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT')
    })

    it('Preencher campos de cadastro', function (){
        cy.get('#firstName').type('Heitor')
        cy.get('#lastName').type('Rosani')
        cy.get('#email').type('email@email.com')
        cy.get('#open-text-area').type('Teste')
        cy.contains('button', 'Enviar').click()
        cy.get('.success').should('be.visible')
    })
    
    it('Email incorreto', function (){
        cy.get('#firstName').type('Heitor')
        cy.get('#lastName').type('Rosani')
        cy.get('#email').type('email.email.com')
        cy.get('#open-text-area').type('Teste')
        cy.contains('button', 'Enviar').click()
        cy.get('.error').should('be.visible')
    })
    
    it('Telefone incorreto', function (){
        cy.get('#firstName').type('Heitor')
        cy.get('#lastName').type('Rosani')
        cy.get('#email').type('email@email.com')
        cy.get('#phone').type('abcde')
        cy.get('#open-text-area').type('Teste')
        cy.contains('button', 'Enviar').click()
        cy.get('#phone').should('be.empty')
    })
    
    it('Texto longo', function (){
        const longtext = 'teste,teste,teste,teste,teste,teste,teste,teste,teste,teste,teste,teste,teste,teste,teste,teste,teste,teste,teste,teste,teste,teste,teste,teste,teste,teste,teste,teste,teste,teste,teste,teste,teste,teste,teste,teste,teste,teste, '
        cy.get('#firstName').type('Heitor')
        cy.get('#lastName').type('Rosani')
        cy.get('#email').type('email@email.com')
        cy.get('#phone').type('abcde')
        cy.get('#open-text-area').type(longtext, { delay: 0})
        cy.contains('button', 'Enviar').click()
        cy.get('#phone').should('be.empty')
    })
    
    it('Telefone obrigatório', function (){
        const longtext = 'teste'
        cy.get('#firstName').type('Heitor')
        cy.get('#lastName').type('Rosani')
        cy.get('#email').type('email@email.com')
        cy.get('#phone-checkbox').check()
        cy.get('#open-text-area').type(longtext, { delay: 0})
        cy.contains('button', 'Enviar').click()
        cy.get('.phone-label-span').should('be.visible')
        cy.get('.error').should('be.visible')
    })
    
    it('Preenche e apaga campos obrigatórios', function (){
        const longtext = 'teste'
        cy.get('#firstName').type('Heitor').should('have.value', 'Heitor').clear().should('have.value', '')
        cy.get('#lastName').type('Rosani').should('have.value', 'Rosani').clear().should('have.value', '')
        cy.get('#email').type('email@email.com').should('have.value', 'email@email.com').clear().should('have.value', '')
        cy.contains('button', 'Enviar').click()
        cy.get('.error').should('be.visible')
    })

    it('Envia um formulário com comando customizado', function (){
        cy.fillMandatoryFieldsAndSubmit()
    })

    it('Envia um formulário com comando customizado', function (){
        cy.get('#firstName').type('Heitor')
        cy.get('#lastName').type('Rosani')
        cy.get('#email').type('email@email.com')
        cy.get('#product').select('YouTube').should('have.value', 'youtube')
        cy.get('#open-text-area').type('Teste')
        cy.contains('button', 'Enviar').click()
        cy.get('.success').should('be.visible')
    })

    it('Preenche check box', function (){
        cy.get('#product')
          .select(1)
          .should('have.value', 'blog')
    })

    it('Preenche check box e radio button', function (){
        cy.get('#email-checkbox')
          .check()
          .should('be.checked')
        cy.get("input[type='radio'][value='feedback']")
          .check()
          .should('have.value', 'feedback')
    })

    it('Marca cada tipo de check', function () {
      cy.get('input[type="radio"]')
        .should('have.length', 3)
        .each( function($radio) {
          cy.wrap($radio)
            .check()
            .should('be.checked')
      })
    })

    it('Marca campos checkbox e desmarca o ultimo', function () {
      cy.get('input[type="checkbox"]')
        .check()
        .last()
        .uncheck()
        .should('not.be.checked')
    })

    it('Eviar arquivo', function(){
      cy.get('#file-upload')
      .should('not.have.value')
      .selectFile('./cypress/fixtures/example.json')
      .should(function($input){
        expect($input[0].files[0].name).to.equal('example.json')
      })
    })
      
      it('Envia um arquivo drag and drop', function(){
        cy.get('#file-upload')
        .should('not.have.value')
        .selectFile('./cypress/fixtures/example.json', { action: 'drag-drop'})
        .should(function($input){
          expect($input[0].files[0].name).to.equal('example.json')
      })
    })

    it('Envia um arquivo drag and drop como alias', function(){
      cy.fixture('example.json').as('sendFile')  
      cy.get('#file-upload')
        .selectFile('@sendFile')
        .should(function($input){
          expect($input[0].files[0].name).to.equal('example.json')
        })
    })

    it('Verifica aba diferente', function(){
      cy.get('#privacy a').should('have.attr', 'target', '_blank')
    })
})



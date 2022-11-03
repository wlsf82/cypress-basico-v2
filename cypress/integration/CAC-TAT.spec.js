/// <reference types="Cypress"./>


describe('Central de Atendimento ao Cliente TAT', function() {
    const TEMPOA_DE_CONTAGEM_DE_MENSAGEM = 300
    
    beforeEach(function() {
        cy.visit('./src/index.html')
    })
    //cada teste esta dentro de um it
    it('verificar o titulo da aplicação', function() {
        cy.title(). should('be.equal', 'Central de Atendimento ao Cliente TAT')
    })

    it('preenche os campos obrigatórios e enviar o formulario', function() {
        const longText = 'testy estySeSstyestyestyestyestyestyestyestyestyestyestyestyestyestyestyestyestyestyestyestyestyestyestyestyestyestyestyestyestyestyestyestyestyestyestyestyestyestyestyestyestyestyestyestyestyestyestyestyestyestyestyestyestyestyestyestyestyestyestyestyestyestyestyestyestyestyestyestyestyestyestyestyestyestyestyestyestyestyestyestyestyestyestyestyestyestyestyesty'
        
        cy.clock()
        
        cy.get('#firstName').type('Suelen')
        cy.get('#lastName').type('Marques')
        cy.get('#email').type('suelen@hotmail.com.br')
        cy.get('#open-text-area').type(longText, { delay: 0 })
        cy.contains('button', 'Enviar').click()

        cy.get('.success').should('be.visible')
        
        cy.tick(TEMPOA_DE_CONTAGEM_DE_MENSAGEM)
        cy.get('.success').should('not.be.visible')

    })

    it('exibe mensagem de erro ao submete o formatação', function() {
       
        cy.get('#firstName').type('Suelen')
        cy.get('#lastName').type('Marques')
        cy.get('#email').type('suelen@hotmail,com')
        cy.get('#open-text-area').type('texto')
        cy.contains('button', 'Enviar').click()

        cy.get('.error').should('be.visible')

    })

    it('campo telefone continua vazio enquanto preenchido valores não numericos', function(){
        cy.get('#phone')
        .type('asdghjkllmng')
        .should('have.value', '')
    })

    it('exibe mensagem de erro quando o telefone se torna obrigatório mas não preenchido',function(){
        cy.clock()
        
        cy.get('#firstName').type('Suelen')
        cy.get('#lastName').type('Marques')
        cy.get('#email').type('suelen@hotmail,com')
        cy.get('#phone-checkbox').check()
        cy.get('#open-text-area').type('texte')
        cy.contains('button', 'Enviar').click()

        cy.get('.error').should('be.visible')
    
        cy.tick(TEMPOA_DE_CONTAGEM_DE_MENSAGEM)
        cy.get('.error').should('not.be.visible')
    })

    it('preenche e limpa os campo nome, sobrenome, email e telefone', function(){
        cy.get('#firstName')
        .type('Suelen')
        .should('have.value', 'Suelen')
        .clear()
        .should('have.value', '')
        
        cy.get('#lastName')
        .type('Marques')
        .should('have.value', 'Marques')
        .clear()
        .should('have.value', '')

        cy.get('#email')
        .type('suelen@hotmail.com')
        .should('have.value', 'suelen@hotmail.com')
        .clear()
        .should('have.value', '')

        cy.get('#open-text-area')
        .type('teste')
        .should('have.value', 'teste')
        .clear()
        .should('have.value', '')

        cy.get('#phone')
        .type('123456789')
        .should('have.value', '123456789')
        .clear()
        .should('have.value', '')
    })

    it('exibe mensagem de erro ao submete o formulario sem preenche os campos obrigatórios', function(){
        cy.contains('button', 'Enviar').click()

        cy.get('.error').should('be.visible')
    })

    it('enviar formulario com sucesso usando comandos costumizados', function(){
        cy.filMandatorytoryAndSubmit()

        cy.get('.success').should('be.visible')
    })

    it('seleciona um produto (YouTube) por seu valor (value)', function(){
        cy.get('select')
        .select('Blog')
        .should('have.value', 'blog')
    })

    it('seleciona um produto (Mentoria) por seu valor (value)', function(){
        cy.get('#product')
        .select('Mentoria')
        .should('have.value', 'mentoria')
    })

    it('seleciona um produto pelo seu indice', function(){
        cy.get('#product')
        .select(3)
        .should('have.value', 'blog')
    })

    it('marca o tipo de atendimento "Feedback"', function(){
        cy.get('input[type="radio"][value="feedback"]')
        .check()
        .should('have.value', 'feedback')
    })

    it('marca cada tipo de atendimento', function(){
        cy.get('input[type="radio"]')
        .should('have.length',3)
        .each(function($radio) {
            cy.wrap($radio).check()
            cy.wrap($radio).should('be.checked')
        })
    })

    it('marca ambos checkboxes, depois desmarca o ultimo',function(){
        cy.get('input[type="checkbox"]')
        .check()
        .should('be.checked')
        .last()
        .uncheck()
        .should('not.be.checked')
    })

    it('selecione um arquivo da pasta fixture', function(){
        cy.get('input[type="file"]#file-upload')
        .should('not.have.value')
        .selectFile('./cypress/fixtures/example.json')
        .should(function($input) {
            expect($input[0].files[0].name).to.equal('example.json')
        })
    })

    it('selecione um arquivo simulando um drag-an-drop',function(){
        cy.get('input[type="file"]#file-upload')
        .should('not.have.value')
        .selectFile('./cypress/fixtures/example.json', { action: 'drag-drop'})
        .should(function($input) {
            expect($input[0].files[0].name).to.equal('example.json')
        })
    })

    it('selecione um arquivo utilizando uma fixture para qual foi dado um alias', function(){
        cy.fixture('example.json').as('sampleFile')
        cy.get('input[type="file"]')
            .selectFile('@sampleFile')
            .should(function($input) {
                expect($input[0].files[0].name).to.equal('example.json')
            })
    })

    it('verifica que a politica de privacidade abre em outra aba sem a necessidadede um click', function(){
        cy.get('#privacy a').should('have.attr', 'target', '_blank')
    })

    it('acessa a página da politica de privacidade removendo o target e então clicando no link', function(){
        cy.get('#privacy a')
        .invoke('removeAttr', 'target')
        .click()

        cy.contains('Talking About Testing').should('be.visible')
    })

    it('exibe e esconde as mensagens de sucesso e erro usando o .invoke', () => {
        cy.get('.success')
          .should('not.be.visible')
          .invoke('show')
          .should('be.visible')
          .and('contain', 'Mensagem enviada com sucesso.')
          .invoke('hide')
          .should('not.be.visible')
        cy.get('.error')
          .should('not.be.visible')
          .invoke('show')
          .should('be.visible')
          .and('contain', 'Valide os campos obrigatórios!')
          .invoke('hide')
          .should('not.be.visible')
    })

      it('preeche a area de texto usando comando invoke', () => {
        const longText = Cypress._.repeat('0123456789', 20)

        cy.get('#open-text-area')
          .invoke('val', longText)
          .should('have.value', longText)
    })

    it('', function(){
        
    })
})


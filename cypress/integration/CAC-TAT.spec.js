/// <reference types="Cypress" />

describe('Central de Atendimento ao Cliente TAT', function() {
    beforeEach( function() {
        cy.visit("./src/index.html")
    })

    it('verifica o título da aplicação', function() {
        cy.title().should("be.equal","Central de Atendimento ao Cliente TAT")
    })
    
    
    it("preenche os campos obrigatórios e envia o formulário", function() {
        const longText = 'teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste'
        cy.get('#firstName').type ("Moana")
        cy.get('#lastName').type ("Santos")
        cy.get('#email').type ("moana@email.com")
        cy.get('#open-text-area').type (longText, { delay: 0 })
        cy.contains('button', 'Enviar').click()

        cy.get('.success').should('be.visible')

    })

    it('Exibe mensagem de erro ao submeter o formulário com um e-mail com informação inválida', function(){
        cy.get('#firstName').type ("Moana")
        cy.get('#lastName').type ("Santos")
        cy.get('#email').type ("@com")
        cy.get('#open-text-area').type ('Teste')
        cy.contains('button', 'Enviar').click()

        cy.get('.error').should('be.visible')
    })

    it('Ao digitar valor não numérico no campo telefone permanece vazio', function(){
        cy.get('#phone')
            .type('abcdefghij')
            .should('have.value', '')
    })

    it('Exibe mensagem de erro ao submeter o formulário com um campo obrigatorio vazio', function(){
        cy.get('#firstName').type ("Moana")
        cy.get('#lastName').type ("Santos")
        cy.get('#email').type ("email@email.com")
        cy.get('#phone-checkbox').check()
        cy.get('#open-text-area').type ('Teste')
        cy.contains('button', 'Enviar').click()

        cy.get('.error').should('be.visible')
    })

    it('Envia o formulário com sucesso usando um comando customizado', function(){
        cy.fillMandatoryFieldsAndSubmit()

        cy.get('.success').should('be.visible')
    })

    it('Selecionar opção youtube do campo select produto', function (){
        cy.get('#product')
            .select('YouTube')
            .should('have.value','youtube')
    })

    it('Selecionar opção mentoria pelo valor ; value no código', function(){
        cy.get('#product')
            .select('mentoria')
            .should('have.value','mentoria')
    })

    it('Selecionar opção blog pelo indice ; posição no código', function(){
        cy.get('#product')
            .select(1)
            .should('have.value','blog')
    })

    it('Marcando o tipo de atendimento feedback ; input do tipo radio button', function(){
        cy.get('input[type="radio"][value="feedback"]')
        .check()
        .should('have.value','feedback')
    })

    it('Marca cada tipo de atendimento', function(){
        cy.get('input[type="radio"]')
            .should('have.length',3)
            .each(function($radio) {
                cy.wrap($radio).check()
                cy.wrap($radio).should('be.checked')
            })
    })

    it('Marcar ambos os checkboxes, depois desmarca o ultimo', function(){
        cy.get('input[type="checkbox"]')
        .check()
        .last()
        .uncheck()
        .should('not.be.checked')
        
    })

    it('Seleciona um arquivo na pasta fixtures', function() {
        cy.get('input[type="file"]')
        .should('not.have.value')
        .selectFile('./cypress/fixtures/example.json')
        .should(function($input){
            expect($input[0].files[0].name).to.equal('example.json')
        })
    })

    it('Seleciona um arquivo simulando drag and drop', function (){
        cy.get('input[type="file"]')
        .should('not.have.value')
        .selectFile('./cypress/fixtures/example.json', {action: 'drag-drop'})
        .should(function($input){
        })
    })

    it('Seleciona um arquivo utilizano uma fixture para a qual foi dada um  alias', function(){
        cy.fixture('example.json').as('sampleFile')
        cy.get('input[type="file"]')
            .selectFile('@sampleFile')
            .should(function($input){
                expect($input[0].files[0].name).to.equal('example.json')
            })
    })

    it('Verifica que a politica de privacidade abre em outra página sem a necessidade de um click', function(){
        cy.get('#privacy a').should('have.attr', 'target', '_blank')
    })
    


})
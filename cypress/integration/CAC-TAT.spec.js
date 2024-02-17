/// <reference types="Cypress" />

describe('Central de Atendimento ao Cliente TAT', function() {
    beforeEach(function() {

           cy.visit('./src/index.html')
        })

    it('Verifica o título da aplicação', function() {

        cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT')
    })

    it('Preenche os campos obrigatórios e envia o formulário', function() {

        const longText = 'Teste Variável LongText 123456789123456789123456789123456789123456789123456789123456789123456789123456789'
        
        cy.get('#firstName')
            .type('Gabriel')
            .should('have.value', 'Gabriel')

        cy.get('#lastName')
            .type('Pena')
            .should('have.value', 'Pena')

        cy.get('#email')
            .type('gabrielpena@gmail.com')
            .should('have.value', 'gabrielpena@gmail.com')

        cy.get('#open-text-area')
            .type(longText, { delay: 0 })
            .should('have.value', longText)

        cy.get('.button[type="submit"]')
            .click()

        cy.get('.success').should('be.visible')
    })    

    it('Exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', function() {
        
        cy.get('#firstName')
            .type('Gabriel')
            .should('have.value', 'Gabriel')

        cy.get('#lastName')
            .type('Pena')
            .should('have.value', 'Pena')

        cy.get('#email')
            .type('gabrielpena@gmail,com')

        cy.get('#phone-checkbox')
            .click()

        cy.get('#phone')
            .type('11987795322')

        cy.get('#open-text-area')
            .type('teste na area de texto')
            .should('have.value', 'teste na area de texto')

        cy.get('.button[type="submit"]')
            .click()

        cy.get('.error')
        .should('be.visible')
    })    

    it('Campo Telefone continua vazio quando preenchido com valor não-numérico', function() {

        cy.get('#phone')
            .type('abcdefghijkl')
            .should('have.value', '')
    })

    it('Exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', function() {

        cy.get('#firstName')
            .type('Gabriel')
            .should('have.value', 'Gabriel')

        cy.get('#lastName')
            .type('Pena')
            .should('have.value', 'Pena')

        cy.get('#email')
            .type('gabrielpen@gmail.com')

        cy.get('#phone-checkbox')
            .check()

        cy.get('#open-text-area')
            .type('teste na area de texto')
            .should('have.value', 'teste na area de texto')

        cy.get('.button[type="submit"]')
            .click()

        cy.get('.error')
        .should('be.visible')
    })

    it('Preenche e limpa os campos nome, sobrenome, email e telefone', function(){

        cy.get('#firstName')
            .type('Gabriel')
            .should('have.value', 'Gabriel')
            .clear()
            .should('have.value', '')

        cy.get('#lastName')
            .type('Pena')
            .should('have.value', 'Pena')
            .clear()
            .should('have.value', '')

        cy.get('#email')
            .type('gabrielpename@gmail.com')
            .clear()
            .should('have.value', '')

        cy.get('#phone')
            .type('12345678')
            .clear()
            .should('have.value', '')
    })

    it('Exibe mensagem de erro ao submeter o formulário sem, preencher os campos obrigatórios', function() {
        
        cy.get('.button[type="submit"]').click()
        
        cy.get('.error').should('be.visible')
    })

    it('Envia o formulário com sucesso usando um comando customizado', function() {
        cy.teste()

        cy.contains('button', 'Enviar')
        .click()
        cy.get('.success').should('be.visible')
    })

    it('Preenche os campos obrigatórios e envia o formulário usando o CY.CONTAINS', function() {

        cy.teste()

        cy.contains('button', 'Enviar')
        .click()
        
        cy.get('.success').should('be.visible')
    })    

    it('Teste de Elemento Select', function() {

        cy.teste()

        cy.get('#product').select('Blog').should('have.value', 'blog')       //Select utilizando o texto
        cy.get('#product').select('YouTube').should('have.value', 'youtube') //Select utilizando o value
        cy.get('#product').select(3).should('have.value', 'mentoria')        //Select utilizando a ordem do índice que sempre começa pelo valor 0
        cy.contains('button', 'Enviar').click()
        cy.get('.success').should('be.visible')
    }) 

    it('Marca o tipo de atendimento "Feedback"(Checkbox do tipo RADIO)', function() {

        cy.get('input[type="radio"][value="feedback"]')
        .check()
        .should("have.value", 'feedback')
            
    })

    it('Marca cada tipo de atendimento (Checkbox do tipo RADIO)', function() {

        cy.get('input[type="radio"]')
            .should('have.length', 3) // Verifica o tamanho, no caso se possuem 3 valores do tipo Radio
            .each(function($radio) {
                cy.wrap($radio).check()
                cy.wrap($radio).should('be.checked')
            })
            
    })

    it('Marca ambos checkboxes, depois desmarca o último', function() {

        cy.get('input[type="checkbox"]')
            .check()
            .should('be.checked')                // vai dar check em todos os elementos do tipo checkbox
            .last()                 // vai identificar o último elemento do tipo checkbox na página
            .uncheck()              // vai desmarcar o checkbox
            .should('not.be.checked')
    })

    it('Upload de arquivos da pasta Fixtures', function() {
        
        cy.get('input[type="file"]#file-upload') // <- identificação do elemento de forma especifica -- cy.get('input[type="file"]') <- identificação do elemento de forma generica, pegando qualquer elemento do tipo file
            .should('not.have.value')
            .selectFile('./cypress/fixtures/example.json')
            .should(function($input) {
                expect($input[0].files[0].name).to.equal('example.json')  //verifica pelo console, se o name é o mesmo do arquivo selecionado
            })

    })

    it('Upload de arquivo simulando um drag-and-drop', function() {

        cy.get('input[type="file"]#file-upload') // <- identificação do elemento de forma especifica -- cy.get('input[type="file"]') <- identificação do elemento de forma generica, pegando qualquer elemento do tipo file
            .should('not.have.value')
            .selectFile('./cypress/fixtures/example.json', {action: 'drag-drop' }) //simula pegar um arquivo e arrastar de uma outra janela
            .should(function($input) {
                expect($input[0].files[0].name).to.equal('example.json')  //verifica pelo console, se o name é o mesmo do arquivo selecionado
            })
    })

    it('Upload de arquivo utilizando uma fixture para a qual foi dada um alias', function() {

        cy.fixture('example.json').as('sampleFile')
        cy.get('input[type="file"]')
            .selectFile('@sampleFile')
            .should(function($input) {
                expect($input[0].files[0].name).to.equal('example.json')  //verifica pelo console, se o name é o mesmo do arquivo selecionado
            })

    })
});



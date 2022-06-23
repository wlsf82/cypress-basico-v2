/// <reference types="Cypress" />

describe('Central de Atendimento ao Cliente TAT', function() {
    beforeEach(function() {
        cy.visit('./src/index.html')
    })

    it('verifica o título da aplicação', function() {
        cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT')
    })

    it('Preenche os campos obrigatórios e envia o formulário', function() {
        cy.get('#firstName').type('Walmyr')
        cy.get('#lastName').type('Filho')
        cy.get('#email').type('walmyr.filho@hotmail.com')
        cy.get('#open-text-area').type('Teste')
        cy.contains('button', 'Enviar').click()
        
        cy.get('.success').should('be.visible') // Verifica se a mensagem de sucesso está aparecendo.
    })

    it('Exibir mensagem de erro ao não preencher campos obrigatórios', function() {
        cy.contains('button', 'Enviar').click()  
        cy.get('.error').should('be.visible')
    })

    it('Envia o formulário com sucesso usando um comando customizado', function() {
        cy.fillMandatoryFieldsAndSubmit()

        cy.get('.success').should('be.visible')
    })

    it('Selecionar o Produto (Youtube) pelo texto', function() {
        cy.get('#product')
            .select('YouTube') //Texto
            .should('have.value', 'youtube')

    })

    it('Selecionar o Produto (Mentoria) por seu valor', function() {
        cy.get('#product')
            .select('mentoria') //Valor
            .should('have.value', 'mentoria')

    })

    it('seleciona um produto (Blog) por seu índice', function() {
        cy.get('#product')
            .select(1) //Índice
            .should('have.value', 'blog')
    })

    it('marca o tipo de atendimento "Feedback"', function() {
        cy.get('[type="radio"][value="feedback"]')
            .check()
            .should('be.checked')
    })

    it('marca cada tipo de atendimento', function() {
        cy.get('[type="radio"]')
            .should('have.length', 3)
            .each(function($radio) {
                cy.wrap($radio).check()
                cy.wrap($radio).should('be.checked')
            /*
            Neste trecho do código, ele selecionou todas as opções
            seguidamente e checou de todas foram realmente selecionadas.
            */
            })
    })

    it('marca ambos checkboxes, depois desmarca o último', function() {
        cy.get('input[type="checkbox"]')
            .check()
            .should('be.checked')
            .last().uncheck()
            .should('not.be.checked')
            /*
            Primeiro marcou todos os checkboxes,
            depois desmarcou apenas o último e checa de 
            se o último realmente está desmarcado.
            */
    })

    it('selecione um arquivo da pasta fixtures', function() {
        cy.get('input[type="file"]')
        .should('not.have.value')
        .selectFile('./cypress/fixtures/example.json')
        .should(function($input) {
            expect($input[0].files[0].name).to.equal('example.json')
            /*
            Explicação na Seção 7 - Aula 29.
            */
        }) 
    })

    it('seleciona um arquivo simulando um drag-and-drop', function() {
        cy.get('input[type="file"]')
        .should('not.have.value')
        .selectFile('./cypress/fixtures/example.json', { action: 'drag-drop' })
        .should(function($input) {
            expect($input[0].files[0].name).to.equal('example.json')
            /*
            Explicação na Seção 7 - Aula 30.
            */
        })
    })

    it('seleciona um arquivo utilizando uma fixture para a qual foi dada um alias', function () {
        cy.fixture('example.json').as('sampleFile')
        cy.get('input[type="file"]')
            .selectFile('@sampleFile')
            .should(function($input) {
                expect($input[0].files[0].name).to.equal('example.json')
                /*
                Explicação na Seção 7 - Aula 31.
                */
            })
    })

    it('verifica que a política de privacidade abre em outra aba sem a necessidade de um clique', function() {
        cy.get('#privacy a').should('have.attr', 'target', '_blank')
        /*
        Explicação na Seção 8 - Aula 33.
        */
    })

    it('acessa a página da política de privacidade removendo o target e então clicanco no link', function() {
        cy.get('#privacy a')
          .invoke('removeAttr', 'target')
          .click()

        cy.contains('Talking About Testing').should('be.visible')
        /*
        Explicação na Seção 8 - Aula 34.
        */
    })
  })
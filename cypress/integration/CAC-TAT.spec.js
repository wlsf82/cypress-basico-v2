/// <reference types="Cypress" />

describe.only('Central de Atendimento ao Cliente TAT', function () {
    beforeEach(function () {
        cy.visit('./src/index.html');
    })

    it.only('verifica o título da aplicação', function () {
        cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT')
    })

    it.only('preencher os campos obrigatorios e envia o formulário', function () {
        const longText = 'Teste, Teste, Teste, Teste, Teste, Teste, Teste, Teste, Teste, Teste, Teste, Teste, Teste, Teste,'
        cy.get('#firstName').type('Carlos')
        cy.get('#lastName').type('Cavalcante')
        cy.get('#email').type('carlos@test.com')
        cy.get('#open-text-area').type(longText, { delay: 5 })
        cy.contains('button', 'Enviar').click()
        cy.get('.success').should('be.visible')
    })
    it.only('Validar mensagem de erro ao tentar colocar email invalido', function () {
        cy.get('#firstName').type('Carlos')
        cy.get('#lastName').type('Cavalcante')
        cy.get('#email').type('carlos#test.com')
        cy.contains('button', 'Enviar').click()
        cy.get('.error').should('be.visible')


    })
    it.only('campo telefone continua vazio quando preenchido com valor não-numerico', function () {
        cy.get('#phone')
            .type('ABCDEFGHIJ')
            .should('have.value', '')
    })

    it.only('exibe mensagem de erro quando o telefone se torna obrigatorio mas não e preenchido antes do envio do formulario', function () {
        cy.get('#firstName').type('Carlos')
        cy.get('#lastName').type('Cavalcante')
        cy.get('#email').type('carlos@test.com')
        cy.get('#phone-checkbox').check()
        cy.get('.phone-label-span').should('be.visible')
        cy.contains('button', 'Enviar').click()

    })

    it.only('preenche e limpa os campos nome, sobrenome, email e telefone', function () {
        cy.get('#firstName')
            .type('Carlos')
            .should('have.value', 'Carlos')
            .clear()
            .should('have.value', '')

        cy.get('#lastName')
            .type('Cavalcante')
            .should('have.value', 'Cavalcante')
            .clear()
            .should('have.value', '')

        cy.get('#email')
            .type('carlos@test.com')
            .should('have.value', 'carlos@test.com')
            .clear()
            .should('have.value', '')

        cy.get('#phone')
            .type('8299887744')
            .should('have.value', '8299887744')
            .clear()
            .should('have.value', '')

        cy.get('#open-text-area')
            .type('brincando com automação')
            .should('have.value', 'brincando com automação')
            .clear()
            .should('have.value', '')

    })

    it.only('exibe mensagem de erro ao submeter o formulario sem preencher os campos obrigatorios.', function () {
        cy.contains('button', 'Enviar').click()
        cy.get('.error > strong').should('be.visible')
    })

    it.only('envia o formuário com sucesso usando um comando customizado', function () {
        cy.fillMandatoryFieldsAndSubmit()
        cy.get('.success').should('be.visible')

    })

    it.only('seleciona um produto (YouTube) por seu texto', function () {
        cy.get('#product').select('YouTube').should('have.value', 'youtube')

    })

    it.only('seleciona um produto (Mentoria) por seu valor (value)', function () {
        cy.get('#product').select('mentoria').should('have.value', 'mentoria')

    })
    it.only('seleciona um produto (Blog) por seu índice', function () {
        cy.get('#product').select(1).should('have.value', 'blog')

    })

    it.only('marca o tipo de atendimento "Feedback"', function () {
        cy.get('input[type="radio"][value="feedback"]')
            .check()
            .should('have.value', 'feedback')
    })

    it.only('marca cada tipo de atendimento', function () {
        cy.get('input[type="radio"]')
            .should('have.length', 3)
            .each(function ($radio) {
                cy.wrap($radio).check()
                cy.wrap($radio).should('be.checked')
            })
    })

    it.only('marca ambos checkboxes, depois desmarca o último', function () {
        cy.get('input[type="checkbox"]')
            .check()
            .should('have.length', 2)
            .should('be.checked')
            .last()
            .uncheck()
            .should('not.be.checked')
    })

    it.only('seleciona um arquivo da pasta fixtures', function () {
        cy.get('input[type="file"]')
            .should('not.have.value')
            .selectFile('cypress/fixtures/example.json')
            .should(function ($input) {
                expect($input[0].files[0].name).to.equal('example.json')
            })
    })

    it.only('seleciona um arquivo simulando um drag-drop', function () {
        cy.get('input[type="file"]')
            .should('not.have.value')
            .selectFile('cypress/fixtures/example.json', { action: 'drag-drop' })
            .should(function ($input) {
                expect($input[0].files[0].name).to.equal('example.json')
            })

    })

    it.only('seleciona um arquivo utilizando uma fixture para a qual foi dada um alias', function () {
        cy.fixture('example.json').as('sampleFile')
        cy.get('input[type="file"]')
            .selectFile('@sampleFile')
            .should(function ($input) {
                expect($input[0].files[0].name).to.equal('example.json')
            })
    })
    it.only('verifica que a política de privacidade abre em outra aba sem a necessidade de um clique', function () {
        cy.get('#privacy a').should('have.attr', 'target', '_blank')
    })

    it.only('acessa a página da política de privacidade removendo o target e então clicando no link', function(){
        cy.get('#privacy a')
        .invoke('removeAttr','target')
        .click()
        
        cy.contains('Talking About Testing').should('be.visible')
    })
})

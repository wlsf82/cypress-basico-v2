/// <reference types="Cypress" />

describe('Central de Atendimento ao Cliente TAT', () => {
    beforeEach(() => {
        cy.visit('src/index.html')

    })

    it('CT01 - verifica o título da aplicação', () => {
        cy.title().should('eq', 'Central de Atendimento ao Cliente TAT')

    })

    it('CT02 - exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', () => {
        cy.get('#firstName')
            .should('be.visible')
            .should('be.empty')

        cy.get('#lastName')
            .should('be.visible')
            .should('be.empty')

        cy.get('#email')
            .should('be.visible')
            .should('be.empty')
            .type('teste.com.br')
            .should('have.value', 'teste.com.br')

        cy.get('#open-text-area')
            .should('be.visible')
            .should('be.empty')

        cy.contains('button', 'Enviar')
            .should('be.visible')
            .click()

        cy.get('.error').should('be.visible')

    })

    it('CT03 - preenche os campos obrigatórios e envia o formulário', () => {
        const longTest = 'hbzdfjhbasdjhfbasjhdfbjkhsdbfajkhsdbfjkahsdbfkjhsbdfjhsbdfjkhsb'

        cy.get('#firstName')
            .should('be.visible')
            .type('Rhaynner', { delay: 500 })
            .should('have.value', 'Rhaynner')

        cy.get('#lastName')
            .should('be.visible')
            .type('Tester')
            .should('have.value', 'Tester')

        cy.get('#email')
            .should('be.visible')
            .type('test@teste.com')
            .should('have.value', 'test@teste.com')

        cy.get('#open-text-area')
            .should('be.visible')
            .type(longTest)
            .should('have.value', longTest, { delay: 0 })

        cy.contains('button', 'Enviar')
            .should('be.visible')
            .click()

        cy.get('.success')
            .should('be.visible')

    })

    it('CT04 - testa o campo telefone com caracteres', () => {

        cy.get('#phone')
            .should('be.visible')
            .should('be.empty')
            .type('teste', { delay: 1000 })
            .should('be.be.empty')
    })

    it('CT05 - exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', () => {
        cy.get('#phone')
            .should('be.visible')
            .should('be.be.empty')

        cy.get('#phone-checkbox')
            .should('be.visible')
            .should('be.not.checked')
            .check()
            .should('be.checked')

        cy.get('.phone-label-span')
            .should('be.visible')

        cy.contains('button', 'Enviar')
            .should('be.visible')
            .click()

        cy.get('.error')
            .should('be.visible')

    })

    it('CT06 - preenche e limpa os campos nome, sobrenome, email e telefone', () => {
        const longTest = 'hbzdfjhbasdjhfbasjhdfbjkhsdbfajkhsdbfjkahsdbfkjhsbdfjhsbdfjkhsb'

        cy.get('#firstName')
            .should('be.visible')
            .type('Rhaynner')
            .should('have.value', 'Rhaynner')
            .clear()
            .should('have.value', '')

        cy.get('#lastName')
            .should('be.visible')
            .type('Tester')
            .should('have.value', 'Tester')
            .clear()
            .should('have.value', '')

        cy.get('#email')
            .should('be.visible')
            .type('test@teste.com')
            .should('have.value', 'test@teste.com')
            .clear()
            .should('have.value', '')

        cy.get('#phone')
            .should('be.visible')
            .type('62985585555')
            .should('have.value', '62985585555')
            .clear()
            .should('have.value', '')

        cy.get('#open-text-area')
            .should('be.visible')
            .type(longTest)
            .should('have.value', longTest)
            .clear()
            .should('have.value', '')

    })

    it('envia o formuário com sucesso usando um comando customizado', () => {
        const longText = 'hbzdfjhbasdjhfbasjhdfbjkhsdbfajkhsdbfjkahsdbfkjhsbdfjhsbdfjkhsb'

        cy.fillMandatoryFieldsAndSubmit('Rhaynner', 'Costa', 'teste@teste.com', longText)

        cy.get('.success')
            .should('be.visible')

    })

    it('seleciona um produto (YouTube) por seu texto', () => {
        cy.get('#product')
            .select('YouTube')
            .should('have.value', 'youtube')
    })

    it('seleciona um produto (Mentoria) por seu valor (value)', () => {
        cy.get('#product')
            .select('mentoria')
            .should('have.value', 'mentoria')

    })

    it('seleciona um produto (Blog) por seu índice', () => {
        cy.get('#product')
            .select(1)
            .should('have.value', 'blog')

    })

    it('marca o tipo de atendimento "Feedback"', () => {
        cy.get('input[value="feedback"]')
            .check()
            .should('be.checked')

    })

    it('marca cada tipo de atendimento', () => {
        cy.get('input[type="radio"]')
            .should('have.length', 3)
            .each(function ($radio) {
                cy.wrap($radio).check()
                cy.wrap($radio).should('be.checked')
            })


    })

    it('marca ambos checkboxes, depois desmarca o último', () => {
        cy.get('input[type="checkbox"]')
            .check()
            .should('be.checked')
            .last()
            .uncheck()
            .should('not.be.checked')
    })

    it('seleciona um arquivo da pasta fixtures', () => {
        cy.get('#file-upload')
            .should('be.visible')
            .should('not.have.value')
            .selectFile('./cypress/fixtures/example.json')
            .should(function ($inputFile) {
                //console.log($inputFile)
                expect($inputFile[0].files[0].name).to.equal('example.json')

            })
    })

    it('seleciona um arquivo simulando um drag-and-drop', () => {
        cy.get('#file-upload')
            .should('be.visible')
            .should('not.have.value')
            .selectFile('./cypress/fixtures/example.json', { action: 'drag-drop' })
            .should(function ($inputFile) {
                //console.log($inputFile)
                expect($inputFile[0].files[0].name).to.equal('example.json')

            })
    })

    it('seleciona um arquivo utilizando uma fixture para a qual foi dada um alias', () => {
        cy.fixture('example.json').as('sampleFile')

        cy.get('#file-upload')
            .should('be.visible')
            .should('not.have.value')
            .selectFile('@sampleFile')
            .should(function ($inputFile) {
                //console.log($inputFile)
                expect($inputFile[0].files[0].name).to.equal('example.json')
            })
    })

    it('verifica que a política de privacidade abre em outra aba sem a necessidade de um clique', () => {
        cy.get('#privacy a')
            .should('have.attr', 'target', '_blank')//atributo target que determina se o link vai ser aberto em outra aba. Esse compotamento existe em qualquer navegador 
    })

    it('acessa a página da política de privacidade removendo o target e então clicando no link', () => {
        cy.get('#privacy a')
            .invoke('removeAttr', 'target')//remove o atributo target, que faz o navegador abrir em outra aba. Dessa forma ele abre o link na mesma aba
            .click()
        cy.contains('Talking About Testing')
            .should('be.be.visible')

    })

})
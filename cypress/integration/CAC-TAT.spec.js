/// <reference types="Cypress" />


describe('Central de Atendimento ao Cliente TAT', function () {
    beforeEach(() => {
        cy.visit("./src/index.html");
    })

    it('verifica o titulo da aplicação', function () {
        cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT')
    })

    it('preenche os campos obrigatórios e envia o formulário', function () {
        const longText = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed scelerisque libero ac pretium posuere. Duis rhoncus nunc vel imperdiet faucibus. Cras dictum pretium ante et cursus. Fusce ac vestibulum tortor. Mauris bibendum mauris ex, ut sollicitudin odio laoreet ac. Praesent ullamcorper, nulla eu volutpat dictum, mi dolor commodo magna, vel laoreet quam erat non elit. Phasellus sagittis, urna a facilisis fermentum, sapien elit consectetur augue, quis porttitor libero elit eget mi. Donec molestie bibendum accumsan. Suspendisse pulvinar, leo eu varius tincidunt, magna nulla vehicula lacus, vitae semper lectus odio vel magna. Nullam eu justo suscipit, hendrerit neque eu, auctor orci. Donec aliquet euismod velit, vel fermentum purus accumsan a. Nullam eget libero id enim elementum dapibus. Nullam ullamcorper mauris neque. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Vestibulum sodales turpis tellus, a interdum nisi iaculis nec. Aliquam laoreet arcu id risus commodo, sed auctor sem viverra.'
        cy.get('input[id="firstName"]').type('Octávio')
        cy.get('input[id="lastName"]').type('Mangabeira')
        cy.get('input[id="email"]').type('qa@hotmail.com')
        cy.get('textarea[name="open-text-area"]').type(longText, { delay: 0 })
        cy.contains('button', 'Enviar').click()

        cy.get('span[class="success"]').should('be.visible')
    })

    it('exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', function () {
        cy.get('input[id="firstName"]').type('Octávio')
        cy.get('input[id="lastName"]').type('Mangabeira')
        cy.get('input[id="email"]').type('qa.hotmail.com')
        cy.get('textarea[name="open-text-area"]').type('Como fazer a instalação do Cypress')
        cy.contains('button', 'Enviar').click()

        cy.get('span[class="error"]').should('be.visible')
    })

    it('campo telefone continua vazio quando preenchido com valor não-numérico', function () {
        cy.get('#phone')
            .type('abcdefghij')
            .should('have.value', '')
    })

    it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', function () {
        cy.get('input[id="firstName"]').type('Octávio')
        cy.get('input[id="lastName"]').type('Mangabeira')
        cy.get('input[id="email"]').type('qa@hotmail.com')
        cy.get('textarea[name="open-text-area"]').type('Como fazer a instalação do Cypress')
        cy.get('input[id="phone-checkbox"]').check()
        cy.contains('button', 'Enviar').click()

        cy.get('span[class="error"]').should('be.visible')
    })

    it('preenche e limpa os campos nome, sobrenome, email e telefone', function () {
        cy.get('input[id="firstName"]')
            .type('Octávio')
            .should('have.value', 'Octávio')
            .clear()
            .should('have.value', '')
        cy.get('input[id="lastName"]')
            .type('Mangabeira')
            .should('have.value', 'Mangabeira')
            .clear()
            .should('have.value', '')
        cy.get('input[id="email"]')
            .type('qa@hotmail.com')
            .should('have.value', 'qa@hotmail.com')
            .clear()
            .should('have.value', '')
        cy.get('#phone')
            .type('123456789')
            .should('have.value', '123456789')
            .clear()
            .should('have.value', '')
    })

    it('exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', function () {
        cy.contains('button', 'Enviar').click()

        cy.get('span[class="error"]').should('be.visible')

    })

    it("envia o formuário com sucesso usando um comando customizado", function () {
        cy.fillMandatoryFieldsAndSubmit()

        cy.get('span[class="success"]').should('be.visible')
    })

    it("seleciona um produto (YouTube) por seu texto", function () {
        cy.get("select[id='product']")
            .select('YouTube')
            .should('have.value', 'youtube')
    })

    it("seleciona um produto (Mentoria) por seu valor (value)", function () {
        cy.get("select[id='product']")
            .select('mentoria')
            .should('have.value', 'mentoria')
    })

    it("seleciona um produto (Blog) por seu índice", function () {
        cy.get("select[id='product']")
            .select(1)
            .should('have.value', 'blog')
    })

    it("marca o tipo de atendimento Feedback", function () {
        cy.get("input[value='feedback']")
            .check()
            .should('have.value', 'feedback')
    })

    it("marca cada tipo de atendimento", function () {
        cy.get('input[type="radio"]')
            .should('have.length', 3)
            .each(function ($radio) {
                cy.wrap($radio).check()
                cy.wrap($radio).should('be.checked')
            })
    })

    it('marca ambos checkboxes, depois desmarca o último', function () {
        cy.get('input[type="checkbox"]')
            .check()
            .should('be.checked')
            .last()
            .uncheck()
            .should('not.be.checked')
    })

    it('seleciona um arquivo da pasta fixtures', function () {
        cy.get('input[type="file"]')
            .should('not.have.value')
            .selectFile('cypress/fixtures/example.json')
            .should(function ($input) {
                expect($input[0].files[0].name).to.equal('example.json')
            })

    })

    it('seleciona um arquivo simulando um drag-and-drop', function () {
        cy.get('input[type="file"]')
            .should('not.have.value')
            .selectFile('cypress/fixtures/example.json', { action: 'drag-drop' })
            .should(function ($input) {
                expect($input[0].files[0].name).to.equal('example.json')
            })

    })

    it('seleciona um arquivo utilizando uma fixture para a qual foi dada um alias', function () {
        cy.fixture('example.json').as('sampleFile')
        cy.get('input[type="file"]')
            .selectFile('@sampleFile')
            .should(function ($input) {
                expect($input[0].files[0].name).to.equal('example.json')
            })

    })

    it('verifica que a política de privacidade abre em outra aba sem a necessidade de um clique', function () {
        cy.get('a[href="privacy.html"]').should('have.attr', 'target', '_blank')
    })

    it('acessa a página da política de privacidade removendo o target e então clicando no link', function () {
        cy.get('a[href="privacy.html"]')
            .invoke('removeAttr', 'target')
            .click()
        
        cy.contains('Talking About Testing').should('be.visible')
    })
})

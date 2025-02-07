/// <reference types="Cypress" />

describe('Central de Atendimento ao Cliente TAT', () => {

    const tresSegundos = 3000

    beforeEach(() => {
        cy.visit('./src/index.html')
    })

    it('verifica o título da aplicação', () => {
        cy.title()
            .should('eq', 'Central de Atendimento ao Cliente TAT')
    })

    it('preenche os campos obrigatórios e envia o formulário', () => {

        const longText = 'Teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste'

        cy.clock()
        cy.get('#firstName')
            .type('Nome')
        cy.get('#lastName')
            .type('Sobrenome')
        cy.get('#email')
            .type('quiteria@exemplo.com')
        cy.get('#open-text-area')
            .type(longText, { delay: 0 })
        cy.contains('button', 'Enviar')
            .click()
        cy.get('.success')
            .should('be.visible')
        cy.tick(tresSegundos)
        cy.get('.success')
            .should('not.be.visible')
    })

    it('exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', () => {
        cy.clock()
        cy.get('#firstName')
            .type('Quitéria')
        cy.get('#lastName')
            .type('Teixeira')
        cy.get('#email')
            .type('quiteria@exemplo,com')
        cy.get('#open-text-area')
            .type('Teste')
        cy.contains('button', 'Enviar')
            .click()
        cy.get('.error')
            .should('be.visible')
        cy.tick(tresSegundos)
        cy.get('.error')
            .should('not.be.visible')
    })

    it('campo telefone continua vazio quando preenchido com valor não-numérico', () => {
        cy.get('#phone')
            .type('abcdefghij')
            .should('have.value', '')
    })

    it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', () => {
        cy.clock()
        cy.get('#firstName')
            .type('Quitéria')
        cy.get('#lastName')
            .type('Teixeira')
        cy.get('#email')
            .type('quiteria@exemplo.com')
        cy.get('#phone-checkbox')
            .check();
        cy.get('#open-text-area')
            .type('Teste')
        cy.contains('button', 'Enviar')
            .click()
        cy.get('.error')
            .should('be.visible')
        cy.tick(tresSegundos)
        cy.get('.error')
            .should('not.be.visible')
    })

    it('preenche e limpa os campos nome, sobrenome, email e telefone`', () => {
        cy.get('#firstName')
            .type('Quitéria')
            .should('have.value', 'Quitéria')
            .clear()
            .should('have.value', '')
        cy.get('#lastName')
            .type('Teixeira')
            .should('have.value', 'Teixeira')
            .clear()
            .should('have.value', '')
        cy.get('#email')
            .type('quiteria@exemplo.com')
            .should('have.value', 'quiteria@exemplo.com')
            .clear()
            .should('have.value', '')
        cy.get('#phone')
            .type('1234567890')
            .should('have.value', '1234567890')
            .clear()
            .should('have.value', '')
    })

    it('exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', () => {
        cy.clock()
        cy.contains('button', 'Enviar')
            .click()
        cy.get('.error')
            .should('be.visible')
        cy.tick(tresSegundos)
        cy.get('.error')
            .should('not.be.visible')
    })

    it('envia o formuário com sucesso usando usando comando customizado', () => {
        cy.clock()
        cy.fillMandatoryFieldsAndSubmit()
        cy.get('.success')
            .should('be.visible')
        cy.tick(tresSegundos)
        cy.get('.success')
            .should('not.be.visible')
    })

    it('seleciona um produto (YouTube) por seu texto', () => {
        cy.get('#product')
            .select('YouTube')
            .should('have.value', 'youtube')
    })

    it('seleciona um produto (Mentoria) por seu valor (value)', () => {
        const valorMentoria = 'mentoria'
        cy.get('#product')
            .select(valorMentoria)
            .should('have.value', valorMentoria)
    })

    it('seleciona um produto (Blog) por seu índice', () => {
        cy.get('#product')
            .select(1)
            .should('have.value', 'blog')
    })

    it('marca o tipo de atendimento "Feedback"', () => {
        cy.get('input[type="radio"][value="feedback"]')
            .check()
            .should('have.value', 'feedback')
    })

    it('marca cada tipo de atendimento', () => {
        cy.get('input[type="radio"]')
            .should('have.length', 3)
            .each(($radio) => {
                cy.wrap($radio)
                    .check()
                    .should('be.checked')
            })

        it('marca ambos checkboxes, depois desmarca o último', () => {
            cy.get('input[type="checkbox"]')
                .check()
                .should('be.checked')
                .last()
                .uncheck()
                .should('not.be.checked')
        })
    })

    it('seleciona um arquivo da pasta fixtures', () => {
        cy.get('input[type="file"]')
            .should('not.have.value')
            .selectFile('./cypress/fixtures/example.json')
            .should((input) => {
                expect(input[0].files[0].name).to.equal('example.json')
            })
    })

    it('seleciona um arquivo simulando um drag-and-drop', () => {
        cy.get('input[type="file"]')
            .should('not.have.value')
            .selectFile('./cypress/fixtures/example.json', { action: "drag-drop" })
            .should((input) => {
                expect(input[0].files[0].name).to.equal('example.json')
            })
    })

    it('seleciona um arquivo utilizando uma fixture para a qual foi dada um alias', () => {
        cy.fixture('example.json').as('sampleFile')
        cy.get('input[type="file"]')
            .should('not.have.value')
            .selectFile('@sampleFile') //para informar uma alias tem que colocar o @ antes como exemplo
            .should((input) => {
                expect(input[0].files[0].name).to.equal('example.json')
            })
    })

    it('verifica que a política de privacidade abre em outra aba sem a necessidade de um clique', () => {
        cy.get('#privacy a')
            .should('have.attr', 'target', '_blank')
    })

    it('acessa a página da política de privacidade removendo o target e então clicando no link', () => {
        cy.get('#privacy a')
            .invoke('removeAttr', 'target')
            .click()
        Cypress._.times(4, () => {
            cy.contains('CAC TAT - Política de privacidade')
                .should('be.visible')
        })
    })

    Cypress._.times(4, () => {
        it('verifica o título da aplicação quatro vezes', () => {
            cy.title()
                .should('eq', 'Central de Atendimento ao Cliente TAT')
        })

    })

    Cypress._.times(3, () => {
        it('acessa a página da política de privacidade três vezes', () => {
            cy.get('#privacy a')
                .invoke('removeAttr', 'target')
                .click()
            Cypress._.times(4, () => {
                cy.contains('CAC TAT - Política de privacidade')
                    .should('be.visible')
            })
        })
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

    it('preenche a area de texto usando o comando invoke', () => {

        const longText = Cypress._.repeat('0123456789', 20)

        cy.get('#open-text-area')
            .invoke('val', longText)
            .should('have.value', longText)
    })

    it('faz uma requisição HTTP', () => {
        cy.request({
            method: 'GET',
            url: 'https://cac-tat.s3.eu-central-1.amazonaws.com/index.html'
        }).then((response) => {
            expect(response.status).to.equal(200);
            expect(response.statusText).to.equal('OK');
            expect(response.body).contains('CAC TAT');
        })
    })

    it('faz uma requisição HTTP da forma mostrada no curso', () => {
        cy.request('https://cac-tat.s3.eu-central-1.amazonaws.com/index.html')
            .should((response) => {
                const { status, statusText, body } = response
                expect(status).to.equal(200)
                expect(statusText).to.equal('OK')
                expect(body).to.include('CAC TAT')
            })
    })

    it('encontra o gato escondido', () => {
        cy.get('#cat')
            .invoke('show')
            .should('be.visible')
        cy.get('#title')
            .invoke('text', 'CAT TAT')
            .should('have.text', 'CAT TAT')
        cy.get('#subtitle')
            .invoke('text', 'EU ❤️ CATS')
            .should('have.text', 'EU ❤️ CATS')
    })
})
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
            .click()
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
})
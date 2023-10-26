/// <reference types="Cypress" />

describe('Central de Atendimento ao CLiente TAT', () => {
    beforeEach( () =>{
        cy.visit('./src/index.html')
    })

    it('verfica o título da aplicação', () => {
        cy.title().should('eq', 'Central de Atendimento ao Cliente TAT')
    })

    it('preenche os campos obrigatórios e envia o formulário', () => {
        const longText = 'TESTE, TESTE, TESTE, TESTETESTE, TESTE, TESTE, TESTETESTE, TESTE, TESTE, TESTETESTE, TESTE, TESTE, TESTETESTE, TESTE, TESTE, TESTETESTE, TESTE, TESTE, TESTETESTE, TESTE, TESTE, TESTETESTE, TESTE, TESTE, TESTETESTE, TESTE, TESTE, TESTETESTE, TESTE, TESTE, TESTETESTE, TESTE, TESTE, TESTETESTE, TESTE, TESTE, TESTE'

        cy.get('#firstName').type('gabriel')
        cy.get('#lastName ').type('reis')
        cy.get('#email').type('gabriel@emial.com')
        cy.get('#open-text-area').type(longText,  {delay: 0})
        cy.contains('button', 'Enviar').click()
        cy.get('.success').should('be.visible')
    })

    it('exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', () => {
        cy.get('[id="firstName"]').type('gabriel')
        cy.get('[id="lastName"]').type('reis')
        cy.get('[id="email"]').type('gabrielemialcom')
        cy.get('[id="open-text-area"]').type('Curso de cypress muito bom')
        cy.contains('Enviar').click()
        cy.get('[class="error"]').should('be.visible')
    })

    it('se for digitado letra no campo telefone ele permanece vazio', () => {
        cy.get('[id="phone"]').type('gabriel').should('have.value', '')
    })

    it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', () => {
        cy.get('[id="firstName"]').type('gabriel')
        cy.get('[id="lastName"]').type('reis')
        cy.get('[id="email"]').type('gabrielemialcom')
        cy.get('[id="phone-checkbox"]').check()
        cy.get('[id="open-text-area"]').type('Curso de cypress muito bom ')
        cy.contains('Enviar').click()
        cy.get('[class="error"]').should('be.visible')
    })

    it('preenche e limpa os campos nome, sobrenome, email e telefone', () => {
        cy.get('[id="firstName"]').type('gabriel').should('have.value', 'gabriel').clear().should('have.value', '')
        cy.get('[id="lastName"]').type('reis').should('have.value', 'reis').clear().should('have.value', '')
        cy.get('[id="email"]').type('gabrielemialcom').should('have.value', 'gabrielemialcom').clear().should('have.value', '')
        cy.get('[id="phone"]').type('1136050099').should('have.value', '1136050099').clear().should('have.value', '')
    })

    it('exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatóriosd', () => {
        cy.contains('Enviar').click()
        cy.get('[class="error"]').should('be.visible')
    })

    it('envia o formulário com sucesso usando um comando customizado', () => {
        cy.fillMandatoryFieldsAndSubmit()
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
        cy.get('input[type="radio"][value="feedback"]')
        .check()
        .should('have.value', 'feedback')
    })

    it('marca cada tipo de atendimento', () => {
        cy.get('input[type="radio"]')
        .should('have.length', 3)
        .each(function($radio) {
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

    it('', () => {
        
    })

    it('', () => {
        
    })

    it('', () => {
        
    })

    it('', () => {
        
    })

    it('', () => {
        
    })

})

/// <reference types="Cypress" />

describe('Central de Atendimento ao Cliente TAT', function() {
    const THREE_SECONDS_IN_MS = 3000

    beforeEach(function() {
    cy.visit('./src/index.html')
    })

    it('verifica o título da aplicação', function() {
    cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT')
    })

    it('preenche os campos obrigatórios e envia o formulário', function() {

    cy.clock()

    cy.get('#firstName').type('Rafael')
    cy.get('#lastName').type('Lima')
    cy.get('#email').type('rafael.flima@outlook.com')
    cy.get('#open-text-area').type('Teste')
    cy.get('button[type="submit"]').click('')

    cy.get('.success').should('be.visible')

    cy.tick(THREE_SECONDS_IN_MS)

    cy.get('.success').should('not.be.visible')
    })

    it('exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', function(){

    cy.clock()
        
    cy.get('#firstName').type('Rafael')
    cy.get('#lastName').type('Lima')
    cy.get('#email').type('rafael.flima,outlook.com')
    cy.get('#open-text-area').type('Teste')
    cy.get('button[type="submit"]').click('')

    cy.get('.error').should('be.visible')

    cy.tick(THREE_SECONDS_IN_MS)

    cy.get('.error').should('not.be.visible')
    })

    Cypress._.times(3, function(){

    it('campo telefone continua vazio quando preenchido com valor não-numerico', function(){
    cy.get('#phone')
    .type('abcdefgh')
    .should('have.value', '')
    })
 })

    it('exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', function(){

    cy.clock()

    cy.get('#firstName').type('Rafael')
    cy.get('#lastName').type('Lima')
    cy.get('#email').type('rafael.flima@outlook.com')
    cy.get('#phone-checkbox').click()
    cy.get('#open-text-area').type('Teste')
    cy.get('button[type="submit"]').click('')

    cy.get('.error').should('be.visible')

    cy.tick(THREE_SECONDS_IN_MS)

    cy.get('.error').should('not.be.visible')
    })

    it('Limpa os campos de nome, sobrenome, telefone', function(){
    cy.get('#firstName')
        .type('Rafael')
        .should('have.value', 'Rafael')
        .clear()
    cy.get('#lastName')
        .type('Lima')
        .should('have.value', 'Lima')
        .clear()
    cy.get('#email')
        .type('rafael.flima@outlook.com')
        .should('have.value', 'rafael.flima@outlook.com')
        .clear()
    cy.get('#phone')
        .type('123456789')
        .should('have.value', '123456789')
        .clear()
    })

    it('Campos Obrigatorio', function(){

    cy.clock()

    cy.get('button[type="submit"]').click('')

    cy.get('.error').should('be.visible')

    cy.tick(THREE_SECONDS_IN_MS)

    cy.get('.error').should('not.be.visible')
    })

    it('envia formulário com sucesso usando um comando customizado', function(){

    cy.clock()

    cy.fillMandatoryFieldsAndSubmit()

    cy.get('.success').should('be.visible')

    cy.tick(THREE_SECONDS_IN_MS)

    cy.get('.success').should('not.be.visible')
    })

    it('exibe por 3 segundos', function(){
        cy.clock() // congela o relógio
        cy.tick(3000) // avança o relógio e 3 milessegundos
    })

    it('exibe e esconde as mensagens de sucesso e erro usando o .invoke', () => {
    cy.get('success')
        .should('not.be.visible')
        .invoke('show')
        .should('be.visible')
        .and('contain', 'Mensagem enviado com sucesso.')
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

    it.only('exibe e esconde as mensagens de sucesso e erro usando o .invoke', () => {
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

      // teste de branch
})
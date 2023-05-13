/// <reference types="Cypress" />

describe('Central de Atendimento ao Cliente TAT', function () {
  beforeEach(function () {
    cy.visit('./src/index.html')
  })

  it('verifica o título da aplicação', function () {
    cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT')
  })

  it('preenche os campos obrigatórios e envia o formulário', function () {
    cy.get('#firstName').type('Augusto')

    cy.get('#lastName').type('Hassan')

    cy.get('#email').type('gutex@mail.com')

    cy.get('#open-text-area').type('Teste 123456')

    cy.contains('button', 'Enviar').click()

    cy.get('.success').should('be.visible')
  })

  it('preenche os campos obrigatórios e envia o formulário & preenche texto longo no campo "Como podemos te ajudar" sem delay', function () {
    const longTest =
      'Teste, teste, teste,este, teste, testeeste, teste, testeeste, teste, testeeste, teste, testeeste, teste, testeeste, teste, teste'
    cy.get('#firstName').type('Augusto')

    cy.get('#lastName').type('Hassan')

    cy.get('#email').type('gutex@mail.com')

    cy.get('#open-text-area').type(longTest, { delay: 0 })

    cy.get('.button[type="submit"]').click()

    cy.get('.success').should('be.visible')
  })

  it('exibe uma mensagem de erro ao submeter o formulário com um email com formatação inválida', function () {
    cy.get('#firstName').type('Augusto')

    cy.get('#lastName').type('Hassan')

    cy.get('#email').type('123')

    cy.get('.button[type="submit"]').click()

    cy.get('.error').should('be.visible')
  })

  it('preenche o campo telefone com valor nao-numerico', function () {
    cy.get('#phone').type('abcdefghu').should('have.value', '')
  })

  it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', function () {
    cy.get('#firstName').type('Augusto')

    cy.get('#lastName').type('Hassan')

    cy.get('#email').type('gutex@mail.com')

    cy.get('#phone-checkbox').check()

    cy.get('#open-text-area').type('Teste 123456')

    cy.get('.button[type="submit"]').click()

    cy.get('.error')
      .should('exist')
  })

  it('envia o furmulário com sucesso usando um comando customizado', function () {
    cy.fillMandatoryFieldsAndSubmit()
  })

  it('Seleciona um produto (Youtube) pelo texto ', function () {
    cy.get('#product').select('YouTube')
      .should('have.value', 'youtube')
  })

  it('Seleciona um produto (Mentoria) pelo value ', function () {
    cy.get('#product').select('mentoria')
      .should('have.value', 'mentoria')
  })

  it('Seleciona um produto (Blog) pelo index ', function () {
    cy.get('#product').select(1)
      .should('have.value', 'blog')
  })

  it('marca o tipo de atendimento "ajuda"', function () {
    cy.get('input[type="radio"]')
      .filter('[value="ajuda"]')
      .check()
      .should('have.value', 'ajuda')
  })

  it('marca cada tipo de atendimento', function () {
    cy.get('input[type="radio"]')
      .should('have.length', 3)
      .each(function ($radio) {
        cy.wrap($radio).check()
        cy.wrap($radio).should('be.checked')
      })
  })

  it('marca ambos checkbox e desmarca o último', function () {
    cy.get('input[type="checkbox"]')
      .check()
      .should('be.checked')
      .last()
      .uncheck()
      .should('not.be.checked')
  })

  it('seleciona um arquivo da pasta fixture', function () {
    cy.get('input[type="file"]#file-upload')
      .should('not.have.value')
      .selectFile('cypress/fixtures/example.json')
      .should(function ($input) {
        expect($input[0].files[0].name).to.equal('example.json')
      })
  })

  it('seleciona um arquivo simulando um drag-and-drop', function () {
    cy.get('input[type="file"]#file-upload')
      .should('not.have.value')
      .selectFile('cypress/fixtures/example.json', { action: 'drag-drop' })
      .should(function ($input) {
        expect($input[0].files[0].name).to.equal('example.json')
      })
  })

  it('seleciona um arquivo utilizando uma fixture para a qual foi dada um alias', function () {
    cy.fixture('example.json').as('sampleFile')
    cy.get('input[type="file"]#file-upload')
      .should('not.have.value')
      .selectFile('@sampleFile')
      .should(function ($input) {
        expect($input[0].files[0].name).to.equal('example.json')
      })
  })

  it('verifica que a política de privacidade abre em outra aba sem a necessidade de um clique', function () {
    cy.get('a[href="privacy.html"]')
      .should('have.attr', 'target', '_blank')
  })

  it('acessa a página da política de privacidade removendo o target e então clicando no link', function () {
    cy.get('a[href="privacy.html"]')
      .invoke('removeAttr', 'target')
      .click()
    
    cy.get('#title')
      .should('have.text', 'CAC TAT - Política de privacidade')
  })
})

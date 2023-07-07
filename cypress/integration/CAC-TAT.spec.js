// CAC-TAT.spec.js created with Cypress
//
// Start writing your Cypress tests below!
// If you're unfamiliar with how Cypress works,
// check out the link below and learn how to write your first test:
// https://on.cypress.io/writing-first-test
/// <reference types="Cypress" />


describe('Central de Atendimento ao Cliente TAT', function() {

  beforeEach(() => {
    cy.visit('./src/index.html')
  })
    it('verifica o título da aplicação', function() {
      cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT')
    })
     //Exercício aula 1
    it('preenche os campos obrigatórios e envia o formulário', () => {
      const longText = 'vita frui quia brevis est sicut fulgur cum advenerit, terremur et subito dilabimur spectaculum erat cum cognovimus'

      cy.get('#firstName').type('Ana')
      cy.get('#lastName').type('Silva')
      cy.get('#email').type('ana@email.com')
      cy.get('#phone').type('55999899658')
      cy.get('#open-text-area').type('longText', {delay: 0})
      cy.get('.button[type="submit"]').click({forece: true})

      cy.get('.success').should('be.visible')
    })
    //exercio extra 2
    it('exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', () => {
      cy.get('#firstName').type('Ana')
      cy.get('#lastName').type('Silva')
      cy.get('#email').type('ana@.com')
      cy.get('#phone').type('55999899658')
      cy.get('.button[type="submit"]').click({forece: true})
      
      cy.get('.error').should('be.visible')
    })
    //exercio extra 3
    it('verifica se o campo telefone contém apenas valores numéricos', () => {
      cy.get('#phone').type('ana').should('have.value', '')     
    })
    //exercio extra 4
    it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', () => {
      cy.get('#firstName').type('Ana')
      cy.get('#lastName').type('Silva')
      cy.get('#email').type('ana@email.com')
      cy.get('#phone-checkbox').click({force:true})
      cy.get('#open-text-area').type('Teste de digitação')
      cy.get('.button[type="submit"]').click({forece: true})
      
      cy.get('.error').should('be.visible')
    })
    //exercio extra 5
    it('preenche e limpa os campos nome, sobrenome, email e telefone', () => {
      cy.get('#firstName').type('Ana').should('have.value', 'Ana').clear().should('have.value', '')
      cy.get('#lastName').type('Silva').should('have.value', 'Silva').clear().should('have.value', '')
      cy.get('#email').type('ana@email.com').should('have.value', 'ana@email.com').clear().should('have.value', '')
      cy.get('#open-text-area').type('Teste de digitação').should('have.value', 'Teste de digitação').clear().should('have.value', '')
      cy.get('.button[type="submit"]').click({forece: true})
      
      cy.get('.error').should('be.visible')
    })
    //exercicio extra 6
    it('exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', () => {
      cy.get('.button[type="submit"]').click({forece: true})
      cy.get('.error').should('be.visible')

    })
    //exercicio extra 7 - comandos customizados
    it('envia o formuário com sucesso usando um comando customizado', () => {
      cy.fillMandatoryFieldsAndSubmit()

      cy.get('.success').should('be.visible')
    }) 
    //exercício extra 8 - utilizar o cy.contains()
    it('utilizar cy.contains para o botão enviar', () => {
      cy.get('#firstName').type('Ana').should('have.value', 'Ana').clear().should('have.value', '')
      cy.get('#lastName').type('Silva').should('have.value', 'Silva').clear().should('have.value', '')
      cy.get('#email').type('ana@email.com').should('have.value', 'ana@email.com').clear().should('have.value', '')
      cy.get('#open-text-area').type('Teste de digitação').should('have.value', 'Teste de digitação').clear().should('have.value', '')
      cy.contains('button', 'Enviar').click({forece: true})
    })
    //exercicio aula 3 - selecionar produto pelo seu texto
    it('seleciona um produto (YouTube) por seu texto', () => {
      cy.get('#product').select('YouTube').should('have.value', 'youtube')
    })
    //exercicio extra 1 - selecionar produto pelo seu valor
    it('seleciona um produto (Mentoria) por seu valor (value)', () => {
      cy.get('#product').select('mentoria').should('have.value', 'mentoria')
    })
    //exercicio extra 2 - selecionar produto pelo seu índice
    it('seleciona um produto (Blog) por seu índice', () => {
      cy.get('#product').select(1).should('have.value', 'blog')
    })
     //exercicio aula 4 - marcando inputs do tipo radio
     it('marca o tipo de atendimento "Feedback"', () => {
      cy.get('input[type="radio"]').check('feedback').should('have.value', 'feedback')
    })
    //exercicio extra 1 - marcando inputs do tipo radio
    it('marca o tipo de atendimento "Feedback"', () => {
      cy.get('input[type="radio"]').should('have.length',3)
        .each(function($radio){
          cy.wrap($radio).check().should('be.checked')
        })
    })
    //exercicio aula 5 - marca e desmarca os checkbox
    it('marca ambos checkboxes, depois desmarca o último', () => {
      cy.get('input[type="checkbox"]').check().should('be.checked').last().uncheck().should('not.be.checked')
    }) 
    it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', () => {
      cy.get('input[id="phone-checkbox"]').check().should('be.checked')
      cy.get('#phone').should('be.empty')
      cy.contains('button', 'Enviar').click({forece: true})
      cy.get('.error').should('be.visible')
    }) 
    //exercício aula 06 - Fazendo upload de arquivos com Cypress
    it('seleciona um arquivo da pasta fixtures', () => {
      cy.get('input[id="file-upload"]')
        .should('not.have.value')
        .selectFile('cypress/fixtures/example.json')
        .should(function($input){
          //console.log($input)
          expect($input[0].files[0].name).to.equal('example.json')
        })
    })
     //exercício extra 1 - Fazendo upload de arquivos usando drag-and-drop
    it('seleciona um arquivo simulando um drag-and-drop', () => {
      cy.get('input[id="file-upload"]').selectFile('cypress/fixtures/example.json', { action: 'drag-drop' })
         .should(function($input){
          //console.log($input)
          expect($input[0].files[0].name).to.equal('example.json')
      })
  })
  //exercício extra 2 - Fazendo upload de arquivos com alias
  it('seleciona um arquivo utilizando uma fixture para a qual foi dada um alia', () => {
    cy.fixture('example.json').as('sampleFile')
        cy.get('input[id="file-upload"]').selectFile('@sampleFile')
          .should(function($input){
            expect($input[0].files[0].name).to.equal('example.json')
          })
  })
  //exercício aula 07 - Lidando com links que abrem em outra aba
  it('verifica que a política de privacidade abre em outra aba sem a necessidade de um clique', () => {
    cy.get('a[href="privacy.html"]').should('have.attr', 'target', '_blank')
  })
  //exercício extra 1
  it('acessa a página da política de privacidade removendo o target e então clicando no link', () => {
    cy.get('a[href="privacy.html"]').invoke('removeAttr', 'target').click({force:true})
    cy.contains('Talking About Testing').should('be.visible') 
  })
  
})
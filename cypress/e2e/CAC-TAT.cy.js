/// <reference types="Cypress" />

describe('Central de Atendimento ao Cliente TAT', function() {
  const THREE_SECONDS_IN_ML = 3000
    beforeEach(function() {
      cy.visit('./src/index.html')
    })

    it('verifica o título da aplicação', function() {
      cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT')  
        })

   
    it('preenche os campos obrigatórios e envia o formulário', function() {
      const longtext = 'Que ele seja o veículo de morbi dui sapien venenatis amanhã ligula, purus senectus deixe ligula maleuada luctus dictum aliquam, condimentum vitae proin apenas morbi sadis intacto. molestie risus tellus dictumst nam tempor.'
        cy.clock()      
        cy.get('#firstName').type('Alessandro')
        cy.get('#lastName').type('Melo')
        cy.get('#email').type('alessandromelo74@gmail.com')
        cy.get('#open-text-area').type(longtext, {delay: 10})
        cy.contains('button', 'Enviar').click()
        cy.get('.success').should('be.visible') 
        cy.tick(THREE_SECONDS_IN_ML)
        cy.get('.success').should('not.be.visible') 
        
    })
    
    it('Exibe mensagem de erro ao submeter o formulario com um email com formatação invalida', function(){
      cy.clock()
      cy.get('#firstName').type('Alessandro')
      cy.get('#lastName').type('Melo')
      cy.get('#email').type('alessandromelo74@gmail,com')
      cy.get('#open-text-area').type('TEXTO PADRÃO DE TESTE')
      cy.contains('button', 'Enviar').click()
      cy.get('.error').should('be.visible') 
      cy.tick(THREE_SECONDS_IN_ML)
      cy.get('.error').should('not.be.visible')
    })
 
   Cypress._.times(3, function() {
    it('Campo telefone continua vazio quando preenchido com valor não numerico', function (){
      cy.get('#phone')
        .type('abcdefgh')
         .should('have.value', '')
     })
  })

   it('exibe mensagem de erro quando o telefone se torna obrigatório mas não preenchido', function(){
      cy.clock()
      cy.get('#firstName').type('Alessandro')
      cy.get('#lastName').type('Melo')
      cy.get('#email').type('alessandromelo74@gmail.com')
      cy.get('#phone-checkbox').check()
      cy.get('#open-text-area').type('TEXTO PADRÃO DE TESTE')
      cy.contains('button', 'Enviar').click()
      cy.get('.error').should('be.visible') 
      cy.tick(THREE_SECONDS_IN_ML)
      cy.get('.error').should('not.be.visible')

   })

   it('Preenche e limpa os campos nome, sobrenome, email e telefone', function () {
    cy.get('#firstName')
      .type('Alessandro')
      .should('have.value', 'Alessandro')
      .clear()
      .should('have.value', '')
      cy.get('#lastName')
      .type('Melo')
      .should('have.value', 'Melo')
      .clear()
      .should('have.value', '')
      cy.get('#email')
      .type('alesandromelo74@gmail.com')
      .should('have.value', 'alesandromelo74@gmail.com')
      .clear()
      .should('have.value', '')
      cy.get('#phone')
      .type('123456789')
      .should('have.value', '123456789')
      .clear()
      .should('have.value', '')

   })

   it('Exibe Mensagem de erro ao submeter o formulario sem preencher os campos obrigatorios', function (){
      cy.clock()
      cy.contains('button', 'Enviar').click()
      cy.get('.error').should('be.visible') 
      cy.tick(THREE_SECONDS_IN_ML)
      cy.get('.error').should('not.be.visible')
   })

    it('Envia o formulario com Sucesso usando um comando customizado',function(){
    cy.fillMandatoryFieldsAndSumit()    
    })

   it('Seleciona um produto (Mentoria) por seu valor (value)', function(){
    cy.get('#product')
      .select('mentoria')
      .should('have.value', 'mentoria')
   })

   it('Seleciona um produto (Blog) por seu indice)', function(){
    cy.get('#product')
      .select(1)
      .should('have.value', 'blog')
   })

   it('Marca o tipo de atendimento (Feedbck)', function(){
    cy.get('input[type="radio"][value="feedback"]')
    .check()
    .should('have.value', 'feedback')
   })

   it('Marca Cada tipo de atendimento', function (){
    cy.get('input[type="radio"]')
    .should('have.length', 3)
    .each(function($radio) {
      cy.wrap($radio).check()
      cy.wrap($radio).should('be.checked')
      }) 
    })

    it('Marca Ambos checkbox, depois desmarca o ultimo', function (){
    cy.get('input[type="checkbox"]')
    .check()
    .should('be.checked')
    .last()
    .uncheck() 
    .should('not.be.checked')
    })

    it('Fazendo Upload de arquivos com Cypress', function(){
      cy.get('input[type="file"]#file-upload')
      .should('not.have.value')
      .selectFile('cypress/fixtures/example.json')
      .should(function($input) {
        expect($input[0].files[0].name).to.equal('example.json')
      })
    })

    it('Seleciona um arquivo simulando um drag-and-drop', function(){
      cy.get('input[type="file"]#file-upload')
      .should('not.have.value')
      .selectFile('cypress/fixtures/example.json', {action:'drag-drop'})
      .should(function($input) {
        expect($input[0].files[0].name).to.equal('example.json')
      })
    })

    it('seleciona um arquivo utilizando uma fixture para a qual foi dada um alias',function (){
      cy.fixture('example.json').as('sampleFile')
      cy.get('input[type="file"]#file-upload')
      .selectFile('@sampleFile')
      .should(function($input) {
        expect($input[0].files[0].name).to.equal('example.json')
    })    
   })

    it('verifica que a política de privacidade abre em outra aba sem a necessidade de um clique',function(){
      cy.get('#privacy a').should('have.attr', 'target', '_blank')
    })

    it('acessa a página da política de privacidade removendo o target e então clicando no link', function(){
      cy.get('#privacy a')
      .invoke('removeAttr', 'target')
      .click()
      cy.contains('Talking About Testing').should('be.visible')
    })
    
    it('Simulando o Viewport_ de um dispositivo móvel', function(){      
    })
   })
   

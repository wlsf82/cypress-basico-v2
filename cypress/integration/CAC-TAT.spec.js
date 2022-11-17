/// < reference types="Cypress" />


describe('Central de Atendimento ao Cliente TAT', function() {
    beforeEach(function() {
       cy.visit('./src/index.html')

    })

    it('verifica o título da aplicação', function() {        
        cy.title().should('be.equal' , 'Central de Atendimento ao Cliente TAT')
    })

    it('preenche os campos obrigatórios e envia o formulário', function() {
        const longText = 'teste teste teste'

        cy.get('#firstName').type('Rafael')
        cy.get('#lastName').type('Reges')
        cy.get('#email').type('maltareges@gmail.com')
        cy.get('#open-text-area').type(longText , { delay : 0 })
        cy.get('button[type="submit"]').click()

        cy.get('.success').should('be.visible')
    })

    it('exibe mensagem de erro ao submeter o formulario com um email invalido', function() {
        const longText = 'teste teste teste'
        
        cy.get('#firstName').type('Rafael')
        cy.get('#lastName').type('Reges')
        cy.get('#email').type('maltareges@gmail,com')
        cy.get('#open-text-area').type(longText , { delay : 0 })
        cy.get('button[type="submit"]').click()
        
        cy.get('.error').should('be.visible')
    })

    it('campo telefone continua vazio quando preenchido com valor nao numerico', function(){

        cy.get('#phone')
          .type('abcdefg')
          .should('have.value', '')

    })
    
    it('exibe mensagem de erro quando o telefone se torna obrigatorio', function() {
        const longText = 'teste teste teste'
        
        cy.get('#firstName').type('Rafael')
        cy.get('#lastName').type('Reges')
        cy.get('#email').type('maltareges@gmail.com')
        cy.get('#phone-checkbox').click()    
        cy.get('#open-text-area').type(longText , { delay : 0 })
        cy.get('button[type="submit"]').click()        
        cy.get('.error').should('be.visible')
    })

    it('preenche e limpa os campos nome, sobrenome, email e telefone', function() {
        cy.get('#firstName')
          .type('Rafael') 
          .should('have.value', 'Rafael')
          .clear()
          .should('have.value' , '') 

        cy.get('#lastName')
          .type('Reges') 
          .should('have.value', 'Reges')
          .clear()
          .should('have.value' , '') 

        cy.get('#email')
          .type('maltareges@gmail.com') 
          .should('have.value', 'maltareges@gmail.com')
          .clear()
          .should('have.value' , '')

        cy.get('#email')
          .type('maltareges@gmail.com') 
          .should('have.value', 'maltareges@gmail.com')
          .clear()
          .should('have.value' , '')
          
        cy.get('#phone')
          .type('123456') 
          .should('have.value', '123456')
          .clear()
          .should('have.value', '')          
    })

    it('verificar a mensagem de erro ao enviar o formulario sem preencher os campos obrigatorios', function(){
        cy.get('button[type="submit"]').click()        
        cy.get('.error').should('be.visible')
    })

    it('envia o formulario com sucesso usando um comando customizado', function() {
        cy.fillMandatoryFieldsAndSubmit()
        cy.get('.success').should('be.visible')
    })

    it('seleciona um produto (YouTube) por seu texto', function() {
        cy.get('#product')
          .select('YouTube')
          .should('have.value', 'youtube')
    })

    it('seleciona um produto (Mentoria) por seu valor (value)', function() {
      cy.get('#product')
        .select('mentoria')
        .should('have.value', 'mentoria')
  }) 

  it('seleciona um produto (Blog) por seu indice', function() {
    cy.get('#product')
      .select(1)
      .should('have.value', 'blog')
  }) 

  it('marca o tipo de atendimento "Feedback"', function(){
    cy.get('input[type="radio"][value = "feedback"]')
      .check()
      .should('have.value','feedback')
  })

  it('marca cada tipo de atendimento', function(){
    cy.get('input[type="radio"]')
      .should('have.length',3)
      .each(function($radio){
        cy.wrap($radio).check()
        cy.wrap($radio).should('be.checked')
      })
  })

  it('marca ambos checkboxes, depois desmarca o ultimo', function(){
    cy.get('input[type="checkbox"]')
      .should('have.length',2)
      .check()
      .should('be.checked')
      .last()
      .uncheck()
      .should('not.be.checked')
  })
  
  it('seleciona um arquivo para upload', function(){
    cy.get('input[type="file"]')
      .should('not.have.value')
      .selectFile('./cypress/fixtures/example.json')
      .should(function($input) {
        expect($input[0].files[0].name).to.equal('example.json')  
      })
  })

  it('verifica que a politica de privacidade abre em outra aba sem a necessidade de um clique', function(){
    cy.get('#privacy a').should('have.attr', 'target', '_blank')
  })

  it('acessa a pagina de politica de privacidade removendo o target e então clica no link', function(){
    cy.get('#privacy a')
      .invoke('removeAttr', 'target')
      .click()
    cy.contains('Talking About Testing').should('be.visible')

  }) 


  })

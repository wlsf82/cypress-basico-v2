// CAC-TAT.spec.js created with Cypress
//
// Start writing your Cypress tests below!
// If you're unfamiliar with how Cypress works,
// check out the link below and learn how to write your first test:
// https://on.cypress.io/writing-first-test
describe('Central de Atendimento ao Cliente TAT', function() {
    beforeEach(function() {
        cy.visit('./src/index.html')
    })
    
    it('verifica o título da aplicação', function(){
        cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT')
    })

    it('preenche os campos obrigatórios e envia o formulário', function(){
        const longText = 'teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste'
        cy.get('#firstName').type('Willian')
        cy.get('#lastName').type('de Souza Silva')
        cy.get('#email').type('williandesouza3@gmail.com')
        cy.get('#open-text-area').type(longText, {delay:0})
        cy.contains('button', 'Enviar').click()
        cy.get('.success').should('be.visible')
    })

    it('exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', function(){
        cy.get('#firstName').type('Willian')
        cy.get('#lastName').type('de Souza Silva')
        cy.get('#email').type('williandesouza3@gmail')
        cy.get('#open-text-area').type('teste')
        cy.contains('button', 'Enviar').click()
        cy.get('.error').should('be.visible')
    })   
    
    it('Campo telefone continua vazio quando preenchido com valor não numérico', function(){
        cy.get('#phone').type('abcdefjg').should('have.value', '')
    })

    it('Exibe mensagem de erro quando o campo telefone não preenchido', function(){
        cy.get('#firstName').type('Willian')
        cy.get('#lastName').type('de Souza Silva')
        cy.get('#email').type('williandesouza3@gmail')
        cy.get('#phone-checkbox').check()
        cy.get('#open-text-area').type('teste')
        cy.contains('button', 'Enviar').click()
        cy.get('.error').should('be.visible')
    })

    it('Valida envio de formulário quando telefone obrigatório', function(){
        cy.get('#firstName').type('Willian')
        cy.get('#lastName').type('de Souza Silva')
        cy.get('#email').type('williandesouza3@gmail')
        cy.get('#phone-checkbox').click()
        cy.get('#phone').type('11960846066')
        cy.get('#open-text-area').type('teste')
        cy.get('button[type="submit"]').click()
        cy.get('.error').should('be.visible')
    })

    it('preenche e limpa os campos nome, sobrenome, email e telefone', function(){
        cy.get('#firstName')
        .type('Willian')
        .should('have.value', 'Willian')
        .clear()
        .should('have.value', '')
        cy.get('#lastName')
        .type('de Souza')
        .should('have.value', 'de Souza')
        .clear()
        .should('have.value', '')
        cy.get('#email')
        .type('williandesouza3@gmail.com')
        .should('have.value', 'williandesouza3@gmail.com')
        .clear()
        .should('have.value', '')
        cy.get('#open-text-area')
        .type('teste teste teste')
        .should('have.value', 'teste teste teste')
        .clear()
        .should('have.value', '')
        cy.get('#phone')
        .type('11960846066')
        .should('have.value', '11960846066')
        .clear()
        .should('have.value', '')
    })

    it('Exibe mensagem de erro sem preencher os campo obrigatórios', function(){
        cy.get('button[type="submit"]').click()
        cy.get('.error').should('be.visible')
    })

    it('Envia formulário com sucesso usando comando customizado', function(){
        cy.fillMandatoryFieldsAndSubmit()
        cy.get('.success').should('be.visible')
    })

    it('Seleciona um produto', function(){
        cy.get('#product').select('YouTube').should('have.value', 'youtube')
        cy.get('#product').select('Blog').should('have.value', 'blog')
        cy.get('#product').select('Cursos').should('have.value', 'cursos')
        cy.get('#product').select('Mentoria').should('have.value', 'mentoria')
    })
    it('Seleciona um produto pelo seu indice', function(){
        cy.get('#product').select(1).should('have.value', 'blog')
        cy.get('#product').select(2).should('have.value', 'cursos')
        cy.get('#product').select(3).should('have.value', 'mentoria')
        cy.get('#product').select(4).should('have.value', 'youtube')
    })
    it('Marcando inputs do tipo radio', function(){
        cy.get('input[type="radio"][value="elogio"]').check().should('be.checked')
        cy.get('input[type="radio"][value="feedback"]').check().should('be.checked')
    })
    it('Verificadores', function(){
        cy.get('input[type="radio"]').should('have.length', 3).each(function($radio){
            cy.wrap($radio).check()
            cy.wrap($radio).should('be.checked')
        })
    })
    it('Marcando e desmarcando checkbox', function(){
        cy.get('input[type="checkbox"][value="email"]').check()
        cy.get('input[type="checkbox"][value="email"]').should('be.checked')
        cy.get('input[type="checkbox"][value="email"]').uncheck()
    })
    it('Marca ambos os checkboxes depois desmarca o ultimo', function(){
        cy.get('input[type="checkbox"]')
        .check()
        .last()
        .uncheck()
        .should('not.be.checked')
    })
    it('Upload de arquivo',  function(){
        cy.get('input[type="file"]')
        .should('not.have.value')
        .selectFile('./cypress/fixtures/example.json')
        .should(function($input){
            console.log($input)
            expect($input[0].files[0].name).to.equal('example.json')
        })
    })
    it('Seleciona um arquivo a qual foi dada um alias', function(){
        cy.fixture('example.json').as('sampleFile')
        cy.get('input[type="file"]')
            .selectFile('@sampleFile')
            .should(function($input){
                console.log($input)
                expect($input[0].files[0].name).to.equal('example.json')
            })        
    })
    it('Selecion uma nova aba sem necessidade de um click', function(){
        cy.get('#privacy a').should('have.attr', 'target', '_top')
    })
    it('Acessa a página de politica de privacidade removendo o comando target e então clicando no link', function(){
        cy.get('#privacy a')
        .invoke('removeAttr', 'target')
        .click()
    })
    it('teste', function(){
        cy.get('input[type="file"]')
        .should('not.have.value')
        .selectFile('./cypress/fixtures/example.json', { action: 'drag-drop'})
        .should(function($input){
            expect($input[0].files[0].name).to.equal('example.json')
            })
    })
        
  })
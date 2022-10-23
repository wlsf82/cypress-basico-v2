/// <reference types="Cypress" />

describe('Central de Atendimento ao Cliente TAT', function()
{
    beforeEach(() => {
        cy.visit('./src/index.html');
    })

    it('verificar o título da aplicação', function()
    {
        cy.title().should('be.equal','Central de Atendimento ao Cliente TAT');
    }) 

    it('preenche os campos obrigatórios e envia o formulário', function()
    {
        cy.get('#firstName').should('be.visible').type('Rhemerson').should('have.value', 'Rhemerson');
        cy.get('#lastName').should('be.visible').type('Monteiro').should('have.value', 'Monteiro');
        cy.get('#email').should('be.visible').type('teste@gmail.com').should('have.value', 'teste@gmail.com');
        cy.get('#open-text-area').should('be.visible').
            type('Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc bibendum metus tincidunt dolor dapibus, eu mattis nulla posuere. Integer posuere efficitur quam, bibendum aliquam orci venenatis sit amet. Duis pulvinar congue tincidunt. Quisque eleifend venenatis urna, vel sodales sem consequat non. Vivamus condimentum scelerisque magna posuere rutrum.', {delay:0}).
            should('not.have.value');
        cy.get('.button').should('be.visible').click();
    }) 

    it('exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', function()
    {
        cy.get('#firstName').should('be.visible').type('Rhemerson').should('have.value', 'Rhemerson');
        cy.get('#lastName').should('be.visible').type('Monteiro').should('have.value', 'Monteiro');
        cy.get('#email').should('be.visible').type('testegmail.com').should('have.value', 'testegmail.com');
        cy.get('#open-text-area').should('be.visible').
            type('Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc bibendum metus tincidunt dolor dapibus, eu mattis nulla posuere. Integer posuere efficitur quam, bibendum aliquam orci venenatis sit amet. Duis pulvinar congue tincidunt. Quisque eleifend venenatis urna, vel sodales sem consequat non. Vivamus condimentum scelerisque magna posuere rutrum.', {delay:0}).
            should('not.have.value');
        cy.get('.button').should('be.visible').click();
        cy.get('.error').should('be.visible');
    })     

    it('preenche e limpa os campos nome, sobrenome, email e telefone', function(){
        cy.get('#firstName').should('be.visible').type('Rhemerson').should('have.value', 'Rhemerson')
            .clear().should('have.value', '');
        cy.get('#lastName').should('be.visible').type('Monteiro').should('have.value', 'Monteiro')
            .clear().should('have.value', '');
        cy.get('#email').should('be.visible').type('teste@gmail.com').should('have.value', 'teste@gmail.com')
            .clear().should('have.value', '');
        cy.get('#phone').should('be.visible').type('62999999999').should('have.value', '62999999999')
            .clear().should('have.value', '')
    })

    it('exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', function(){
        cy.get('.button').should('be.visible').click();
        cy.get('.error').should('be.visible');
    })

    it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', function(){
        cy.get('#firstName').should('be.visible').type('Rhemerson').should('have.value', 'Rhemerson');
        cy.get('#lastName').should('be.visible').type('Monteiro').should('have.value', 'Monteiro');
        cy.get('#email').should('be.visible').type('teste@gmail.com').should('have.value', 'teste@gmail.com');
        cy.get('#phone-checkbox').check();
        cy.get('#open-text-area').should('be.visible').
            type('Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc bibendum metus tincidunt dolor dapibus, eu mattis nulla posuere. Integer posuere efficitur quam, bibendum aliquam orci venenatis sit amet. Duis pulvinar congue tincidunt. Quisque eleifend venenatis urna, vel sodales sem consequat non. Vivamus condimentum scelerisque magna posuere rutrum.', {delay:0}).
            should('not.have.value');
        cy.get('.button').should('be.visible').click();
        cy.get('.error').should('be.visible');
    })

    it('envia o formuário com sucesso usando um comando customizado', function(){
        cy.fillMandatoryFieldsAndSubmit();
        cy.get('.success').should('be.visible');
    })

    it('usando o contains para encontar elemento ', function()
    {
        cy.get('#firstName').should('be.visible').type('Rhemerson').should('have.value', 'Rhemerson');
        cy.get('#lastName').should('be.visible').type('Monteiro').should('have.value', 'Monteiro');
        cy.get('#email').should('be.visible').type('teste@gmail.com').should('have.value', 'teste@gmail.com');
        cy.get('#open-text-area').should('be.visible').
            type('Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc bibendum metus tincidunt dolor dapibus, eu mattis nulla posuere. Integer posuere efficitur quam, bibendum aliquam orci venenatis sit amet. Duis pulvinar congue tincidunt. Quisque eleifend venenatis urna, vel sodales sem consequat non. Vivamus condimentum scelerisque magna posuere rutrum.', {delay:0}).
            should('not.have.value');
        cy.contains('button', 'Enviar').should('be.visible').click();
    }) 

    it('seleciona um produto (YouTube) por seu texto', function(){
        cy.get('#product').select('YouTube').should('have.value', 'youtube')
    })

    it('seleciona um produto (Mentoria) por seu valor (value)', function(){
        cy.get('#product').select('mentoria').should('have.value', 'mentoria')
    })

    it('seleciona um produto (Blog) por seu índice', function(){
        cy.get('#product').select(1).should('have.value', 'blog')
    })

    it('marca o tipo de atendimento "Feedback"', function(){
        cy.get('input[type="radio"]').check('feedback')
          .should('have.value', 'feedback')
    })

    it('marca cada tipo de atendimento', function(){
        cy.get('input[type="radio"]')
          .should('have.length', 3)
          .each(function($radio){
            cy.wrap($radio).check()
            cy.wrap($radio).should('be.checked')
          })
    })

    it('marca ambos checkboxes, depois desmarca o último', function(){
        cy.get('input[type="checkbox"]')
          .check()
          .should('be.checked')
          .last()
          .uncheck()
          .should('not.be.checked')
    })

    it('seleciona um arquivo da pasta fixtures', function(){
        cy.get('input[type="file"]#file-upload')
          .should('not.have.value')
          .selectFile('./cypress/fixtures/example.json')
          .should(function($input){
            expect($input[0].files[0].name).to.equal('example.json')
          })
    })

    it('seleciona um arquivo simulando um drag-and-drop', function(){
        cy.get('input[type="file"]#file-upload')
          .should('not.have.value')
          .selectFile('./cypress/fixtures/example.json', {action: 'drag-drop'})
          .should(function($input){
            expect($input[0].files[0].name).to.equal('example.json')
          })
    })

    it('seleciona um arquivo utilizando uma fixture para a qual foi dada um alias', function(){
        cy.fixture('example.json').as('sampleFile')
        cy.get('input[type="file"]#file-upload')
          .should('not.have.value')
          .selectFile('@sampleFile')
          .should(function($input){
            expect($input[0].files[0].name).to.equal('example.json')
          })
    })

    it('verifica que a política de privacidade abre em outra aba sem a necessidade de um clique', function(){
        cy.get('#privacy a').should('have.attr', 'target', '_blank')
    })

    it('acessa a página da política de privacidade removendo o target e então clicanco no link', function(){
        cy.get('#privacy a')
          .invoke('removeAttr', 'target')
          .click()

        cy.contains('Talking About Testing').should('be.visible')
    })
})
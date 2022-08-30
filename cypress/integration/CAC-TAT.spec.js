/// <reference types="Cypress" />

describe('Central de Atendimento ao Cliente TAT', function() {
    
    beforeEach(() => {
        cy.visit('./src/index.html');
      })

    it('verifica o título da aplicação', function() {
        cy.title().should('be.equal','Central de Atendimento ao Cliente TAT');
    })

    it('preenche os campos obrigatórios e envia o formulário', function() {
        cy.get('#firstName').type('Carlos');
        cy.get('#lastName').type('Benjamim');
        cy.get('#email').type('carlos@aulas.com.br');
        cy.get('#open-text-area').type('Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',{delay:0});
        cy.get('.button').click();
        cy.get('.success').should('be.visible');
    })

    it('Verifica mensagem de erro com e-mail inválido', function() {
        const longtext = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
        cy.get('#firstName').type('Carlos');
        cy.get('#lastName').type('Benjamim');
        cy.get('#email').type('carlosaulas.com.br');
        cy.get('#open-text-area').type(longtext,{delay:0});
        cy.get('.button').click();
        cy.get('.error').should('be.visible');
    })

    it('Verificar se o campo telefone só aceita números', function() {
        cy.get('#phone')
            .type('asdfghjklz')
            .should('have.value', '');
        cy.get('#phone')
            .type('asd1fghjklz')
            .should('have.value','1');
    })

    it('Verificar se mensagem de erro aparece quanto telefone obrigatório mas não preenchido', function(){
        const longtext2 = 'Lim ad minim veniam, quis nostrud exercitaia deserunt mollit anim id est laborum.'
        cy.get('#firstName').type('Carlos');
        cy.get('#lastName').type('Benjamim');
        cy.get('#email').type('carlos@aulas.com.br');
        cy.get('#open-text-area').type(longtext2,{delay:0});
        cy.get('#phone-checkbox').check();
        cy.get('.button').click();
        cy.get('.error').should('be.visible');

    })

    it('preenche e limpa os campos nome, sobrenome, email e telefone', function(){
        const longtext3 = 'Lim ad minim veniam, quis nostrud exercitaia deserunt mollit anim id est laborum.'
        cy.get('#firstName').type('Carlos').should('have.value','Carlos');
        cy.get('#firstName').clear().should('have.value','');
        cy.get('#lastName').type('Benjamim').should('have.value','Benjamim');
        cy.get('#lastName').clear().should('have.value','');
        cy.get('#email').type('carlos@aulas.com.br').should('have.value','carlos@aulas.com.br');
        cy.get('#email').clear().should('have.value','');
        cy.get('#open-text-area').type(longtext3,{delay:0}).should('have.value',longtext3);
        cy.get('#open-text-area').clear().should('have.value','');
        cy.get('#phone-checkbox').click();
        cy.get('.button').click();
        cy.get('.error').should('be.visible');

    })

    it('exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', function(){
        cy.get('.button').click();
        cy.get('.error').should('be.visible');
    })

    it('envia o formuário com sucesso usando um comando customizado',function(){
        cy.fillMandatoryFieldsAndSubmit();
        cy.get('.success').should('be.visible');
    })

    it('Usando contains', function() {
        cy.get('#firstName').type('Carlos');
        cy.get('#lastName').type('Benjamim');
        cy.get('#email').type('carlos@aulas.com.br');
        cy.get('#open-text-area').type('Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',{delay:0});
        cy.contains('button','Enviar').click();
        cy.get('.success').should('be.visible');
    })

    it('Seleciona um produto (Youtube) por seu texto', function() {
        cy.get('select').select('YouTube').should('have.value', 'youtube')
    })

    it('Seleciona um produto (Melhoria) por seu valor', function() {
        cy.get('select').select('mentoria').should('have.value', 'mentoria')
    })

    it('Seleciona um produto (Blog) por seu indice', function() {
        cy.get('select').select(1).should('have.value', 'blog')
    })

    it('marca o tipo de atendimento "Feedback"', function(){
        cy.get('input[type="radio"][value="feedback"]').check().should('be.checked')
    })

    it('marca cada tipo de atendimento"', function(){
        cy.get('input[type="radio"]')
            .should('have.length', 3)
            .each(function($radio) {
              cy.wrap($radio).check()
              cy.wrap($radio).should('be.checked')
            })
    })

    it('Marca ambos checkboxes, depois desmarca o último', function(){
        cy.get('input[type="checkbox"')
            .each(function($checkbox){
                cy.wrap($checkbox).check()
                cy.wrap($checkbox).should('be.checked')
            })
        cy.get('input[type="checkbox"').last().uncheck().should('not.be.checked')

    })

    it('seleciona um arquivo da pasta fixtures', function(){
        cy.get('input[type="file"]')
            .should('not.have.value')
            .selectFile('cypress/fixtures/example.json')
            .should(function($input){
                expect($input[0].files[0].name).to.equal('example.json')
            
            })
    })

    it('seleciona um arquivo simulando um drag-and-drop', function(){
        cy.get('input[type="file"]')
            .should('not.have.value')
            .selectFile('cypress/fixtures/example.json',{action: 'drag-drop'})
            .should(function($input){
                expect($input[0].files[0].name).to.equal('example.json')
            
            })
    })

    it('seleciona um arquivo utilizando uma fixture para a qual foi dada um alias', function(){
        cy.fixture('example.json').as('sampleFile')
        cy.get('input[type="file"]')
            .selectFile('@sampleFile')
            .should(function($input){
                expect($input[0].files[0].name).to.equal('example.json')
            
            })
    })
    
    it('verifica que a política de privacidade abre em outra aba sem a necessidade de um clique', function(){

        cy.get('a').should('have.attr', 'target', '_blank')
    })

    it('acessa a página da política de privacidade removendo o target e então clicanco no link', function(){

        cy.get('a')
        .invoke('removeAttr', 'target')
        .should('not.have.attr', 'target', '_blank')
        .click()
        cy.contains('Talking About Testing').should('be.visible')
    })

    
  })
  
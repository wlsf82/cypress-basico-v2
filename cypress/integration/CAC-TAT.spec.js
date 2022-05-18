/// <reference types="Cypress" />

describe('Central de Atendimento ao Cliente TAT', function() {
    beforeEach(function() {
        cy.visit('./src/index.html')
    })
    it('Teste 01 - Verifica o título da aplicação', function() {
        cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT')
    })
    it('Teste 02 - Preenche os campos obrigatórios e envia o formulário', function() {
        cy.get('#firstName').type('Victor')
        cy.get('#lastName').type('Sousa')
        cy.get('#email').type('victorquintanilhasousa@gmail.com')
        cy.get('#open-text-area').type('afjsodfjaopsdfoadsfafaoasfdopfajopdfaopfdjapfdsjifapsdfipsdfiapsdfoiajsdpfiaosdfjpoasfjpaosdfjapsdofiasdfjasidfjaspdiofji wtgir teroivge reog rer obrtbmoperbmier obtmerpobm reobmrpeobmtrpo ertmbpeo bmepirteoprbreiopb ertung trguin ertgp nrtgpe nrbineb tpen uphenr tér brbnrtçerm lrtnw gpahu rghsçuireg r gjoipbmkvmv´woerkgpijbr motipw giowp mgwpig wgiwp merg werig pwer gpweiogwne oe ngpirewogjweprgowej gpwero gwepeo grgpwemocwg werw emgvpew wgjw',{delay:0})
        cy.contains('Enviar').click()
        cy.get('.success').should('be.visible')
    });
    it('Teste 03 - Exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', function() {
        cy.get('#firstName').type('Victor')
        cy.get('#lastName').type('Sousa')
        cy.get('#email').type('victorquintanilhasousa')
        cy.get('#open-text-area').type('Teste')
        cy.contains('Enviar').click()
        cy.get('.error').should('be.visible')
    });
    it('Teste 04 - Campo de telefone continua vazio quando preenchido com valor não-numérico', function() {
        cy.get('#phone')
        .type('abcdefghij')
        .should('have.value','')
    });
    it('Teste 05 - Exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', function() {
        cy.get('#firstName').type('Victor')
        cy.get('#lastName').type('Sousa')
        cy.get('#email').type('victorquintanilhasousa@gmail.com')
        cy.get('#open-text-area').type('Teste')
        cy.get('#phone-checkbox').check()
        cy.contains('Enviar').click()
        cy.get('.error').should('be.visible')
    });
    it('Teste 06 - Preenche e limpa os campos nome, sobrenome, email e telefone', function() {
        cy.get('#firstName')
        .type('Victor')
        .should('have.value', 'Victor')
        .clear()
        .should('have.value', '')     
        cy.get('#lastName')
        .type('Sousa')
        .should('have.value', 'Sousa')
        .clear()
        .should('have.value', '')
        cy.get('#email')
        .type('victorquintanilhasousa@gmail.com')
        .should('have.value', 'victorquintanilhasousa@gmail.com')
        .clear()
        .should('have.value', '')
        cy.get('#phone')
        .type('21999549027')
        .should('have.value', '21999549027')
        .clear()
        .should('have.value', '')
    });
    it('Teste 07 - Exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', function() {
        cy.contains('Enviar').click()
        cy.get('.error').should('be.visible')
    });
    it('Teste 08 - Envia o formuário com sucesso usando um comando customizado', function(){
        cy.fillMandatoryFieldsAndSubmit()
        cy.get('.success').should('be.visible')
    });
    it('Teste 09 - Seleciona um produto (YouTube) por seu texto', function(){
        cy.get('#product')
        .select('YouTube')
        .should('have.value', 'youtube')
    });
    it('Teste 10 - Seleciona um produto (Mentoria) por seu valor (value)', function(){
        cy.get('#product')
        .select('mentoria')
        .should('have.value', 'mentoria')
    });
    it('Teste 11 - Seleciona um produto (Blog) por seu índice', function(){
        cy.get('#product')
        .select(1)
        .should('have.value', 'blog')
    });
    it('Teste 12 - Marca o tipo de atendimento "Feedback"', function(){
        cy.get('input[value="feedback"]').check()
    });
    it('Teste 13 - Marca cada tipo de atendimento', function(){
        cy.get('input[value="elogio"]').check().should('be.checked')
        cy.get('input[value="feedback"]').check().should('be.checked')
        cy.get('input[value="ajuda"]').check().should('be.checked')
    });
    it('Teste 14 - Marca ambos checkboxes, depois desmarca o último', function(){
        cy.get('#email-checkbox').check().should('be.checked')
        cy.get('#phone-checkbox').check().should('be.checked')
        cy.get('input[type="checkbox"]').last().uncheck().should('not.be.checked')
    });
    it('Teste 15 - Seleciona um arquivo da pasta fixtures', function(){
        cy.get('#file-upload')
        .should('not.have.value')
        .selectFile('cypress/fixtures/example.json')
        .should(function($input){
            expect($input[0].files[0].name).to.equal('example.json')
        })
    });
    it('Teste 16 - Seleciona um arquivo simulando um drag-and-drop', function(){
        cy.get('#file-upload')
        .should('not.have.value')
        .selectFile('cypress/fixtures/example.json',{action: 'drag-drop'})
        .should(function($input){
            expect($input[0].files[0].name).to.equal('example.json')
        })
    });
    it('Teste 17 - Seleciona um arquivo utilizando uma fixture para a qual foi dada um alias', function(){
        cy.fixture('example.json').as('sampleFile')
        cy.get('#file-upload')
        .selectFile('@sampleFile')
        .should(function($input){
            expect($input[0].files[0].name).to.equal('example.json')
        })
    });
    it('Teste 18 - Verifica que a política de privacidade abre em outra aba sem a necessidade de um clique', function(){
        cy.get('a').should('have.attr','target','_blank')
    });
    it('Teste 19 - Acessa a página da política de privacidade removendo o target e então clicanco no link', function(){
        cy.get('a').invoke('removeAttr','target').click()
        cy.contains('Talking About Testing').should('be.visible')
    });
    it.only('Teste 20 - Testa a página da política de privavidade de forma independente', function(){
        cy.visit('./src/privacy.html')
        cy.contains('Talking About Testing').should('be.visible')
    });
})
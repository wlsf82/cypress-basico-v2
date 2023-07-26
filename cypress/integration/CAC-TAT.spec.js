/// <reference types="Cypress" />

describe('Central de Atendimento ao Cliente TAT', function(){
   this.beforeEach(function(){
        cy.visit('/src/index.html')});
    
    it('verifica o título da aplicação', function() {
        cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT')});
    
    it('Preencher Campos Obrigatórios Corretos E Enviar',function(){
        cy.get('#firstName').type('Jessica')
        cy.get('#lastName').type('Pinheiro')
        cy.get('#email').type('Jessp@gmail.com')
        cy.get('#phone').type('991223343') 
        cy.contains('.button','Enviar').click()
        cy.get('#product').select("cursos")
        cy.get('#email-checkbox').check()
        cy.get('#open-text-area').type('DIGITE AQUI SEU TEXTO')
        cy.get('.success > strong').should('be.exist')});
        
    it('Preencher Campos Obrigatórios Email Incorreto e Enviar',function(){
        cy.get('#firstName').type('Jessica')
        cy.get('#lastName').type('Pinheiro')
        cy.get('#email').type('Jesspgmail.com')
        cy.get('#phone').type('991223343') 
        cy.contains('.button','Enviar').click()
        cy.get('#product').select("cursos")
        cy.get('#email-checkbox').check()
        cy.get('#open-text-area').type('DIGITE AQUI SEU TEXTO')
        cy.get('.error > strong').should('be.exist')});
        
    it('Digitar Nao Numérico No Campo Telefone e Conferir se esta Vazio',function(){
        cy.get('#phone')
            .type('abcdefghij')
                .should('have.value','')});
        
    it('Exibir Mensagem De Erro Quando O Telefone Se Tornar Obrigatório',function(){
        cy.get('#firstName').type('Jessica')
        cy.get('#lastName').type('Pinheiro')
        cy.get('#email').type('Jessp@gmail.com')
        cy.get('#phone').type('Teste') 
        cy.contains('.button','Enviar').click()
        cy.get('#product').select("cursos")
        cy.get('#phone-checkbox').check()
        cy.get('#open-text-area').type('DIGITE AQUI SEU TEXTO')
        cy.get('.error > strong').should('be.exist')});
    
    it('Exibir Mensagem De Erro Quando O Telefone Se Tornar Obrigatório',function(){
        cy.get('#firstName').type('Jessica')
        cy.get('#lastName').type('Pinheiro')
        cy.get('#email').type('Jessp@gmail.com')
        cy.get('#phone').type('Teste') 
        cy.contains('.button','Enviar').click()
        cy.get('#product').select("cursos")
        cy.get('#phone-checkbox').check()
        cy.get('#open-text-area').type('DIGITE AQUI SEU TEXTO')
        cy.get('.error > strong').should('be.exist')});

    it('Exibir Mensagem De Erro Quando O Telefone Se Tornar Obrigatório',function(){
        cy.get('#firstName').type('Jessica')
        cy.get('#lastName').type('Pinheiro')
        cy.get('#email').type('Jessp@gmail.com')
        cy.get('#phone').type('Teste') 
        cy.contains('.button','Enviar').click()
        cy.get('#product').select("cursos")
        cy.get('#phone-checkbox').check()
        cy.get('#open-text-area').type('DIGITE AQUI SEU TEXTO')
        cy.get('.error > strong').should('be.exist')});

    it('Exibir Mensagem De Erro Quando Nao Preenche Os Campos Obrigatórios',function(){
        cy.contains('.button','Enviar').click()
        cy.get('.error > strong').should('be.exist')});
        
    it('Envia Um Formulário Com Sucesso Utilizando Comando Customizado',function(){
        cy.PrencherFormularioEnviar()
        cy.get('.success > strong').should('be.exist') });  
        
    it('Seleciona Um Produto ( YouTube )Pelo Seu Texto', function(){
        cy.get('#product').select('YouTube')
            .should('have.value', 'youtube')});
        

    it('Selecionar O RadioButton Elogio',function(){
        cy.get('input[type="radio"][value="elogio"]').check()
            .should('have.value', 'elogio')});
        
    it('Checkar Se A Checkbox Feedback Está Selecionada',function(){
        cy.get('input[type="radio"][value="elogio"]').check()
            .should('be.checked')});
        
    it('Adicionando Arquivo',function(){
        cy.get('input[type="file"]')
            .should('not.be.value')
            .selectFile('cypress/fixtures/example.json')
            .should(function($input){ expect($input[0].files[0].name).to.equal('example.json')})
        });
        
        
    it('Selecione Um Arquivo Simulando Drang And Drop', function(){
        cy.get('input[type="file"]')
            .should('not.be.value')
            .selectFile('cypress/fixtures/example.json',{ action:'drag-drop'})
            .should(function($input){expect($input[0].files[0].name).to.equal('example.json')})
        });
        
    it('Selecionar Um Arquivo Utilizando Uma Fixture para a qual foi dada um alias', function(){
        cy.fixture('example.json').as('samplefile')
        cy.get('input[type="file"]')
            .selectFile('@samplefile') });

    it('Abrir o Link Politica De Pricacidade Na Mesma Aba',function(){
        cy.get('#privacy a')
            .should('have.attr','target','_blank')});//o _blank é para saber que se tiver ele na pagina o link vai abrir sempre em out ra pagina 
    
    it('Removendo o Targuet e clicando no link', function(){
        cy.get('#privacy a')
        .invoke('removeAttr','target')
        .click() // removendo o target ele abre na mesma aba do cypress podendo trabalhar na mesma aba 
        cy.contains('Talking About Testing')
        .should('be.visible')});
    
    

    });
        

    


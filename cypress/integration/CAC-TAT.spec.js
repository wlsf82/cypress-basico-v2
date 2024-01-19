/// <reference types="Cypress" />


    beforeEach(function(){
        cy.visit('./src/index.html')
    })

    it('Central de Atendimento ao Cliente TAT', function() {

        //validando se o título da página é igual ao da validação usando o .should('be-equal')
        cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT')
        
    })

    it('preenche os campos obrigatórios e envia o formulário', function(){

        //aprendendo a preencher campos de um formulário usando o cy.get(), .type(), .click()
        cy.get('#firstName').type('Daniel')
        cy.get('#lastName').type('Fossali')
        cy.get('#email').type("danielfossali@suportetecnologias.com.br")
        cy.get('#open-text-area').type("Teste")
        cy.get('button[type="submit"]').click()

        //usando o .should() para validar se a mensagem de validação está visível
        cy.get('.success').should('be.visible')
    })

    it('preenche os campos obrigatórios e envia o formulário, usando texto longo', function(){

        //aprendendo a preencher campos de um formulário usando o cy.get(), .type(), .click()
        //usando variável para guardar a informaçao de um texto longo e chamado no input de text area
        //usando do comando delay para diminuir o tempo de preenchimento e de execução do teste

        const textLomg = 'Testeesteesteesteesteesteesteesteesteesteesteesteesteesteesteesteesteesteesteesteesteesteesteesteesteesteesteesteesteesteesteesteesteesteesteeste'
        cy.get('#firstName').type('Daniel')
        cy.get('#lastName').type('Fossali')
        cy.get('#email').type("danielfossali@suportetecnologias.com.br")
        cy.get('#open-text-area').type(textLomg, {delay :0 })
        cy.get('button[type="submit"]').click()
       
        cy.get('.success').should('be.visible')
    })

    it('exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', function(){

        //aprendendo a preencher campos de um formulário usando o cy.get(), .type(), .click()
        cy.get('#firstName').type('Daniel')
        cy.get('#lastName').type('Fossali')
        cy.get('#email').type("danielfossali@suportetecnologias,com.br")
        
        cy.get('button[type="submit"]').click()
 
        //usando o .should() para validar se a mensagem de erro está visível
        cy.get('.error').should('be.visible')
    })

    it('Prenncher o campo telefone com tipo string e o mesmo deve vir vazio', function(){
        cy.get('#firstName').type('Daniel')
        cy.get('#lastName').type('Fossali')
        cy.get('#email').type("danielfossali@suportetecnologias.com.br")
        cy.get('#phone').type('abcfsgse').should('be.visible', '')
        cy.get('#open-text-area').type("Teste")
        
    })

    it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', function(){
        cy.get('#firstName').type('Daniel')
        cy.get('#lastName').type('Fossali')
        cy.get('#email').type("danielfossali@suportetecnologias.com.br")
        cy.get('#open-text-area').type("Teste")
       
        cy.get('#phone-checkbox').click()

        //o comando cy.contains é a forma correta de usar para selecionar um botão que precisa ser acionado
        //passando o seletor CSS primeiro e depois o conteúdoescrito no botão no segundo
        //depois de informado é só efetuar o comando .click() para que seja acionado o botão escolhido
        cy.contains('.button', 'Enviar').click()
        cy.get('.error').should('be.visible')

    })

    it('preenche e limpa os campos nome, sobrenome, email e telefone', function(){
        cy.get('#firstName')
            .type('Daniel')
            .clear()

        cy.get('#lastName')
            .type('Fossali')
            .clear()

        cy.get('#email')
            .type("danielfossali@suportetecnologias.com.br")
            .clear()

        cy.get('#phone')
            .type('123456')
            .clear()

        cy.get('#open-text-area')
            .type("Teste")
            .clear()
        
    })

    it('clicar  no botão de enviar sem preencher os campos obrigatórios', function(){
        cy.get('button[type="submit"]').click()
 
        //usando o .should() para validar se a mensagem de erro está visível
        cy.get('.error').should('be.visible')
    })

    it(' envia o formuário com sucesso usando um comando customizado', function(){
        cy.fillMandatoryFieldsAndSubmit()

        cy.get('.success').should('be.visible')
    })

    it('seleciona um produto (YouTube) por seu texto', function(){

        //comando para selecionar um opção de uma combo com várias opções
        //depois de selecionar efetuar a valudação da opção selecionado em letra minúscula como no informado no valor do HTML
        cy.get('#product')
            .select('YouTube')
            .should('have.value', 'youtube')
        
    })

    it('seleciona um produto (Mentoria) por seu valor (value)', function(){

        cy.get('#product')
            .select('mentoria')
            .should('have.value', 'mentoria')
    })
    
    it.only('seleciona um produto (Blog) por seu valor (value)', function(){

        cy.get('#product')
            .select('Blog')
            .should('have.value', 'blog')
    })
   
    
  

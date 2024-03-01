import { cyan } from "colorette";

/// <reference types="Cypress" />

describe('Central de Atendimento ao Cliente TAT', function() {
        const tresSegundos = 3000
        //before é utilizado para executar uma ação antes de qualquer teste
        beforeEach(function(){
        //comando para visitar uma pagina
        cy.visit('./src/index.html')
    })
    
    it('verifica o título da aplicação', function() {
        //comando para comparar o titulo passando 'be.equal', 'o que quer comparar'
        cy.title().should('be.equal','Central de Atendimento ao Cliente TAT')
    })

    //comando .only serve pra rodar apenas um teste conforme for sendo adicionado
    it('preenche os campos obrigatórios e envia o formulário',function() {
        const texto = 'TesteTesteTesteTesteTesteTesteTesteTesteTesteTesteTesteTesteTesteTesteTesteTesteTesteTesteTesteTesteTesteTesteTesteTeste'
        cy.clock()
        cy.get('#firstName').should('be.visible').type('Danilo')
        cy.get('#lastName').should('be.visible').type('Sousa')
        cy.get('#email').should('be.visible').type('dansousa19@hotmail.com')
        //metodo "delay" serve para digitar o texto longo de forma instantanea para diminuir o tempo de escrita
        cy.get('#open-text-area').should('be.visible').type(texto, { delay: 0 })
        //contains é utilizado para elementos que não tem um seletor exspecifico, mas tem um texto unico, passando como primeiro argumento o elemento e o segundo argumento o nome da aplicação. 
        cy.contains('button', 'Enviar').click()
        //utilizar "." para identificar uma classe, nesse caso obtivemos sucesso
        cy.get('.success').should('be.visible')
        cy.tick(tresSegundos)
        cy.get('.success').should('not.be.visible')
    })

    it('exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', function(){
        cy.clock()
        cy.get('#firstName').should('be.visible').type('Danilo')
        cy.get('#lastName').should('be.visible').type('Sousa')
        cy.get('#email').should('be.visible').type('dansousa19@hotmail.com')
        cy.get('#open-text-area').should('be.visible').type('Teste')
        cy.contains('button', 'Enviar').click()
        //utilizar "." para identificar uma classe, nesse caso obtivemos erro
        cy.get('.error').should('not.be.visible')
        cy.tick(tresSegundos)
        cy.get('.error').should('not.be.visible')
    })

    it('valida campo telefone',function() {
        cy.clock()
        //have.value valida se o que foi digitado foi realmente digitado e deve ter um segundo argumento vazio para garantir que não foi preenchido
        cy.get('#phone-checkbox').check()
        cy.get('#phone').should('be.visible').type('Igor').should('have.value', '')
        cy.contains('button', 'Enviar').click()
        cy.get('.error').should('be.visible')
        cy.tick(tresSegundos)
        cy.get('.error').should('not.be.visible')
    })

    it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário',function() {
        cy.clock()
        cy.get('#firstName').should('be.visible').type('Danilo')
        cy.get('#lastName').should('be.visible').type('Sousa')
        cy.get('#email').should('be.visible').type('dansousa19@hotmail.com')
        cy.get('#phone-checkbox').check()
        cy.get('#open-text-area').should('be.visible').type('Teste')
        cy.contains('button', 'Enviar').click()
        cy.get('.error').should('be.visible')
        cy.tick(tresSegundos)
        cy.get('.error').should('not.be.visible')
    })

    it('preenche e limpa os campos nome, sobrenome, email e telefone',function() {
        cy.get('#firstName').should('be.visible').type('Danilo').should('have.value', 'Danilo').clear().should('have.value', '')
        cy.get('#lastName').should('be.visible').type('Sousa').should('have.value', 'Sousa').clear().should('have.value', '')
        cy.get('#email').should('be.visible').type('dansousa19@hotmail.com').should('have.value', 'dansousa19@hotmail.com').clear().should('have.value', '')
        cy.get('#phone').should('be.visible').type('11940712722').should('have.value', '11940712722').clear().should('have.value', '')
        cy.contains('button', 'Enviar').click()
    })

    it('exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios',function() {
        cy.clock()
        cy.contains('button', 'Enviar').click()
        cy.get('.error').should('be.visible')
        cy.tick(tresSegundos)
        cy.get('.error').should('not.be.visible')
    })

    it('envia o formuário com sucesso usando um comando customizado',function() {
        cy.clock()
        //comando custumizado é comando que cria uma variavel que possibilita ser utilizada de forma remota, passando argurmentos e não prendendo uma ação a um caso de teste
        cy.fillMandatoryFieldsAndSubmit('Danilo', 'sousa', 'dansousa19@hotmail.com', 'teste')
        cy.get('.success').should('be.visible')
        cy.tick(tresSegundos)
        cy.get('.success').should('not.be.visible')
    })

    //comando select utilizado para dropDwon
    it('seleciona um produto (YouTube) por seu texto',function() {
        cy.get('#product').select('YouTube').should('have.value', 'youtube')
    })

    it('seleciona um produto (Mentoria) por seu valor (value)',function(){
        cy.get('select').select('mentoria').should('have.value', 'mentoria')
    })

    it('seleciona um produto (Blog) por seu índice',function(){
        cy.get('select').select(1).should('have.value', 'blog')
    })

    it('marca o tipo de atendimento "Feedback"', function(){
        cy.get('input[type="radio"][value="feedback"]').check().should('have.value', 'feedback')
    })

    //metodo para marcar diversos radios e valida
    it('marca cada tipo de atendimento', function(){
        cy.get('input[type="radio"]').should('have.length', 3).each(function($radio){
            cy.wrap($radio).check().should('be.checked')
        })
    })

    it('marca ambos checkboxes, depois desmarca o último', function(){
        cy.get('input[type="checkbox"]').check().last().uncheck()
    })

    //adicionando um arquivo
    it('seleciona um arquivo da pasta fixtures',function(){
        cy.get('input[type="file"]').should('not.have.value').selectFile('cypress/fixtures/example.json')
          //metodo para verificação do arquivo se foi iserido
          .should(function($input){
              expect($input[0].files[0].name).to.equal('example.json')
          })
        })

    //drag-drop simula o arquivo sendo arrastado para a tela
    it('seleciona um arquivo simulando um drag-and-drop', function(){
        cy.get('#file-upload').should('not.have.value').selectFile('cypress/fixtures/example.json', {action: 'drag-drop'})
          .should(function($input){
            expect($input[0].files[0].name).to.equal('example.json')
        })
    })

    it('verifica que a política de privacidade abre em outra aba sem a necessidade de um clique',function(){
        cy.get('#privacy a').should('have.attr', 'target', '_blank')
    })

    it('acessa a página da política de privacidade removendo o target e então clicando no link',function(){
        cy.get('#privacy a').invoke('removeAttr', 'target').click()
    })
 }) 


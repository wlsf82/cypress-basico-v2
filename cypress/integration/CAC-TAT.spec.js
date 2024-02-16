/// <reference types="Cypress" />

describe('Central de Atendimento ao Cliente TAT', function() {

    //Usando o comando visit para visitar a plicação de teste
    this.beforeEach(function() {
        cy.visit('./src/index.html')
    })

    //validação se o título da aplicação é correto de acordo com o informado
    it('verifica o título da aplicação', function() {
        cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT')
    })

    //Validação de sucesso quandotodos os campos obrigatórios são preenchidos corretamente
    it('preenche os campos obrigatórios e envia o formulário', function() {
        cy.get('#firstName').type('Daniel')
        cy.get('#lastName').type('Fossali')
        cy.get('#email').type('danielfossali@suportetecnologias.com.br')
        cy.get('#open-text-area').type('teste')
        cy.get('button[type="submit"]').click()
        cy.get('.success').should('be.visible')
      
    })

    //Validação de sucesso quandotodos os campos obrigatórios são preenchidos corretamente usando variável com textos longo
    it('preenche os campos obrigatórios e envia o formulário', function() {

        // usando uma variavel para guardar um texto longo e o uso do comando delay para controlar o tempo de execução do teste
         const longText = "Testeesteesteesteesteesteesteesteesteesteesteesteesteesteesteesteesteesteesteesteesteesteesteesteesteesteesteesteesteesteesteesteeste" 
         cy.get('#firstName').type('Daniel')
         cy.get('#lastName').type('Fossali')
         cy.get('#email').type('danielfossali@suportetecnologias.com.br')
         cy.get('#open-text-area').type(longText, {delay: 0})
         cy.get('button[type="submit"]').click()
         cy.get('.success').should('be.visible')
      
    })
    
    //Validação de erro quando o e-mail é preenchido com formato errado
    it('exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', function() {

        //exibindo mensagem e erro  por preencher campo inválido
        cy.get('#firstName').type('Daniel')
        cy.get('#lastName').type('Fossali')
        cy.get('#email').type('danielfossali@suportetecnologias,com.br')
        
        cy.get('button[type="submit"]').click()

        cy.get('.error').should('be.visible')

    }) 

    //Validação de erro quando o campo telefone é preenchido com caracteres
    it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', function(){
        cy.get('#firstName').type('Daniel')
        cy.get('#lastName').type('Fossali')
        cy.get('#email').type('danielfossali@suportetecnologias.com.br')
        cy.get('#phone').type('adcvvfs')

        cy.get('button[type="submit"]').click()

        cy.get('.error').should('number', '')
    })
    

    //Preenchendo e apagando todos os inputs d epreenchimento do formulário
    it('preenche os campos obrigatórios e envia o formulário', function(){

        //usando o .clear 
        //* no exemplo abaixo fazemo o input ser preenchido e depois passar por uma validação usando o .should para verificar 
        //se o valor passado é igual ao da verificado, caso não seja compativel, o sistema ainda irá tentar até dar o erro de time out
        
        cy.get('#firstName')
            .type('Daniel')
            .should('have.value', 'Daniel')
            .clear()
            .should('have.value', '')
        cy.get('#lastName')
            .type('Fossali')
            .should('have.value', 'Fossali')
            .clear()
            .should('have.value', '')
        cy.get('#email')
            .type('danielfossali@suportetecnologias.com.br')
            .should('have.value', 'danielfossali@suportetecnologias.com.br')
            .clear()
            .should('have.value', '')
        cy.get('#open-text-area')
            .type('teste')
            .should('have.value', 'teste')
            .clear()
            .should('have.value', '')

    })

    //Validação de erro quando os campo obrigatórios não são preenchidos
    it('exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', function(){
        cy.get('button[type="submit"]').click()

        cy.get('.error').should('be.visible')
    })

    //Criando um comando como variável na pasta support e retornando ele no escopo de teste
    it('fillMandatoryFieldsAndSubmit', function(){
        cy.fillMandatoryFieldsAndSubmit()

        cy.get('.success').should('be.visible')
    })

    //Preenchendo todos os campos obrigatório e enviando o formulário para validação de sucesso
    it('preenche os campos obrigatórios e envia o formulário', function() {
        cy.get('#firstName').type('Daniel')
        cy.get('#lastName').type('Fossali')
        cy.get('#email').type('danielfossali@suportetecnologias.com.br')
        cy.get('#open-text-area').type('teste')
        cy.contains('.button', 'Enviar').click()
        cy.get('.success').should('be.visible')
      
    })

    //Selecionando uma opção de tipo de Atendimento pelo nome no Input
    it('Selecionar opção de campo', function(){
        cy.get('select')
        .select('YouTube')
        .should('have.value', 'youtube')
    })

    // Selecionando uma opção dos Tipos de Atendimento pelo valor do input
    it('Feedback', function(){
        cy.get('input[type="radio"][value="feedback"]')
        .check()
        .should('have.value', 'feedback')
    })

    //selecionando todas as opções de uma combo Tipos de atendimento
    it('Marcar tipo de atendimento', function(){
        cy.get('input[type="radio"]')
        // o have.legnht ele busca por todas as opções do checkboc
            .should('have.length', 3)

        // o each cria uma área onde serão feitas as seleções de todas as opções a serem marcadas
            .each(function($radio){
            // o wrap funciona como um encadeamento para as seleções
                cy.wrap($radio).check()
                cy.wrap($radio).should('be.checked')
            })
    })


    //marcando e desmarcando inputs do tipo checkbox utilizando o comando .uncheck
   it('Marcando e desmarcando input do tipo checkbox', function(){
    //quando usado o get informando o input com seu tipo ele seleciona TODOS os checkbox com o comando .check
    cy.get('input[type="checkbox"]')
        .check()
        .should('be.checked')
        // o comando .last ele 'posisicona' no último elemento selecionado, e as ações feitas após ele serão executadas somente no último elemento
        .last()
        .uncheck()
        .should('not.be.checked')
    
   }) 

   //teste feito para validar se o checkbox de telefone foi marcado e não foi preenchido para gerar erro
   it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', function(){
    cy.get('#firstName').type('Daniel')
        cy.get('#lastName').type('Fossali')
        cy.get('#email').type('danielfossali@suportetecnologias.com.br')
        cy.get('#phone-checkbox').check()
        cy.get('#open-text-area').type('teste')
        cy.get('button[type="submit"]').click()

        cy.get('.error').should('be.visible')
   })

   //Aprendendo a anexar arquivos utilizando o comando .selectFile()
   it('seleciona um arquivo da pasta fixtures', function(){
    cy.get('input[type="file"]#file-upload')
        .should('not.have.value' )
        .selectFile('./cypress/fixtures/example.json')
        .should(function($input){
            //o should pode receber uma função de callback onde vai ser passado a validação de um componente
            //no exemplo foi utilizadoo input de file selecionado com o JQuerry ($input) que será chamado na expeção
            console.log($input)
            //o expect ele passa a expeção do que deve ser validado no valor do nome do documento anexado
            //Ao abrir o inspecionar no cypress é possível ver no conole o indice e seus valores
            expect($input[0].files[0].name).to.equal('example.json')
        })
   })


   it('seleciona um arquivo simulando um drag-and-drop', function(){
    cy.get('input[type="file"]#file-upload')
        .should('not.have.value' )
        // a diferença do exemplo de cima é que o select file recebe o nome do arquivo primeiro e depois ele recebe o valor do objeto
        // com a ação que será efetuada
        .selectFile('./cypress/fixtures/example.json', {action: 'drag-drop'})
        .should(function($input){
            console.log($input)
            expect($input[0].files[0].name).to.equal('example.json')
        })
    })

    it('seleciona um arquivo utilizando uma fixture para a qual foi dada um alias', function(){
        //o comando cy.fixure é usado como atalho para pegar o caminho do arquivo que vai ser anexado
        // usando o 'as' para dar um nome do arquivo que vai ser chamado posteriormente no teste
        cy.fixture('example.json').as('sampleFile')
        cy.get('input[type="file"]#file-upload')
            .selectFile('@sampleFile')
            .should(function($input){
                console.log($input)
                expect($input[0].files[0].name).to.equal('example.json')
            })
    })

    it('verifica que a política de privacidade abre em outra aba sem a necessidade de um clique', function(){
        cy.get('#privacy a').should('have.attr', 'target', '_blank')
    })
    
    it('acessa a página da política de privacidade removendo o target e então clicando no link', function(){
        cy.get('#privacy a')
            .invoke('removeAttr', 'target')
            .click()

        cy.contains('Talking About Testing').should('be.visible')
    })
    
   
})
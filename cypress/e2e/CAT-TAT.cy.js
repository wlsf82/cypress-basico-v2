// CAT-TAT.spec.js created with Cypress
//
// Start writing your Cypress tests below!
// If you're unfamiliar with how Cypress works,
// check out the link below and learn how to write your first test:
// https://on.cypress.io/writing-first-test

///<reference types="Cypress"/>//

const THERE_SECONDS_IN_MS= 3000
const longtext= 'Executando teste de campo de texto de área para verificar quantos caracteres cabem no campo.'


//Descrição do Switch de teste
describe('Switch de testes da tela cadastro da Central de Atendiemtno ao Cliente TAT', function(){  


    beforeEach(function(){
        //Acessando ao site 
        cy.visit('./src/index.html')
    })

    it('Verifica o título da aplicação', () => {
        
        // Faz verificação com título do site
        cy.title().should('be.equal','Central de Atendimento ao Cliente TAT')

    })

    it('Preenche os campos obrigatórios da aplicação e envia o formulário', () => {      
        cy.clock() //congela relógio do navegador
        cy.get('#firstName').type('Wellington')
        cy.get('#lastName').type('Costa')
        cy.get('#email').type('wellington@cypress.com')
        // quando coloca texto muito longo, usa-se delay para diminuir tempo de teste
        cy.get('#open-text-area').type(longtext,{delay:0})    
        cy.contains('button','Enviar').click()


        cy.get('.success').should('be.visible')

        cy.tick(THERE_SECONDS_IN_MS) //Avança no tempo

        cy.get('.success').should('not.be.visible')


    })

    it('Preenche os campo e-mail com formatação inválida', () => {  
        
        cy.clock()
        cy.get('#firstName').type('Wellington')
        cy.get('#lastName').type('Costa')
        cy.get('#email').type('wellington,com')
        // quando coloca texto muito longo, usa-se delay para diminuir tempo de teste
        cy.get('#open-text-area').type(longtext)    
        cy.contains('button','Enviar').click()
        cy.get('.error').should('be.visible')

        cy.tick(THERE_SECONDS_IN_MS) //Avança no tempo

        cy.get('.error').should('not.be.visible')
    })

    it('Campo de telefone continua vazio quando preenchido com valor não numérico', () => { 
        
        cy.get('#phone')
            .type('dgdgdfhgfertet')
            .should('have.value','')       
    })

    
    //Executa o teste 5X
   // Cypress._.times(2,()=>{ 
    it('Exibe menssagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do formulário', () => { 
      
            cy.clock()
            cy.get('#firstName').type('Wellington')
            cy.get('#lastName').type('Costa')
            cy.get('#email').type('wellington@cypress.com')
            cy.get('#phone-checkbox').check()
            // quando coloca texto muito longo, usa-se delay para diminuir tempo de teste
            cy.get('#open-text-area').type(longtext)    
        cy.get('#open-text-area').type(longtext)    
            cy.get('#open-text-area').type(longtext)    
            cy.contains('button','Enviar').click()
    
            cy.get('.error').should('be.visible')
            cy.tick(THERE_SECONDS_IN_MS) //Avança no tempo
    
            cy.get('.error').should('not.be.visible')
    
        })//fim

 //   }) // Aplicação do Loadash
  

    it('Preenche e limpa os campos nome, sobrenome, email e telefone', ()=>{
        cy.get('#firstName').type('Wellington').should('have.value','Wellington').clear().should('have.value','')
        cy.get('#lastName').type('Costa').should('have.value','Costa').clear().should('have.value','')
        cy.get('#email').type('wellington@cypress.com').should('have.value','wellington@cypress.com').clear().should('have.value','')
        cy.get('#phone').type('123456789').should('have.value','123456789').clear().should('have.value','')
        cy.contains('button','Enviar').click()
       
    })

    it('Exibe a messagem de erro ao submeter o formulário sem preencher os campos obrigatórios',()=>{
        cy.clock()
        cy.get('button[type="submit"]').click()

        cy.get('.error').should('be.visible')
        cy.tick(THERE_SECONDS_IN_MS) //Avança no tempo

        cy.get('.error').should('not.be.visible')
    })


    it('Envia o formuário com sucesso usando um comando customizado',()=>{

        cy.clock()
        cy.fiççMandatoryFieldAndSubmit()


        cy.get('.success').should('be.visible')
        cy.tick(THERE_SECONDS_IN_MS) //Avança no tempo

        cy.get('.success').should('not.be.visible')
        
    })

    it('Seleciona um produto (Youtube) por seu tesxto',()=>{
        cy.get('#product').select('youtube').should('have.value','youtube')
    })
    it('Seleciona um produto (Mentoria) por seu valor',()=>{
        cy.get('#product').select('mentoria').should('have.value','mentoria')
    })
    it('Seleciona um produto (Blog) por seu indice',()=>{
        cy.get('#product').select(1).should('have.value','blog')
    })
    it('Marca o tipo de atendimento feedback',()=>{
        cy.get('input[type="radio"][value="feedback"]').check().should('have.value','feedback')
    })


    it('Marca cada tipo de atendimento',()=>{
        cy.get('input[type="radio"]')
            .should('have.length',3)// verifica se tem 3 checkboxs
            .each(function($radio){
                cy.wrap($radio).check()
                cy.wrap($radio).should('be.checked')
            })

    })

    // Marcar os 2 checkboxs e depois desmarcar
    it('Marca ambos os checkboxes e depois desmarca o último',()=>{
        cy.get('input[type="checkbox"]')
        .check() //Dando check nos 2 checkboxes
        .should('be.checked')
        .last()
        .uncheck()
        .should('not.be.checked')

    })

    it('Selecionando arquivo da pasta fixtures',()=>{
        cy.get('input[type="file"]')
            .should('not.have.value')
            .selectFile('./cypress/fixtures/example.json')
            .should(function($input){
                expect($input[0].files[0].name).to.equal('example.json')
            })
    })

    it('seleciona um arquivo simulando um drag-and-drop',()=>{
        cy.get('input[type="file"]')
            .should('not.have.value')
            .selectFile('./cypress/fixtures/example.json',{action:'drag-drop'})
            .should(function($input){
                expect($input[0].files[0].name).to.equal('example.json')
            })
    })

    it('seleciona um arquivo utilizando uma fixture para a qual foi dada um alias',()=>{
        cy.fixture('example.json').as('sampleFile')
        cy.get('input[type="file"')
            .selectFile('@sampleFile')
            .should(function($input){
                expect($input[0].files[0].name).to.equal('example.json')
            })
    })

    it('verifica que a política de privacidade abre em outra aba sem a necessidade de um clique',()=>{
        cy.get('#privacy a').should('have.attr','target','_blank')
    })

    it('testa a página da política de privavidade de forma independente',()=>{
        cy.get('#privacy a')
        .invoke('removeAttr','target') // remove atributo target para não abrir a outra página
        .click()

        cy.contains('Talking About Testing').should('be.visible')
    })

    it('exibe e esconde as mensagens de sucesso e erro usando o .invoke', () => {
        cy.get('.success')
          .should('not.be.visible')
          .invoke('show')
          .should('be.visible')
          .and('contain', 'Mensagem enviada com sucesso.')
          .invoke('hide')
          .should('not.be.visible')
        cy.get('.error')
          .should('not.be.visible')
          .invoke('show')
          .should('be.visible')
          .and('contain', 'Valide os campos obrigatórios!')
          .invoke('hide')
          .should('not.be.visible')
      })

    //repeat : repetir um texto de acordo com a quantiadde de vezes que precisar
    it('Preenche a área de texto usando o comando invoke',()=>{
        const longtextinvoke=Cypress._.repeat('Este é teste de inclusão de caracteres por 20x',20)

        cy.get('#open-text-area')
            .invoke('val',longtextinvoke)
            .should('have.value',longtextinvoke)
    })

    //Request 
    it('Faz uma requisição HTTP',()=>{
        cy.request('https://cac-tat.s3.eu-central-1.amazonaws.com/index.html')
            .should(function(response){
                const{status,statusText, body}=response
                expect(status).to.equal(200)
                expect(statusText).to.equal('OK')
                expect(body).to.include('CAC TAT')
            })
    })

    //DESAFIO: Encontando o gato
    it('Encontrando o gatinho escondido',()=>{
        cy.get('#cat')
            .invoke('show')
            .should('be.visible')
        cy.get('#title')
            .invoke('text','CAT CAT')
        cy.get('#subtitle')
            .invoke('text','Eu vi o CAT')        

    })

})//Fim da switch de testes

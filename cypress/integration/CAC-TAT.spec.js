

/// <reference types="Cypress" />

describe('Central de Atendimento ao Cliente TAT', function() {
    beforeEach(function(){
        cy.visit('./src/index.html')

    })
    it('verifica o título da aplicação', function() {
        //Acessando url local
        //Validando o titulo da pagina 
        cy.title().should('be.equal','Central de Atendimento ao Cliente TAT')
  
    })

    it('preenche os campos obrigatórios e envia o formulário',()=>{
        const longText ='cjwvegjhvjdfhvrejhvdfjhvgfsdjhvgfsdjvhgkjfgegfhjshclksdjhclksjadvhgflaskjvhfd,ahfklsdjafgvklasgvgkjgfsdvgfsdkhmgdsjvhgfvhjgfvhjbd vhvbcsbvjjsdkvxbsjhfvbjhcxvbjgfv kdfgcjkhfbsaldkjbhdlkjasfhlkasdjfhalksfgdjfmbvcak kfahvbejksfdhmvbcj,dmngsdbvfjhksfmvbfehjvfmnrgxcvhjgbefjkdsvbhefhjvbfehbfesldkjvblskjdfczbvgdckxzj,dncbx xz,hjvbskjzhcgvbzxchjm,vbfdkh,xmvb zxkj'
        cy.get('#firstName')
          .type('Bruno')
        cy.get('#lastName')
          .type('Falanga')
        cy.get('#email')
          .type('brunozxt@gmail.com')
        cy.get('#phone')
          .type('(11)930952625')

        cy.get('#open-text-area')
            .type(longText,{delay:0})

        cy.contains('button','Enviar').click()
        
        cy.get('.success').should('be.visible')

    })

    it('exibe mensagem de erro ao submeter o formulário com um email com formatação inválida',()=>{
        cy.get('#firstName')
          .type('Bruno')
        cy.get('#lastName')
          .type('Falanga')
        cy.get('#email')
          .type('brunozxt.')
        cy.get('#phone')
          .type('(11)930952625')

        cy.get('#open-text-area').type('sdfdfgdsfgfdsgfds')

        cy.contains('button','Enviar').click()
        
        cy.get('.error')
            .should('be.visible')

    })

    it('Campo telefone continua vazio quando preenchido com valor não numerico',()=>{
        cy.get('#phone')
          .type('dfdsgdsfgdfsg')
          .should('have.value', '')




    })

    it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário',()=>{
        cy.get('#firstName')
        .type('Bruno')

      cy.get('#lastName')
        .type('Falanga')

      cy.get('#email')
        .type('brunozxt@gmail.com')

        cy.get('#phone-checkbox')
            .click()


      cy.get('#open-text-area').type('sdfdfgdsfgfdsgfds')

      cy.contains('button','Enviar').click()
      
      cy.get('.error')
          .should('be.visible')




    })

    it('Preenche e limpa o campos',()=>{
        cy.get('#firstName')
        .type('Bruno')
        .should('have.value','Bruno')
        .clear()
        .should('have.value', '')

      cy.get('#lastName')
        .type('Falanga')
        .should('have.value','Falanga')
        .clear()
        .should('have.value', '')



      cy.get('#email')
        .type('brunozxt@gmail.com')
        .should('have.value','brunozxt@gmail.com')
        .clear()
        .should('have.value', '')

      cy.get('#phone')
        .type(32425262363)
        .should('have.value',32425262363)
        .clear()
        .should('have.value', '')

      cy.get('#open-text-area')
        .type('sdfdfgdsfgfdsgfds')
        .should('have.value','sdfdfgdsfgfdsgfds')
        .clear()
        .should('have.value', '')




      


    })

    it('exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios',()=>{
        cy.get('button[type="submit"')
            .click()

        cy.get('.error')
            .should('be.visible')

    })

    it('envia o formuário com sucesso usando um comando customizad',()=>{
        cy.fillMandatoryFieldsAndSubmit()
        cy.get('.success').should('be.visible')

    })

    it('Seleciona um produto (YouTube) por seu texto',()=>{

      cy.get('#product')
        .select('YouTube')
        .should('have.value','youtube')

    })
    it('Selecione um produto (Mentoria) por seu valor (value)',()=>{
      cy.get('#product')
      .select('mentoria')
      .should('have.value','mentoria')  

    })
    it('Selecione um produto (Blog) por seu indice',()=>{
      cy.get('#product')
      .select(1)
      .should('have.value','blog')  

    })

    it('Marcando o tipo de atendimento "Feedback"',()=>{
      cy.get(':nth-child(4) > input')
        .check()
        .should('have.value','feedback')

    })
    it('marca ambos checkboxes, depois desmarca o último',()=>{
      cy.get('#phone-checkbox')
        .check()
        .last()
        .uncheck()
        .should('not.be.checked')

        

    })
    it('seleciona um arquivo da pasta fixtures',()=>{
      cy.get('#file-upload')
      //Verificando que naõ tem valor
        .should('not.have.value')
        //passando o caminho relativo do arquivo para se fazer upload
        .selectFile('./cypress/fixtures/example.json')
        .should(($input)=>{
          console.log($input)
            expect($input[0].files[0].name).to.equal('example.json')
        })
    })

    it('seleciona um arquivo simulando um drag-and-drop',()=>{
      cy.get('#file-upload')
      //Verificando que naõ tem valor
        .should('not.have.value')
        //passando o caminho relativo do arquivo para se fazer upload
        .selectFile('./cypress/fixtures/example.json',{action: 'drag-drop'})
        .should(($input)=>{
          console.log($input)
            expect($input[0].files[0].name).to.equal('example.json')

      })
    })
    it('seleciona um arquivo utilizando uma fixture para a qual foi dada um alias',()=>{
      cy.fixture('example.json').as('sampleFile')
      cy.get('#file-upload')
        .selectFile('@sampleFile')
        .should(($input)=>{
          console.log($input)
            expect($input[0].files[0].name).to.equal('example.json')

      })
      
    })
    
    it('verifica que a política de privacidade abre em outra aba sem a necessidade de um clique',()=>{
      cy.get('#privacy a').should('have.attr','target','_blank')
    })
    
    it.only('acessa a página da política de privacidade removendo o target e então clicando no link',()=>{
      cy.get('#privacy a')
        .invoke('removeAttr','target')
        .click()

      cy.contains('Talking About Testing').should('be.visible')
    })
  




  })
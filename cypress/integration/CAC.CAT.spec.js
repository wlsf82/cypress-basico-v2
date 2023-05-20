// CAC.CAT.spec.js created with Cypress
//
// Start writing your Cypress tests below!
// If you're unfamiliar with how Cypress works,
// check out the link below and learn how to write your first test:
// https://on.cypress.io/writing-first-test

/// <reference types="Cypress" />



describe('Central de Atendimento ao Cliente TAT' , function() {
    const THREE_SECONDS_IN_MS = 3000
    
    beforeEach(function(){
        cy.visit('./src/index.html')
    })

    it('verifica o título da aplicação', function() {
        cy.title().should('be.equal' , 'Central de Atendimento ao Cliente TAT')
    })


     it('preenche os campos obrigatórios e envia o formulário' , function(){
        const longText= 'Teste teste teste Teste teste teste Teste teste teste Teste teste'

        cy.clock()

        cy.get('#firstName').type('Leonardo')
        cy.get('#lastName').type('Costa')
        cy.get('#email').type('leonardocaetanocosta2005@gmail.com')
        cy.get('#open-text-area').type(longText, {delay:0})
        cy.contains('button' , 'Enviar').click()

     cy.get('.success').should('be.visible')

     cy.tick(THREE_SECONDS_IN_MS)

     cy.get('.success').should('not.be.visible')

   })

    it('exibe mensagem de erro ao submeter o formulário com um email com formatação inválida' , function(){
        cy.clock()

        cy.get('#firstName').type('Leonardo')
        cy.get('#lastName').type('Costa')
        cy.get('#email').type('leonardogmail,com')
        cy.get('#open-text-area').type('Léo Léo Léo Léo Léo')
        cy.contains('button' , 'Enviar').click()

        cy.get('.error').should('be.visible')

        cy.tick(THREE_SECONDS_IN_MS)

     cy.get('.error').should('not.be.visible')
    })

    it('campo telefone continua vazio quando preenchido com valor não numérico' , function(){
        cy.get('#phone')
        .type('abcdasf')
        .should('have.value' , '')
    })

    it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário' , function(){
        cy.clock()

        cy.get('#firstName').type('Leonardo')
        cy.get('#lastName').type('Costa')
        cy.get('#email').type('leonardocaetanocosta2005@gmail.com')
        cy.get('#phone-checkbox').click()
        cy.get('#open-text-area').type('Léo Léo Léo Léo Léo')
        cy.contains('button' , 'Enviar').click()

        cy.get('.error').should('be.visible')

        cy.tick(THREE_SECONDS_IN_MS)

     cy.get('.error').should('not.be.visible')
    })

    it('preenche e limpa os campos nome, sobrenome, email e telefone', function(){
        cy.get('#firstName').type('Leonardo')
        .should('have.value' , 'Leonardo')
        .clear()
        .should('have.value' , '')
    })

    it('exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios' , function(){
        cy.clock()
        cy.contains('button' , 'Enviar').click()
        cy.get('.error').should('be.visible')

        cy.tick(THREE_SECONDS_IN_MS)

     cy.get('.error').should('not.be.visible')

    })

    it('envia o formuário com sucesso usando um comando customizado', function(){
        cy.clock()
        cy.PreencheOsCamposObrigatorioseEnviaComSucesso()
        cy.get('.success').should('be.visible')

        cy.tick(THREE_SECONDS_IN_MS)

     cy.get('.success').should('not.be.visible')
    })

    it('seleciona um produto (YouTube) por seu texto' , function(){
        cy.get('#product')
        .select('YouTube')
        .should('have.value' , 'youtube')
    })

    it('seleciona um produto (Mentoria) por seu valor (value)' , function(){
        cy.get('#product')
        .select('mentoria')
        .should('have.value' , 'mentoria')
    })

    it('seleciona um produto (Blog) por seu índice' , function(){
        cy.get('#product')
        .select(1)
        .should('have.value' , 'blog')
    })
    
    it('marca o tipo de atendimento "Feedback"', function(){
        cy.get(':nth-child(4) > input')
        .check()
        .should('have.value' , 'feedback')
    })



    it('marca cada tipo de atendimento' , function(){
        //cy.get abaixo retorna mais de um elemento,
        //nesse caso os 3 inputs do tipo radio da aplicação

        cy.get('input[type="radio"]')
        .should('have.length' , 3)

        //atraves do comando .each passa por cada um dos elementos
        //um encadeamento, empacotando cada um pela função .wrap
        //para realizar o clique no input, e realizar a verificação de cada um
        .each(function($radio){
            cy.wrap($radio).check()
            cy.wrap($radio).should('be.checked')
        })
    })

    it('marca ambos checkboxes, depois desmarca o último' , function(){
        //pega todos os inputs do tipo checkbox
        cy.get('input[type="checkbox"]')

        //da um check neles
        .check()

        //verifica que foram checkados
        .should('be.checked')

        //pega o ultimo input
        .last()

        //desmarca o input
        .uncheck()

        //verifica se foi desmarcado com sucesso
        .should('not.be.checked')

    })

    it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário' , function(){
        cy.clock()

        cy.get('#firstName').type('Leonardo')
        cy.get('#lastName').type('Costa')
        cy.get('#email').type('leonardocaetanocosta2005@gmail.com')
        cy.get('#phone-checkbox').check()
        cy.get('#open-text-area').type('Léo Léo Léo Léo Léo')
        cy.contains('button' , 'Enviar').click()

        cy.get('.error').should('be.visible')

        cy.tick(THREE_SECONDS_IN_MS)

     cy.get('.error').should('not.be.visible')
    })



    //teste de funcionamento de upload de arquivos
    it('seleciona um arquivo da pasta fixtures' , function(){
        cy.get('#file-upload')
        .should('not.have.value')
        .selectFile('./cypress/fixtures/example.json')
        .should(function($input){
            expect($input[0].files[0].name) .to.equal('example.json')
        })
    })

    //testa o mesmo upload de arquivos porem utizando o drag-drop
    //simulando a inserção de um arquivo arrastando de algum lugar e upando
    it('seleciona um arquivo simulando um drag-and-drop' , function(){
        cy.get('#file-upload')
        .should('not.have.value')
        .selectFile('./cypress/fixtures/example.json' , {action: 'drag-drop'})
        .should(function($input){
        expect($input[0].files[0].name) .to.equal('example.json')
        })
    })

    //
    it('seleciona um arquivo utilizando uma fixture para a qual foi dada um alias' , function(){
        cy.fixture('example.json').as('sampleFile')
        cy.get('#file-upload')
        .selectFile('@sampleFile')
    })

    it('verifica que a política de privacidade abre em outra aba sem a necessidade de um clique' , function(){
        cy.get('#privacy a').should('have.attr' , 'target' , '_blank')
    })


    //funcionalidade cypress para abrir links
    //que abrem em outras guias do navegador
    //abrirem na mesma pagina onde esta realizando os testes
    it('acessa a página da política de privacidade removendo o target e então clicando no link' , function(){
        cy.get('#privacy a')
        .invoke('removeAttr' , 'target')
        .click()

        cy.contains('Talking About Testing').should('be.visible')
    })


    //Usando a funcionalidade .invoke com (show) e (hide)

    it('exibe e esconde as mensagens de sucesso e erro usando o .invoke', function(){
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

      it('preenche a area de texto usando o comando invoke', function(){
        const longText = Cypress._.repeat('123456789' , 20)
        cy.get('#open-text-area')
        .invoke('val' , longText)
        .should('have.value' , longText)
      })

      it('faz uma requisição HTTP', function(){
        cy.request('https://cac-tat.s3.eu-central-1.amazonaws.com/index.html')
        .should(function(response){
            const { status, statusText, body } = response
            expect(status).to.equal(200)
            expect(statusText).to.equal('OK')
            expect(body).to.include('CAC TAT')
        })
      })


      it('encontrando o gato na aplicação' , function(){
        cy.get('#cat')
        .invoke('show')
        .should('be.visible')
      })

})

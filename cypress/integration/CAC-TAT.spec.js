/// <reference types="Cypress" /> 

    describe('Central de Atendimento ao Cliente TAT',  function() {
        beforeEach( function() {
            cy.visit('./src/index.html')
        })

        it('verifica o título da aplicação', function() {
            cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT')
        })

        it('preenche os campos obrigatórios e envia o formulário', function() {
            const longText = 'ao instalar a versão do Cypress pelo npm tive problemas com o cache por ja ter outra versão instalada então fui no caminho C:\Users\kmds\AppData\Local\Cypress e apaguei a pasta cache e instalei novamente pelo cmd com o npm.'
            cy.get('#firstName').type('Walmyr')
            cy.get('#lastName').type('Filho')
            cy.get('#phone-checkbox').check()
            cy.get('#phone').type('1234567890')
            cy.get('#email').type('walmyr@exemplo.com')
            cy.get('#open-text-area').type(longText, {delay: 0})
            cy.get('button[type="submit"]').click()
            cy.get('.success').should('be.visible')
        })

        it('exibe mensagem de erro ao submeter o formulário com um email com formatação erro', function() {
            cy.get('#firstName').type('Walmyr')
            cy.get('#lastName').type('Filho')
            cy.get('#email').type('walmyr@exemplo,com')
            cy.get('#open-text-area').type('Teste.')
            cy.get('button[type="submit"]').click()
            cy.get('.error').should('be.visible')
        })

        it('campo telefone continua vazio quando preenchido com valor não-númerico', function() {
            cy.get('#phone')
                .type('xxxxx')
                .should('have.value', '')
        })

        it('Exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', function() {
            cy.get('#firstName').type('Walmyr')
            cy.get('#lastName').type('Filho')
            cy.get('#email').type('walmyr@exemplo,com')
            cy.get('#phone-checkbox').click()
            cy.get('#open-text-area').type('Teste.')
            cy.get('button[type="submit"]').click()
            cy.get('.error').should('be.visible')
        })

        it('preenche e limpa os campos nome, sobrenome, email e telefone', function() {
            cy.get('#firstName')
                .type('Karla')
                .should('have.value', 'Karla')
                .clear()
                .should('have.value', '')
            cy.get('#lastName')
                .type('Miriam')
                .should('have.value', 'Miriam')
                .clear()
                .should('have.value', '')
            cy.get('#phone')
                .type('1234567890')
                .should('have.value', '1234567890')
                .clear()
                .should('have.value', '')
        })

        it('exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', function() {
            cy.get('button[type="submit"]').click()
            cy.get('.error').should('be.visible')
        })

        it('envia o formulário com sucesso usando um comando customizado', function() {
            cy.fillMandatoryFieldsAndSubmit()
            cy.get('.error').should('be.visible')
        })

        it('envia o formulário com sucesso usando um comando customizado', function() {
            cy.fillMandatoryFieldsAndSubmit()
            cy.get('.error').should('be.visible')
        })

        it('contains button ', function() {
            cy.contains('button', 'Enviar').click()
            cy.get('.error').should('be.visible')
        })

        it(' Seleciona um produto (youtube) por seu texto', function() {
            cy.get('#product')
            .select('YouTube')
            .should('have.value', 'youtube')
        })

        it(' Seleciona um produto (mentoria) por seu valor', function() {
            cy.get('#product')
            .select('mentoria')
            .should('have.value', 'mentoria')
        })

        it(' Seleciona um produto (blog) pelo seu indice', function() {
            cy.get('#product')
            .select(1)
            .should('have.value', 'blog')
        })

        it('marca o tipo de atendimento "Feedback"', function() {
            cy.get('input[type="radio"][value="feedback"]')
            .check()
            .should('have.value', 'feedback')
        })

        it('marca cada tipo de atendimento', function() {
            cy.get('input[type="radio"]')
            .should('have.length', 3)
            .each(function($radio){
                cy.wrap($radio).check()
                cy.wrap($radio).should('be.checked')
            })
            
        })

        it('marca ambos checkboxes, depois desmarca o último', function() {
            cy.get('input[type="checkbox"]')
            .check()
            .last()
            .uncheck()
            .should('not.be.checked')
        })

        it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preechido', function() {
            cy.get('#firstName').type('Karla')
            cy.get('#lastName').type('Filho')
            cy.get('#email').type('karla@exemplo,com')
            cy.get('#phone-checkbox').check()
            cy.get('#open-text-area').type('Teste.')
            cy.get('button[type="submit"]').click()
            cy.get('.error').should('be.visible')
        })

        it('selecione o arquivo da pasta fixtures', function() {
            cy.get('input[type="file"]')
                .should('not.have.value')
                .selectFile('./cypress/fixtures/example.json')
                .should(function($input){
                    expect($input[0].files[0].name).to.equal('example.json')
            })
            
        })

        it('selecione o arquivo simulando um drag-and-drop', function() {
            cy.get('input[type="file"]')
                .should('not.have.value')
                .selectFile('./cypress/fixtures/example.json', { action: 'drag-drop'})
                .should(function($input){
                    expect($input[0].files[0].name).to.equal('example.json')
            })
        
        })

        it('selecione um arquivo utilizando uma fixture para a qual foi dada um alias', function() {
            cy.fixture('example.json').as('sampleFile')
            cy.get('input[type="file"]')
                .selectFile('@sampleFile')
            })

        it('verifica que a politica de privacidade abre em outra aba sem a necessidade de um clique', function() {
            cy.get('#privacy a').should('have.attr', 'target', '_blank') 
        })

        it('acessa a politica de privacidade removendo o target e então clicando no link', function() {
            cy.get('#privacy a')
                .invoke('removeAttr', 'target')
                .click()
            cy.contains('Talking About Testing').should('be.visible')
        })

        it('preenche a area texto usando comando invoke', function() {
            const longText = Cypress._.repeat('0123456789',20)

            cy.get('#open-text-area')
                .invoke('val', longText)
                .should('have.value', longText)
        })

        it('preenche a area texto usando comando invoke', function() {
            const longText = Cypress._.repeat('0123456789',20)

            cy.get('#open-text-area')
                .invoke('val', longText)
                .should('have.value', longText)
        })

        it('faz uma requisição HTTP', function() {
            cy.request('https://cac-tat.s3.eu-central-1.amazonaws.com/index.html')
                .should(function(response) {
                    const { status, statusText, body} = response
                    expect(status).to.equal(200)
                    expect(statusText).to.equal('OK')
                    expect(body).to.include('CAC TAT')
                    console.log(response)
                })
                
        })

        it('desafio encontra gato', function() {
            cy.get('#cat')
                .invoke('show')
                .should('be.visible')
            cy.get('#title')
                .invoke('text', 'CAT TAT')
            cy.get('#subtitle')
                .invoke('text', 'Aprendendo cypress na prática')
        })

});
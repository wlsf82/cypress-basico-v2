/// <reference types="Cypress" />

const firstName = "Ana"
const lastName = "Carolina Stadelhofer"
const email = "ana.stadelhofer@cypress.com"
const phone = "123456789"

describe('Central de Atendimento ao Cliente TAT', function() {
    const Time = 3000
    beforeEach(() => {
        cy.visit('./src/index.html')
    })
    it('Verifica o título da aplicação', function() {
        cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT')
    })
    it('Preenche os campos obrigatórios e envia o formulário', function() {
        cy.clock()
        cy.get('#firstName').type('Ana')
        cy.get('#lastName').type('Carolina Stadelhofer')
        cy.get('#email').type('ana.stadelhofer@cypress.com')
        cy.get('#open-text-area').type('Gostaria de fazer um pedido de atendimento, porém estou com dificuldades de realizar o contato.')
        cy.get('.button').click()
        cy.get('.success').should('be.visible')
        cy.tick(Time)
        cy.get('.success').should('not.be.visible')
    })

    it('Alterado o delay da digitação', function() {
        const longText = 'Texto longo, Texto longo, Texto longo, Texto longo, Texto longo, Texto longo, Texto longo, Texto longo, Texto longo, Texto longo, Texto longo, Texto longo, Texto longo, Texto longo, Texto longo, Texto longo, Texto longo, Texto longo, Texto longo, Texto longo, Texto longo, Texto longo, Texto longo'
        cy.get('#open-text-area').type(longText, { delay: 0 })
    })

    it('Exibe mensagem de erro ao submeter o formulário com um email com formatação inválid', function() {
        cy.clock()
        cy.get('#firstName').type('Ana')
        cy.get('#lastName').type('Carolina Stadelhofer')
        cy.get('#email').type('ana.stadelhofer')
        cy.get('#open-text-area').type('Gostaria de fazer um pedido de atendimento, porém estou com dificuldades de realizar o contato.')
        cy.get('.button').click()
        cy.get('.error').should('be.visible')
        cy.tick(Time)
        cy.get('.error').should('not.be.visible')
    })

    it('Verificar valores númericos em campo telefone do usuário', function() {
        cy.get('#phone').type('abcdef').should('have.value', '')
        cy.get('#phone').type('12345678').should('have.value', 12345678)
    })

    it('Exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', function(){
        cy.clock()
        cy.get('#firstName').type('Ana')
        cy.get('#lastName').type('Carolina Stadelhofer')
        cy.get('#email').type('ana.stadelhofer@cypres.com')
        cy.get('#phone-checkbox').check()
        cy.get('#open-text-area').type('Gostaria de fazer um pedido de atendimento, porém estou com dificuldades de realizar o contato.')
        cy.get('.button').click()
        cy.get('.error').should('be.visible')
        cy.tick(Time)
        cy.get('.error').should('not.be.visible')
    })

    it('Preencher os campos nome, sobrenome, email e telefone, após isso limpar os campos', function() {
        cy.get('#firstName').type(firstName).should('have.value', firstName)
        cy.get('#lastName').type(lastName).should('have.value', lastName)
        cy.get('#email').type(email).should('have.value', email)
        cy.get('#phone').type(phone).should('have.value', phone)
        // Clear inputs
        cy.get('#firstName').clear().should('have.value', '')
        cy.get('#lastName').clear().should('have.value', '')
        cy.get('#email').clear().should('have.value', '')
        cy.get('#phone').clear().should('have.value', '')
    })

    it('Exibir mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', function() {
        cy.clock()
        cy.get('.button').click()
        cy.get('.error').should('be.visible')
        cy.tick(Time)
        cy.get('.error').should('not.be.visible')
    })

    it('Enviar o formuário com sucesso usando um comando customizado', function() {
        cy.clock()
        cy.fillMandatoryFields()
        cy.get('.button').click()
        cy.get('.success').should('be.visible')
        cy.tick(Time)
        cy.get('.success').should('not.be.visible')
    })

    it('Enviar fórmulário utilizando o .contains()', function() {
        cy.clock()
        cy.fillMandatoryFields()
        cy.contains('button', 'Enviar').click()
        cy.get('.success').should('be.visible')
        cy.tick(Time)
        cy.get('.success').should('not.be.visible')
    })

    it('Selecionar um produto (Cursos) por seu texto', function () {
        cy.get('#product').select('Cursos').should('have.value', 'cursos')
    })

    it('Selecionar um produto (Cursos) por seu valor', function () {
        cy.get('#product').select('cursos').should('have.value', 'cursos')
    })

    it('Selecionar um produto (Cursos) por seu indice', function () {
        cy.get('#product').select(2).should('have.value', 'cursos')
    })

    it('Marca o radio button "Feedback" em tipo de atendimento', function() {
        cy.get('[type="radio"]').check('feedback').should('have.value', 'feedback')
    })

    it('Marcar cada tipo de atendimento', function() {
        cy.get('[type="radio"]').each(function($radio) {
            cy.wrap($radio).check()
            cy.wrap($radio).should('be.checked')
        })
    })

    it('Marcar todas checkbox, desmarcar a ultima', function() {
        cy.get('[type="checkbox"]').check().should('be.checked')
        cy.get('[type="checkbox"]').last().uncheck().should('not.be.checked')
    })

    it('Revisar preenchimento de cadastro quando telefone é obrigatório porem vazio', function() {
        cy.fillMandatoryFields()
        cy.get('[type="checkbox"]').check('phone').should('be.checked')
        cy.get('#phone').type(phone).should('have.value', phone)
        cy.get('.button').click()
        cy.get('.success').should('be.visible')
    })

    it('Selecionar um arquivo da pasta fixtures', function() {
        cy.get('#file-upload')
        .should('not.have.value')
        .selectFile('./cypress/fixtures/example.json')
        .should(function($input) {
            expect($input[0].files[0].name).to.equal('example.json')
        })
    })

    it('Selecionar um arquivo da pasta fixtures por drag-and-drop', function() {
        cy.get('#file-upload')
        .should('not.have.value')
        .selectFile('./cypress/fixtures/example.json', { action: 'drag-drop' })
        .should(function($input) {
            expect($input[0].files[0].name).to.equal('example.json')
        })
    })
    it('Selecionar um arquivo da pasta fixtures por alias', function() {
        cy.fixture('example.json').as('exampleFile')
        cy.get('#file-upload')
        .should('not.have.value')
        .selectFile('@exampleFile')
        .should(function($input) {
            expect($input[0].files[0].name).to.equal('example.json')
        })
    })

    it('Verificar que a política de privacidade abre em outra aba sem a necessidade de um clique', function() {
        cy.get('#privacy a').should('have.attr', 'target', '_blank')
    })

    it('acessa a página da política de privacidade removendo o target e então clicanco no link', function() {
        cy.get('#privacy a').invoke('removeAttr', 'target').click()
        cy.contains('Talking About Testing').should('be.visible')
    })

    Cypress._.times(5, function() {
    it('exibe mensagem por 3 segundos', function() {
        cy.clock()
        cy.get('.button').click()
        
        cy.get('.error').should('be.visible')
        cy.tick(Time)
        cy.get('.error').should('not.be.visible')
      })
    })

    it.only('Exibir e esconder as mensagens de sucesso e erro usando o .invoke', function() {
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

      it('preenche a area de texto usando o comando invoke', function() {
        const longText = Cypress._.repeat('1234', 20)

        cy.get('#open-text-area').invoke('val', longText).should('have.value', longText)
      })

      it.only("Fazer uma requisição via HTTP", function() {
        cy.request('https://cac-tat.s3.eu-central-1.amazonaws.com/index.html').should(function(response) {
            const { status, statusText, body } = response 
            expect(status).to.equal(200)
            expect(statusText).to.equal('OK')
            expect(body).to.include('CAC TAT')
        })
      })
})
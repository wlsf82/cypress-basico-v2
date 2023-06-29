/// <reference types="Cypress" />


describe('Central de Atendimento ao Cliente TAT', () => {
    beforeEach(() => {
        cy.visit('./src/index.html')
    }) 


    it('verifica o título da aplicação', () =>  {
        cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT')
    })

    it('preenche os campos obrigatórios e envia o formulário', () => {
        const longText = 'Teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste,'
        
        cy.get('#firstName').type('Rayanne')
        cy.get('#lastName').type('Vieira')
        cy.get('#email').type('rayanne@teste.com')
        cy.get('#open-text-area').type(longText, { delay: 0}) //esse delay é para que o teste seja executado o mais rápido possível, no caso da execução der um texto longo
        cy.contains('button', 'Enviar').click()

        cy.get('.success').should('be.visible')
    })

    it('exibe mensagem de erro ao submeter o formulário com um email com formatação errada', () => {
        cy.get('#firstName').type('Rayanne')
        cy.get('#lastName').type('Vieira')
        cy.get('#email').type('rayanne,teste.com')
        cy.get('#open-text-area').type('Teste')
        cy.contains('button', 'Enviar').click()

        cy.get('.error').should('be.visible')
    })

    it('campo telefone continua vazio quando preenchido com um valor não númerico', () => {
        cy.get('#phone')
        .type('abcde')
        .should('have.value', '')
    })

    it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preencido antes do envio do formulário', () => {
        cy.get('#firstName').type('Rayanne')
        cy.get('#lastName').type('Vieira')
        cy.get('#email').type('rayanne@teste.com')
        cy.get('#phone-checkbox').check()
        cy.get('#open-text-area').type('Teste')
        cy.contains('button', 'Enviar').click()

        cy.get('.error').should('be.visible')
    })

    it('preenche e limpa os campos nome, sobrenome, email e telefone', () => {
        cy.get('#firstName')
          .type('Rayanne')
          .should('have.value', 'Rayanne')
          .clear() // para limpar o campo
          .should('have.value', '') //verificando se realmente limpou

        cy.get('#lastName')
          .type('Vieira')
          .should('have.value', 'Vieira')
          .clear() 
          .should('have.value', '') 

        cy.get('#email')
          .type('rayanne@teste.com')
          .should('have.value', 'rayanne@teste.com')
          .clear() 
          .should('have.value', '') 

        cy.get('#phone')
          .type('1234')
          .should('have.value', '1234')
          .clear() 
          .should('have.value', '')         
    })

    it('exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', () => {
        cy.contains('button', 'Enviar').click()

        cy.get('.error').should('be.visible')
    })

    it('envia o formulário com sucesso usando um comando customizado', () => {
        cy.fillMandatoryFieldsAndSubmit()

        cy.get('.success').should('be.visible')
    })

    it('seleciona um produto (YouTube) por seu texto', () => {
        cy.get('#product')
          .select('YouTube')
          .should('have.value', 'youtube')
    })

    it('seleciona um produto (Mentoria) por seu valor (value)', () => {
        cy.get('#product')
          .select('mentoria')
          .should('have.value', 'mentoria')
    })

    it('seleciona um produto (Blog) por seu índice', () => {
        cy.get('#product')
          .select(1)
          .should('have.value', 'blog')
    })

    it('marcao tipo de atendimento "feedback"', () => {
        cy.get('input[type="radio"][value="feedback"]')
          .check()
          .should('have.value', 'feedback')
    })

    it('marca cada tipo de atendimento', () => {
        cy.get('input[type="radio"]') //todos as opções radio
          .should('have.length', 3)
          .each(function ($radio) { //each pegando cada um dos elementos radio. O each recebe uma função de callback que recebe como argumento cada um dos elementos que foi selecionado
            cy.wrap($radio).check() //trabalha com array, empacota cada um dos radios
            cy.wrap($radio).should('be.checked')
        })
    })

    it('marca ambos checkboxes, depois desmarca o último', () => {
        cy.get('input[type="checkbox"]')
          .check()
          .should('be.checked')
          .last()
          .uncheck()
          .should('not.be.checked')
    })

    it('seleciona um arquivo da pasta fixtures', () => {
        cy.get('input[type="file"]#file-upload') //opção de seletor css com input e id
          .should('not.have.value')
          .selectFile('./cypress/fixtures/example.json')
          .should(function($input) {
            // console.log($input)
           expect($input[0].files[0].name).to.equal('example.json')
        })

    })

    it('seleciona um arquivo simulando drag-and-drop', () => {
        cy.get('input[type="file"]') 
          .should('not.have.value')
          .selectFile('./cypress/fixtures/example.json', { action: 'drag-drop' })//simulando o arrastar de um arquivo para carregamento na página = > { action: 'drag-drop' } é o 2º argumento com a propriedade action e que tem o valor drag-drop
          .should(function($input) {
            expect($input[0].files[0].name).to.equal('example.json')
        })
    })

    it('seleciona um arquivo utilizando uma fixture para a qual foi dada um alias', () => {
        cy.fixture('example.json').as('sampleFile') //cy.fixture não precisa copiar todo o caminho como no exercicio acima
        cy.get('input[type="file"]') 
          .selectFile('@sampleFile') //alias que é  o "as" deve sempre ser referenciado com um @
          .should(function($input) {
            expect($input[0].files[0].name).to.equal('example.json')
        })
    })

    it('verifica que a política de privacidade abre em outra aba sem a necessidade de um clique', () => {
        cy.get('#privacy a').should('have.attr', 'target', '_blank') //attr = atributo
    })

    it('acessa a página da política de privacidade removendo o target e então clicando no link', () => {
        cy.get('#privacy a')
          .invoke('removeAttr', 'target')
          .click()
          
          cy.contains('Talking About Testing').should('be.visible')
    })

})

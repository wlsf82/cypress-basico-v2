// CAC-TAT.spec.js created with Cypress
//
// Start writing your Cypress tests below!
// If you're unfamiliar with how Cypress works,
// check out the link below and learn how to write your first test:
// https://on.cypress.io/writing-first-test
///<reference types="Cypress"/>


describe('Central de Atendimento ao cliente TAT', function(){
    beforeEach(function(){
        cy.visit('./src/index.html')
    })

    it('Verifica o título da aplicacao', function(){
        cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT')
    })

    it('Preenche os campos obrigatórios e tenta confirmar', function(){
        cy.fillMandatoryFieldsAndSubmit()
        cy.get('.success > strong:nth-child(1)').should('be.visible')
    })

    it('Valida que o campo telefone fica obrigatorio quando marco contato via telefone', function(){
        cy.get('#phone-checkbox').click()
        cy.get('.phone-label-span').should('be.visible')
    })

    it('Testa o seletor de produto', function(){
        cy.fillMandatoryFields()
        cy.get('#product').select(1)
        cy.get('#product').should('have.value', 'blog')
    })

    it('Seleciona o radio de tipo de atendimento Elogio', function(){
        cy.get('#support-type > label:nth-child(3) > input:nth-child(1)').check()
        cy.get('#support-type > label:nth-child(3) > input:nth-child(1)').should('be.checked')
    })

    it('Valida se os checkboxes sao marcados e desmarca somente um', function() {
        cy.get('input[type="checkbox"]').check()
        cy.get('#phone-checkbox').uncheck()
        cy.get('#phone-checkbox').should('not.be.checked')
    })

    it('Envia um arquivo', function(){
        cy.get('input[type="file"]').selectFile('cypress/fixtures/example.json')
        .should(function($input){
            expect($input[0].files[0].name).to.equal('example.json')
        })
    })

    it('Verifica que o link abre em nova aba', function(){
        cy.get('#privacy > a:nth-child(1)').should('have.attr', 'target', '_blank')
    })
    it('abre a nova aba e confere o conteudo', function(){
        cy.get('#privacy > a:nth-child(1)').invoke('removeAttr', 'target')
        .click() 
        cy.contains('CAC TAT - Política de privacidade') 
    })
})
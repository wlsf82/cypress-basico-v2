/// <reference types="Cypress" />

describe('Central de Atendimento ao Cliente TAT', function() {
    beforeEach(function() {
        cy.visit('./src/index.html')
    })

    it('verifica o título da aplicação',function() {
        cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT')
    });

    it('preenche os campos obrigatórios e envia o formulário',function() {
        const longText = 'Ajuda teste campo como podemos ajudar Ajuda teste campo como podemos ajudar'
        cy.get('#firstName').type('Igor')
        cy.get('#lastName').type('Amorim')
        cy.get('#email').type('igor.teste@email.com')
        cy.get('#open-text-area').type(longText, {delay: 0}) 
        cy.contains('button', 'Enviar').click()
        cy.get('.success').should('be.visible')
    });
    it('exibe mensagem de erro ao submeter o formulário com um email com formatação inválida',function ()  {
        cy.get('#firstName').type('Igor')
        cy.get('#lastName').type('Amorim')
        cy.get('#email').type('igor.teste')
        cy.get('#open-text-area').type('Ajuda teste campo como podemos ajudar') 
        cy.contains('button', 'Enviar').click()
        cy.get('.error').should('be.visible')
    });

    it('se um valor não-numérico for digitado, seu valor continuará vazio.',function ()  {
        cy.get('#phone').type('testeteste')
        cy.get('input').should('have.value', '')
    });

    it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário',function () {
        cy.get('#firstName').type('Igor')
        cy.get('#lastName').type('Amorim')
        cy.get('#email').type('igor.teste@teste.com')
        cy.get('#phone-checkbox').click ()
        cy.get('#open-text-area').type('Ajuda teste campo como podemos ajudar') 
        cy.contains('button', 'Enviar').click()

        cy.get('.error').should('be.visible')
    });

    it('preenche e limpa os campos nome, sobrenome, email e telefone',function ()  {
        cy.get('#firstName')
            .type('Igor')
            .should('have.value', 'Igor')
                .clear().should('have.value', '')
        cy.get('#lastName')
            .type('Amorim')
            .should('have.value', 'Amorim')
                .clear().should('have.value', '')
        cy.get('#email')
            .type('igor.teste@teste.com')
            .should('have.value', 'igor.teste@teste.com')
                .clear().should('have.value', '')
        cy.get('#phone-checkbox').click ()
        cy.get('#phone')
            .type('1936984789')
            .should('have.value', '1936984789')
                .clear().should('have.value', '')
        cy.get('#open-text-area')
            .type('Ajuda teste campo como podemos ajudar') 
            .should('have.value', 'Ajuda teste campo como podemos ajudar')
            .clear().should('have.value', '')
    });

    it('exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios',function () {
        cy.contains('button', 'Enviar').click()
        cy.get('.error').should('be.visible')
    });

    it('envia o formulário com sucesso usando um comando customizado',function () {
        cy.fillMandatoryFieldsAndSubmit()
        cy.get('.success').should('be.visible')
    });

    it('seleciona um produto (YouTube) por seu texto',function () {
        cy.get('#product').select('YouTube')
        .should('have.value', 'youtube')
    });

    it('seleciona um produto Mentoria por seu valor value',function () {
        cy.get('#product').select('mentoria')
        .should('have.value', 'mentoria')
    });

    it('seleciona um produto (Blog) por seu índice',function () {
        cy.get('#product').select(1)
        .should('have.value', 'blog')
                
    });

    it('marca o tipo de atendimento "Feedback"',function ()  {
        cy.get('input[type="radio"][value="feedback"]')
        .check()
        .should('have.value', 'feedback')
        
    });

    it.only('marca cada tipo de atendimento',function () {
        cy.get('input[type="radio"]')
            .should('have.length', 3)
            .each(function($radio) {
                cy.wrap($radio).check()
                cy.wrap($radio).should('be.checked')
            })    

        
    });


    
});


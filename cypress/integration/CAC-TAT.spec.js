/// <reference types="Cypress" />

describe('Central de Atendimento ao Cliente TAT', function () {
    beforeEach(function () {
        cy.visit('./src/index.html');
    })
    it('verifica o título da aplicação', function () {
        cy.title().should('be.equal',
            'Central de Atendimento ao Cliente TAT');
    })
    it('preenche os campos obrigatórios e envia o formulário', function () {
        const longText = 'Teste, teste, teste, teste, teste, teste, teste, teste';

        cy.get('#firstName').type('Walmir');
        cy.get('#lastName').type('Filho');
        cy.get('#email').type('walmirfilho@gmail.com')
        cy.get('#open-text-area').type(longText, { delay: 0 });
        cy.contains('button', 'Enviar').click()
        cy.get('.success > strong').should('be.visible')

    })

    it('exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', function () {
        const longText = 'Teste, teste, teste, teste, teste, teste, teste, teste';
        cy.get('#firstName').type('Walmir');
        cy.get('#lastName').type('Filho');
        cy.get('#email').type('walmirfilho@gmail,com')
        cy.get('#open-text-area').type(longText, { delay: 0 });
        cy.contains('button', 'Enviar').click()
        cy.get('.error').should('be.visible')
    })

    it('campo telefone continua vazio quando preenchido com valor não-númerico', function () {
        cy.get('#phone')
            .type('afdapfasldfjk')
            .should('have.value', '');

    })

    it.only('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário',
        function () {
            const longText = 'Teste, teste, teste, teste, teste, teste, teste, teste';
            cy.get('#firstName').type('Walmir');
            cy.get('#lastName').type('Filho');
            cy.get('#email').type('walmirfilho@gmail.com')
            cy.get('#phone-checkbox').check();
            cy.get('#open-text-area').type(longText, { delay: 0 });
            cy.contains('button', 'Enviar').click()
            cy.get('.error').should('be.visible')
        })

    it('preenche e limpa os campos nome, sobrenome, email e telefone', function () {
        cy.get('#firstName')
            .type('Walmir')
            .should('have.value', 'Walmir')
            .clear()
            .should('have.value', '');
        cy.get('#lastName')
            .type('Filho')
            .should('have.value', 'Filho')
            .clear()
            .should('have.value', '');
        cy.get('#email')
            .type('walmirfilho@gmail.com')
            .should('have.value', 'walmirfilho@gmail.com')
            .clear()
            .should('have.value', '');
        cy.get('#open-text-area')
            .type('teste')
            .should('have.value', 'teste')
            .clear()
            .should('have.value', '');
        cy.get('#phone')
            .type('1234567890')
            .should('have.value', '1234567890')
            .clear()
            .should('have.value', '');
    })

    it('exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', function () {
        cy.contains('button', 'Enviar').click()
        cy.get('.error').should('be.visible')
    })

    it('envia o formuário com sucesso usando um comando customizado', function () {
        cy.fillMandatoryFieldsAndSubmit();
        cy.get('.success').should('be.visible')
    })

    it('seleciona um produto (Youtube) por seu texto', function () {
        cy.get('#product')
        .select('YouTube')
        .should('have.value', 'youtube'); //minusculo pois é pelo valor
    })

    it('seleciona um produto (Mentoria) pelo seu valor', function () {
        cy.get('#product')
        .select('mentoria')
        .should('have.value', 'mentoria');
    })

    it('seleciona um produto (Blog) por seu índice', function () {
        cy.get('#product')
        .select(1)
        .should('have.value', 'blog');
    })

    it('marca o tipo de antendimento "Feedback', function () {
        cy.get('[value="feedback"]')
        .check()
        .should('have.value', 'feedback');
    })

    it('marca cada tipo de antendimento', function () {
        cy.get('input[type="radio"]')
        .should('have.length', 3)
        .each(function($radio){
            cy.wrap($radio).check()
            cy.wrap($radio).should('be.checked')
        })
    })

    it('marca ambos checkboxes, depois desmarca o último', function () {
        cy.get('input[type="checkbox"]')
        .check() //como está direcionado para type"Checkbox" ele marca os dois
        .should('be.checked')
        .last() //desmarcando o último
        .uncheck()
        .should('not.be.checked')
        
    })
})
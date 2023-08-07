/// <reference types='Cypress' />

describe('Central de Atendimento ao Cliente TAT', function () {

    beforeEach(() => {
        cy.visit('./src/index.html');
    });

    it('Verifica o título da aplicação', function () {
        cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT');
    })

    it('Preenche os campos obrigatórios e envia o formulário', () => {
        const longText = "Teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste "

        cy.get('#firstName').should('be.visible')
            .type('Bruno')
            .should('have.value', 'Bruno');

        cy.get('#lastName').should('be.visible')
            .type('Faria')
            .should('have.value', 'Faria');

        cy.get('#email').should('be.visible')
            .type('brunoluizb@hotmail.com')
            .should('have.value', 'brunoluizb@hotmail.com');

        cy.get('#open-text-area').should('be.visible')
            .type(longText, { delay: 0 })
            .should('have.value', longText);

        cy.contains('button', 'Enviar').click();

        cy.get('.success').should('be.visible');

    });

    it('Exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', () => {
        const longText = "Teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste "

        cy.get('#firstName').should('be.visible')
            .type('Bruno')
            .should('have.value', 'Bruno');

        cy.get('#lastName').should('be.visible')
            .type('Faria')
            .should('have.value', 'Faria');

        cy.get('#email').should('be.visible')
            .type('brunoluizbhotmail.com')
            .should('have.value', 'brunoluizbhotmail.com');

        cy.get('#open-text-area').should('be.visible')
            .type(longText, { delay: 0 })
            .should('have.value', longText);

        cy.contains('button', 'Enviar').click();

        cy.get('.error').should('be.visible');
    })

    it('Campo telefone continua vazio quando preenchido com valor não-numérico', () => {

        cy.get('#phone').should('be.visible')
            .type('abcdefghij')
            .should('have.value', '');
    })

    it('Exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', () => {
        const longText = "Teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste "

        cy.get('#firstName').should('be.visible')
            .type('Bruno')
            .should('have.value', 'Bruno');

        cy.get('#lastName').should('be.visible')
            .type('Faria')
            .should('have.value', 'Faria');

        cy.get('#email').should('be.visible')
            .type('brunoluizb@hotmail.com')
            .should('have.value', 'brunoluizb@hotmail.com');

        cy.get('#phone')
            .should('have.value', '');

        cy.get('#phone-checkbox').check();

        cy.get('#open-text-area').should('be.visible')
            .type(longText, { delay: 0 })
            .should('have.value', longText);

        cy.contains('button', 'Enviar').click();

        cy.get('.error').should('be.visible');
    })

    it('Preenche e limpa os campos de nome, sobrenome, email e telefone', () => {

        const longText = "Teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste "

        cy.get('#firstName')
            .type('Bruno')
            .should('have.value', 'Bruno')
            .clear()
            .should('have.value', '');

        cy.get('#lastName')
            .type('Faria')
            .should('have.value', 'Faria')
            .clear()
            .should('have.value', '');

        cy.get('#email')
            .type('brunoluizb@hotmail.com')
            .should('have.value', 'brunoluizb@hotmail.com')
            .clear()
            .should('have.text', '');

        cy.get('#phone')
            .type('12345678910')
            .should('have.value', '12345678910')
            .clear()
            .should('have.text', '');
    })

    it('Exibe mensagem de erro ao submeter o formulario sem preencher os campos obrigatorios', () => {
        
        cy.contains('button', 'Enviar').click();

        cy.get('.error').should('be.visible')
    })

    it('Envia um formulario com sucesso usando um comando customizado', () => {

        cy.fillMandatoryFieldsAndSubmit('Bruno', 'Faria', 'Brunoluizb@hotmail.com', 'Teste, teste, teste, teste');

        cy.get('.success').should('be.visible');

    })

    it('Seleciona um produto (Youtube) por seu texto', () => {

        cy.get('#product').select('YouTube').should('have.value', 'youtube');
    })

    it('Seleciona um produto (Mentoria) por seu valor (value)', () => {

        cy.get('#product').select('mentoria').should('have.value', 'mentoria');
    })

    it('Seleciona um produto (Blog) por seu índice', () => {

        cy.get('#product').select(1).should('have.value', 'blog');

    })
})
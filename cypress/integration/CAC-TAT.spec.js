/// <reference types="Cypress" />

describe('Central de Atendimento ao Cliente TAT', function() {
    
    beforeEach(() => {
        cy.visit('./src/index.html');
    })

    it('verifica o título da aplicação', function() {  
        cy.title()
            .should('eq', 'Central de Atendimento ao Cliente TAT');    
    });

    it('Preenche os campos obrigatórios e envia o formulário', () => {
        cy.get('#firstName')
            .type('Rafael');
        cy.get('#lastName')
            .type('Almeida');
        cy.get('#email')
            .type('almeida@mail.com');
        cy.get('#open-text-area')
            .type('Testando marotamente, fazendo um teste com uma linha maior', {delay: 1});
        cy.contains('button', 'Enviar')
            .click();
        cy.get('.success > strong')
            .should('be.visible');
    });
    
    it('exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', () => {
        cy.get('#firstName')
            .type('Rafael');
        cy.get('#lastName')
            .type('Almeida');
        cy.get('#email')
            .type('almeidamail.com');
        cy.get('#open-text-area')
            .type('Testando marotamente, fazendo um teste com uma linha maior');
        cy.contains('button', 'Enviar')
            .click();
        cy.get('.error > strong')
            .should('be.visible');
    });

    it('Verificar se o campo de telefone aceita valor não-numérico', () => {
        cy.get('#phone')
            .type('uahushauihsa')
            .should('have.text', '');
    });

    it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', () => {
        cy.get('#firstName')
            .type('Rafael');
        cy.get('#lastName')
            .type('Almeida');
        cy.get('#email')
            .type('almeida@mail.com');
        cy.contains('button', 'Enviar')
            .click();
        cy.get('#open-text-area')
            .type('Teste');
        cy.get('#phone-checkbox')
            .check();
        cy.get('.error > strong')
            .should('be.visible');
        cy.get('.phone-label-span')
            .should('be.visible');        
    });

    it('preenche e limpa os campos nome, sobrenome, email e telefone', () => {
        cy.get('#firstName')
            .type('Rafael')
            .should('have.value', 'Rafael')
            .clear()
            .should('have.value', '');
        cy.get('#lastName')
            .type('Almeida')
            .should('have.value', 'Almeida')
            .clear()
            .should('have.value', '');
        cy.get('#email')
            .type('almeida@mail.com')
            .should('have.value', 'almeida@mail.com')
            .clear()
            .should('have.value', '');
        cy.get('#phone')
            .type('62356732672')
            .should('have.value', '62356732672')
            .clear()
            .should('have.value', '');
    });

    it('exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', () => {
        cy.contains('button', 'Enviar')
            .click();
        cy.get('.error > strong')
            .should('be.visible');
    });

    it('envia o formulário com sucesso usando um comando customizado', () => {
        cy.enviaCamposObrigatorios('Rafael', 'Almeida', 'almeida@mail.com', 'teste');
        cy.get('.success > strong')
            .should('be.visible');
    });

    it('seleciona um produto (YouTube) por seu texto', () => {
        cy.get('#product')
            .select('YouTube')
            .should('be.visible', 'YouTube');
    });

    it('seleciona um produto (Mentoria) por seu valor (value)', () => {
        cy.get('#product')
            .select('mentoria')
            .should('have.value', 'mentoria');
    });

    it('seleciona um produto (Blog) por seu índice', () => {
        cy.get('#product')
            .select(1)
            .should('have.value', 'blog');
    });

})
  


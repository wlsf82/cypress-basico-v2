/// <reference types="Cypress" />

describe('Central de Atendimento ao Cliente TAT', function() {
    const tempoMensagem = 3000;
    const textoLongo = Cypress._.repeat('Teste Teste', 20);
    beforeEach(() => {
        cy.visit('./src/index.html');
    })

    it('verifica o título da aplicação', () => {  
        cy.title()
            .should('eq', 'Central de Atendimento ao Cliente TAT');    
    });

    Cypress._.times(2, () => {
        it('Preenche os campos obrigatórios e envia o formulário', () => {
            cy.clock();
            cy.get('#firstName')
                .type('Rafael');
            cy.get('#lastName')
                .type('Almeida');
            cy.get('#email')
                .type('almeida@mail.com');
            cy.get('#open-text-area')
                .type(textoLongo, {delay: 0});
            cy.contains('button', 'Enviar')
                .click();
            cy.get('.success > strong')
                .should('be.visible');
            cy.tick(tempoMensagem)
            cy.get('.success > strong')
                .should('not.be.visible')
        });
    })

    
    it('exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', () => {
        cy.clock();
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
        cy.tick(tempoMensagem)
        cy.get('.error > strong')
            .should('not.be.visible');
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
        cy.clock();
        cy.contains('button', 'Enviar')
            .click();
        cy.get('.error > strong')
            .should('be.visible');
        cy.tick(tempoMensagem);
        cy.get('.error > strong')
        .should('not.be.visible');
    });

    it('envia o formulário com sucesso usando um comando customizado', () => {
        cy.clock();
        cy.enviaCamposObrigatorios('Rafael', 'Almeida', 'almeida@mail.com', 'teste');
        cy.get('.success > strong')
            .should('be.visible');
        cy.tick(tempoMensagem);
        cy.get('.success > strong')
        .should('not.be.visible');
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

    it('marca o tipo de atendimento "Feedback"', () => {
        cy.get('input[type="radio"][value="feedback"]')
            .check('feedback')
            .should('be.checked', 'feedback');
    });

    it('marca cada tipo de atendimento', () => {
        cy.get('input[type="radio"]')
            .should('have.length', 3)
            .each(function($radio) {
                cy.wrap($radio).check()
                cy.wrap($radio).should('be.checked')
        }) 
    });

    it('marca ambos checkboxes, depois desmarca o último', () => {
        cy.get('input[type="checkbox"]')
            .should('have.length', 2)
            .check()
            .last()
            .uncheck()
            .should('not.be.checked', 'phone')
    });

    it('seleciona um arquivo da pasta fixtures', () => {
      cy.get('input[type="file"]#file-upload')
        .should('not.have.value')
        .selectFile('cypress/fixtures/example.json')
        .then(arq => {
          expect(arq[0].files[0].name).to.equal('example.json')
        })
    });

    it('seleciona um arquivo simulando um drag-and-drop', () => {
      cy.get('input[type="file"]#file-upload')
        .should('not.have.value')
        .selectFile('cypress/fixtures/example.json', { action: 'drag-drop' })
        .then(arq => {
          expect(arq[0].files[0].name).to.equal('example.json')
        })
    });

    it('seleciona um arquivo utilizando uma fixture para a qual foi dada um alias', () => {
      cy.fixture('example.json').as('exemploTeste')
      cy.get('#file-upload')
        .should('not.have.value')
        .selectFile('@exemploTeste')
        .should(function(arquivo) {
          expect(arquivo[0].files[0].name).to.be.equal('example.json')
        })
    });

    it('verifica que a política de privacidade abre em outra aba sem a necessidade de um clique', () => {
        cy.get('a[href="privacy.html"]')
            .should('have.attr', 'target', '_blank')
    });

    it('verificar h1 da página de política de privacidade', () => {
        cy.get('a[href="privacy.html"]')
            .invoke('removeAttr', 'target')
            .click()
        cy.get('h1#title')
            .should('be.visible', 'CAC TAT - Política de privacidade')
    });

    it('verufica o último paragrafo do corpo da mensagem', () => {
        cy.get('a[href="privacy.html"]')
            .invoke('removeAttr', 'target')
            .click()
        cy.contains('Talking About Testing')
            .should('be.visible')
    });

    it('exibe e esconde as mensagens de sucesso e erro usando o .invoke()', () => {
        cy.get('.success')
            .should('not.be.visible')
            .invoke('show')
            .should('be.visible')
            .and('contain', 'Mensagem enviada com sucesso')
            .invoke('hide')
            .should('not.be.visible')
        cy.get('.error')
            .should('not.be.visible')
            .invoke('show')
            .should('be.visible')
            .and('contain', 'Valide os campos obrigatórios!')
            .invoke('hide')
            .should('not.be.visible')
    });

    it('preenche a area de texto usando o comando invoke', () => {
        cy.get('#open-text-area')
            .invoke('val', textoLongo)
            .should('have.value', textoLongo);
    });
        
})
  


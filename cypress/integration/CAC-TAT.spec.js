/// <reference types="Cypress" />


describe('Central de Atendimento ao Cliente TAT', function() {
    
    beforeEach(function(){
        cy.visit('./src/index.html');
    }); 
    
    it('Verifica o título da aplicação', function() {
        cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT')
    }) 

    it('Preenche os campos obrigatórios e envia o formulário', function(){
        cy.get('#firstName').type('Leonardo');
        cy.get('#lastName').type('Gutierrez');
        cy.get('#email').type('gutierrez.medeiros12@gmail.com');
        cy.get('#open-text-area').type('Me ajude comprando um saco de pão', {delay:0});
        cy.contains('button', 'Enviar').click();
        cy.get('.success').should('be.visible', 'Mensagem enviada com sucesso.');
    })

    it('Exibe mensagem de erro ao submeter o formulário com um email com formatação inválida extra 2', function(){
        cy.get('#firstName').type('Leonardo');
        cy.get('#lastName').type('Gutierrez');
        cy.get('#email').type('gutierrez.medeiros12gmail.com');
        cy.get('#open-text-area').type('Me ajude comprando um saco de pão', {delay:0});
        cy.contains('button', 'Enviar').click();
        cy.get('.error').should('be.visible', 'Valide os campos obrigatórios!');
    })

    it('validação número extra 3', function(){
        cy.get('#phone').type('abc').should('have.value', '')
    })

    it('Exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário extra 4', function(){
        cy.get('#phone-checkbox').check();
        cy.contains('button', 'Enviar').click();
        cy.get('.error').should('be.visible', 'Valide os campos obrigatórios!');
    })

    it('Preenche e limpa os campos nome, sobrenome, email e telefone extra 5', function(){
        cy.get('#firstName').type('Leonardo').should('have.value', 'Leonardo').clear().should('have.value', '');
        cy.get('#lastName').type('Gutierrez').should('have.value', 'Gutierrez').clear().should('have.value', '');
        cy.get('#email').type('gutierrez.medeiros12@gmail.com').should('have.value', 'gutierrez.medeiros12@gmail.com').clear().should('have.value', '');
        cy.get('#phone').type('65992533246').should('have.value', '65992533246').clear().should('have.value', '');
    })

    it('Exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios extra 6', function(){
        cy.contains('button', 'Enviar').click();
        cy.get('.error').should('be.visible', 'Valide os campos obrigatórios!');
    })

    it('Envia o formulário com uscesso usando um comando customizado extra 7', function(){
        cy.fillMandatoryFieldsAndSubmit();

        cy.get('.success').should('be.visible');
    })

    it('Seleciona um produto (Youtube) por seu texto', function(){
        cy.get('#product').select('YouTube').should('have.value', 'youtube');
    })

    it('Seleciona um produto (Mentoria) por seu valor (value)', function(){
        cy.get('#product').select('mentoria').should('have.value', 'mentoria');
    })

    it('Seleciona um produto (Blog) por seu índice', function(){
        cy.get('#product')
        .should('be.visible')
        .select(1)
        .should('have.value', 'blog');
    })

    it('Marca o tipo de atendimento "Feedback"', function(){
        cy.get('input[value="feedback"]')
        .should('be.visible')
        .check()
        .should('have.value', 'feedback')
    })

    it('Marca cada tipo de atendimento', function(){
        cy.get('input[value="ajuda"]').check().should('be.checked')
        cy.get('input[value="elogio"]').check().should('be.checked')
        cy.get('input[value="feedback"]').check().should('be.checked')
    })

    it('Marca ambos checkboxes, depois desmarca o último', function(){
        cy.get('input[type="checkbox"]')
            .check()
            .should('be.checked')
            .last()
            .uncheck()
            .should('not.be.checked')
    })

    it('Seleciona um arquivo da pasta fixtures', function(){
        cy.get('#file-upload')
            .selectFile('cypress/fixtures/example.json')  
    })

    it('Verifica que a política de privacidade abre em outra aba sem a necessidade de um clique', function(){
        cy.contains('a', 'Política de Privacidade').should('have.attr', 'target', '_blank')
    })

    it('acessa a página da política de privacidade removendo o target e então clicando no link', function(){
        cy.contains('a', 'Política de Privacidade').invoke('removeAttr', 'target').click();
        cy.contains('p', 'Não salvamos dados submetidos no formulário da aplicação CAC TAT.').should('be.visible')
    })

    it('Testando viewport', function(){
        
    })
})
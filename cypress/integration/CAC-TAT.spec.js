/// <reference types="Cypress" />

describe ('Central de Atendimento ao Cliente TAT', function() {
    beforeEach(function(){
        cy.visit ('./src/index.html')
    })

    it ('verifica o título da aplicação', function() {
        cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT')    
    })

    it('preenche os campos obrigatórios e envia o formulário', function() {
        const longText = 'Teste, teste,teste,teste,teste,teste,teste,teste,teste,teste,teste,teste,teste,teste,teste,teste,'
        cy.get('#firstName').type('Igor', {delay:0})
        cy.get('#lastName').type('Lima', {delay:0})
        cy.get('#email').type('igorlimamp1@gmail.com'), {delay:0}
        cy.get('#open-text-area').type(longText, {delay:0})
        cy.contains('button', 'Enviar').click()
        cy.get('.success').should('be.visible')

    })

    it('Exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', function(){
        cy.get('#firstName').type('João Silva')
        cy.get('#lastName').type('Souza Augusto')
        cy.get('#email').type('1111111')
        cy.get('#open-text-area').type('Teste')
        cy.contains('button', 'Enviar').click()
        cy.get('.error').should('be.visible')

    })
    
    it('Validar que campo telefone, está vazio', function(){
            cy
            .get('#phone')
            .type('Só pode aceitar número, no campo telefone')
            .should('have.value', '')

    })

    it('Exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', function(){
        cy.get('#firstName').type('João')
        cy.get('#lastName').type('Souza')
        cy.get('#email').type('igorlimamp@gmail.com')
        cy.get('#phone-checkbox').click()
        cy.get('#open-text-area').type('Teste')
        cy.contains('button', 'Enviar').click()
        cy.get('.error').should('be.visible')
        cy.get('#phone').type('111965443322')
        cy.contains('button', 'Enviar').click()
    })

    it('Preenche e limpa os campos nome, sobrenome, email e telefone', function(){
        cy.get('#firstName')
        .type('Igor')
        .should('have.value', 'Igor')
        .clear()
        .should('have.value', '')

        cy.get('#lastName')
        .type('Lima')
        .should('have.value', 'Lima')
        .clear()
        .should('have.value', '')

        cy.get('#email')
        .type('igorlima1@gmail.com')
        .should('have.value', 'igorlima1@gmail.com')
        .clear()
        .should('have.value', '')

        cy.get('#phone')
        .type('11965118877')
        .should('have.value', '11965118877')
        .clear()
        .should('have.value', '')

    })

    it('Exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', function(){
        cy.contains('button', 'Enviar').click()
        cy.get('.error').should('be.visible')
    })

    it('Envia o formulário com sucesso usando um comando customizado', function(){
        cy.filMandatoryFieldsAndSubmit()
        cy.get('.success').should('be.visible')
    })

    it('Seleciona um produto (Youtube) por seu texto', function(){
        cy.get('#product')
        .select('YouTube')
        .should('have.value', 'youtube')

    })

    it('Seleciona um produto (Mentoria) por seu valor', function(){
        cy.get('#product')
        .select('mentoria')

    })    

    it('Seleciona um produto (Blog) por seu índice', function(){
        cy.get('#product')
        .select(1)
        .should('have.value', 'blog')

    })       

    it('Marca o tipo de atendimento Feedback', function(){
        cy.get('input[type="radio"][value="feedback"]')
        .check()
        .should('have.value', 'feedback')

    })  

    it('Marca cada tipo de atendimento', function(){
        cy.get('input[type="radio"][value="elogio"]')
        .check()
        .should('be.checked')
    })


    it('Marca cada tipo de atendimento', function(){
        cy.get('input[type="radio"][value="feedback"]')
        .check()
        .should('be.checked')
    })


    it('Marca cada tipo de atendimento', function(){
        cy.get('input[type="radio"]')
        .should('have.length', 3)
        .each(function($radio) {
            cy.wrap($radio).check()
            cy.wrap($radio).should('be.checked')
            
        })
    })    

    it('Marca ambos checkboxes, depois desmarca o último', function(){
        cy.get('input[type="checkbox"]')
        .check()
        .should('be.checked')
        .last()
        .uncheck()
        .should('not.be.checked')
        
    })

    it('Exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', function(){
        cy.get('#firstName').type('João')
        cy.get('#lastName').type('Souza')
        cy.get('#email').type('igorlimamp@gmail.com')
        cy.get('#phone-checkbox').check()

    })

    it('Selecione um arquivo da pasta fixtures', function(){
        cy.get('input[type="file"]')
        .selectFile('cypress/fixtures/Documento PDF 2.pdf')
        .should(function($input) {
        expect($input[0].files[0].name).to.equal('Documento PDF 2.pdf')   
         //console.log($input)
         // Para dúvidas, ver aula 29

        })
    })

    it('Seleciona um arquivo simulando um drag-and-drop (arrastando)', function(){
        cy.get('input[type="file"]')
        .selectFile('cypress/fixtures/Documento PDF 2.pdf', {action:'drag-drop'})
        .should(function($input) {
        expect($input[0].files[0].name).to.equal('Documento PDF 2.pdf')   
   
        })   
    })


    it('Seleciona um arquivo utilizando uma fixture para o qual foi dada um alias', function(){
        cy.fixture('Documento PDF 2.pdf').as('sampleFile')
        cy.get('input[type="file"]')
        .selectFile('@sampleFile')
        .should(function($input) {
        expect($input[0].files[0].name).to.equal('Documento PDF 2.pdf')   
      
        }) 
    })

    it('Verifica que a política de privacidade abre em outra aba sem a necessidade de um clique', function(){
        cy.get('#privacy a').should('have.attr', 'target', '_blank')
    })

    it('Acessa a página da politica de privacidade removendo o target e então clicando no link', function(){
        cy.get('#privacy a')
        .invoke('removeAttr', 'target')
        .click()
        cy.contains('Talking About Testing')
        .should('be.visible')

    })

    Cypress._.times(3, function(){
        it('Executar o mesmo  teste, varias vezes', function(){
        cy.get('#firstName').type('Igor')

        })
  
    })

    it('Parar / Adiantar tempo do teste', function() {
        cy.clock()
        const longText = 'Teste, teste,teste,teste,teste,teste,teste,teste,teste,teste,teste,teste,teste,teste,teste,teste,'
        cy.get('#firstName').type('Igor')
        cy.get('#lastName').type('Lima')
        cy.get('#email').type('igorlimamp1@gmail.com')
        cy.get('#open-text-area').type(longText)
        cy.contains('button', 'Enviar').click()
        cy.get('.success').should('be.visible')
        cy.tick(3000)
        cy.get('.success').should('not.be.visible')

    })

    it('Exibe e esconde as mensagens de sucesso e erro usando .invoke', function() {
        cy.get('#firstName').type('Igor')
        cy.get('#lastName').type('Lima')
        cy.get('#email').type('igorlimamp1@gmail.com')
        cy.contains('button', 'Enviar').click()
        .should('be.visible')
        cy.get('.error').invoke('hide')
        .should('not.be.visible')
        cy.get('.error').invoke('show')
        .should('be.visible').and('contain', 'Valide os campos obrigatórios')

        cy.get('#open-text-area').type('Teste')
        cy.contains('button', 'Enviar').click()
        cy.get('.success').invoke('hide')
        .should('not.be.visible')


    })

    it.only('Preenche a area de texto usando o comando invoke', function(){
        const varia = 'hahahaahahaahahahaahhhaahhahaahahhaahha'
        cy.get('#firstName').type('Igor')
        cy.get('#lastName').type('Lima')
        cy.get('#email').type('igorlimamp1@gmail.com')
        cy.get('#open-text-area').invoke('val', varia)
    })

})

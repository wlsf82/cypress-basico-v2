/// <reference types="Cypress" />

describe('Central de Atendimento ao Cliente TAT', function() {
   beforeEach(function(){
    cy.visit('./src/index.html')
   })
    it('verifica o título da aplicação', function() {
        cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT')
    })
    it('preenche os campos e envia o formulário', function() {
        const longText = 'primeiro teste da ana, Gostaria de enfatizar que o novo modelo estrutural aqui preconizado pode nos levar a considerar a reestruturação das posturas dos órgãos dirigentes com relação às suas atribuições, Caros amigos, a revolução dos costumes promove a alavancagem dos modos de operação convencionais. '
        cy.clock()
        cy.get('#firstName').type('Ana Maria')
        cy.get('#lastName').type('Teste da Silva Sauro')
        cy.get('#email').type('testezinhos@gmail.com')
        cy.get('#phone').type('44998219935')
        cy.get('#support-type > :nth-child(3)').click()
        cy.get('#phone-checkbox').click()
        cy.get('input#phone'). should('have.value', '44998219935')
        cy.get('#open-text-area').type(longText, {delay:0})
        cy.contains('button', 'Enviar').click()
        cy.get('.success').should('be.visible')
        cy.tick(3000)

        cy.get('.success').should('not.be.visible')
    })
    
    it('exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', function(){
        cy.clock()
        cy.get('#firstName').type('Ana Maria')
        cy.get('#lastName').type('Teste da Silva Sauro')
        cy.get('#email').type('testeana@gmail')
        cy.get('#open-text-area').type('testesss', {delay:0})
        cy.contains('button', 'Enviar').click()
        cy.get('.error').should('be.visible')
        cy.tick(3000)

        cy.get('.error').should('not.be.visible')
    })

    it('não deixa letras no campo de telefone', function(){
        cy.get('#phone')
        .type('asdfasgaerbhytewrwh')
        .should('have.value','')
    })

    it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', function(){
        cy.clock()
        cy.get('#firstName').type('Ana Maria')
        cy.get('#lastName').type('Teste da Silva Sauro')
        cy.get('#email').type('testezinhos@gmail.com')
        cy.get('#phone-checkbox').check()
        cy.get('#open-text-area').type('testesss', {delay:0})
        cy.contains('button', 'Enviar').click()
        cy.get('.error').should('be.visible')  
        cy.tick(3000)

        cy.get('.error').should('not.be.visible')
    })

    it('preenche e limpa os campos nome, sobrenome email e telefone', function(){
        cy.get('#firstName').type('Ana Maria').should('have.value', 'Ana Maria').clear().should('have.value','')
        cy.get('#lastName').type('Teste da Silva Sauro').should('have.value', 'Teste da Silva Sauro').clear().should('have.value','')
        cy.get('#email').type('testezinhos@gmail.com').should('have.value', 'testezinhos@gmail.com').clear().should('have.value','')
        cy.get('#phone').type('44998219935').should('have.value', '44998219935').clear().should('have.value','')
    })

    it('exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', function(){
        cy.clock()
        cy.contains('button', 'Enviar').click()
        cy.get('.error').should('be.visible')
        cy.tick(3000)
        cy.get('.error').should('not.be.visible')
    })

    it('envia o formuário com sucesso usando um comando customizado', function(){
        cy.clock()
        cy.preenchecamposobrigatoriosenvia()
        cy.get('.success').should('be.visible')
        cy.tick(3000)
        cy.get('.success').should('not.be.visible')
    })

    it('seleciona um produto - YouTube - por seu texto', function(){
        cy.get('#product')
        .select('YouTube')
        .should('have.value', 'youtube')
    })

    it('seleciona um produto - Mentoria- por seu valor value', function(){
        cy.get('select').select('mentoria').should('have.value', 'mentoria')
    })

    it('seleciona um produto - Blog - por seu indice', function(){
        cy.get('#product').select(1)
        .should('have.value', 'blog')
    })

    it('marca o tipo de atendimento Feedback', function(){
        cy.get('input[type="radio"][value="feedback"]')
        .check()
        .should('have.value','feedback')
    })

    it('marca cada tipo de atendimento', function(){
        cy.get('input[type="radio"]')
          .should('have.length', 3)
          .each(function($radio){
            cy.wrap($radio).check()
            cy.wrap($radio).should('be.checked')
          })
    })

    it('marca ambos checkboxes, depois desmarca o último', function(){
        cy.get('input[type="checkbox"]')
        .should('have.length', 2)
        .each(function($checkbox){
            cy.wrap($checkbox).check()
            cy.wrap($checkbox).should('be.checked')
            .last()
            .uncheck()
            .should('be.not.checked')
        })
    })

    it('seleciona um arquivo da pasta fixtures', function(){
        cy.get('input[type="file"]#file-upload')
        .should('not.have.value')
        .selectFile('./cypress/fixtures/example.json')
        .should(function($input) {
            expect($input[0].files[0].name).to.be.equal('example.json')

        })
    })

    it('seleciona um arquivo simulando drag-and-drop', function(){
        cy.get('input[type="file"]#file-upload')
        .should('not.have.value')
        .selectFile('./cypress/fixtures/example.json', { action: 'drag-drop'})
        .should(function($input) {
            expect($input[0].files[0].name).to.be.equal('example.json')
        })

    })
    it('verifica que a política de privacidade abre em outra aba sem a necessidade de um clique', function(){
        cy.get('#privacy a').should('have.attr', 'target', '_blank')
    })

    it('acessa a página da política de privacidade removendo o target e então clicando no link', function(){
        cy.get('#privacy a')
        .invoke('removeAttr', 'target')
        .click()
    })

    it('exibe mensagem por 3 segundos', function(){
        const longText = 'primeiro teste da ana, Gostaria de enfatizar que o novo modelo estrutural aqui preconizado pode nos levar a considerar a reestruturação das posturas dos órgãos dirigentes com relação às suas atribuições, Caros amigos, a revolução dos costumes promove a alavancagem dos modos de operação convencionais. '
        cy.clock()
        cy.get('#firstName').type('Ana Maria')
        cy.get('#lastName').type('Teste da Silva Sauro')
        cy.get('#email').type('testezinhos@gmail.com')
        cy.get('#phone').type('44998219935')
        cy.get('#support-type > :nth-child(3)').click()
        cy.get('#phone-checkbox').click()
        cy.get('input#phone'). should('have.value', '44998219935')
        cy.get('#open-text-area').type(longText, {delay:0})
        cy.contains('button', 'Enviar').click()

        cy.get('.success').should('be.visible')

        cy.tick(3000)

        cy.get('.success').should('not.be.visible')
       
    })
    


})

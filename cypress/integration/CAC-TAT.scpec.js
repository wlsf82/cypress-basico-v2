


describe('Central de Atendimento ao Cliente TAT', function() {
    
    
    beforeEach(function() {
        cy.visit('./src/index.html')
    })

    it('verifica o titulo da aplicação', function(){
        cy.title().should('eq', 'Central de Atendimento ao Cliente TAT')
    })

    it('preenche os campos obrigatórios e envia o formulário', function() {
        // criar variaveis
        const comentario = 'Texto, Texto, Texto, Texto, Texto, Texto, Texto, Texto, Texto, Texto, Texto, Texto, Texto, Texto, Texto,'

        cy.get('#firstName').should('be.visible').type('João', {delay:0}).should('have.value', 'João')
        cy.get('#lastName').should('be.visible').type('Victor')
        cy.get('#email').should('be.visible').type('jv@teste.com')
        // cy.get('input[id="phone"]').should('be.visible').type('85988998899')
       
        cy.get('textarea[id="open-text-area"]').click().should('be.visible').type(comentario, {delay:0})

        cy.get('button[type="submit"]').click()
        // cy.get('.button').click()

        cy.get('.success').should('be.visible')
    })

    it('exibe mensagem de erro quando campo invalido', function() {
        // criar variaveis
        const comentario = 'Texto, Texto, Texto, Texto, Texto, Texto, Texto, Texto, Texto, Texto, Texto, Texto, Texto, Texto, Texto,'

        cy.get('#firstName').should('be.visible').type('João', {delay:0}).should('have.value', 'João').clear()
        cy.get('#lastName').should('be.visible').type('Victor')
        cy.get('#email').should('be.visible').type('jvteste.com')
        // cy.get('input[id="phone"]').should('be.visible').type('85988998899')
       
        cy.get('textarea[id="open-text-area"]').click().should('be.visible').type(comentario, {delay:0})

        cy.get('button[type="submit"]').click()
        // cy.get('.button').click()

        cy.get('.error').should('be.visible')
    })

    it('campo telefone preenchido valor nao numerico', function(){
        cy.get('#phone')
            .type('hsjkdskdgshjdg')
            .should('have.value', '')
    })


    it('exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', function(){
        cy.get('.button').click()

        cy.get('.error').should('be.visible')
        // cy.get('.error > strong').should('have.value', 'Valide os campos obrigatórios!')        
    })

    // teste usando o commands.js, criando uma function para facilitar o uso do metodo
    it('teste preencher formulario funcao especial', function() {
        cy.preencherFormsCompleto('joao', 'victor', 'jv@teste.com', 'texto')
    })
    
})

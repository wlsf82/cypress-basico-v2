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
        cy.get('#firstName').type('Ana Maria')
        cy.get('#lastName').type('Teste da Silva Sauro')
        cy.get('#email').type('testezinhos@gmail.com')
        cy.get('#phone').type('44998219935')
        cy.get('#support-type > :nth-child(3)').click()
        cy.get('#phone-checkbox').click()
        cy.get('input#phone'). should('have.value', '44998219935')
        cy.get('#open-text-area').type(longText, {delay:0})
        cy.get('button[type="submit"]').click()
        cy.get('.success').should('be.visible')

    })
    
    it('exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', function(){
        cy.get('#email').type('testeana@gmail')
        cy.get('button[type="submit"]').click()
        cy.get('.error').should('be.visible')
    })

    it.only('não deixa letras no campo de telefone', function(){
        cy.get('#phone')
        .type('asdfasgaerbhytewrwh')
        .should('have.value','')
    })
})

/// <reference types="Cypress" />

describe('Central de Atendimento ao Cliente TAT', function () {
    beforeEach(function(){
        // antes de cada teste, roda esta funcao
        cy.visit('./src/index.html')
    })

    it('verifica o título da aplicação', function () {
        cy.title()
        .should('be.equal', 'Central de Atendimento ao Cliente TAT')
    })

    it('preenche os campos obrigatórios e envia o formulário', function () {
           //cy.get('input[type="text"]').should('be.visible').type('Olá mundo!').should('have.value', 'Olá mundo!')
           cy.get('#firstName').should('be.visible').type('Patricia').should('have.value', 'Patricia')
           cy.get('#lastName').should('be.visible').type('Possari').should('have.value', 'Possari')
           cy.get('#email').should('be.visible').type('patricia.possari@teste.com').should('have.value', 'patricia.possari@teste.com')
           cy.get('#open-text-area').should('be.visible').type('Teste de envio').should('have.value', 'Teste de envio')
           cy.get('button[type="submit"]').click()
           cy.get('.success').should('be.visible')
    })


    it('preenche os campos obrigatórios e envia o formulário - EXTRA1 - Texto Longo - delay', function () {
        cy.get('#firstName').should('be.visible').type('Patricia').should('have.value', 'Patricia')
        cy.get('#lastName').should('be.visible').type('Possari').should('have.value', 'Possari')
        cy.get('#email').should('be.visible').type('patricia.possari@teste.com').should('have.value', 'patricia.possari@teste.com')
        cy.get('#open-text-area').should('be.visible').type('Mussum Ipsum, cacilds vidis litro abertis. Copo furadis é disculpa de bebadis, arcu quam euismod magna.Quem manda na minha terra sou euzis!Suco de cevadiss deixa as pessoas mais interessantis.Posuere libero varius. Nullam a nisl ut ante blandit hendrerit. Aenean sit amet nisi.', { delay: 0 }).should('have.value', 'Mussum Ipsum, cacilds vidis litro abertis. Copo furadis é disculpa de bebadis, arcu quam euismod magna.Quem manda na minha terra sou euzis!Suco de cevadiss deixa as pessoas mais interessantis.Posuere libero varius. Nullam a nisl ut ante blandit hendrerit. Aenean sit amet nisi.')
        cy.get('button[type="submit"]').click()
        cy.get('.success').should('be.visible')
 })

 it('exibe mensagem de erro ao submeter o formulário com um email com formatação inválida- EXTRA2 - Formatação email incorreta', function () {
    cy.get('#firstName').should('be.visible').type('Patricia').should('have.value', 'Patricia')
    cy.get('#lastName').should('be.visible').type('Possari').should('have.value', 'Possari')
    cy.get('#email').should('be.visible').type('patricia.possari_teste.com').should('have.value', 'patricia.possari_teste.com')
    cy.get('#open-text-area').should('be.visible').type('Mussum Ipsum, cacilds vidis litro abertis. Copo furadis é disculpa de bebadis, arcu quam euismod magna.Quem manda na minha terra sou euzis!Suco de cevadiss deixa as pessoas mais interessantis.Posuere libero varius. Nullam a nisl ut ante blandit hendrerit. Aenean sit amet nisi.', { delay: 0 }).should('have.value', 'Mussum Ipsum, cacilds vidis litro abertis. Copo furadis é disculpa de bebadis, arcu quam euismod magna.Quem manda na minha terra sou euzis!Suco de cevadiss deixa as pessoas mais interessantis.Posuere libero varius. Nullam a nisl ut ante blandit hendrerit. Aenean sit amet nisi.')
    cy.get('button[type="submit"]').click()
    cy.get('.error').should('be.visible')
})

it.only('campo de telefone, validar que, se um valor não-numérico for digitado, seu valor continuará vazio- EXTRA3', function () {
    cy.get('#firstName').should('be.visible').type('Patricia').should('have.value', 'Patricia')
    cy.get('#lastName').should('be.visible').type('Possari').should('have.value', 'Possari')
    cy.get('#email').should('be.visible').type('patricia.possari_teste.com').should('have.value', 'patricia.possari_teste.com')
    cy.get('#phone').should('be.visible').type('Possari').should('have.value', '')
    cy.get('#open-text-area').should('be.visible').type('Mussum Ipsum, cacilds vidis litro abertis. Copo furadis é disculpa de bebadis, arcu quam euismod magna.Quem manda na minha terra sou euzis!Suco de cevadiss deixa as pessoas mais interessantis.Posuere libero varius. Nullam a nisl ut ante blandit hendrerit. Aenean sit amet nisi.', { delay: 0 }).should('have.value', 'Mussum Ipsum, cacilds vidis litro abertis. Copo furadis é disculpa de bebadis, arcu quam euismod magna.Quem manda na minha terra sou euzis!Suco de cevadiss deixa as pessoas mais interessantis.Posuere libero varius. Nullam a nisl ut ante blandit hendrerit. Aenean sit amet nisi.')
    cy.get('button[type="submit"]').click()
    cy.get('.error').should('be.visible')
})
   
})

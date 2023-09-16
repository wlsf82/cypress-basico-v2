// <reference types="Cypress" />

describe('Central de Atendimento ao Cliente TAT', function() {
  beforeEach(function(){ //bloco de pre condição para reapoveitar os códigos
    cy.visit('./src/index.html')
  })

  it('verificax o título da aplicação', function() {
    cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT');
  })


/*  it('preenche os campos obrigatórios e envia o formulário', function(){
    const longtext ='testando um longoLorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged';
    cy.get('#firstName').type('Tks')
    cy.get('#lastName').type('exemplo super')    
    cy.get('#email').type('Tks@exemplo.super.br')
    cy.get('#open-text-area').type(longtext, {delay:0})  
    cy.get('button[type="submit"]').click()

    cy.get('.success').should('be.visible')
  
  })
*/

.it('exibe mensagem de erro ao submeter o formulario com um eail com formatação ',function(){ 
const longtext ='testando um longoLorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged'
cy.get('#firstName').type('Tks')
cy.get('#lastName').type('exemplo super')    
cy.get('#email').type('Tks@exemplo,super.br')
cy.get('#open-text-area').type('test')  
cy.get('button[type="submit"]').click()

cy.get('.error').should('be.visible')})
 
})



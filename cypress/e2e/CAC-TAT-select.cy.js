/// <reference types="Cypress" />

describe('Central de Atendimento ao Cliente TAT', function() {
    
    beforeEach(() => {
        cy.visit("./src/index.html") 
      })
      
    it('verifica o título da aplicação', function() {
        
        cy.title().should('eq', 'Central de Atendimento ao Cliente TAT')
        
    })
    it("validar select combo produto por text value YouTube", function (){
        cy.get('select').select('YouTube').should('have.value', 'youtube')
        
    })
    
    it("validar select combo pelo index Cursos", function (){
        cy.get('select').select(2).should('have.value', 'cursos')
       

    })

    it("validar select combo Mentoria pelas opcoes da tela e valide o seu value", function (){
        
        cy.get('select').select('Mentoria').should('have.value', 'mentoria')
       

    })

    

    //Validar quando quiser selecionar mais de um valor em combos multivalor
    
//     it.only("validar select combo pelos seus indices Cursos e Mentoria", function (){
//         cy.get('select')
//   .select([1,2])
//   .invoke('val')
//   .should('deep.equal', ['cursos', 'Webdesign'])
       

    // })

})
    
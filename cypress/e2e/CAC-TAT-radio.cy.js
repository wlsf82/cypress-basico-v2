/// <reference types="Cypress" />

describe('Central de Atendimento ao Cliente TAT', function() {
    
    beforeEach(() => {
        cy.visit("./src/index.html") 
      })

      
      it('valida selecao radio elogio', function() {
          
        cy.get('input[value*="elogio"]').check().should('have.value', 'elogio')
          
        })

        it(' marca ambos checkboxes e desmarca', function() {

      cy.get('input[type*="radio"]')
            .each(($radio) => {
                
            return $radio
      })
      .then(($radio) => {
        cy.wrap($radio).check()
        cy.wrap($radio).should('be.checked')
        expect($radio).to.have.length(3) // true
        
      })
    })

    it('marca ambos checkboxes e depois desmarca o último', function() {
          
      cy.get("input[type='checkbox']").check()
      .last()
      .uncheck()
      .should('not.be.checked')
        //testes guit
      })
    

})
    
    
   
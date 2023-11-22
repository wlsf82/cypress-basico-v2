/// <reference types="Cypress" />

describe('Central de Atendimento ao Cliente TAT', function() {
    
    beforeEach(() => {
        cy.visit("./src/index.html") 
      })

      
      it.only('valida selecao radio elogio', function() {
          
        cy.get('input[value*="elogio"]').check().should('have.value', 'elogio')
          
        })

        it.only(' marca cada tipo de atendimento e valida que foi marcado', function() {

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

})
    
    
   
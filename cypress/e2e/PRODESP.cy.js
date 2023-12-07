describe('Automação de Testes - SP - Sem Papel', function(){
    
    beforeEach(function(){
    cy.visit('https://www.demandas.homologacao.spsempapel.sp.gov.br/')
    })
    
    it.only('CN001', function(){
        cy.RealizaLogin()

        cy.get('[.select="form-control"]').select('Demandas')
        


    })
 
})



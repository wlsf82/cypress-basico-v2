Cypress.on('uncaught:exception', (err, runnable) => {
    // Não falhar automaticamente no teste
    // (você pode adicionar aqui lógica personalizada para lidar com a exceção)
    return false;
  });

describe('Atividade Extra Contratar SSL com Cupom', function(){
    it('Contratar o SSL Locaweb', function(){
        cy.visit('https://www.systemintegration.locaweb.com.br/home/')
        cy.get('.main-product-click a[href="/ssl-locaweb/"]').click()
        cy.get('#sl-btn-hire-plan1').click()
        cy.get('#Login').type('cypress1ssl').should('have.value', 'cypress1ssl')
        cy.get('#Password').type('Inicial1234@@@').should('have.value', 'Inicial1234@@@')
        cy.get('#enter').click()
        //cy.get('#change_boleto').click() 
        cy.get('#btn_show_coupon_input').click()
        cy.get('#coupon_area').type('XUXU85A903')
        cy.get('#btn_coupon_calculate').click()
        cy.get('#opt_in_products_contract').click()
        cy.get('#finish').click()
        cy.contains('A contratação foi realizada com sucesso.').should('be.visible')
    })
})
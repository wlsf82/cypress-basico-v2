/// <reference types="Cypress"  />


describe('Certificação BAHN', function() {
    it('Login na aplicação',function() {
        cy.visit('https://proxys.bahn.nordware.io/Dashboard/')
        cy.get('#username').click ()
        cy.get('#username').type('i.garces')
        cy.get('#password').click ()
        cy.get('#password').type('Teste@1000')
        cy.get('#kc-login').click ()
    });
    it('Selecionar e-commerce',function() {
        cy.get('#testeId', {timeout: 1000000}).click
        cy.get('.selected > span').click
    });
    
    it('Validar dashboard',function() {
        cy.get('.card-title')
        .invoke('text')
        .then(title => {
            cy.get(':nth-child(5) > .card > .card-footer > .stats > div > .btn').click()
            cy.get(':nth-child(6) > .custom-btn-filter').click()
            cy.get('.col-2')
                .find('.primary-text:last-child')
                .invoke('text')
                .then(primaryText => {
                    expect(title.trim()).to.equal(primaryText.trim());
          });
    })})

    it('Consultar pedidos',function () {
        cy.get('.router-link-exact-active > p', {timeout: 1000000}).click
        cy.get('tbody > :nth-child(1) > .el-table_1_column_2 > .cell', {timeout: 1000000})
        .invoke('text')
        .then(title => {
            cy.get('el-input el-input--prefix').click
            cy.get('el-input el-input--prefix').type (title)
            cy.get('custom-btn-filter').click
            
    });




});})

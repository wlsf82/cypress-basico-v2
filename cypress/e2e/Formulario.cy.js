describe ('Formulario 4 AllTest', function () {
    beforeEach(function () {
      cy.visit('https://docs.google.com/forms/d/e/1FAIpQLSdfW_d2KrpfjvGWCCNqgpPQ-Q7xSjz56qV7zaxGq1CCtMCfXg/viewform')
    })
})
it('preencher formulário', function(){
    cy.get('.Xb9hP')
    .type('Eduardo Manoel')
    

   
})
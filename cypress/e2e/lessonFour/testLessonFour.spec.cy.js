describe('Central de Atendimento ao Cliente TAT', function () {
  beforeEach(() => {
    cy.visit('./src/index.html')
  })

  it('Marca o tipo de atendimento "Feedback"', function () {
    cy.get('input[value="feedback"]').check().should('be.checked')
  })

  it('Marca cada tipo de atendimento', function () {
    cy.get('input[type="radio"]')
      .should('have.length', 3)
      .each(radio => {
        cy.wrap(radio).check()
        cy.wrap(radio).should('be.checked')
      })
  })
})

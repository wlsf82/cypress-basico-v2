
describe('Code duplication bad pratice - repetitives tests', () => {
    beforeEach( () => {
        cy.intercept(
            'GET',
            '**/search**'
        ).as('getStories')

        cy.visit('https://hackernews-seven.vercel.app')
        cy.wait('@getStories')

        cy.get('input[type="text"]')
          .should('be.visible')
          .as('searchField')
          .and('have.value', 'redux')
          .clear()
    })

    const termsToSearchFor = ['reactjs', 'vuejs']

    termsToSearchFor.forEach( term => {
        it(`Searches for ${term}`, () => {
            cy.search(term)
    
            cy.wait('@getStories')
    
              cy.get('.table-row')
                .should('have.length', 100)    
        })
    })
})
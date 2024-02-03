/// <reference types="Cypress"/>

describe('Code duplication bad pratice - repetitives steps', () => {
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
    it('Searches by typing and hitting enter', () => {
        cy.get('@searchField')
          .type('frontend testing{enter}')

          cy.wait('@getStories')

          cy.get('.table-row')
            .should('have.length', 100)
    })

    it('Searches by typing and pressing the search button', () => {
        cy.get('@searchField')
          .type('frontend testing{enter}')
    })
})
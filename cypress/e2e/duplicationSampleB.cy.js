/// <reference types="Cypress"/>


describe('Code duplication bad pratice - repetitives actions and assertions', () => {
    beforeEach( () => {
        cy.intercept(
            'GET',
            '**/search**'
        ).as('getStories')

        cy.visit('https://hackernews-seven.vercel.app')
        cy.wait('@getStories')
    })
        it('Searches for the same term 3 times', () => {
            Cypress._.times(3, ()=>{
                cy.search('cypress.io')

                cy.get('.table-row')
                  .its('length')
                  .should('be.at.least', 1)

            })                     
        })
})
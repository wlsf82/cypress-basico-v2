// search_duc_duc.spec.js created with Cypress
//
// Start writing your Cypress tests below!
// If you're unfamiliar with how Cypress works,
// check out the link below and learn how to write your first test:
// https://on.cypress.io/writing-first-test

describe('Search', () => {
    const searchTerm = 'cypress.io'
    beforeEach(() => {
        cy.intercept(
            'GET',
            `**?q=${searchTerm}**`
        ).as('getSearchResults')
    
        cy.visit('https://duckduckgo.com/')

        cy.get('input[type="text"]')
          .as('SearcheField')
          .should('be.visible')
    })
 
    it.only('types and hits ENTER', () =>{
        cy.get('@SearcheField')
          .type(`${searchTerm}{enter}`)

        cy.wait('@getSearchResults')
        
        cy.get('.result')
        .should('have.length',11)
    })

    it('types and clicks the magnifying glass button11', () =>{
        cy.get('@SearcheField')
          .type(searchTerm)
        cy.get('.searchbox_searchButton__F5Bwq')

         .should('be.visible')
          .click()
          
          cy.get('body')
          cy.wait('@getSearchResults') 
          
          cy.get('.result')
          .should('have.length',11)
    })

    it.only ('types and submit the form directly111', () =>{

        cy.get('@SearcheField')
        .type(searchTerm)
        cy.get('form').submit()

        cy.wait('@getSearchResults') 
        cy.get('.react-results--main')
        .should('have.length',11) 

    })
})

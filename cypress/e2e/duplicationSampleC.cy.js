/// <reference types="Cypress"/>


describe('Code duplication bad pratice - multiple checks', () => {
    beforeEach(() => {
        cy.visit('https://bit.ly/2XSuwCW')
    })

    it('Checks all checkboxes from a specific fieldset', () => {
        cy.get('fieldset div input[type="checkbox"]').check()
    })
})
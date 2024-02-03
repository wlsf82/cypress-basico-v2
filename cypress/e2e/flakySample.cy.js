/// <reference types="Cypress"/>

import {faker} from '@faker-js/faker';

describe('Flaky tests bad pratices', () => {
    beforeEach(() => {
        cy.intercept(
            'GET',
            '**/search**',
            {fixture: 'stories'}   //removeu de bater na API
        )
        cy.visit('https://wlsf82-hacker-stories.web.app')
    })

    Cypress._.times(10, () => {
        
        it('Shows a max of 5 buttons for the last searched terms', () => {
            Cypress._.times(6, () => {
                cy.search(faker.word.words())
            })
            cy.get('.last-searches button')
              .should('have.length', 5)
        })
    })
})
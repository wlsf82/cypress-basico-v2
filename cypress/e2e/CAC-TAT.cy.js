// Codigo fala para o visualstudio procurar referencias cypress 
// para identificar parâmetros, methods e autocomplete

const { CacTatObject } = require ('../pageobject/CAC-TAT-objects');

/// <reference types="Cypress" /> 

describe('TAT Customer Service Center', function() {

    var cacTatObject;

    beforeEach(function() {
        cacTatObject = new CacTatObject();
        cy.visit('../../src/index.html');
    })

    it('Check the apps title', function () {
        cy.title()
          .should('be.equal', 'Central de Atendimento ao Cliente TAT');
    })

    it('Fill in the required fields and submit the form', function () {
        const text = 'Lorem ipsum dolor sit amet, consectetur';

        cacTatObject.inputFirstName('Amy')
                    .inputLastName('Lee')
                    .inputEmail('amylee@gmail.com')
                    .boxTextHowCanWeHelpYou(text)
                    .buttonSend()
                    .checkingMessageSuccess();
    })

    it('Fill in the required fields and submit the form with delay 0', function () {

        const longText = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit,'+
        'sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.Lorem ipsum dolor sit amet,'+
        'consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'+
        'consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.';

        cacTatObject.inputFirstName('Joe')
                    .inputLastName('Ju')
                    .inputEmail('jooujuue@gmail.com')
                    .boxTextHowCanWeHelpYou(longText, 0)
                    .buttonSend()
                    .checkingMessageSuccess();
    })
})
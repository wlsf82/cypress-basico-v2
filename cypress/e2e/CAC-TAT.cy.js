// Codigo fala para o visualstudio procurar referencias cypress 
// para identificar parâmetros, methods e autocomplete

const { CacTatObject } = require ('../pageobject/CAC-TAT-objects');

/// <reference types="Cypress" /> 

describe('TAT Customer Service Center', function() {

    var cacTatObject;

    beforeEach(function() {
        cy.visit('../../src/index.html');
    })

    it('Check the apps title', function () {
        cy.title()
          .should('be.equal', 'Central de Atendimento ao Cliente TAT');
    })

    it('Fill in the required fields and submit the form', function () {
        const text = 'Lorem ipsum dolor sit amet, consectetur';
        cacTatObject = new CacTatObject();

        cacTatObject.inputFirstName('Amy')
                    .inputLastName('Lee')
                    .inputEmail('amylee@gmail.com')
                    .boxTextHowCanWeHelpYou(text,0)
                    .buttonSend()
                    .checkingMessageSuccess();
    })

    it('Fill in the required fields and submit the form with delay 0', function () {

        const longText = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit,'+
        'sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.Lorem ipsum dolor sit amet,'+
        'consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'+
        'consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.';
        
        cacTatObject = new CacTatObject();

        cacTatObject.inputFirstName('Joe')
                    .inputLastName('Ju')
                    .inputEmail('jooujuue@gmail.com')
                    .boxTextHowCanWeHelpYou(longText, 0)
                    .buttonSend()
                    .checkingMessageSuccess();
    })

    it('Fill in the required fields with a invalid email, to get a error', function () {
        const text = 'Lorem ipsum dolor sit amet, consectetur';
        cacTatObject = new CacTatObject();

        cacTatObject.inputFirstName('Bruce')
                    .inputLastName('Lee')
                    .inputEmail('bruceleegmailcom')
                    .boxTextHowCanWeHelpYou(text, 0)
                    .buttonSend()
                    .checkingMessageError();
    })

    it('Fill in the required fields with a invalid ´hone, to get a empty input phone', function () {
        cacTatObject = new CacTatObject();

        cacTatObject.inputFirstName('Bruce')
                    .inputLastName('James')
                    .inputEmail('jamesb@gmailcom')
                    .inputPhone('weiori')
    })

    it('Fill in the required fields without a phone, after the phone get required', function () {
        const text = 'Lorem ipsum dolor sit amet, consectetur';
        cacTatObject = new CacTatObject();

        cacTatObject.inputFirstName('Bruce')
                    .inputLastName('Lee')
                    .inputEmail('bruceleegmailcom')
                    .selectPhoneToPreferentialCommunication()
                    .boxTextHowCanWeHelpYou(text, 0)
                    .buttonSend()
                    .checkingMessageError();
    })

    it('Send without Fill in the required fields', function () {
        cacTatObject = new CacTatObject();

        cacTatObject.buttonSend()
                    .checkingMessageError();
    })
    it('Send a complet form with custon command', function () {
        const text = 'Lorem ipsum dolor sit amet, consectetur';

        cy.sendForm('Bruce','Jonas', 'bjonas@gmail.com', text).then(()=> {
            expect(cacTatObject = new CacTatObject().checkingMessageSuccess())
        })
    })
})

/// <reference types="Cypress" /> 

export class CacTatObject{

  constructor(){}

  inputFirstName(firstName) {
    cy.get('#firstName').type(firstName);
    return this
  }

  inputLastName(lastName) {
    cy.get('#lastName').type(lastName);
    return this;
  }

  inputEmail(email) {
    cy.get('#email').type(email);
    return this;
  }

  boxTextHowCanWeHelpYou(textAskingForHelp, timeDelay = 10) {
    const boxText = cy.get('#open-text-area');

    timeDelay != 10 
      ? boxText.type(textAskingForHelp, {  delay: timeDelay } ) 
      : boxText.type(textAskingForHelp);
    return this;
  }

  buttonSend(){
    cy.get('button[type="submit"]').contains('Enviar').should('be.visible').click();
    return this;
  }

  checkingMessageSuccess(){
    cy.get('.success').should('be.visible');
    return this;
  }
}

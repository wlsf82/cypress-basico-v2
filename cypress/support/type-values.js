/// <reference types="Cypress" /> 

export class TypeValues{
  
  static typeValuePhoneNumber(element, phoneNumber) {
    return isNaN(phoneNumber) 
      ? element.type(phoneNumber).should('have.value', '')
      : element.type(phoneNumber).should('have.value', phoneNumber)
  }
}
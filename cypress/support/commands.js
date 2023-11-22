// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
Cypress.Commands.add('fillMandatoryFieldsAndSubmit', () => {
    cy.get("#firstName").type("Jonathan", {delay: 0})
        cy.get("#lastName").type("Cavalcanti",{delay: 0})
        cy.get("#lastName").type("Cavalcanti",{delay: 0})
        cy.get("#email").type("qajonat@ig.com.br",{delay: 0})
        cy.get("#phone-checkbox").click()
        cy.get("#phone").type("51996506802",{delay: 0})
        cy.get("#open-text-area").type("Preciso de ajuda sahsauhusshudhudhuduhahudsaiduhsaudsadsidshdsiudhidsaihuduhdaiudsaidsahdsaasd", {delay: 0})
        cy.contains("button", "Enviar").click()
        
        
})
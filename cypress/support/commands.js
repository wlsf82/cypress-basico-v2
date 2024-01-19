// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

//Chamamos a api no cypress ('Cypress.Comands.add'), onde passamos no nome do comando e a função onde estára o teste a ser feito
//Depois de feito, no arquivo de teste .spec.js na parte onde o teste dever ser feito é so chamar o comando que foi criado na pasta commands.js

Cypress.Commands.add('fillMandatoryFieldsAndSubmit', function(){
    cy.get('#firstName').type('Daniel')
        cy.get('#lastName').type('Fossali')
        cy.get('#email').type("danielfossali@suportetecnologias.com.br")
        cy.get('#open-text-area').type("Teste")
        cy.get('button[type="submit"]').click()

})


//Na pasta++ta support é onde são crados os arquivos de teste referentes a uma api/tela especifica que depois
//pode ser chamadas no código em si
//lembrando de sempre importar o arquivo no arquivo index.js com o comando import ./<nome-do-arquivo>
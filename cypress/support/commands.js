// Pode criar vários arquivos de Commands na pasta Support,
// desde que importe os arquivos dentro do arquivo index.js ou e2e.js

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
// -- This is a parent command -- Criação comando customizado de login
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command -- Criação de comando customizado encadeado
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command -- Criação de comando customizado encadeado 2
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command -- Sobrescrever comando já existente no cypress
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add('fillMandatoryFieldsAndSubmit', function() {
    // Acima 1º argumento é o comando customizado e o segundo argumento é a função que vai executar o comando customizado
    /* Pode escrever dentro do parênteses da função argumentos como: function(nome, sobrenome, email, texto), 
    em seguida no código do teste escreve um array ao lado do comando com os valores (lista de valores)
    e a seguir repetir o mesmo comando com outros valores de forma a executar testes com nomesm, sobrenomes e emails diferentes */
    // Abaixo o corpo da função com os passos
  cy.get('#firstName').should('be.visible').type('Carolina').should('have.value', 'Carolina')
  cy.get('#lastName').type('Araujo')
  cy.get('#email').type('carolinafa.eng@gmail.com')
  cy.get('#open-text-area').type('Teste')
  cy.contains('button', 'Enviar').click() 
})
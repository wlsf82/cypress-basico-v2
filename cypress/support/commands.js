
console.log('Comandos Cypress carregados com sucesso!')

//Cypress.Commands.add('fillMandatoryFieldsAndSubmit', function () {
 // cy.get('#firstName').type('nome')
  //cy.get('#lastName').type('ultmio')
  //cy.get('#email').type('email')
  //cy.get('#open-text-area').type('texto')
  //cy.get('button[type="submit"]').click()
//})

// Arquivo commands.js na pasta support
Cypress.Commands.add('fillMandatoryFieldsAndSubmit', function () {
  console.log('Preenchendo campos obrigatórios e enviando formulário...');
  cy.get('#firstName').type('nome');
  cy.get('#lastName').type('ultmio');
  cy.get('#email').type('aa@aa.aa');
  cy.get('#open-text-area').type('texto');
  //cy.get('button[type="submit"]').click();
  cy.contains('button', 'Enviar').click();
});

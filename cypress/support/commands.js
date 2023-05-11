Cypress.Commands.add('fillMandatoryFieldsAndSubmit', function(){
    cy.get('#firstName').type('Leonardo');
    cy.get('#lastName').type('Gutierrez');
    cy.get('#email').type('gutierrez.medeiros12@gmail.com');
    cy.get('#open-text-area').type('Me ajude comprando um saco de pão', {delay:0});
    cy.contains('button', 'Enviar').click();
})

Cypress.Commands.add('Login', function(){
    cy.visit('https://app.estuda.com/?usuario=11047932&usuario_chave=dbee68ae2407f186ff75cef938038cd0')
})

Cypress.Commands.add('AdicionarQuestao', function(disciplina){
    cy.get('button[title="Disciplinas"]').click()
    cy.contains('.text', disciplina).click()
    cy.contains('button[type="button"]', ' Adicionar').click()
    cy.contains('button[type="button"]', ' Adicionar').click()
    cy.contains('button[type="button"]', ' Adicionar').click()
})

Cypress.Commands.add('EntrarEscola', function(){
    cy.visit('https://app.estuda.com/usuarios_empresas/?acao=logar&id=20029')
})
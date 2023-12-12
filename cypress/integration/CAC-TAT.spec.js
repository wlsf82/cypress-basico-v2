/// <reference types="Cypress" />


describe('Central de Atendimento ao Cliente TAT', function() {
    this.beforeEach(function() {
        cy.visit('./src/index.html')
    })

    it('Verifica o título da aplicação', function() { 
      cy.title().should('be.equal','Central de Atendimento ao Cliente TAT')
    })

    it.only('Preenche os campos obrigatórios e envia o formulário', function(){
        const longText = 'Teste para validar teste, Teste para validar teste, Teste para validar teste, Teste para validar teste, Teste para validar teste, Teste para validar teste'
        cy.get('#firstName').type('Daniel')
        cy.get('#lastName').type('Esteves')
        cy.get('#email').type('aa@aa.a')
        cy.get('#open-text-area').type(longText, {delay:120})
        //cy.get('button[type="submit"]').click()
        cy.contains('button', 'Enviar').click();
        cy.get('.success').should('be.visible')

    })

    it('Exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', function(){
      const longText = 'Teste para validar teste, Teste para validar teste, Teste para validar teste, Teste para validar teste, Teste para validar teste, Teste para validar teste'
      cy.get('#firstName').type('Daniel')
      cy.get('#lastName').type('Esteves')
      cy.get('#email').type('aa@')
      cy.get('#open-text-area').type(longText, {delay:0})
      cy.contains('button', 'Enviar').click();
      //cy.get('button[type="submit"]').click()
      cy.get('.error').should('be.visible')

  })

  it('Campo de telefone apenas aceita numeros numéricos', function(){
    const longText = 'Teste para validar teste, Teste para validar teste, Teste para validar teste, Teste para validar teste, Teste para validar teste, Teste para validar teste'
    cy.get('#firstName').type('Daniel')
    cy.get('#lastName').type('Esteves')
    cy.get('#email').type('aa@')
    cy.get('#phone').type('aaa')
    cy.get('#phone').should('have.value', '')
    cy.get('#phone').type('123')
    cy.get('#phone').should('have.value', '123')

   })

   it('Exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', function(){
    const longText = 'Teste para validar teste, Teste para validar teste, Teste para validar teste, Teste para validar teste, Teste para validar teste, Teste para validar teste'
    cy.get('#firstName').type('Daniel')
    cy.get('#lastName').type('Esteves')
    cy.get('#email').type('aa@')
    cy.get('#phone-checkbox').check()
    cy.get('#open-text-area').type(longText, {delay:0})
    cy.contains('button', 'Enviar').click();
    //cy.get('button[type="submit"]').click()
    cy.get('.error').should('be.visible')

})

it('Preenche e limpa os campos nome, sobrenome, email e telefone', function(){
  const longText = 'Teste para validar teste, Teste para validar teste, Teste para validar teste, Teste para validar teste, Teste para validar teste, Teste para validar teste'
  cy.get('#firstName').type('valor-aqui').should('have.value', 'valor-aqui')
  cy.get('#firstName').clear().should('have.value', '')
  cy.get('#lastName').type('valor-aqui').should('have.value', 'valor-aqui')
  cy.get('#lastName').clear().should('have.value', '')
  cy.get('#email').type('valor-aqui').should('have.value', 'valor-aqui')
  cy.get('#email').clear().should('have.value', '')
  cy.get('#phone').type('123').should('have.value', '123')
  cy.get('#phone').clear().should('have.value', '')
  cy.get('#phone-checkbox').click()
  cy.get('#open-text-area').type(longText, {delay:0})
  cy.contains('button', 'Enviar').click();
  //cy.get('button[type="submit"]').click()
  cy.get('.error').should('be.visible')

})

it('exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', function(){
  const longText = 'Teste para validar teste, Teste para validar teste, Teste para validar teste, Teste para validar teste, Teste para validar teste, Teste para validar teste'
  
  cy.get('button[type="submit"]').click()
  cy.get('.error').should('be.visible')

})


it('Envia o formulário com sucesso usando um comando customizado', function() {
  console.log('Iniciando o teste...');
  cy.fillMandatoryFieldsAndSubmit();
  cy.get('.success').should('be.visible');
});


it('seleciona um produto (YouTube) por seu texto', function() {
  cy.get('#firstName').type('Daniel')
  cy.get('#lastName').type('Esteves')
  cy.get('#email').type('aa@')
  cy.get('#product').select('YouTube').should('have.value', 'youtube')

});

it('seleciona um produto (Blog) por seu texto', function() {
  cy.get('#firstName').type('Daniel')
  cy.get('#lastName').type('Esteves')
  cy.get('#email').type('aa@')
  cy.get('#product').select('Blog').should('have.value', 'blog')

});

it('marca o tipo de atendimento "Feedback"', function() {
  cy.get('#firstName').type('Daniel')
  cy.get('#lastName').type('Esteves')
  cy.get('#email').type('aa@')
  cy.get('#product').select('Blog').should('have.value', 'blog')
  cy.get('input[value="feedback"]').check();

});

it('marca cada tipo de atendimento', function() {
  cy.get('#firstName').type('Daniel')
  cy.get('#lastName').type('Esteves')
  cy.get('#email').type('aa@')
  cy.get('#product').select('Blog').should('have.value', 'blog')
  cy.get('input[value="feedback"]').check().should('be.checked');

});

it('marca cada tipo de atendimento', function() {
  cy.get('#firstName').type('Daniel')
  cy.get('#lastName').type('Esteves')
  cy.get('#email').type('aa@')
  cy.get('#product').select('Blog').should('have.value', 'blog')
  cy.get('input[type="radio"]').should('have.length', 3).each(function($radio){
    cy.wrap($radio).check()
    cy.wrap($radio).should('be.checked')
  })

  

});


it('seleciona um arquivo da pasta fixtures', function() {
  cy.get('#firstName').type('Daniel')
  cy.get('#lastName').type('Esteves')
  cy.get('#email').type('aa@')
  cy.get('#product').select(1).should('have.value', 'blog')
  cy.get('input[value="feedback"]').check().should('be.checked');
  cy.get('input[type="file"]').should('not.have.value').selectFile('cypress/fixtures/example.json').should(function ($input) {
//console.log($input) Para valiar na consola o input e os campos dentro para ir buscar o nome do arquivo
  expect($input[0].files[0].name).to.equal('example.json')
  })

});

it('seleciona um arquivo simulando um drag-and-drop', function() {
  cy.get('#firstName').type('Daniel')
  cy.get('#lastName').type('Esteves')
  cy.get('#email').type('aa@aa.aa')
  cy.get('#product').select(1).should('have.value', 'blog')
  cy.get('input[value="feedback"]').check().should('be.checked');
  cy.get('input[type="file"]').should('not.have.value').selectFile('./cypress/fixtures/example.json', { action: 'drag-drop' }).should(function ($input) {
//console.log($input) Para valiar na consola o input e os campos dentro para ir buscar o nome do arquivo
  expect($input[0].files[0].name).to.equal('example.json')
  })

});

it('seleciona um arquivo utilizando uma fixture para a qual foi dada um alias', function() {
  //para pegar o ficheiro e dar o novo nome sampleFile
  cy.fixture('example.json').as('sampleFile')
  //Quando se cria um alias (as.(sampleFile) é necessario no selectFile passar @NomeDoAlias)
  cy.get('input[type="file"]').selectFile('@sampleFile').should(function ($input) {
      expect($input[0].files[0].name).to.equal('example.json')
      })
})

it('verifica que a política de privacidade abre em outra aba sem a necessidade de um clique', function() {
  cy.get('#privacy a').should('have.attr', 'target', '_blank')
      })


it('checkboxes validation', function() {
  // Marca todos os checkboxes
  cy.get('input[type="checkbox"]').check({ force: true });

  // Verifica se todos os checkboxes estão marcados
  cy.get('input[type="checkbox"]').should('be.checked');

  // Desmarca o último checkbox
  cy.get('input[type="checkbox"]').last().uncheck({ force: true });

  // Verifica se o último checkbox não está marcado
  cy.get('input[type="checkbox"]').last().should('not.be.checked');
});

it('acessa a página da política de privacidade removendo o target e então clicando no link', function() {
  cy.get('#privacy a').invoke('removeAttr', 'target').click()
  cy.contains('Talking About Testing').should('be.visible')


      })


  })
  
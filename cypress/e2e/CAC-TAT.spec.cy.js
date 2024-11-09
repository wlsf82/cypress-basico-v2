describe('Central de atendimento ao cliente - TAT', () => {
  const segundosEmMilessegundos = 3000
  beforeEach(function () {
    cy.visit('./src/index.html');
  });

  it('Verifica o título da aplicação', () => {
    cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT');
  });

  it('Preencha os campos obrigatórios e envie o formulário', function () {
    cy.get('#firstName').type('Everaldo');
    cy.get('#lastName').type('Barros');
    cy.get('#email').type('everaldobarros2023@outlook.com');
    cy.get('#email-checkbox').click();
    cy.get('#open-text-area').type('Este exercício foi realizado com sucesso.', { delay: 0 });

    cy.contains('button', 'Enviar').click();

    cy.get('.success').should('be.visible');
  });

  it('Exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', function () {
    cy.clock()
    cy.get('#firstName').type('Everaldo');
    cy.get('#lastName').type('Barros');
    cy.get('#email').type('everaldobarros2023@outlook');
    cy.get('#email-checkbox').click();
    cy.get('#open-text-area').type('Este exercício foi realizado com sucesso.');

    cy.contains('button', 'Enviar').click();

    cy.get('.error').should('be.visible');

    cy.tick(segundosEmMilessegundos);

    cy.get('.success').should('not.be.visible');
  });

  it(`exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário`, function () {
    cy.get('#phone')
      .type('abcdfghij')
      .should('have.value', '')
  })

  it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', function () {
    cy.clock()
    cy.get('#firstName').type('Everaldo');
    cy.get('#lastName').type('Barros');
    cy.get('#email').type('everaldobarros2023@outlook.com');
    cy.get('#phone-checkbox').check();
    cy.get('#open-text-area').type('Este exercício foi realizado com sucesso.');

    cy.contains('button', 'Enviar').click();

    cy.get('.error').should('be.visible');

    cy.tick(segundosEmMilessegundos);

    cy.get('.error').should('not.be.visible');
  })

  it('preenche e limpa os campos nome, sobrenome, email e telefone', function () {
    cy.get('#firstName')
      .type('Everaldo')
      .should('have.value', 'Everaldo')
      .clear()
      .should('have.value', '')
    cy.get('#lastName')
      .type('Barros')
      .should('have.value', 'Barros')
      .clear()
      .should('have.value', '')
    cy.get('#email')
      .type('everaldobarros2023@outlook.com')
      .should('have.value', 'everaldobarros2023@outlook.com')
      .clear()
      .should('have.value', '')
    cy.get('#phone').type('123456789')
      .should('have.value', '123456789')
      .clear()
      .should('have.value', '')
  })

  it('exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', function () {
    cy.clock()
    cy.contains('button', 'Enviar').click();
    cy.get('.error').should('be.visible')

    cy.tick(segundosEmMilessegundos);

    cy.get('.error').should('not.be.visible')
  })

  it('envia o formuário com sucesso usando um comando customizado', function () {
    cy.fillMandatoryFieldsAndSubmit()
    cy.get('.success').should('be.visible')
  })

  it('seleciona um produto (YouTube) por seu texto', function () {
    cy.get('#product').select('youtube')
      .should('have.value', 'youtube')
  })

  it('seleciona um produto (Mentoria) por seu valor (value)', function () {
    cy.get('#product').select('mentoria')
      .should('have.value', 'mentoria')
  })

  it('seleciona um produto (Blog) por seu índice', function () {
    cy.get('#product').select(1)
      .should('have.value', 'blog')
  })

  it(`marca o tipo de atendimento "Feedback"`, function () {
    cy.get('input[type="radio"][value="feedback"]')
      .check()
      .should('have.value', 'feedback')
  })

  it('marca cada tipo de atendimento', function () {
    cy.get('input[type="radio"]')
      .should('have.length', 3)
      .each(function ($radio) {
        cy.wrap($radio).check()
        cy.wrap($radio).should('be.checked')
      })
  })

  it('marca ambos checkboxes, depois desmarca o último', function () {
    cy.get('input[type="checkbox"]')
      .check()
      .should('be.checked')
      .last()
      .uncheck()
      .should('not.be.checked')
  })

  it('seleciona um arquivo da pasta fixtures', function () {
    cy.get('input[type="file"]#file-upload')
      .should('not.have.value')
      .selectFile('./cypress/fixtures/example.json')
      .should(function ($input) {
        expect($input[0].files[0].name).to.equal('example.json');
      });
  });

  it('seleciona um arquivo simulando um drag-and-drop', function () {
    cy.get('input[type="file"]#file-upload')
      .should('not.have.value')
      .selectFile('./cypress/fixtures/example.json', { action: 'drag-drop' })
      .should(function ($input) {
        expect($input[0].files[0].name).to.equal('example.json');
      });
  })

  it('seleciona um arquivo utilizando uma fixture para a qual foi dado um alias', function () {
    cy.fixture('example.json').as('exampleFile')
    cy.get('input[type="file"]#file-upload')
      .should('not.have.value')
      .selectFile('@exampleFile')
      .should(function ($input) {
        expect($input[0].files[0].name).to.equal('example.json');
      });
  });

  it('verifica que a política de privacidade abre em outra aba sem a necessidade de um clique', function () {
    cy.get('#privacy a').should('have.attr', 'target', '_blank')
  });

  it('verifica que a política de privacidade abre em outra aba sem a necessidade de um clique', function () {
    cy.get('#privacy a')
      .invoke('removeAttr', 'target')
      .click()

    cy.contains('Talking About Testing').should('be.visible')
  });

  it('exibe mensagem por 3 segundos', function () {
    cy.clock()
    cy.get('#firstName').type('Everaldo');
    cy.get('#lastName').type('Barros');
    cy.get('#email').type('everaldobarros2023@outlook.com');
    cy.get('#email-checkbox').click();
    cy.get('#open-text-area').type('Este exercício foi realizado com sucesso.', { delay: 0 });

    cy.contains('button', 'Enviar').click();

    cy.get('.success').should('be.visible');

    cy.tick(segundosEmMilessegundos);

    cy.get('.success').should('not.be.visible');
  });

  Cypress._.times(3, function () {
    it('Executa o teste 3 vezes usando lodash - marca ambos checkboxes, depois desmarca o último', function () {
      cy.get('input[type="checkbox"]')
        .check()
        .should('be.checked')
        .last()
        .uncheck()
        .should('not.be.checked')
    })
  });

  it('exibe e esconde as mensagens de sucesso e erro usando o .invoke', () => {
    cy.get('.success')
      .should('not.be.visible')
      .invoke('show')
      .should('be.visible')
      .and('contain', 'Mensagem enviada com sucesso.')
      .invoke('hide')
      .should('not.be.visible')
    cy.get('.error')
      .should('not.be.visible')
      .invoke('show')
      .should('be.visible')
      .and('contain', 'Valide os campos obrigatórios!')
      .invoke('hide')
      .should('not.be.visible')
  });

  it('preenche a area de texto usando o comando invoke', function () {
    const LongText = Cypress._.repeat('0123456789', 20)
    cy.get('#open-text-area')
      .invoke('val', LongText)
      .should('have.value', LongText)
  });

  it('faz uma requisição HTTP', function () {
    cy.request('https://cac-tat.s3.eu-central-1.amazonaws.com/index.html')
      .should(function (response) {
        const { status, statusText, body } = response
        expect(status).to.equal(200)
        expect(statusText).to.equal('OK')
        expect(body).to.include('CAC TAT')
      })
  });

  it('Encontra o gato', function() {
    cy.get('#cat')
    .invoke('show')
    .should('be.visible')
    cy.get('#title')
    .invoke('text', 'Cheguei ao fim do curso básico de Cypress!')
    
  })
})

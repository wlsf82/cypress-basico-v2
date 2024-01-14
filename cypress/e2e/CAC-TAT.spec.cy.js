/// <reference types="Cypress" />


// Suite de teste
describe('Central de Atendimento ao Cliente TAT', () => {
  beforeEach(() => cy.visit('./src/index.html'))
  const project = {
    firstName: 'Roberto',
    lastName: 'Souza',
    email: 'teste@teste.com',
    describe: 'Teste inserindo'
  }
  //O it é o test case
  //1° argumento é o test case, 2° instrução de callback
  it('verifica o título da aplicação', function () {
    cy.title().should('eq', 'Central de Atendimento ao Cliente TAT')
  })
  it('preenche os campos obrigatórios e envia o formulário', () => {
    cy.fillMandatoryFieldsAndSubmit(project)
    cy.get('.success').should('be.visible')

  })
  it('exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', function () {
    cy.get('#firstName').type('Roberto').should('have.value', 'Roberto')
    cy.get('#lastName').type('Souza').should('have.value', 'Souza')
    cy.get('#email').type('teste').should('have.value', 'teste')
    cy.get('#open-text-area').type('Realizando teste e-mail inválido', { delay: 0 }).should('have.value', 'Realizando teste e-mail inválido')
    cy.contains('button', 'Enviar').click()
    cy.get('.error').should('be.visible')
  })
  it('validar quando valor não-numérico é digitado no campo telefone', function () {
    cy.get('#phone').type('Teste').should('be.empty')
  })
  it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', function () {
    cy.get('#firstName').type('Roberto').should('have.value', 'Roberto')
    cy.get('#lastName').type('Souza').should('have.value', 'Souza')
    cy.get('#email').type('teste@teste.com').should('have.value', 'teste@teste.com')
    cy.get('#phone-checkbox').check()
    cy.get('#open-text-area').type('Realizando teste mensagem telefone', { delay: 0 }).should('have.value', 'Realizando teste mensagem telefone')
    cy.contains('button', 'Enviar').click()
    cy.get('.error').should('be.visible')
  })
  it('preenche e limpa os campos nome, sobrenome, email e telefone', function () {
    cy.get('#firstName').type('Roberto').clear().should('have.value', '')
    cy.get('#lastName').type('Souza').clear().should('have.value', '')
    cy.get('#email').type('teste').clear().should('have.value', '')
    cy.get('#phone').type('12345678').clear().should('have.value', '')
    cy.get('#open-text-area').type('Realizando teste e-mail inválido', { delay: 0 }).clear().should('have.value', '')

  })
  it('exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', function () {
    cy.contains('button', 'Enviar').click()
    cy.get('.error').should('be.visible')
  })
  it('envia o formuário com sucesso usando um comando customizado', function () {
    cy.fillMandatoryFieldsAndSubmit(project)
    cy.get('.success').should('be.visible')
  })
  it('seleciona um produto (YouTube) por seu texto', () => {
    cy.get('#product').select('YouTube').should('have.value', 'youtube')
  })
  it('seleciona um produto (Mentoria) por seu valor (value)', () => {
    cy.get('#product').select('mentoria').should('have.value', 'mentoria')
  })
  it('seleciona um produto (Blog) por seu índice', () => {
    cy.get('#product').select(1).should('have.value', 'blog')
  })
  it('marca o tipo de atendimento "Feedback"', () => {
    cy.get('input[type="radio"]').check('feedback').should('be.checked').and('have.value', 'feedback')
  })
  it('marca cada tipo de atendimento', () => {
    cy.get('input[type="radio"]').should('have.length', 3)
      .each(($radio) => {
        //Empacota cada um dos $radio
        cy.wrap($radio).check()
        cy.wrap($radio).should('be.checked')
      })
  })
  it('marca ambos checkboxes, depois desmarca o último', () => {
    // Primeira forma
    cy.get('#check input[type="checkbox"] ').as('checkboxes').check()

    cy.get('@checkboxes').each(checkbox => {
      expect(checkbox[0].checked).to.equal(true)
    })
    cy.get('#check input[type="checkbox"] ').as('checkboxes').last().uncheck().should('not.be.checked')
  })
  it('marca ambos checkboxes, depois desmarca o último', () => {
    // Segunda forma
    cy.get('#check input[type="checkbox"] ').check().should('be.checked').last().uncheck().should('not.be.checked')
  })
  it('Seleciona um arquivo da pasta fixture', () => {
    cy.get('#file-upload').should('not.have.value').selectFile('cypress/fixtures/example.json').should(($input) => {
      expect($input[0].files[0].name).to.equal('example.json')
    })
  })
  it('seleciona um arquivo simulando um drag-and-drop', () => {
    cy.get('#file-upload').should('not.have.value').selectFile('cypress/fixtures/example.json', { action: 'drag-drop' }).should(($input) => {
      expect($input[0].files[0].name).to.equal('example.json')
    })
  })
  it('seleciona um arquivo utilizando uma fixture para a qual foi dada um alias', () => {
    // fixture => Não é necessário passar todo o caminho do arquivo
    // 1° Args <nome_arquivo>
    // Criar um alias para o arquivo
    cy.fixture('example.json', { enconding: null }).as('exampleFile')
    cy.get('#file-upload')
      .should('not.have.value')
      .selectFile('@exampleFile')
      .then(input => {
        expect(input[0].files[0].name).to.equal('example.json')
      })
  })
  it('verifica que a política de privacidade abre em outra aba sem a necessidade de um clique', () => {
    cy.get('#privacy a').should('have.attr', 'target', '_blank')
  })
  it('acessa a página da política de privacidade removendo o target e então clicando no link', () => {
    cy.get('#privacy a').invoke('removeAttr', 'target').should('not.have.attr', 'target', '_blank').click()
  })
  it('testa a página da política de privacidade de forma independente', () => {
    cy.get('#privacy a').invoke('removeAttr', 'target').should('not.have.attr', 'target', '_blank').click()
    cy.title().should('eq','Central de Atendimento ao Cliente TAT - Política de privacidade')
    cy.get('#title').then(($h1) => {
      expect($h1).to.contain('CAC TAT - Política de privacidade')
    })
  })
})

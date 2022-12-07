

describe('Central de Atendimento ao Cliente TAT', function () {
  beforeEach(() => {
    cy.visit('./src/index.html')
  })

  it('preenche os campos obrigatórios e envia o formulário', function () {
    cy.get('#firstName').type('Henrique', { delay: 0 })
    cy.get('#lastName').type('Silveira', { delay: 0 })
    cy.get('#email').type('henriquewlinux@gmail.com', { delay: 0 })
    cy.get('#open-text-area').type('comentario', { delay: 0 })
    cy.contains('button', 'Enviar').click()

    cy.get('.success').should('be.visible')
  })

  it('exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', function () {
    cy.get('#firstName').type('Henrique', { delay: 0 })
    cy.get('#lastName').type('Silveira', { delay: 0 })
    cy.get('#email').type('henriquewlinux.gmail.com', { delay: 0 })
    cy.get('#open-text-area').type('comentario', { delay: 0 })
    cy.contains('button', 'Enviar').click()

    cy.get('.error').should('be.visible')
  })

  it('validar campo telefone vazio ao digitar valor não-numerico', function () {
    cy.get('#phone').type('abc')

    cy.get('#phone').should('have.text', '')
  })

  it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', function () {
    cy.get('#firstName').type('Henrique', { delay: 0 })
    cy.get('#lastName').type('Silveira', { delay: 0 })
    cy.get('#email').type('henriquewlinux.gmail.com', { delay: 0 })
    cy.get('#open-text-area').type('comentario', { delay: 0 })
    cy.get('#phone-checkbox').check()
    cy.contains('button', 'Enviar').click()

    cy.get('.error').should('be.visible')
  })

  it('preenche e limpa os campos nome, sobrenome, email e telefone', function () {
    cy.get('#firstName')
      .type('Henrique', { delay: 0 })
      .should('have.value', 'Henrique')
    cy.get('#firstName').clear().should('have.text', '')

    cy.get('#lastName')
      .type('Silveira', { delay: 0 })
      .should('have.value', 'Silveira')
    cy.get('#lastName').clear().should('have.text', '')

    cy.get('#email')
      .type('henriquewlinux@gmail.com', { delay: 0 })
      .should('have.value', 'henriquewlinux@gmail.com')
    cy.get('#email').clear().should('have.text', '')

    cy.get('#phone')
      .type('71992341154', { delay: 0 })
      .should('have.value', '71992341154')
    cy.get('#phone').clear().should('have.text', '')
  })

  it('exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', function () {
    cy.contains('button', 'Enviar').click()

    cy.get('.error').should('be.visible')
  })

  it('envia o formuário com sucesso usando um comando customizado', function () {
    cy.fillMandatoryFieldsAndSubmit()
  })
})

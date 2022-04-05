/// <reference types="Cypress" />

describe('Central de Atendimento ao Cliente TAT', function() {
  this.beforeEach(function() {
    cy.visit('./src/index.html')
  })

  it('verify aplication title', function() {

    cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT')
  })

  it('fill mandatory fields and send the form', function() {
    const longText = 'Try type a longtext in the text area, to verify the time spent in the test'
    cy.get('#firstName').type('Marcelo')
    cy.get('#lastName').type('Barros')
    cy.get('#email').type('marcelo.barros@teste.com')
    cy.get('#open-text-area').type(longText, {delay: 0})
    cy.contains('button', 'Enviar').click()

    cy.get('.success').should('be.visible')
  })

  it('display error message when submit form with a invalid format email', function() {
    cy.get('#firstName').type('Marcelo')
    cy.get('#lastName').type('Barros')
    cy.get('#email').type('marcelo.barros£teste.com')
    cy.get('#open-text-area').type('teste')
    cy.contains('button', 'Enviar').click()
    
    cy.get('.error').should('be.visible')
  })

  it('validate that only numbers can be typed at phone field', function() {
    cy.get('#firstName').type('Marcelo')
    cy.get('#lastName').type('Barros')
    cy.get('#email').type('marcelo.barros@teste.com')
    cy.get('#phone')
      .type('abcdefgh')
      .should('have.value', '')
  })
  
  it('display error message when the phone becomes mandatory, but is not filled before form will be sent', function() {
    cy.get('#firstName')
      .type('Marcelo')
    cy.get('#lastName')
      .type('Barros')
    cy.get('#email')
      .type('marcelo.barros@teste.com')
    cy.get('#phone-checkbox')
      .check()
    cy.get('#open-text-area')
      .type('teste')
      cy.contains('button', 'Enviar').click()
      .click()
    
    cy.get('.error').should('be.visible')
  })

  it('fill and clean name, surname, email and phone fields', function() {
    const name = 'Marcelo', surname = 'Barros', email = 'marcelo.barros@teste.com', phone = '987654321'
    cy.get('#firstName')
      .type(name)
      .should('have.value', name)
      .clear()
      .should('have.value', '')
    cy.get('#lastName')
      .type(surname)
      .should('have.value', surname)
      .clear()
      .should('have.value', '')
    cy.get('#email')
      .type(email)
      .should('have.value', email)
      .clear()
      .should('have.value', '')
    cy.get('#phone')
      .type(phone)
      .should('have.value', phone)
      .clear()
      .should('have.value', '')
      cy.contains('button', 'Enviar').click()
    
    cy.get('.error').should('be.visible')
  })

  it('display error message when submit form without fill mandatory fields', function() {
    cy.contains('button', 'Enviar').click()
      .click()
    
    cy.get('.error').should('be.visible')
  })

  it('send the form properly using custom command', function() {
    cy.fillMandatoryFieldsAndSubmit('Marcelo', 'Barros', 'marcelo.barros@teste.com', '987654321')
    
    cy.get('.success').should('be.visible')
  })

  it('select a product (YouTube) by text', function() {
    cy.get('#product')
      .select('YouTube')
      .should('have.value', 'youtube')
  })

  it('select a product (Mentoria) by value', function() {
  cy.get('#product')
    .select('mentoria')
    .should('have.value', 'mentoria')
  })

  it('select a product (Blog) by index', function() {
    cy.get('#product')
      .select(1)
      .should('have.value', 'blog')
  })

  it('select service type "Feedback"', function() {
    cy.get('input[type="radio"][value="feedback"]')
      .check()
      .should('have.value', 'feedback')
  })

  it('select each service type', function() {
    cy.get('input[type="radio"]')
      .should('have.length', 3)
      .each(function($radio) {
        cy.wrap($radio).check()
        cy.wrap($radio).should('be.checked')
      }) 
  })

  it('select both checkboxs, then deselect the last one', function() {
    cy.get('input[type="checkbox"]')
      .check()
      .should('be.checked')
      .last()
      .uncheck()
      .should('not.be.checked')
  })

  it('select a file from fixtures folder', function() {
    cy.get('input[type="file"]')
      .should('not.have.value')
      .selectFile('cypress/fixtures/example.json')
      .should(function($input) {
        expect($input[0].files[0].name).to.equal('example.json')
      })
  })

  it('select a file simulating drag-and-drop', function() {
    cy.get('input[type="file"]')
      .should('not.have.value')
      .selectFile('cypress/fixtures/example.json', {action: ('drag-drop')})
      .should(function($input) {
        expect($input[0].files[0].name).to.equal('example.json')
      })
  })

  it('select a file using a fixture which was given a alias', function() {
    cy.fixture('example.json').as('sampleFile')
    cy.get('input[type="file"]')
      .selectFile('@sampleFile')
      .should(function($input) {
        expect($input[0].files[0].name).to.equal('example.json')
      })
  })

  it('verify that privacy policy is opened in another tab without any click is needed', function() {
    cy.get('#privacy a')
      .should('have.attr', 'target', '_blank')
  })

  it('access privacy policy page removing the target and then click link', function() {
    cy.get('#privacy a')
      .invoke('removeAttr', 'target')
      .click()
    cy.contains('Talking About Testing').should('be.visible')
  })

  it('test the privacy policy page independently', function() {

  })
})

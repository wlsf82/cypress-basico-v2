/// <reference types="Cypress" />

describe('Central de Atendimento ao Cliente TAT', function(){
    beforeEach(function(){
        cy.visit('./src/index.html')
    })
    
    it('Validar o título da aplicação', function(){      
        cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT')
    })

    it('Validar preenchimento dos campos obrigatórios e envio do formulário', function(){
        cy.get('#firstName').type('Gabriel')
        cy.get('#lastName').type('Martins')
        cy.get('#email').type('gabriel@yopmail.com')
        cy.get('#open-text-area').type('Teste')
        cy.get('button[type="submit"]').click()

        cy.get('.success').should('be.visible')
    })

    it('Validar exibição da mensagem de erro para email com formato inválido', function(){
        cy.get('#firstName').type('Gabriel')
        cy.get('#lastName').type('Martins')
        cy.get('#email').type('gabriel@yopmail,com')
        cy.get('#open-text-area').type('Teste')
        cy.get('button[type="submit"]').click()

        cy.get('.error').should('be.visible')
    })

    it('Validar preenchimento do número do telefone com caractere não numérico', function(){
        cy.get('#phone').type('teste de campo numérico').should('have.value', '')
    })

    it('Validar obrigatoriedade do preenchimento do campo de número do telefone', function(){
        cy.get('#firstName').type('Gabriel')
        cy.get('#lastName').type('Martins')
        cy.get('#email').type('gabriel@yopmail.com')
        cy.get('#phone-checkbox').click()
        cy.get('#open-text-area').type('Teste')
        cy.get('button[type="submit"]').click()

        cy.get('.error').should('be.visible')
    })

    it('Validar preenchimento e limpeza dos campos', function(){
        cy.get('#firstName')
          .type('Gabriel')
          .should('have.value', 'Gabriel')
          .clear()
          .should('have.value', '')
        cy.get('#lastName')
          .type('Martins')
          .should('have.value', 'Martins')
          .clear()
          .should('have.value', '')
        cy.get('#email')
          .type('gabriel@yopmail.com')
          .should('have.value', 'gabriel@yopmail.com')
          .clear()
          .should('have.value', '')
        cy.get('#phone')
          .type('85912345678')
          .should('have.value', '85912345678')
          .clear()
          .should('have.value', '')
    })

    it('Validar mensagem de erro ao enviar formulário sem campos obrigatórios', function(){
        cy.get('button[type="submit"]').click()
        
        cy.get('.error').should('be.visible')
    })

    it('Enviar formulário com comando customizado', function(){
        cy.fillMandatoryFieldsAndSubmit()

        cy.get('.success').should('be.visible')
    })

    it('Validar alteração de Get para Contains', function(){
        cy.get('#firstName').type('Gabriel')
        cy.get('#lastName').type('Martins')
        cy.get('#email').type('gabriel@yopmail.com')
        cy.get('#open-text-area').type('Teste')
        cy.contains('button', 'Enviar').click()
    })

    it('Validar seleção do combobox do campo Produto', function(){
        cy.get('#product')
          .select('YouTube')
          .should('have.value', 'youtube')
    })

    it('Validar a escolha do campo de tipo de atendimento (um campo)', function(){
        cy.get('input[type="radio"][value="feedback"]').check()
        cy.should('have.value', 'feedback')
    })

    it('Validar o preenchimento do tipo de atendimento (todos os campos)', function(){
        cy.get('input[type="radio"]')
          .should('have.length', 3)
          .each(function($radio){
            cy.wrap($radio).check()
            cy.wrap($radio).should('be.checked')
          })
    })

    it('Validar a marcação de vários checkbox e desmarcar o último', function(){
        cy.get('input[type="checkbox"]')  
        .check()
        .should('be.checked')
        .last()
        .uncheck()
        .should('not.be.checked')   
    })

    it('Validar obrigatoriedade do preenchimento do checkbox de telefone', function(){
        cy.get('#firstName').type('Gabriel')
        cy.get('#lastName').type('Martins')
        cy.get('#email').type('gabriel@yopmail.com')
        cy.get('#phone-checkbox').check()
          .should('be.checked')
        cy.get('#open-text-area').type('Teste')
        cy.get('button[type="submit"]').click()

        cy.get('.error').should('be.visible')
    })
})
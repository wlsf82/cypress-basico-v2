/// <reference types="cypress"/>

//const cypress = require("cypress")

describe('Central de Atendimento ao Cliente TAT', function() { //aqui é minha suite de testes
    this.beforeEach(function() {
        //cy.viewport(1024, 768)
        cy.visit('./src/index.html')
            })
            
    it('- Aula 6 ex1: Seleciona um arquivo da pasta fixtures commands', function() { 
        cy.get('input[type="file"]')
          .should('not.have.value')
          .selectFile('./cypress/support/commands.js')
          .should(function($input){
            console.log($input)
            expect($input[0].files[0].name).to.equal('commands.js')
            
            //(input[0].files[0].name).to.equal('example.json')
          })
    
    })

    it('-Aula6 ex2: Seleciona um arquivo simulando um drag-and-drop', function(){
        cy.get('input[type="file"]')
          .should('not.have.value')
          .selectFile('./cypress/support/commands.js',{action: 'drag-drop'})
          .should(function($input){
            console.log($input)
            expect($input[0].files[0].name).to.equal('commands.js')
        })
    })

    it ('Aula6 ex3: selecione o arquivo usando unm alias', function(){
      cy.fixture('example.json').as('sampleFile')
      cy.get('input[type="file"]')
        .selectFile('@sampleFile')
        .should(function($input){
          expect($input[0].files[0].name).to.equal('example.json')
        })
    })

    


})

/// <reference types="Cypress" />

describe('Central de Atendimento ao Cliente TAT', function () {

    beforeEach(() => {
        cy.visit("./src/index.html")
    })

    it('seleciona um arquivo da pasta fixtures', function () {

        cy.get("input[type='file']").selectFile('./cypress/fixtures/example.json')
            .should(function ($input) {
                console.log($input)
                expect($input[0].files[0].name).to.equal('example.json')
            })


    })


    it('seleciona um arquivo utilizando a funcao drag and drop', function () {

        cy.get("input[type='file']").selectFile('./cypress/fixtures/example.json', { action: 'drag-drop' })
            .should(function ($input) {
                console.log($input)
                expect($input[0].files[0].name).to.equal('example.json')
            })


    })

    it('seleciona um arquivo utilizando uma fixture para a qual foi dada um alias', function () {

        cy.fixture('example.json', null).as('myFile')
        cy.get('input[type=file]').selectFile('@myFile')
        .should(function($input){
            expect($input[0].files[0].name).to.equal('example.json')
        })
        


    })




})
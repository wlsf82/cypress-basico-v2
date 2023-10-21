
/// <reference types="Cypress" />



describe('Central de Atendimento ao Cliente TAT', function() {
    beforeEach(() => cy.visit('./src/index.html'))
    it('verifica o título da aplicação', function() {

       
        cy.title().should('be.equal','Central de Atendimento ao Cliente TAT')

    })
    it('Exercicio 1', () => {
        cy.get('#firstName')
        .should('be.visible')
        .type('Michael')
        cy.get('#lastName')
        .type('Vargas da Silveira')
        cy.get('#email')
        .type('michael.silveira@cwi.com.br')
        cy.get('#open-text-area')
        .type('Primeiro Exercicio')
        // 'button[type="submit"]' outra forma de pegar o botão abaixo, segredo é colocar o nome do campo entre conchete
        cy.get('#white-background > form > button') 
        .should('be.visible')
        .click()
        cy.get('body > span.success')
        .should('contain.text','Mensagem enviada com sucesso.')
        /*
        cy.get('.success')
        .should('be.visible')
        */ 
        })
        
        it('Exercicio 2', () => {

        const longTest = 'teste, hdfgdgfy, hsagfdygfdyd, dgsayfgydfg, udhdsaufgdfg, yfgdyfgdysg,sdsdaff.teste teste teste'
            cy.get('#firstName')
            .should('be.visible')
            .type('Michael')
            cy.get('#lastName')
            .type('Vargas da Silveira')
            cy.get('#email')
            .type('michael.silveira@cwi.com.br')
            cy.get('#open-text-area')
            .type(longTest, {delay: 0})
            cy.get('#white-background > form > button')
            .should('be.visible')
            .click()
            cy.get('.success')
            .should('be.visible')
            })
     

        it('Exercicio 3', () => {
            cy.get('#firstName')
            .should('be.visible')
            .type('Michael')
            cy.get('#lastName')
            .type('Vargas da Silveira')
            cy.get('#email')
            .type('michael.silveiracwi,com.br')
            cy.get('#open-text-area')
            .type('Terceiro Exercicio')
            cy.get('#white-background > form > button')
            .should('be.visible')
            .click()
            cy.get('body > span.error')
            .should('be.visible')
            .should('contain.text','Valide os campos obrigatórios!')
            })

            it('Exercicio 4', () => {
                cy.get('#firstName')
                .should('be.visible')
                .type('Michael')
                cy.get('#lastName')
                .type('Vargas da Silveira')
                cy.get('#email')
                .type('michael.silveira@cwi.com.br')
                cy.get('#phone')
                .type('abc')
                .should('have.value', '')
              
                })
                it('Exercicio 5', () => {
                    cy.get('#firstName')
                    .should('be.visible')
                    .type('Michael')
                    cy.get('#lastName')
                    .type('Vargas da Silveira')
                    cy.get('#email')
                    .type('michael.silveira@cwi.com.br')
                    cy.get('#open-text-area')
                    .type('Quinto Exercicio')
                    cy.get('#phone-checkbox').check()
                    cy.get('#white-background > form > button')
                    .should('be.visible')
                    .click()
                    cy.get('body > span.error')
                    .should('be.visible')
                    .should('contain.text','Valide os campos obrigatórios!')

                    /*cy.get('#phone')
                    .type('abc')
                    .should('have.value', '')
                  */
                    })
                    it.only('Exercicio 6', () => {
                        cy.get('#firstName')
                        .should('be.visible')
                        .type("michael_teste")
                        .should('contain.value', 'michael')
                        .clear()
                        .should('have.value','')

                        })
                        it('Exercicio 7', () => {
                         
                            cy.contains('#white-background > form > button','Enviar')
                            .should('be.visible')
                            .click()
                            cy.get('body > span.error')
                            .should('be.visible')
                            .should('contain.text','Valide os campos obrigatórios!')
        
                            /*cy.get('#phone')
                            .type('abc')
                            .should('have.value', '')
                          */
                            })
                            it('Exercicio 8 customizado', () => {
                                cy.fillMandatoryFieldsAndSubmit()
                                cy.get('body > span.success')
                                .should('be.visible')
                                .should('contain.text','Mensagem enviada com sucesso.')
                                })
                            it('selecione um produto por seu valor', () => {
                                   cy.get('select').select('Cursos')
                                   .should('have.value','cursos')
                                    })
                            it('selecione um produto pelo seu indice', () => {
                                        cy.get('select').select(3)
                                        .should('have.value','mentoria')
                                         })
                        it('selecione um opção com check', () => {
                            cy.get('input[type="radio"][value="feedback"]')
                            .check()
                            .should('have.value', 'feedback')

                                //#support-type > label:nth-child(4) > input[type=radio]  padrão
                                //'input[type="radio"][value="feedback"]' criado professor
                             })

                     it('marca cada tipo de atendimento', () => {
                            cy.get('input[type="radio"]')
                            .should('have.length', 3)
                            .each(($radio) => {
                                cy.wrap($radio).check()
                                cy.wrap($radio).should('be.checked')

                            })
                               
                        })

                        it('marca ambos check box,depois desmarca o último', () => {
                            cy.get('input[type="checkbox"]')
                            .should('have.length', 2)
                            .check()
                            .should('be.visible')
                            .last()
                            .uncheck()
                            .should('not.be.checked')

                        })
                        it('seleciona um arquivo da pasta fixtures', () => {
                            cy.get('input[type="file"]#file-upload')
                            .should('not.have.value')
                            .selectFile('./cypress/fixtures/example.json')
                            .should(($input) => {
                                expect($input[0].files[0].name).to.equal('example.json')
                            })

                        })
                        it('seleciona um arquivo simulando drag-and-drop', () => {
                            cy.get('input[type="file"]#file-upload')
                            .should('not.have.value')
                            .selectFile('./cypress/fixtures/example.json', {action: 'drag-drop'})
                            .should(($input) => {
                                expect($input[0].files[0].name).to.equal('example.json')
                            })

                        })

                        it('seleciona um arquivo utilizando uma fixture para a qual foi dada um alias', () => {
                           cy.fixture('example.json')
                           .as('sampleFile')
                           cy.get('input[type="file"]')
                           .selectFile('@sampleFile')
                           .should(($input) => {
                            expect($input[0].files[0].name).to.equal('example.json')
                        })

                        })
 it('verifica que a política de privacidade abre em outra aba sem a necessidade de um clique', () => {
    cy.get('#privacy a')
    .should('have.attr', 'target', '_blank')
 })

it('acessa a página da política de privacidade removendo o target e então clicando no link', () => {
    cy.get('#privacy a')
    .invoke('removeAttr', 'target')
    .click()
    cy.contains('Talking About Testing').should('be.visible')
 })

})








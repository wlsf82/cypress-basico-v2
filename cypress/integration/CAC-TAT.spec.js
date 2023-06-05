/// <reference types="Cypress" /> 

    describe('Central de Atendimento ao Cliente TAT',  function() {
        beforeEach( function() {
            cy.visit('./src/index.html')
        })

        it('verifica o título da aplicação', function() {
            cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT')
        })

        it('preenche os campos obrigatórios e envia o formulário', function() {
            const longText = 'ao instalar a versão do Cypress pelo npm tive problemas com o cache por ja ter outra versão instalada então fui no caminho C:\Users\kmds\AppData\Local\Cypress e apaguei a pasta cache e instalei novamente pelo cmd com o npm.'
            cy.get('#firstName').type('Walmyr')
            cy.get('#lastName').type('Filho')
            cy.get('#email').type('walmyr@exemplo.com')
            cy.get('#open-text-area').type(longText, {delay: 0})
            cy.get('button[type="submit"]').click()
            cy.get('.success').should('be.visible')
        })

        it('exibe mensagem de erro ao submeter o formulário com um email com formatação erro', function() {
            cy.get('#firstName').type('Walmyr')
            cy.get('#lastName').type('Filho')
            cy.get('#email').type('walmyr@exemplo,com')
            cy.get('#open-text-area').type('Teste.')
            cy.get('button[type="submit"]').click()
            cy.get('.error').should('be.visible')
        })

        it('campo telefone continua vazio quando preenchido com valor não-númerico', function() {
            cy.get('#phone')
                .type('xxxxx')
                .should('have.value', '')
        })

        it('Exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', function() {
            cy.get('#firstName').type('Walmyr')
            cy.get('#lastName').type('Filho')
            cy.get('#email').type('walmyr@exemplo,com')
            cy.get('#phone-checkbox').click()
            cy.get('#open-text-area').type('Teste.')
            cy.get('button[type="submit"]').click()
            cy.get('.error').should('be.visible')
        })

        it('preenche e limpa os campos nome, sobrenome, email e telefone', function() {
            cy.get('#firstName')
                .type('Karla')
                .should('have.value', 'Karla')
                .clear()
                .should('have.value', '')
            cy.get('#lastName')
                .type('Miriam')
                .should('have.value', 'Miriam')
                .clear()
                .should('have.value', '')
            cy.get('#phone')
                .type('1234567890')
                .should('have.value', '1234567890')
                .clear()
                .should('have.value', '')
        })

        it('exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', function() {
            cy.get('button[type="submit"]').click()
            cy.get('.error').should('be.visible')
        })

        it('envia o formulário com sucesso usando um comando customizado', function() {
            cy.fillMandatoryFieldsAndSubmit()
            cy.get('.error').should('be.visible')
        })

        it('envia o formulário com sucesso usando um comando customizado', function() {
            cy.fillMandatoryFieldsAndSubmit()
            cy.get('.error').should('be.visible')
        })

        it('contains button ', function() {
            cy.contains('button', 'Enviar').click()
            cy.get('.error').should('be.visible')
        })

});
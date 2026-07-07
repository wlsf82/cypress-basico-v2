///<reference types="Cypress" />


describe ("Central de Atendimento ao Cliente TAT", function() {
    beforeEach(function() {
        cy.visit("src/index.html")
    })

    it("Verifica o título da aplicação", function(){
        cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT')
 
})

it("Preenche os campos obrigatórios e envia o formulário",function(){
    const longText = "Ao verme que primeiro roeu as frias carnes do meu cadáver dedico como saudosa lembrança estas memórias póstumas."
    cy.get('#firstName').type("Leandro")
    cy.get('#lastName').type("Rodrigues")
    cy.get('#email').type("leandro@email.com.br")
    cy.get('#phone').type("11 973303008")
    cy.get('#open-text-area').type(longText,{delay : 0})
    cy.contains('button','Enviar').click()
    cy.get('.success').should('be.visible')
})

it('Exibe Mensagem de erro ao submeter o formuláio com um email com a formatação inválida', function(){
    cy.get('#firstName').type("Leandro")
    cy.get('#lastName').type("Rodrigues")
    cy.get('#email').type("leandro@email,com.br")
    cy.get('#open-text-area').type('Teste de Erro')
    cy.contains('button','Enviar').click()

    cy.get('.error').should('be.visible')
})

it('Campo Telefone continua vazio quando preenchido com valor não-numérico', function(){
    cy.get('#phone').type("Leandro")
    .should('have.value','')
})

it('Exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário',function(){
    cy.get('#firstName').type("Leandro")
    cy.get('#lastName').type("Rodrigues")
    cy.get('#email').type("leandro@email.com.br")
    cy.get('#phone-checkbox').click()
    cy.get('#open-text-area').type("Teste")
    cy.contains('button','Enviar').click()
    cy.get('.error').should('be.visible')
})

it('Preenche e limpa os campos nome, sobrenome, email e telefone', function(){
    cy.get('#firstName').type("Leandro").should('have.value', 'Leandro').clear().should('have.value', '')
    cy.get('#lastName').type("Rodrigues").should('have.value', 'Rodrigues').clear().should('have.value', '')
    cy.get('#email').type("leandro@email.com.br").should('have.value', 'leandro@email.com.br').clear().should('have.value', '')
    cy.get('#phone').type("11973303008").should('have.value', '11973303008').clear().should('have.value','')
    cy.get('#open-text-area').type("Teste").should('have.value', 'Teste').clear().should('have.value', '')
    cy.contains('button','Enviar').click()
    cy.get('.error').should('be.visible')
})

it('Exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', function(){
    cy.get('#phone-checkbox').click()
    cy.contains('button','Enviar').click()
    cy.get('.error').should('be.visible')
})

it('Envia o formulário com sucesso usando um comando customizado', function(){
cy.fillMandatoryFieldsAndSubmit()
cy.get('.success').should('be.visible')
})

it('Selecione um produto (Youtube) por seu Texto', function(){
    cy.get('#product').select('YouTube').should('have.value', 'youtube')

})

it('Seleciona um produto (Mentoria) por seu valor (value)',function(){
    cy.get('#product').select('mentoria').should('have.value', 'mentoria')
})

it('Seleciona um produto (Blog)por seu índice', function(){
    cy.get('#product').select(1).should('have.value','blog')
})

it('Marca o tipo de atendimento "Feedback', function (){
    cy.get('input[type="radio"][value="feedback"]').check().should('have.value','feedback')
})

it('Marca cada tipo de atendimento', function (){
    cy.get('input[type="radio"]').should('have.length',3).each(function($radio){
        cy.wrap($radio).check()
        cy.wrap($radio).should('be.checked')
    })
})


it('Marca ambos checkboxes, depois desmarca o último', function(){
    cy.get('input[type="checkbox"]')
    .check()
    .should('be.checked')
    .last()
    .uncheck()
    .should('not.be.checked')

})

it('Exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', function(){
    cy.get('#firstName').type("Leandro")
    cy.get('#lastName').type("Rodrigues")
    cy.get('#email').type("leandro@email.com.br")
    cy.get('#phone-checkbox').check()
    cy.get('#open-text-area').type("Teste")
    cy.contains('button','Enviar').click()
    cy.get('.error').should('be.visible')
})

it('Seleciona um arquivo da pasta fixtures', function(){
    cy.get('input[type="file"]#file-upload').should('not.have.value')
    .selectFile('./cypress/fixtures/example.json')
    .should(function ($input){
    expect($input[0].files[0].name).to.equal('example.json')
        })
    })
it('seleciona um arquivo simulando um drag-and-drop', function (){
    cy.get('input[type="file"]#file-upload').should('not.have.value')
    .selectFile('./cypress/fixtures/example.json', {action:'drag-drop'})
    .should(function ($input){
    expect($input[0].files[0].name).to.equal('example.json')
        })
})

it('Seleciona um arquivo utilizando uma fixture para a qual foi dada um alias', function (){
    cy.fixture('example.json').as('sampleFile')
    cy.get('input[type="file"]#file-upload').should('not.have.value').selectFile('@sampleFile')
    .should(function ($input){
        expect($input[0].files[0].name).to.equal('example.json')
            })

})

it('Verifica que a política de privacidade abre em outra aba sem a necessidade de um clique', function(){
    cy.get('#privacy a').should('have.attr','target','_blank')  
})

it('Acessa a página da política de privacidade removendo o target e então clicanco no link', function(){
    cy.get('#privacy a').invoke('removeAttr','target').click()
    cy.contains('Talking About Testing').should('be.visible')
})

it('Testa a página da política de privavidade de forma independente', function(){
    cy.get('#privacy a').invoke('removeAttr','target').click()
    cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT - Política de privacidade')
    cy.contains('Talking About Testing').should('be.visible')

})

    })



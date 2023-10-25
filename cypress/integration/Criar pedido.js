/// <reference types="Cypress" />

it('Acessar site da Loja Integrada',function () {
    cy.visit('https://teste-qualidade.lojaintegrada.com.br/')
});

it('Comprar produto',function () {
    cy.get('#listagemProdutos > ul:nth-child(2) > li > ul > li:nth-child(1) > div > div.info-produto > a').click()
    cy.get('#formCalcularCep > div > div > input').type('83705173')
    cy.get('#formCalcularCep > div > div > input').clear
    cy.get('#formCalcularCep > div > div > input').type('83705173')
    cy.get('#corpo > div > div.secao-principal.row-fluid > div > div:nth-child(2) > div.span5 > div > div.acoes-produto.disponivel.SKU-SHAF-1078 > div.comprar > a').click()
    cy.get('#corpo > div > div.secao-principal.row-fluid > div > form > div > div.span12 > button').click()
    cy.get('#corpo > div > div.secao-principal.row-fluid > div > div.caixa-sombreada > table > tbody > tr:nth-child(3) > td:nth-child(2) > div > ul > li:nth-child(3) > label > input[type=radio]').click
    cy.get('#id_email_login').type('i.garces@nordware.io')
    cy.get('#formularioLogin > div > div.control-group > a').click()
    
});

it('Preencher formulário',function () {
    cy.get('#id_senha').type('teste')
    cy.get('#id_confirmacao_senha').type('teste')
    cy.get('#id_nome').type('Anthony Calebe Rodrigues')
    cy.get('#id_cpf').type('190.416.888-46')
    cy.get('#id_telefone_celular').type('63994093486')
    cy.get('#id_numero').type('123')
    cy.get('#radio-cartao').click()
    cy.get('#cartao_cartao_numero').type('5414789982267566')
    cy.get('#cartao_cartao_data_expiracao').type('0925')
    cy.get('#cartao_cartao_nome').type('Anthony Calebe Rodrigues')
    cy.get('#cartao_cartao_cvv').type('946')
    cy.get('#cartao_cartao_parcelas').click()
    cy.get('#cartao_cartao_parcelas > option:nth-child(2)').click()
    cy.get('#finalizarCompra').click()

});




/* ==== Test Created with Cypress Studio ==== */
it('CN001 - Teste', function() {
    /* ==== Generated with Cypress Studio ==== */
    cy.visit('https://www.demandas.homologacao.spsempapel.sp.gov.br/');
    /* ==== End Cypress Studio ==== */
    /* ==== Generated with Cypress Studio ==== */
    cy.get('#usucpf').clear();
    cy.get('#usucpf').type('48.361.145-869');
    cy.get('#ususenha').clear();
    cy.get('#ususenha').type('simecdti');
    cy.get('.btn').click();
    cy.get('.form-group > .form-control').select('283');


    /* ==== Generated with Cypress Studio ==== */
    cy.get('.fa-th-large').click();
    cy.get('.active > .nav > :nth-child(2) > a').click();
    /* ==== End Cypress Studio ==== */
    /* ==== Generated with Cypress Studio ==== */
    cy.get('#\\39  > .text-center > a > .btn').click();
    /* ==== End Cypress Studio ==== */
    /* ==== Generated with Cypress Studio ==== */
    cy.get('.row > :nth-child(3) > .btn').click();
    /* ==== End Cypress Studio ==== */

    /* ==== Generated with Cypress Studio ==== */
    cy.get('a.btn > strong').click();
    cy.wait(1000)
    /* ==== End Cypress Studio ==== */
    /* ==== Generated with Cypress Studio ==== */
    cy.get('.bo_recursosfinanceiros_t').click();
    cy.wait(1000)
    /* ==== End Cypress Studio ==== */
    /* ==== Generated with Cypress Studio ==== */
    cy.get('#co_catalogo_chosen > .chosen-single > span').click();
    cy.wait(1000)
    cy.get('#co_catalogo_chosen > .chosen-drop > .chosen-search > input').clear();
    cy.get('#co_catalogo_chosen > .chosen-drop > .chosen-search > input').type('742').click();
    cy.get('.active-result').click();
    /* ==== End Cypress Studio ==== */

    /* ==== Generated with Cypress Studio ==== */
    cy.get('#ddtid_chosen > .chosen-single > span').click();
    cy.get('#ddtid_chosen > .chosen-drop > .chosen-search > input').type('aguas de sao pedro');
    cy.get('#ddtid_chosen > .chosen-drop > .chosen-results > .active-result').click();
    /* ==== End Cypress Studio ==== */


    /* ==== Generated with Cypress Studio ==== */
    cy.get('.ibox-footer > .col-lg-12 > .btn-primary').click();
    cy.get('.swal2-confirm').click();
    /* ==== End Cypress Studio ==== */

    /* ==== Generated with Cypress Studio ==== */
    cy.get('.panel-primary > .panel-heading').click();
    cy.get('#nu_valor_pre_cadastro').clear();
    cy.get('#nu_valor_pre_cadastro').type('R$ 1.000,00');
    cy.get('#ds_natureza_despesa').clear();
    cy.get('#ds_natureza_despesa').type('teste');
    cy.get('#nm_objeto_demanda').clear();
    cy.get('#nm_objeto_demanda').type('teste');
    cy.get('#botao-salvar-formulario-pre-dados-demanda').click();
    cy.get('.swal2-confirm').click();
    /* ==== End Cypress Studio ==== */

    /* ==== Generated with Cypress Studio ==== */
    cy.get('button[type="button"][alt="Encaminhar para liberação"]').click();
    cy.get('.swal2-confirm').click();
    cy.wait(5000)
    cy.get('button[type="button"][class="swal2-confirm swal2-styled swal2-default-outline"]').click();

    /* ==== Generated with Cypress Studio ==== */
    cy.get('[data-analise="8858"][data-analise-exibir="1"] > .panel-heading > .panel-title').click();
    cy.get('.em_analise_8858_A').click();
    cy.get('button.confirm').contains('Sim').click()
    console.log()
    //cy.get('.confirm').click();
    cy.wait(10000)

    // Seleciona parecer "Reprovado"
    cy.get('button[type="button"]').contains('Reprovação').click()

    // "Atenção - Você deseja realmente reprovar esta análise? Tal ação impedirá o prosseguimento para a próxima etapa" "Sim"
    cy.get('button.confirm').contains('Sim').click()

    // "Carregar parecer padrão / Deseja carregar o parecer padrão? "Sim"
    cy.get('button.confirm').contains('Sim').click()

    // Seleciona parecer "Aprovado"
    cy.get('button[type="button"]').contains('Aprovação').click()

    // "Carregar parecer padrão / Deseja carregar o parecer padrão? "Sim"
    cy.get('button.confirm').contains('Sim').click()
    /* ==== Generated with Cypress Studio ==== */
    cy.get('.col-md-10 > :nth-child(1) > .col-12 > :nth-child(3) > :nth-child(3) > :nth-child(2) > div.col-sm-12 > .note-editor > .note-editing-area > .note-editable > p').should('have.text', 'Aprovado automaticamente.');
    cy.get('.col-md-10 > :nth-child(1) > .col-12 > :nth-child(3) > :nth-child(3) > :nth-child(2) > div.col-sm-12 > .note-editor > .note-editing-area > .note-editable').should('be.visible');
    /* ==== End Cypress Studio ==== */


    /* ==== Generated with Cypress Studio ==== */
    cy.get('.col-md-10 > :nth-child(1) > .col-12 > :nth-child(3) > :nth-child(3) > :nth-child(2) > div.col-sm-12 > .note-editor > .note-editing-area > .note-editable > p').click();
    cy.get('#conteudo-painel-analise-8858 > :nth-child(2) > .col-12 > .p-2 > .btn-primary > .fa').click();
    cy.get('.swal2-confirm').click();
    /* ==== End Cypress Studio ==== */
});
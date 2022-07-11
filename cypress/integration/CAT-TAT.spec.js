// CAT-TAT.spec.js created with Cypress
//
// Start writing your Cypress tests below!
// If you're unfamiliar with how Cypress works,
// check out the link below and learn how to write your first test:
// https://on.cypress.io/writing-first-test

/// <reference types='Cypress' />

describe("Central de Atendimento ao Cliente TAT", () => {
  beforeEach(function () {
    cy.visit("./src/index.html");
  });

  it("verifica o título da aplicação", function () {
    cy.title().should("be.equal", "Central de Atendimento ao Cliente TAT");
  });

  it("1  preenche os campos obrigatórios e envia o formulário", function () {
    cy.get("#firstName").type("Marcos Paulo");
    cy.get("#lastName").type("Soares Silva");
    cy.get("#email").type("email@teste.com");
    cy.get("#phone").type("1198766789").should("have.value", "1198766789");
    cy.get("#open-text-area").type("estou precisando de dinheiro", {
      delay: 0,
    });
    cy.get('.button[type="submit"]').click();
    cy.get(".success > strong").should("be.visible");
  });

  it("2- exibe mensagem de erro ao submeter o formulário com um email com formatação inválida", function () {
    cy.get("#firstName").type("Marcos Paulo");
    cy.get("#lastName").type("Soares Silva");
    cy.get("#email").type("emaiestecom");
    cy.get("#phone").type("1198766789");
    cy.get("#open-text-area").type("estou precisando de dinheiro", {
      delay: 10,
    });
    cy.get('.button[type="submit"]').click();
    cy.get(".error > strong").should("be.visible");
  });

  it("3- campo telefone continua vazio ao preencher com nao numericos", function () {
    cy.get("#firstName").type("Marcos Paulo");
    cy.get("#lastName").type("Soares Silva");
    cy.get("#email").type("email@teste.com");
    cy.get("#phone").type("abcdefghijk").should("have.value", "");
    cy.get("#open-text-area").type("estou precisando de dinheiro", {
      delay: 0,
    });
  });

  it("4- exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário", function () {
    cy.get("#firstName").type("Marcos Paulo");
    cy.get("#lastName").type("Soares Silva");
    cy.get("#email").type("email@teste.com");
    cy.get("#phone-checkbox").check().should("be.checked", true);
    cy.get("#open-text-area").type("estou precisando de dinheiro");
    cy.get('.button[type="submit"]').click();
    cy.get(".error").should("be.visible");
  });

  it("5- preenche e limpa os campos nome, sobrenome, email e telefone", function () {
    cy.get("#firstName")
      .type("Marcos Paulo")
      .should("have.value", "Marcos Paulo")
      .clear()
      .should("have.value", "");
    cy.get("#lastName")
      .type("Soares Silva")
      .should("have.value", "Soares Silva")
      .clear()
      .should("have.value", "");
    cy.get("#email")
      .type("emaiestecom")
      .should("have.value", "emaiestecom")
      .clear()
      .should("have.value", "");
    cy.get("#phone")
      .type("1198766789")
      .should("have.value", "1198766789")
      .clear()
      .should("have.value", "");
    cy.get(".button").click();
    cy.get(".error > strong").should("be.visible");
  });

  it("6- exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios", function () {
    cy.get('.button[type="submit"]').click();
    cy.get(".error").should("be.visible");
  });

  it("7- envia o formulário com sucesso usando um comando customizado 8 - contains", function () {
    cy.fillMandatoryFieldsAndSubmit();
  });

  // AULA 3 DO CURSO
  it("seleciona um produto (YouTube) por seu texto", function () {
    cy.get("#product").select("youtube").should("have.value", "youtube");
  });

  it("1- seleciona um produto (Mentoria) por seu valor (value)", function () {
    cy.get("#product").select("mentoria").should("have.value", "mentoria");
  });

  it("2- seleciona um produto (Mentoria) por seu valor (value)", function () {
    cy.get("#product").select(1).should("have.value", "blog");
  });

  // AULA 4 DO CURSO

  it("1- marca o tipo de atendimento Feedback", function () {
    cy.get('input[type="radio"][value="feedback"]').check();
  });

  it("2- marca cada tipo de atendimento/radio", function () {
    cy.get('input[type="radio"]')
      .should("have.length", 3)
      .each(($el) => {
        cy.wrap($el).check({ delay: 0 }).should("be.checked");
      });
  });

  it("marca ambos checkboxes, depois desmarca o último", function () {
    cy.get('div[id="check"] > input')
      .check()
      .last()
      .uncheck()
      .should("be.not.checked");
  });

  it("seleciona um arquivo da pasta fixtures", function () {
    cy.get("#file-upload")
      .selectFile("./cypress/fixtures/example.json")
      .should(function ($input) {
        console.log($input);
        expect($input[0].files[0].name).to.equal("example.json");
      });
  });

  it("seleciona um arquivo simulando um drag-and-drop", function () {
    cy.get("#file-upload")
      .selectFile("./cypress/fixtures/example.json", { action: "drag-drop" })
      .should(function ($input) {
        console.log($input);
        expect($input[0].files[0].name).to.equal("example.json");
      });
  });
  it("seleciona um arquivo utilizando uma fixture para a qual foi dada um alias", function () {
    cy.fixture("example.json")
      .as("sampleFile")
      .get("#file-upload")
      .selectFile("@sampleFile", { action: "drag-drop" })
      .should(function ($input) {
        console.log($input);
        expect($input[0].files[0].name).to.equal("example.json");
      });
  });

  it("verifica que a política de privacidade abre em outra aba sem a necessidade de um clique", function () {
    cy.get('a[href="privacy.html"]').should("have.attr", "target", "_blank");
  });

  it("acessa a página da política de privacidade removendo o target e então clicanco no link", function () {
    cy.get('a[href="privacy.html"]')
      .invoke("removeAttr", "target")
      .click()
      .url()
      .should("contains", "privacy.html");

    cy.contains("Talking About Test");
  });

  it("testa a página da política de privavidade de forma independente", function () {
    cy.get('a[href="privacy.html"]').invoke("removeAttr", "target");
  });
});

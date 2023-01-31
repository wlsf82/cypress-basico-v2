/// <reference types="Cypress" />

describe("Central de Atendimento do Cliente TAT", function () {
  beforeEach(() => {
    cy.visit("./src/index.html");
  });
  it("verifivar titulo da aplicação", function () {
    cy.title().should("be.equal", "Central de Atendimento ao Cliente TAT");
  });

  it("preenche os campos obrigatórios e envia o formulário", function () {
    const longText =
      "Lorem ipsum dolor sit amet. Sit omnis delectus id voluptatem facilis aut molestias vitae ut saepe dolores et dolore corrupti? Ad doloremque quasi quo neque nesciunt ea sunt officiis aut velit sunt vel corporis dolorum";
    cy.get("#firstName").type("Alice");
    cy.get("#lastName").type("Silva");
    cy.get("#email").type("e@mail.com");
    cy.get("#open-text-area").type(longText, { delay: 0 });
    cy.contains("button", "Enviar").click();
    cy.get(".success").should("be.visible");
  });

  it("exibe mensagem de erro ao submeter o formulário com um email com formatação inválida", function () {
    cy.get("#firstName").type("Alice");
    cy.get("#lastName").type("Silva");
    cy.get("#email").type("e@com");
    cy.get("#open-text-area").type("Entre em contato");
    cy.contains("button", "Enviar").click();
    cy.get(".error").should("be.visible");
  });

  it("validar que, se um valor não numérico for digitado, seu valor continuará vazio.", function () {
    cy.get("#phone").type("eteste").should("have.value", "");
  });

  it("exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário", function () {
    cy.get("#firstName").type("Alice");
    cy.get("#lastName").type("Silva");
    cy.get("#email").type("e@test.com.br");
    cy.get("#phone-checkbox").check();
    cy.get("#open-text-area").type("Entre em contato");
    cy.get('button[type="submit"]').click();
    cy.get(".error").should("be.visible");
  });

  it("preenche e limpa os campos nome, sobrenome, email e telefone", function () {
    cy.get("#firstName")
      .type("Alice")
      .should("have.value", "Alice")
      .clear()
      .should("have.value", "");
    cy.get("#lastName")
      .type("Silva")
      .should("have.value", "Silva")
      .clear()
      .should("have.value", "");
    cy.get("#email")
      .type("e@test.com.br")
      .should("have.value", "e@test.com.br")
      .clear()
      .should("have.value", "");
    cy.get("#phone")
      .type("31996055668")
      .should("have.value", "31996055668")
      .clear()
      .should("have.value", "");
  });

  it("exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios", function () {
    cy.contains("button", "Enviar").click();
    cy.get(".error").should("be.visible");
  });

  it("envia o formuário com sucesso usando um comando customizado", function () {
    cy.fillMandatoryFieldsAndSubmit();
    cy.get(".success").should("be.visible");
  });

  it("seleciona um produto (YouTube) por seu texto", function () {
    cy.get("#product").select("youtube").should("have.value", "youtube");
  });

  it("seleciona um produto (Mentoria) por seu valor (value)", function () {
    cy.get("#product").select("mentoria").should("have.value", "mentoria");
  });

  it("seleciona um produto (Blog) por seu índice", function () {
    cy.get("#product").select(1).should("have.value", "blog");
  });

  it('marca o tipo de atendimento "Feedback"', function () {
    cy.get('input[value="feedback"]').check().should("have.value", "feedback");
  });

  it("marca cada tipo de atendimento", function () {
    cy.get('input[type="radio"]')
      .should("have.length", 3)
      .each(function ($radio) {
        cy.wrap($radio).check();
        cy.wrap($radio).should("be.checked");
      });
  });
  it("marca ambos checkboxes, depois desmarca o último", function () {
    cy.get('input[type="checkbox"]')
      .as("checkboxes")
      .check()
      .should("be.checked")
      .last()
      .uncheck()
      .should("not.be.checked");
  });

  it("seleciona um arquivo da pasta fixtures", function () {
    cy.get('input[type="file"]')
      .should("not.have.value")
      .selectFile("cypress/fixtures/example.json")
      .should(function ($input) {
        expect($input[0].files[0].name).to.equal("example.json");
      });
  });

  it("seleciona um arquivo simulando um drag-and-drop", function () {
    cy.get('input[type="file"]')
      .should("not.have.value")
      .selectFile("cypress/fixtures/example.json", { action: "drag-drop" })
      .should(function ($input) {
        expect($input[0].files[0].name).to.equal("example.json");
      });
  });

  it("seleciona um arquivo utilizando uma fixture para a qual foi dada um alias", function () {
    cy.fixture("example.json").as("sampleFile");
    cy.get('input[type="file"]')
      .selectFile("@sampleFile")
      .should(function ($input) {
        expect($input[0].files[0].name).to.equal("example.json");
      });
  });

  it("verifica que a política de privacidade abre em outra aba sem a necessidade de um clique", function () {
    cy.get("#privacy a").should("have.attr", "target", "_blank");
  });

  it("acessa a página da política de privacidade removendo o target e então clicando no link", function () {
    cy.get('a[href="privacy.html"]').invoke("removeAttr", "target").click();

    cy.contains("Talking About Testing").should("be.visible");
  });
});

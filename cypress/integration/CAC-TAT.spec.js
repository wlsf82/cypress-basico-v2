/// <reference types="Cypress" />

describe("Central de Atendimento ao Cliente TAT", function () {
  beforeEach(() => {
    cy.visit("./src/index.html");
  });

  it("verifica o título da aplicação", function () {
    cy.title().should("eq", "Central de Atendimento ao Cliente TAT");
  });

  it("preenche os campos obrigatórios e envia o formulário", () => {
    cy.get("#firstName").type("Bruno");
    cy.get("#lastName").type("Bacelar");
    cy.get("#email").type("bruno.bacelar@live.com");
    cy.get("#open-text-area").type(
      "Mussum Ipsum, cacilds vidis litro abertis. Admodum accumsan disputationi eu sit. Vide electram sadipscing et per.Mais vale um bebadis conhecidiss, que um alcoolatra anonimis.Diuretics paradis num copo é motivis de denguis.Vehicula non. Ut sed ex eros. Vivamus sit amet nibh non tellus tristique interdum.",
      { delay: 0 }
    );

    cy.contains("button", "Enviar").click();

    cy.get(".success").should("be.visible");
  });

  it("exibe mensagem de erro ao submeter o formulário com um email com formatação inválida", () => {
    cy.get("#firstName").type("Bruno");
    cy.get("#lastName").type("Bacelar");
    cy.get("#email").type("bruno.bacelar@live");
    cy.get("#open-text-area").type(
      "Mussum Ipsum, cacilds vidis litro abertis. Admodum accumsan disputationi eu sit. Vide electram sadipscing et per.Mais vale um bebadis conhecidiss, que um alcoolatra anonimis.Diuretics paradis num copo é motivis de denguis.Vehicula non. Ut sed ex eros. Vivamus sit amet nibh non tellus tristique interdum.",
      { delay: 0 }
    );

    cy.contains("button", "Enviar").click();

    cy.get(".error").should("be.visible");
  });

  it("mantém campo de telefone vazio ao digitar um valor não-numérico", () => {
    cy.get("#phone").type("abc").should("be.empty");
  });

  it("exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário", () => {
    cy.get("#firstName").type("Bruno");
    cy.get("#lastName").type("Bacelar");
    cy.get("#email").type("bruno.bacelar@live");
    cy.get("#phone-checkbox").check();

    cy.get("#open-text-area").type(
      "Mussum Ipsum, cacilds vidis litro abertis. Admodum accumsan disputationi eu sit. Vide electram sadipscing et per.Mais vale um bebadis conhecidiss, que um alcoolatra anonimis.Diuretics paradis num copo é motivis de denguis.Vehicula non. Ut sed ex eros. Vivamus sit amet nibh non tellus tristique interdum.",
      { delay: 0 }
    );

    cy.contains("button", "Enviar").click();

    cy.get(".error").should("be.visible");
  });

  it("preenche e limpa os campos nome, sobrenome, email e telefone", () => {
    cy.get("#firstName")
      .type("Bruno")
      .should("have.value", "Bruno")
      .clear()
      .should("be.empty");

    cy.get("#lastName")
      .type("Bacelar")
      .should("have.value", "Bacelar")
      .clear()
      .should("be.empty");

    cy.get("#email")
      .type("bruno.bacelar@live.com")
      .should("have.value", "bruno.bacelar@live.com")
      .clear()
      .should("be.empty");

    cy.get("#phone")
      .type("71981813526")
      .should("have.value", "71981813526")
      .clear()
      .should("be.empty");
  });

  it("exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios", () => {
    cy.contains("button", "Enviar").click();

    cy.get(".error").should("be.visible");
  });

  it("envia o formuário com sucesso usando um comando customizado", () => {
    cy.fillMandatoryFieldsAndSubmit();

    cy.get(".success").should("be.visible");
  });

  it("seleciona um produto (YouTube) por seu texto", () => {
    cy.get("#product").select("YouTube").should("have.value", "youtube");
  });

  it("seleciona um produto (Mentoria) por seu valor (value)", () => {
    cy.get("#product").select("mentoria").should("have.value", "mentoria");
  });

  it("seleciona um produto (Blog) por seu índice", () => {
    cy.get("#product").select(1).should("have.value", "blog");
  });

  it('marca o tipo de atendimento "Feedback"', () => {
    cy.get('input[type="radio"][value="feedback"')
      .check()
      .should("have.value", "feedback");
  });

  it("marca cada tipo de atendimento", () => {
    cy.get('input[type="radio"]').each((value) => {
      cy.wrap(value).check().should("be.checked");
    });
  });

  it("marca ambos checkboxes, depois desmarca o último", () => {
    cy.get('input[type="checkbox"]').check().should("be.checked");

    cy.get('input[type="checkbox"]').last().uncheck().should("not.be.checked");
  });

  it("seleciona um arquivo da pasta fixtures", () => {
    cy.get("#file-upload")
      .selectFile("cypress/fixtures/example.json")
      .then((input) => {
        expect(input[0].files[0].name).to.eq("example.json");
      });
  });

  it("seleciona um arquivo simulando um drag-and-drop", () => {
    cy.get("#file-upload")
      .selectFile("cypress/fixtures/example.json", { action: "drag-drop" })
      .then((input) => {
        expect(input[0].files[0].name).to.eq("example.json");
      });
  });

  it("seleciona um arquivo utilizando uma fixture para a qual foi dada um alias", () => {
    cy.fixture("example.json").as("exampleJson");

    cy.get("#file-upload")
      .selectFile("@exampleJson", { action: "drag-drop" })
      .then((input) => {
        expect(input[0].files[0].name).to.eq("example.json");
      });
  });

  it("verifica que a política de privacidade abre em outra aba sem a necessidade de um clique", () => {
    cy.contains("a", "Política de Privacidade").should(
      "have.attr",
      "target",
      "_blank"
    );
  });

  it("acessa a página da política de privacidade removendo o target e então clicanco no link", () => {
    cy.contains("a", "Política de Privacidade")
      .should("have.attr", "target", "_blank")
      .invoke("removeAttr", "target")
      .click();

    cy.url().should("include", "privacy.html");
  });
});

describe("Política de privacidade", () => {
  it("testa a página da política de privavidade de forma independente", () => {
    cy.visit("./src/privacy.html");

    cy.title().should(
      "eq",
      "Central de Atendimento ao Cliente TAT - Política de privacidade"
    );
  });
});

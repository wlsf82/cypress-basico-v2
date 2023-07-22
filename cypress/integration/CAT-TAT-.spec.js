describe("aula 01 - 02 ", () => {
  beforeEach(() => {
    cy.visit("./src/index.html");
  });

  it("Verificar titulo da aplicaçao", () => {
    cy.title().should("be.equal", "Central de Atendimento ao Cliente TAT");
  });
  it("preenche os campos obrigatórios e envia o formulário", () => {
    cy.get("#firstName").type("Vitor", { delay: 1 });
    cy.get("#lastName").type("Melo");
    cy.get("#email").type("vitor@email.com");
    cy.get("#open-text-area").type("Esta é uma observaçao", { delay: 100 });
    cy.contains(".button", "Enviar").click();

    cy.get(".success").should("be.visible");
  });

  it("exibe mensagem de erro ao submeter o formulário com um email com formatação inválida", () => {
    cy.get("#email").type("vitoremail.com");
    cy.contains(".button", "Enviar").click();
    cy.get(".error").should("be.visible");
  });

  it("Não deve escrever letra no telefone", () => {
    cy.get("#phone").type("abcabc").should("is.empty");
  });

  it("exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário", () => {
    cy.get("#firstName").type("Vitor", { delay: 1 });
    cy.get("#lastName").type("Melo");
    cy.get("#email").type("vitor@email.com");
    cy.get("#phone-checkbox").check();
    cy.get("#open-text-area").type("Esta é uma observaçao");
    cy.contains(".button", "Enviar").click();
    cy.get(".error").should("be.visible");
  });

  it("preenche e limpa os campos nome, sobrenome, email e telefone", () => {
    cy.get("#firstName")
      .type("Vitor")
      .should("have.value", "Vitor")
      .clear()
      .should("have.value", "");

    cy.get("#lastName")
      .type("Melo")
      .should("have.value", "Melo")
      .clear()
      .should("have.value", "");

    cy.get("#email")
      .type("vitor@email.com")
      .should("have.value", "vitor@email.com")
      .clear()
      .should("have.value", "");

    cy.get("#phone")
      .type("123123123")
      .should("have.value", "123123123")
      .clear()
      .should("have.value", "");
  });

  it("exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios", () => {
    cy.contains(".button", "Enviar").click();
    cy.get(".error").should("be.visible");
  });

  it("preenche os campos obrigatórios e envia o formulário pt2", () => {
    cy.fillMandatoryFieldsAndSubmit();
    cy.get(".success").should("be.visible");
  });
});

describe("aula 03 - ", () => {
  beforeEach(() => {
    cy.visit("./src/index.html");
  });

  it("seleciona um produto (YouTube) por seu texto", () => {
    cy.get("select").select("youtube").should("have.value", "youtube");
  });
  it.only("seleciona um produto (Blog) por seu índice", () => {
    cy.get("select").select(1).should("have.value", "blog");
  });
});

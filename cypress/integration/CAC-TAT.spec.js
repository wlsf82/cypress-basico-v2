{
  /* <reference types="Cypress" />   */
}

// Inicia uma suite de testes para a "Central de Atendimento ao Cliente TAT"
describe("Central de atendimento ao Cliente TAT", function () {
  beforeEach(function () {
    // Para acessar a página principal da aplicação
    cy.visit("./src/index.html");
  });

  it("verifica o título da aplicação", function () {
    // Para verificar se o título da página é exatamente "Central de Atendimento ao Cliente TAT"
    cy.title().should("be.equal", "Central de Atendimento ao Cliente TAT");
  });

  // Teste 01
  it("preenche os campos obrigatórios e envia o formulário", function () {
    const longText =
      "Texto longo, Texto longo, Texto longo, Texto longo, Texto longo, Texto longo, Texto longo, Texto longo, Texto longo, Texto longo, Texto longo, Texto longo.";
    cy.get("#firstName").type("Pedro");
    cy.get("#lastName").type("Monteiro");
    cy.get("#email").type("pedro@exemplo.com");
    cy.get("#open-text-area").type(longText, { delay: 0 });
    cy.get('button[type="submit"]').click();

    cy.get(".success").should("be.visible");
  });

  //Teste 02
  it("exibe mensagem de erro ao submeter o formulário com um email com formato inválido", function () {
    cy.get("#firstName").type("Pedro");
    cy.get("#lastName").type("Monteiro");
    cy.get("#email").type("pedro@exemplo,com"); // Digita um email inválido no campo com ID "email"
    cy.get("#open-text-area").type("Teste");
    cy.get('button[type="submit"]').click();

    // Verifica se o elemento com a classe "error" está visível, indicando um erro
    cy.get(".error").should("be.visible");
  });

  // Testando o campo numérico
  it("campo telefone continua vazio quando preenchido com valor não-numérico", function () {
    cy.get("#phone").type("abcdefghijk").should("have.value", "");
  });

  // Teste 03
  it("exibe mensagem de erro ao submeter o formulário com um email com formato inválido", function () {
    cy.get("#firstName").type("Pedro");
    cy.get("#lastName").type("Monteiro");
    cy.get("#email").type("pedro@exemplo.com");
    cy.get("#phone-checkbox").click(); // Checa a funcionalidade do checkbox
    cy.get("#open-text-area").type("Teste");
    cy.get('button[type="submit"]').click();

    // Verifica se o elemento com a classe "error" está visível, indicando um erro
    cy.get(".error").should("be.visible");
  });

  // Teste 04
  //Usando o clear() para limpar o campo
  it("preenche e limpa os campos nome, sobrenome, email e telefone", function () {
    cy.get("#firstName")
      .type("Pedro")
      .should("have.value", "Pedro")
      .clear()
      .should("have.value", "");
    cy.get("#firstName")
      .type("Monteiro")
      .should("have.value", "Monteiro")
      .clear()
      .should("have.value", "");
    cy.get("#email")
      .type("pedro@exemplo.com")
      .should("have.value", "pedro@exemplo.com")
      .clear()
      .should("have.value", "");
    cy.get("#phone")
      .type("1234567890")
      .should("have.value", "1234567890")
      .clear()
      .should("have.value", "");
  });

  // Teste 05
  it("exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios", function () {
    cy.get('button[type="submit"]').click();

    // Verifica se o elemento com a classe "error" está visível, indicando um erro
    cy.get(".error").should("be.visible");
  });

  // Teste 06
  // Usando comandos customizados
  it("envia o formulário com sucesso usando um comando customizado", function () {
    cy.fillMandatoryFieldsAndSubmit();

    // Verifica se o elemento com a classe "error" está visível, indicando um erro
    cy.get(".success").should("be.visible");
  });

  // Teste 07
  it("identifica o botão de Enviar usando a  funcionalidade contains", function () {
    cy.get("#firstName").type("Pedro");
    cy.get("#lastName").type("Monteiro");
    cy.get("#email").type("pedro@exemplo.com");
    cy.get("#open-text-area").type("Teste");
    cy.contains("button", "Enviar").click();

    // Verifica se o elemento com a classe "error" está visível, indicando um erro
    cy.get(".success").should("be.visible");
  });

  // SEGUNDO MÓDULO

  // Teste 01
  it("seleciona um produto por (Youtube) por seu texto", function () {
    cy.get("#product")
      .select("YouTube") // Seleciona pelo texto (YouTube)
      .should("have.value", "youtube");
  });

  it("seleciona um produto por (Mentoria) por seu valor (value)", function () {
    cy.get("#product")
      .select("mentoria") // Seleciona pelo valor (value)
      .should("have.value", "mentoria");
  });

  it("seleciona um produto por (Blog) por seu Índece", function () {
    cy.get("#product")
      .select(1) // Seleciona pelo valor (value)
      .should("have.value", "blog");
  });

  // Teste 02
  // Marcando inputs do tipo radio
  it('marca o tipo de atendimento "Feedback"', function () {
    cy.get('input[type="radio"]').check().should("be.checked");
  });

  // Teste 03
  it("marca o tipo de atendimento", function () {
    cy.get('input[type="radio"]')
      .should("have.length", 3)
      .each(function ($radio) {
        cy.wrap($radio).check();
        cy.wrap($radio).should("be.checked");
      });
  });

  // Teste 04
  it("marca ambos checkboxes, depois desmarca o último", function () {
    cy.get('input[type="checkbox"]')
      .check()
      .should("be.checked")
      .last()
      .uncheck()
      .should("not.be.checked");
  });

  // Teste 05
  it("exibe mensagem de erro quando o telefone se torna obrigatório mas não é enviado", function () {
    cy.get("#firstName").type("Pedro");
    cy.get("#lastName").type("Monteiro");
    cy.get("#email").type("pedro@exemplo.com");
    cy.get("#phone-checkbox").check(); // Checa a funcionalidade do checkbox
    cy.get("#open-text-area").type("Teste");
    cy.get('button[type="submit"]').click();

    // Verifica se o elemento com a classe "error" está visível, indicando um erro
    cy.get(".error").should("be.visible");
  });

  // TERCEIRO MÓDULO
  
  // Teste 01
  it("seleciona um arquivo da pasta fixtures", function () {
    cy.get('input[type="file"]')
      .should("not.have.value")
      .selectFile("./cypress/fixtures/example.json")
      .should(function ($input) {
        expect($input[0].files[0].name).to.equal("example.json");
      });
  });

  // Teste 02
  it("seleciona um arquivo simulando um drag-and-drop", function () {
    // Seleciona o elemento de input do tipo "file" para realizar o upload de arquivo
    cy.get('input[type="file"]')
      // Verifica se o input inicialmente não possui nenhum arquivo selecionado
      .should("not.have.value")

      // Usa o comando `selectFile` para simular o upload do arquivo "example.json"
      // A opção `{ action: 'drag-drop' }` simula uma ação de arrastar e soltar
      .selectFile("./cypress/fixtures/example.json", { action: "drag-drop" })

      // Valida se o arquivo foi selecionado com sucesso
      .should(function ($input) {
        // Verifica se o nome do primeiro arquivo selecionado é "example.json"
        expect($input[0].files[0].name).to.equal("example.json");
      });
  });

  // Teste 03
  it("seleciona um arquivo utilizanddo uma fixture para o qual foi dada uma alias", function () {
    cy.fixture("example.json").as("sampleFile");
    cy.get('input[type="file"]')
      .selectFile("@sampleFile")
      // Valida se o arquivo foi selecionado com sucesso
      .should(function ($input) {
        // Verifica se o nome do primeiro arquivo selecionado é "example.json"
        expect($input[0].files[0].name).to.equal("example.json");
      });
  });

  it("verifica que a política de privacidade abre em outra aba sem necessidade de um clique", () => {
    cy.get("#privacy a").should("have.attr", "target", "_blank");
  });

  it.only("acessa a página da política de privacidade removendo o target e então clicando no link", () => {
    cy.get("#privacy a").invoke("removeAttr", "target").click();

    cy.contains("Talking About Testing").should("be.visible");
  });
});

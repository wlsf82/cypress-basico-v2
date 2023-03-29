// CAC-TAT.spec.js created with Cypress
//
// Start writing your Cypress tests below!
// If you're unfamiliar with how Cypress works,
// check out the link below and learn how to write your first test:
// https://on.cypress.io/writing-first-test



describe('Central de Atendimento ao Cliente TAT', function(){  
    // Variáveis de input
    var delay = 200,    
            firstName = 'Some Name', 
            lastName = 'Some LastName', 
            email = 'somemail@mail.com', 
            openTextArea = 'Inserting some text just to fill this blooding field',
            phone = '123456789';

    let mensagemErroMap = "span[class = 'error']",
        phoneCheckBoxMap = "input[id = 'phone-checkbox']",
        requiredMarkPhoneMap = "label[for = 'phone'] > span[class = 'phone-label-span required-mark']";

    beforeEach(() =>{
        cy.visit('./src/index.html');
        cy.title().should('eq', 'Central de Atendimento ao Cliente TAT');
    });

    it('Escrevendo nos elementos da tela e validando os novos valores', function(){         
        cy.fillFirstNameField(firstName);
        cy.fillLastNameField(firstName);
        cy.fillEmailField(email);
        cy.fillPhoneField(phone);
    });
   
    it('Escrever os dados obrigatórios com delay e clicar em enviar', function(){
        cy.fillFirstNameField(firstName);
        cy.fillLastNameField(firstName);
        cy.fillEmailField(email);
        cy.fillPhoneField(phone);
        cy.fillOpenTextAreaField(email + firstName);
        cy.clickEnviarButton();
        cy.validateSuccessMessage();
    });

    it('Escrever E-mail com formato invalido com delay e clicar em enviar', function(){
        cy.fillFirstNameField(firstName);
        cy.fillLastNameField(firstName);
        cy.fillEmailField("email");
        cy.fillOpenTextAreaField(email + firstName);
        cy.clickEnviarButton();
        cy.get(mensagemErroMap).should('be.visible');
    });

    it('Validar se o valor para telefone é vazio em caso de digitar strings', function(){
        cy.fillPhoneField("phone", "");
    });

    it('Validar se apenas a parte numerica do telefone é inserida no campo phone', function(){
        cy.fillPhoneField(phone+"asasfasfa", phone);
    });

    it('Tonar telefone obrigatório, não preencher seu valor e clicar em enviar', function(){
        cy.fillFirstNameField(firstName);
        cy.fillLastNameField(firstName);
        cy.fillEmailField("email");
        cy.fillOpenTextAreaField(email + firstName);
        cy.get(phoneCheckBoxMap).should('be.visible')
            .check().should('be.checked');
        cy.get(requiredMarkPhoneMap).should('be.visible');
        cy.clickEnviarButton();
        cy.get(mensagemErroMap).should('be.visible');
    });
    
    it('Preencher campos, depois limpar os campos e validar que todos os campos foram limpos', function(){
        cy.fillFirstNameField(firstName)
            .clear().should('have.value', '');
        cy.fillLastNameField(lastName)
            .clear().should('have.value', '');
        cy.fillEmailField(email)
            .clear().should('have.value', '');
        cy.fillPhoneField(phone)
            .clear().should('have.value', '');
        cy.fillOpenTextAreaField(openTextArea)
            .clear().should('have.value', ''); 
    });

    it('Clicar em enviar sem preencher nenhum campo', function(){
        cy.clickEnviarButton();
        cy.get(mensagemErroMap).should('be.visible');
    });
    
    it('Capturar elemento usando o cy.contains', function(){
        cy.contains('button','Enviar').click();
    });

    it('Selecionar item de seleção suspensa por valor, id e nome', function(){
        cy.selectProduct('cursos', 'cursos');
        cy.selectProduct(3, 'mentoria');
        cy.selectProduct('YouTube', 'youtube');
    });

    it('Selecionar produto randomico da lista de produtos', function(){
        for(var i = 0; i < 6; i++)
            cy.selectARandomProduct();
    });

    it('Selecionar Opção Feedback no tipo de atendimento', function(){
       cy.selectSupportTypeOption('Ajuda');
    });

    it('Selecionar Opção Feedback no tipo de atendimento', function(){
       cy.selectAllSupportTypeOption();
    });

    it('Selecionar Checkbox', function(){
       cy.checkContactCheckbox('Email');
       cy.checkContactCheckbox('PHONE');
    });

    it('Deselecionar Checkbox', function(){
       cy.uncheckContactCheckbox('Email');
       cy.uncheckContactCheckbox('PHONE');
    });
    
    it('Checar todos os checkboxes e descheckar o ultimo', function(){
       cy.checkAllCheckboxesAndUncheckTheLast();
    });

    it('Checar todos os checkboxes e descheckar todos os checkboxes', function(){
        cy.checkAllCheckboxes();
        cy.uncheckContactCheckbox('EmAiL');
        cy.uncheckContactCheckbox('PhonE');
    });

    it.only('Escolher o arquivo da pasta fixtures', function(){
       cy.inputFileFromFixture();
    });

    it.only('Escolher o arquivo da pasta fixtures via drag and drop', function(){
       cy.inputFileFromDragNDrop();
    });

    it('Escolher o arquivo via fixtures ', function(){
       cy.inputFileFromAliasedFixture();
    });

    it('Acessar Politica de Privacidade ', function(){
       cy.accessPoliticaDePrivacidade();
    });

    it('Acessar Politica de Privacidade via Invoke ', function(){
       cy.accessPoliticaDePrivacidadeViaInvoke();
    });
    
    it('Validar Politica de Privacidade acessando o link diretamente', function(){
        cy.visitPrivacyLinkAndValidateLine2Text();
    });
});
// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

var delay = 200;

    let firstNameMap = "input[id = 'firstName']",
        lastNameMap = "input[id = 'lastName']",
        emailMap = "input[id = 'email']",
        phoneMap = "input[id = 'phone']",
        textareaMap = "textarea[id = 'open-text-area']",
        enviarButtonMap = "button[type = 'submit']",
        mensagemSucessoMap = "span[class = 'success']",
        mensagemErroMap = "span[class = 'error']",
        phoneCheckBoxMap = "input[id = 'phone-checkbox']",
        requiredMarkPhoneMap = "label[for = 'phone'] > span[class = 'phone-label-span required-mark']",
        selectProductMap = "[id = product]",
        selectProductOptionsMap = "[id = product] > option",
        checkboxesMap = "div[id = 'check'] > input[type='checkbox']",
        chooseFileMap = "[id = 'file-upload']",
        politicaDePrivacidadeMap = "[href = 'privacy.html']",
        privacyWhiteBoardMap = "[id = 'white-background']";
        

Cypress.Commands.add('fillFirstNameField', function(firstName){
    cy.get(firstNameMap).should('be.visible')
            .type(firstName, {"delay":delay}).should('have.value',firstName)
});

Cypress.Commands.add('validateSuccessMessage', function(firstName){
    cy.get(mensagemSucessoMap).should('be.visible');
});

Cypress.Commands.add('fillLastNameField', function(lastName){
    cy.get(lastNameMap).should('be.visible')
            .type(lastName, {"delay":delay}).should('have.value',lastName)
});

Cypress.Commands.add('fillEmailField', function(email){   
    cy.get(emailMap).should('be.visible')
            .type(email, {"delay":delay}).should('have.value', email)       
});

Cypress.Commands.add('fillPhoneField', function(phone, phoneValidation){
    if(phoneValidation == undefined)
        phoneValidation = phone
    cy.get(phoneMap).should('be.visible')
    .type(phone, {"delay":delay}).should('have.value', phoneValidation)
});

Cypress.Commands.add('fillOpenTextAreaField', function(openTextArea){
    cy.get(textareaMap).should('be.visible')
            .type(openTextArea, {"delay":delay}).should('have.value', openTextArea);           
});

Cypress.Commands.add('clickEnviarButton', function(){
    cy.get(enviarButtonMap).
    should('be.visible').click();
});

Cypress.Commands.add('selectProduct', function(product, valueToCompare){
    cy.get(selectProductMap).should('be.visible')
    .select(product).should('have.value', valueToCompare);
});


Cypress.Commands.add('selectARandomProduct', function(){
    cy.get(selectProductOptionsMap).as('products')
    .its('length', { log : false}).then(n =>{
         cy.get('@products', {log:false}).then($products =>{
            var randomIndex = Cypress._.random(n-1);
            if(randomIndex == 0){
                cy.log("Replacing: "+ $products[randomIndex].innerText + " for the next valid value");
                randomIndex ++;
            }
            const randomText = $products[randomIndex].innerText;
            cy.get(selectProductMap).select(randomText);
         })   
    })
});

Cypress.Commands.add('selectSupportTypeOption', function(option){
    var supportTypeMap = "[id= 'support-type'] > label > input[value = '"+option.toLowerCase()+"']";
    cy.get(supportTypeMap).should('be.visible').check().should('be.checked');
});

Cypress.Commands.add('selectAllSupportTypeOption', function(){
    var supportTypeMap = "input[type= 'radio']";
    cy.get(supportTypeMap).each(($value)=>{    
        cy.wrap($value).check().should('be.checked');   
    });
});

Cypress.Commands.add('checkContactCheckbox', function(contact){
    cy.log(contact.toLowerCase());
    var checkboxMap = "input[id= '"+contact.toLowerCase()+"-checkbox']";
    cy.get(checkboxMap).should('be.visible')
        .check().should('be.checked');
});

Cypress.Commands.add('checkAllCheckboxesAndUncheckTheLast', function(contact){
    cy.get(checkboxesMap).should('be.visible')
        .check().should('be.checked').last()
            .uncheck().should('not.be.checked');
});

Cypress.Commands.add('checkAllCheckboxes', function(){
    cy.get(checkboxesMap).should('be.visible').check().should('be.checked');   
});

Cypress.Commands.add('uncheckContactCheckbox', function(contact){
    cy.log(contact.toLowerCase());
    var checkboxMap = "input[id= '"+contact.toLowerCase()+"-checkbox']";
    cy.get(checkboxMap).should('be.visible')
    .uncheck().should('not.be.checked');
   
});

Cypress.Commands.add('inputFileFromFixture', function(){
    cy.get(chooseFileMap).should('be.visible')
        .selectFile('cypress/fixtures/example.json')
        .then((input) =>{
            cy.log(input);
            expect(input[0].files[0].name).to.equal('example.json');
        });   
});

Cypress.Commands.add('inputFileFromDragNDrop', function(){
    cy.get(chooseFileMap).should('be.visible')
        .selectFile('cypress/fixtures/example.json', {action : 'drag-drop'})
        .then((input) =>{
            cy.log(input);
            expect(input[0].files[0].name).to.equal('example.json');
        });   
});

Cypress.Commands.add('inputFileFromAliasedFixture', function(){
    cy.fixture('example.json', {encoding : null}).as('example');
    cy.get(chooseFileMap).should('be.visible')
        .selectFile('@example')
        .then((input) =>{
            cy.log(input);
            expect(input[0].files[0].name).to.equal('example.json');
            
        });   
});

Cypress.Commands.add('accessPoliticaDePrivacidade', function(){
    cy.get(politicaDePrivacidadeMap).should('have.attr','target','_blank')
});

Cypress.Commands.add('accessPoliticaDePrivacidadeViaInvoke', function(){
    cy.get(politicaDePrivacidadeMap).invoke('removeAttr','target').click();
    cy.title().should('eq', 'Central de Atendimento ao Cliente TAT - Política de privacidade');
});

Cypress.Commands.add('visitPrivacyLinkAndValidateLine2Text', function(){
    cy.visit('./src/privacy.html')
    cy.title().should('eq', 'Central de Atendimento ao Cliente TAT - Política de privacidade');
    cy.get(privacyWhiteBoardMap+"> p:nth-child(2)").should('have.text', 'Utilzamos as tecnologias HTML, CSS e JavaScript, para simular uma aplicação real.')
});
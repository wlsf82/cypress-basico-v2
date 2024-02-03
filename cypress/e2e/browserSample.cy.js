/// <reference types="Cypress"/>  
   
   describe('Browser testing', () =>{
        it('Directs the user to the login page', () => {
            cy.visit('https://notes-serverless-app.com')
            cy.contains('.nav a', 'Login')
                .should('have.attr', 'href', '/login')
                .and('not.have.attr', 'target')  //não tem atributo target
        })

        it('Directs the user to the privacy page after remove the target', () => {
            cy.visit('https://cac-tat.s3.eu-central-1.amazonaws.com/index.html')
            cy.contains('a', 'Política de Privacidade')
                .should('have.attr', 'href', 'privacy.html')
                .and('have.attr', 'target', '_blank')   
        })
    })
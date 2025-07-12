describe('TODO: name test block', () => {
    it('Entrar no sauce demo', () => {
     cy.visit('https://www.saucedemo.com/v1/')
    })

    it('Fazer login', () => {
     cy.get('[data-test="username"]').click()
     cy.get('[data-test="username"]').type('standard_user')
     cy.get('[data-test="username"]').should('have.value', 'standard_user')
     cy.get('[data-test="password"]').click()
     cy.get('[data-test="password"]').type('secret_sauce')
     cy.get('[data-test="password"]').should('have.value', 'secret_sauce')
     cy.get('#login-button').click()
     cy.url().should('eq', 'https://www.saucedemo.com/v1/inventory.html')
    })

    it('Comprar item', () => {
     cy.contains(`button`, `ADD TO CART`).click()
     cy.contains(`button`, `ADD TO CART`).click()
     cy.contains(`button`, `ADD TO CART`).click()
     cy.contains(`button`, `REMOVE`).click()
     cy.get('path').click() // TODO: use unique element selector
     cy.url().should('eq', 'https://www.saucedemo.com/v1/cart.html')
     cy.contains(`a`, `CHECKOUT`).click()
     cy.url().should('eq', 'https://www.saucedemo.com/v1/checkout-step-one.html')
     cy.get('[data-test="firstName"]').click()
     cy.get('[data-test="firstName"]').type('ariel')
     cy.get('[data-test="firstName"]').should('have.value', 'ariel')
     cy.get('[data-test="lastName"]').click()
     cy.get('[data-test="lastName"]').type('teste')
     cy.get('[data-test="lastName"]').should('have.value', 'teste')
     cy.get('[data-test="postalCode"]').click()
     cy.get('[data-test="postalCode"]').type('09370790')
     cy.get('[data-test="postalCode"]').should('have.value', '09370790')
     cy.get('input.btn_primary.cart_button').click()
     cy.url().should('eq', 'https://www.saucedemo.com/v1/checkout-step-two.html')
     cy.contains(`a`, `FINISH`).click()
     cy.url().should('eq', 'https://www.saucedemo.com/v1/checkout-complete.html')
    })
  })


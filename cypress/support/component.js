Cypress.on('fail', (error, runnable) => {
  debugger

  // we now have access to the err instance
  // and the mocha runnable this failed on

  throw error // throw error to have test still fail
})

it('calls the "fail" callback when this test fails', () => {
  // when this cy.get() fails the callback
  // is invoked with the error
  cy.get('element-that-does-not-exist')
})
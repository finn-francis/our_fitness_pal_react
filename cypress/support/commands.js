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
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })

Cypress.Commands.add("login", (user) => {
  cy.setCookie('user', JSON.stringify({id: user.id, email: user.email}))
})

Cypress.Commands.add('validateAuthorizedUser', ({action, url, method}) => {
  cy.server()
  cy.route({
    method: method,
    url: url,
    status: 401,
    response: {
      error: {message: 'Unauthorized'}
    }
  })
  action()
  cy.location('pathname')
    .should('eq', '/sign_in')
})

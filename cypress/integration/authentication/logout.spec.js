import admin from '../../fixtures/users/admin.json'

describe('Logging out', () => {
  context('from a page that requires users to be logged in', () => {
    beforeEach(() => {
      cy.server()
      cy.route('GET', Cypress.env('apiUrl') + '/sessions', {sessions: []})
      cy.login(admin)
      cy.visit('/sessions')
    })

    it('redirects the user to the login page', () => {
      cy.get('#sign-out-button')
        .click()

      cy.location('pathname')
        .should('eq', '/sign_in')
    })
  })
})
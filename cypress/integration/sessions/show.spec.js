import admin from '../../fixtures/users/admin.json'
import sessionsFixture from '../../fixtures/sessions/all.json'

describe('Viewing the show page for a session', () => {
  const session = sessionsFixture[0]
  const sessionPath = `/sessions/${session.id}`
  const sessionUrl = Cypress.env('apiUrl') + sessionPath

  context('navigating directoy to the page', () => {
    beforeEach(() => {
      cy.server()
      cy.route('GET', sessionUrl, {session: session})
      cy.login(admin)
      cy.visit(sessionPath)
    })

    it('should allow the user to navigate to the show page by clicking a link on the index', () => {
      cy.get('.session-title')
        .should('contain', session.name)
        .get('.session-description')
        .should('contain', session.description)
    })
  })

  context('navigating to the page from the index', () => {
    const indexUrl = Cypress.env('apiUrl') + '/sessions'

    beforeEach(() => {
      cy.server()
      cy.route('GET', indexUrl, {sessions: sessionsFixture})
      cy.route('GET', sessionUrl, {session: session})
      cy.login(admin)
      cy.visit('/sessions')
    })

    it('should allow the user to navigate to the show page by clicking a link on the index', () => {
      cy.get(`a.view-session[href="${sessionPath}"]`)
        .click()

      cy.location('pathname')
        .should('eq', sessionPath)

      cy.get('.session-title')
        .should('contain', session.name)
        .get('.session-description')
        .should('contain', session.description)
    })
  })

  context('as an unauthorized user', () => {
    it('should not allow unauthorized users to access the page', () => {
      cy.validateAuthorizedUser({
        action: () => {cy.visit(sessionPath)},
        url: sessionUrl,
        method: 'GET'
      })
    })
  })

  context('as a user trying to access another users session', () => {
    let otherSessionPath = '/sessions/10000'
    let otherSessionUrl = Cypress.env('apiUrl') + otherSessionPath

    it('should not allow forbidden users to access the page', () => {
      cy.validateUserForbidden({
        action: () => {cy.visit(otherSessionPath)},
        url: otherSessionUrl,
        method: 'GET'
      })
    })
  })
})
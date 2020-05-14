import admin from '../../fixtures/users/admin.json'
import sessionsFixture from '../../fixtures/sessions/all.json'

describe('Viewing the show page for a session', () => {
  const session = sessionsFixture[0]
  const sessionPath = `/sessions/${session.id}`
  const sessionUrl = Cypress.env('apiUrl') + sessionPath

  beforeEach(() => {
    cy.server()
    cy.route('GET', sessionUrl, {session: session})
    cy.login(admin)
    cy.visit(sessionPath)
  })

  it.only('should allow the user to navigate to the show page by clicking a link on the index', () => {
    cy.get('.session-title')
      .should('contain', session.name)
      .get('.session-description')
      .should('contain', session.description)
  })
})
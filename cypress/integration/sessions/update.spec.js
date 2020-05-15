import admin from '../../fixtures/users/admin.json'
import sessionsFixture from '../../fixtures/sessions/all.json'

describe('Updating a session', () => {
  const session = sessionsFixture[0]
  const updatedSession = {...session, name: 'New session', description: 'This is not the previous session'}

  const sessionPath = `/sessions/${session.id}`
  const showUrl = Cypress.env('apiUrl') + sessionPath

  beforeEach(() => {
    cy.server()
    cy.route('GET', showUrl, {session: session})
    cy.login(admin)
    cy.visit(sessionPath)
  })

  context('with valid details', () => {
    beforeEach(() => {
      cy.route('PUT', showUrl, {session: updatedSession})
      cy.get('.session-title')
        .should('contain', session.name)
        .get('.session-description')
        .should('contain', session.description)
    })

    it('should update the session record', () => {
      cy.get('#session-form-button')
        .click()

      cy.get('#sessionName')
        .type(`{selectAll}${updatedSession.name}`, {force: true})

      cy.get('#sessionDescription')
        .type(`{selectAll}${updatedSession.description}`, {force: true})

      cy.get('#edit-session-modal button[type="submit"]')
        .click()

      cy.get('.session-title')
        .should('contain', updatedSession.name)
        .get('.session-description')
        .should('contain', updatedSession.description)
    })
  })

  context('with invalid details', () => {
    beforeEach(() => {
      cy.route('PUT', showUrl, {errors: {name: ['Must be unique']}})
      cy.get('.session-title')
        .should('contain', session.name)
        .get('.session-description')
        .should('contain', session.description)
    })

    it('should update the session record', () => {
      cy.get('#session-form-button')
        .click()

      cy.get('#sessionName')
        .type(`{selectAll}${updatedSession.name}`, {force: true})

      cy.get('#sessionDescription')
        .type(`{selectAll}${updatedSession.description}`, {force: true})

      cy.get('#edit-session-modal button[type="submit"]')
        .click()

      cy.get('.alert-danger')
        .should('contain', 'Must be unique')

      cy.get('.session-title')
        .should('not.contain', updatedSession.name)
        .get('.session-description')
        .should('not.contain', updatedSession.description)
    })
  })
})

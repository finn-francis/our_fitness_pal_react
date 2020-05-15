import sessionsFixture from '../../fixtures/sessions/all.json'
import admin from '../../fixtures/users/admin.json'

const session = sessionsFixture[0]
const deleteUrl = Cypress.env('apiUrl') + `/sessions/${session.id}`

describe('Deleting a session', () => {
  context('from the index', () => {
    const indexUrl = Cypress.env('apiUrl') + '/sessions'

    beforeEach(() => {
      cy.server()
      cy.route('GET', indexUrl, {sessions: sessionsFixture})
      cy.route('DELETE', deleteUrl, {session: session})
      cy.login(admin)
      cy.visit('/sessions')
      cy.get('.session-list-item')
        .should('have.length', 3)
      cy.get('#session-list :nth-child(1)')
        .should('contain', session.name)
    })

    it('should remove the session from the index', () => {
      cy.get(':nth-child(1) > .delete-session')
        .click()
        .get('.modal-content > .modal-footer > .btn-info')
        .click()

      cy.get('.session-list-item')
        .should('have.length', 2)
      cy.get('#session-list :nth-child(1)')
        .should('not.contain', session.name)
    })
  })
})
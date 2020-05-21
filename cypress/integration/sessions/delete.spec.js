import sessionsFixture from '../../fixtures/sessions/all.json'
import admin from '../../fixtures/users/admin.json'

const session = sessionsFixture[0]
const deleteUrl = Cypress.env('apiUrl') + `/sessions/${session.id}`
const showUrl = deleteUrl

describe('Deleting a session', () => {
  const indexUrl = Cypress.env('apiUrl') + '/sessions'

  beforeEach(() => {
    cy.server()
    cy.route('GET', indexUrl, {sessions: sessionsFixture})
    cy.route('DELETE', deleteUrl, {session: session})
    cy.login(admin)
  })

  context('from the index', () => {
    beforeEach(() => {
      cy.visit('/sessions')
      cy.get('.session-list-item')
        .should('have.length', 3)
      cy.get('#session-list :nth-child(1)')
        .should('contain', session.name)
    })

    const deleteSession = () => {
      cy.get(':nth-child(1) > .delete-session')
        .click()
        .get('.modal-content > .modal-footer > .btn-info')
        .click()
    }

    it('should remove the session from the index', () => {
      deleteSession()

      cy.get('.session-list-item')
        .should('have.length', 2)
      cy.get('#session-list :nth-child(1)')
        .should('not.contain', session.name)
    })

    context('as an unauthorized user', () => {
      it('should redirect the user to the sign_in page', () => {
        cy.validateAuthorizedUser({
          action: () => {deleteSession()},
          url: deleteUrl,
          method: 'DELETE'
        })
      })
    })
  })

  context('from the show page', () => {
    beforeEach(() => {
      cy.route('GET', showUrl, {session: session})
      cy.route('GET', indexUrl, {sessions: sessionsFixture.slice(1)})
      cy.visit(`/sessions/${session.id}`)
    })

    const deleteSession = () => {
      cy.get('.delete-session')
        .click('')

      cy.get('.modal-content > .modal-footer > .btn-info')
        .click()
    }

    it('should delete the session', () => {
      deleteSession()

      cy.location('pathname')
        .should('eq', '/sessions')

      cy.get('.session-list-item')
        .should('have.length', 2)

      cy.get('#session-list :nth-child(1)')
        .should('not.contain', session.name)
    })

    context('as an unauthorized user', () => {
      it('should redirect the user to the sign_in page', () => {
        cy.validateAuthorizedUser({
          action: () => {deleteSession()},
          url: deleteUrl,
          method: 'DELETE'
        })
      })
    })
  })
})
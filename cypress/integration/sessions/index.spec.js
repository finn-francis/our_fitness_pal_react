import admin from '../../fixtures/users/admin.json'
import sessionsFixture from '../../fixtures/sessions/all.json'

describe('Session index', () => {
  const indexUrl = Cypress.env('apiUrl') + '/sessions'

  context('as an authorised user', () => {
    beforeEach(() => {
      cy.login(admin)
      cy.server()
    })
    const newSessionButtonShouldShow = () => {
      return (
        cy.get('#session-modal-button')
          .should('contain', 'New Session')
      )
    }

    context('when there are existing sessions', () => {
      beforeEach(() => {
        cy.route('GET', indexUrl, {sessions: sessionsFixture})

        cy.visit('/sessions')
      })

      it('should display the sessions', () => {
        cy.get('.session-list-item')
          .should('have.length', 3)

        sessionsFixture.forEach(session => {
          cy.get(`#session-list > :nth-child(${session.id})`)
            .should('contain', session.name)
        })
        newSessionButtonShouldShow()
      })
    })

    context('when there are no existing sessions', () => {
      beforeEach(() => {
        cy.route('GET', indexUrl, {sessions: []})
        cy.visit('/sessions')
      })

      it('should display the "no sessions" message', () => {
        cy.get('.session-list-item')
          .should('have.length', 0)

        cy.get('.no-sessions')
          .contains('No sessions')

        newSessionButtonShouldShow()
      })
    })

    context("navigating to the page through the navbar", () => {
      beforeEach(() =>{
        cy.route('GET', indexUrl, {sessions: sessionsFixture})
        cy.visit('/')
      })

      it('should allow the user to click on a link in the nav bar', () => {
        cy.get('.navbar-toggler')
          .click()

        cy.get('.nav-link-item[href="/sessions"]')
          .click()

        cy.location('pathname')
          .should('eq', '/sessions')

        cy.get('.session-list-item')
          .should('have.length', 3)
      })
    })
  })

  context('as an unauthorized user', () => {
    it('should not allow unauthorized users to access the page', () => {
      cy.validateAuthorizedUser({
        action: () => {cy.visit('/sessions')},
        url: indexUrl,
        method: 'GET'
      })
    })

    it('should not display sessions in the navbar', () => {
      cy.visit('/')
      cy.get('.navbar-toggler')
        .click()

      cy.get('.nav-link-item[href="/sessions"]')
        .should('not.exist')
    })
  })
})
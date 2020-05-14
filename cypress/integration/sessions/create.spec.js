import admin from '../../fixtures/users/admin.json'
import sessionsFixture from '../../fixtures/sessions/all.json'

describe('Creating a new session', () => {
  const indexUrl = Cypress.env('apiUrl') + '/sessions'
  const postUrl = indexUrl
  const newSession = {"id": 4, "name": "Shoulder day", "description": "push weight above your head", "user_id": admin.id}

  context('as an authorized user', () => {
    beforeEach(() => {
      cy.login(admin)
      cy.server()
      cy.route('GET', indexUrl, {sessions: sessionsFixture})
    })

    const theOriginalSessionsAreShowing = () => {
      return (
        cy.get('.session-list-item')
          .should('have.length', 3)
      )
    }

    context('with valid input', () => {
      beforeEach(() => {
        cy.route('POST', postUrl, {session: newSession})
        cy.visit('/sessions')
      })

      it('should add a new session and redirect them to the show page', () => {
        theOriginalSessionsAreShowing()
        cy.get('#session-modal-button')
          .click()

        cy.get('#sessionName')
          .type(newSession.name, {force: true})

        cy.get('#sessionDescription')
          .type(newSession.description, {force: true})

        cy.get('button[type="submit"')
          .click()

        cy.location('pathname')
          .should('eq', `/sessions/${newSession.id}`)
      })
    })

    context('with invalid input', () => {
      beforeEach(() => {
        cy.route('POST', postUrl, {errors: {name: ['Must be unique']}})
        cy.visit('sessions')
      })

      it('should display the errors on the form', () => {
        theOriginalSessionsAreShowing()
        cy.get('#session-modal-button')
          .click()

        cy.get('#sessionName')
          .type(newSession.name, {force: true})

        cy.get('#sessionDescription')
          .type(newSession.description, {force: true})

        cy.get('button[type="submit"')
          .click()

        cy.get('#exercise-list')
          .should('have.length', 0)
        cy.get('.alert-danger')
          .should('contain', 'Must be unique')

        cy.get('.session-list-item')
          .should('have.length', 3)
      })
    })
  })
})

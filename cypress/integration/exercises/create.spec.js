import admin from '../../fixtures/users/admin.json'

describe('Exercise creation', () => {
  const indexUrl = Cypress.env('apiUrl') + '/exercises'
  const postUrl = indexUrl

  context('from the index', () => {
    beforeEach(() => {
      cy.server()
      cy.route('GET', indexUrl, {exercises: []})
      cy.login(admin)
    })

    const fillExerciseForm = () => {
      cy.get('#exercise-modal-button')
        .click()

      cy.get('#exerciseName')
        .should('be.visible')
        .type('Squat', {force: true})
        .should('have.value', 'Squat')

      cy.get('#exerciseDescription')
        .should('be.visible')
        .type('Go low!', {force: true})
        .should('have.value', 'Go low!')

      cy.get('#exerciseForm button[type="submit"]')
        .click()
    }

    context('success', () => {
      beforeEach(() => {
        cy.route('POST', postUrl, {exercise: {id:1, name: 'Squat', description: 'Go low!'}})
        cy.visit('/exercises')
      })

      it('should add the new exercise to the list', () => {
        cy.get('#exercise-list')
          .as('exerciseList')
          .should('have.length', 0)

        fillExerciseForm()

        cy.get('#exercise-list')
          .should('have.length', 1)
      })
    })

    context('with errors', () => {
      beforeEach(() => {
        cy.route('POST', postUrl, {errors: {name: ['Must be unique']}})
        cy.visit('/exercises')
      })

      it('should display errors on the form', () => {
        cy.get('#exercise-list')
          .as('exerciseList')
          .should('have.length', 0)

        fillExerciseForm()

        cy.get('#exercise-list')
          .should('have.length', 0)
        cy.get('.alert-danger')
          .should('contain', 'Must be unique')
      })
    })

    context('as an unauthorized user', () => {
      it('should redirect them to the sign in page', () => {
        cy.validateAuthorizedUser({
          action: () => {
            cy.visit('/exercises')
            fillExerciseForm()
          },
          url: postUrl,
          method: 'POST'
        })
      })
    })
  })
})
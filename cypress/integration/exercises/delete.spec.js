import admin from '../../fixtures/users/admin.json'
import exercises from '../../fixtures/exercises/all.json'

describe('Deleting an exercise', () => {
  const indexUrl = Cypress.env('apiUrl') + '/exercises'

  beforeEach(() => {
    cy.server()
    cy.route('GET', indexUrl, {exercises: exercises})
    cy.login(admin)
  })

  describe('from the index', () => {
    const deletedExercise = exercises[0]
    const deleteUrl = indexUrl + `/${deletedExercise.id}`

    beforeEach(() => {
      cy.route('DELETE', deleteUrl, {exercise: deletedExercise})
      cy.visit('/exercises')
      cy.get('.exercise-list-item')
        .should('have.length', 3)
      cy.get('#exercise-list :nth-child(1)')
        .should('contain', deletedExercise.name)
    })

    it.only('should remove the exercise from the index', () => {
      cy.get(':nth-child(1) > .delete-exercise')
        .click()
        .get('.modal-content > .modal-footer > .btn-info')
        .click()

      cy.get('.exercise-list-item')
        .should('have.length', 2)
      cy.get('#exercise-list :nth-child(1)')
        .should('not.contain', deletedExercise.name)
    })
  })
})

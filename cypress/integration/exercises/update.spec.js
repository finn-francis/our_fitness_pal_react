describe('Updating exercises', () => {
  const indexUrl = Cypress.env('apiUrl') + '/exercises'

  context('from the index', () => {
    const oldExercise = {id:1, name: 'Squat', description: 'Go low!'}
    const newExercise = {id: 1, name: 'Legs', description: 'Squat Low'}
    const updateURL = `${Cypress.env('apiUrl')}/exercises/${oldExercise.id}`

    beforeEach(() => {
      cy.server()
      cy.route('GET', indexUrl, {exercises: [oldExercise]})
      cy.setCookie('user', "{id: 1, email: 'ben@ben.com'}")
    })

    context('success', () => {
      beforeEach(() => {
        cy.route('PUT', updateURL, {exercise: newExercise})
        cy.visit('/exercises')

        cy.get('.edit-exercise')
          .click()
      })

      it('Should update the index with the new exercise', () => {
        cy.get('#exerciseDescription')
          .type(`{selectall}${newExercise.description}`)
          .should('have.value', newExercise.description)

        cy.get('#exerciseName')
          .type(`{selectall}${newExercise.name}`)
          .should('have.value', newExercise.name)


        cy.get('#exerciseForm button[type="submit"]')
          .click()

        cy.get('#exercise-list')
          .as('exerciseList')
          .should('have.length', 1)
          .should('contain', newExercise.name)
          .should('not.contain', oldExercise.name)
      })
    })

    context('with errors', () => {
      const errorMessage = 'Must be unique'

      beforeEach(() => {
        cy.route('PUT', updateURL, {errors: {name: [errorMessage]}})
        cy.visit('/exercises')

        cy.get('.edit-exercise')
          .click()

        cy.get('#exerciseDescription')
          .type(`{selectall}${newExercise.description}`)
          .should('have.value', newExercise.description)

        cy.get('#exerciseName')
          .type(`{selectall}${newExercise.name}`)
          .should('have.value', newExercise.name)

        cy.get('#exerciseForm button[type="submit"]')
          .click()
      })

      it('should display the errors on the form', () => {
        cy.get('.has-error')
          .should('have.length', 1)

        cy.get('.alert-danger')
          .should('contain', errorMessage)
      })

      it('should not update the record on the index', () => {
        cy.get('#exerciseForm button[data-dismiss="modal"]')
          .click()

        cy.get('#exercise-list')
          .should('contain', oldExercise.name)
          .should('not.contain', newExercise.name)
      })
    })
  })
})
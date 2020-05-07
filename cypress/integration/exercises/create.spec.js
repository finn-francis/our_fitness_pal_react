describe('Exercise creation', () => {
  const indexUrl = Cypress.env('apiUrl') + '/exercises'
  const postUrl = indexUrl

  context('from the index', () => {
    beforeEach(() => {
      cy.server()
      cy.route('GET', indexUrl, {exercises: []})
    })

    context('success', () => {
      beforeEach(() => {
        cy.route('POST', postUrl, {exercise: {id:1, name: 'Squat', description: 'Go low!'}})
        cy.visit('/exercises')
      })

      it.only('should add the new exercise to the list', () => {
        cy.get('#exercise-list')
          .as('exerciseList')
          .should('have.length', 0)

        cy.get('#exercise-modal-button')
          .click()

        cy.get('#exerciseName')
          .should('be.visible')
          .type('Squat')
          .should('have.value', 'Squat')
        cy.get('#exerciseDescription')
          .should('be.visible')
          .type('Go low!')
          .should('have.value', 'Go low!')

        cy.get('#exerciseForm button[type="submit"]')
          .click()

        cy.get('#exercise-list')
          .should('have.length', 1)
      })
    })
  })
})
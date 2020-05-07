describe('Index', () => {
  const indexUrl = Cypress.env('apiUrl') + '/exercises'

  context("when there are existing exercises", () => {
    beforeEach(() => {
      cy.server()
      cy.fixture('exercises/all').then(exercises => {
        cy.route('GET', indexUrl, {exercises: exercises})
      })
      cy.visit('/exercises')
    })

    it('should display a list of exercises', () => {
      cy.get('#exercise-list .exercise-list-item')
        .should('have.length', 3)
    })

    it('should display buttons for adding new exercises and editing and deleting existing ones', () => {
      cy.get('#exercise-modal-button')
        .should('have.length', 1)
        .and('contain', 'New Exercise')

      cy.get('.exercise-list-item')
        .and('contain', 'edit')
        .and('contain', 'delete')
    })
  })

  context("when there are no existing exercises", () => {
    beforeEach(() => {
      cy.server()
      cy.route('GET', indexUrl, {exercises: []})
      cy.visit('/exercises')
    })

    it('should display the new exercise button', () => {
      cy.get('#exercise-modal-button')
        .should('have.length', 1)
        .and('contain', 'New Exercise')
    })

    it('should display a message showing that there are no exercises', () => {
      cy.get('#exercise-list-item')
        .should('have.length', 0)

      cy.get('.no-exercises')
        .should('contain', 'No exercises')
    })
  })
})
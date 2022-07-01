/// <reference types="cypress" />

describe('Blog Login', () => {
  it('displays login form', () => {
    cy.resetDB()
    cy.login({ username: 'testUsername', password: 'testPassword' })
    cy.createBlog({ title: 'testTitle', url: 'testURL' })
    cy.contains('testTitle').click()
    cy.get('button').contains('like').click()
  })
})

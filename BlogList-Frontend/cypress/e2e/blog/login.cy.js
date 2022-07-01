/// <reference types="cypress" />

describe('Blog Login', () => {
  beforeEach(() => {
    cy.request('POST', 'http://localhost:3001/api/testing/reset')
    const user = {
      name: 'testUser',
      username: 'testUsername',
      password: 'testPassword',
    }
    cy.request('POST', 'http://localhost:3001/api/users/', user)
    cy.visit('http://localhost:3000')
  })

  it('displays login form', () => {
    cy.get('#login-form').should('be.visible')
  })

  it('displays login error', () => {
    cy.get('#login-form').within(() => {
      cy.get('#username').type('testUsername')
      cy.get('#password').type('testPassword')
      cy.get('#login-button').click()
    })

    cy.get('.notification.error').should('be.visible')
  })

  it('displays login success', () => {
    cy.get('#login-form').within(() => {
      cy.get('#username').type('testUsername')
      cy.get('#password').type('testPassword')
      cy.get('#login-button').click()
    })

    cy.get('.notification.success').should('be.visible')
  })
})

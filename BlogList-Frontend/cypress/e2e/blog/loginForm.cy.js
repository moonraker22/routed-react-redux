/// <reference types="cypress" />

describe('Blog app', () => {
  beforeEach(() => {
    cy.resetDB()
  })
  describe('Login', () => {
    it('displays login form', () => {
      cy.get('#login-form').should('be.visible')
    })

    describe('Login', () => {
      it('displays login error', () => {
        cy.get('#login-form').within(() => {
          cy.get('#username').type('incorrectUser')
          cy.get('#password').type('incorrectPassword')
          cy.contains('Login').click()
        })

        cy.get('.notification.error').should('be.visible')
        cy.get('#login-form').should('be.visible')
      })
      it('displays login success', () => {
        cy.get('#login-form').within(() => {
          cy.get('#username').type('testUsername')
          cy.get('#password').type('testPassword')
          cy.contains('Login').click()
        })

        cy.get('.notification.success').should('be.visible')
        cy.contains('Welcome').should('be.visible')
      })
    })
  })
})

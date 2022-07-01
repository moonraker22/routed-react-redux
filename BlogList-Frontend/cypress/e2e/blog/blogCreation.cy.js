describe('Blog app when logged in', () => {
  beforeEach(() => {
    cy.resetDB()
    cy.logout()
    cy.login({ username: 'testUsername', password: 'testPassword' })
    cy.visit('http://localhost:3000')
  })
  it('can create a new blog', () => {
    cy.contains('Add New Blog').click()
    cy.get('[data-testid=title-input]').type('Test Title')
    cy.get('[data-testid=author-input]').should('have.value', 'testUsername')
    cy.get('[data-testid=url-input]').type('https://www.test.com')
    cy.get('button[type=submit]').click()

    cy.get('.notification.success').should('be.visible')
    cy.contains('Test Title').should('be.visible')
  })

  it('can like a blog', () => {
    cy.contains('Add New Blog').click()
    cy.get('[data-testid=title-input]').type('Test Title')
    cy.get('[data-testid=author-input]').should('have.value', 'testUsername')
    cy.get('[data-testid=url-input]').type('https://www.test.com')
    cy.get('button[type=submit]').click()

    cy.get('.notification.success').should('be.visible')
    cy.contains('Test Title').should('be.visible')

    cy.contains('Test Title').click()
    cy.get('button').contains('Like').click()
    cy.get('.notification.success').should('be.visible')
    cy.contains('1 likes').should('be.visible')
  })

  it('can delete a blog', () => {
    cy.contains('Add New Blog').click()
    cy.get('[data-testid=title-input]').type('Test Title')
    cy.get('[data-testid=author-input]').should('have.value', 'testUsername')
    cy.get('[data-testid=url-input]').type('https://www.test.com')
    cy.get('button[type=submit]').click()

    cy.get('.notification.success').should('be.visible')
    cy.contains('Test Title').should('be.visible')

    cy.contains('Test Title').click()
    cy.get('button').contains('Remove').click()
    cy.get('.notification.success').should('be.visible')
    cy.contains('Test Title').should('not.exist')
  })

  it('orders blogs by likes', () => {
    cy.contains('Add New Blog').click()
    cy.get('[data-testid=title-input]').type('Test Title')
    cy.get('[data-testid=author-input]').should('have.value', 'testUsername')
    cy.get('[data-testid=url-input]').type('https://www.test.com')
    cy.get('button[type=submit]').click()
    cy.wait(1000)
    // cy.contains('Add New Blog').click()
    cy.get('[data-testid=title-input]').type('Test Title 2')
    cy.get('[data-testid=author-input]').should('have.value', 'testUsername')
    cy.get('[data-testid=url-input]').type('https://www.test2.com')
    cy.get('button[type=submit]').click()
    cy.wait(1000)

    cy.get('.blog-list').eq(1).click()
    cy.get('.blog-list').eq(1).contains('Like').click()
    cy.wait(1000)
    cy.get('.blog-list').eq(1).contains('Like').click()
    cy.wait(1000)
    cy.visit('http://localhost:3000')
    cy.get('.blog-list').eq(0).contains('Test Title 2').should('be.visible')
  })
})

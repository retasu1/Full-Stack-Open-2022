describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = {
      name: 'Kevin Jones',
      username: 'kevin09',
      password: 'kevincool'
    }
    cy.request('POST', 'http://localhost:3003/api/users', user)
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function() {
    cy.contains('login')

  })

  describe('Login', function() {
    it('succeeds with correct credentials', function() {
      cy.get('#username').type('kevin09')
      cy.get('#password').type('kevincool')
      cy.get('#login-button').click()
      cy.contains('Kevin Jones logged in')
      cy.contains('logout').click()
    })

    it('fails with wrong credentials', function() {
      cy.get('#username').type('kevin10')
      cy.get('#password').type('kevincool')
      cy.get('#login-button').click()
      cy.get('.error')
        .should('contain', 'wrong username or password')
        .and('have.css', 'color', 'rgb(255, 0, 0)')
    })
  })

  describe('When logged in', function() {
    beforeEach(function() {
      cy.get('#username').type('kevin09')
      cy.get('#password').type('kevincool')
      cy.get('#login-button').click()      
    })

    it.only('A blog can be created', function() {
      cy.contains('new blog').click()

      cy.get('#title').type('New blog')
      cy.get('#author').type('Author Name')
      cy.get('#url').type('www.url.com')
      cy.contains('create blog').click()
      cy.contains('New blog Author name')

    })
  })
  
})
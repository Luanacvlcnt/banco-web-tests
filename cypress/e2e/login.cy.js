describe('Login', () => {
  beforeEach(() => {
    //Arrange
    cy.visit('http://localhost:4000/')
  })

  it('Login com dados válidos deve permitir entrada no sistema', () => {
    //Act
    cy.get('#username').click().type('julio.lima')
    cy.get('#senha').type('123456')
    cy.contains('button', 'Entrar').click()

    //Assert
    cy.contains('h4', 'Realizar Transferência').should('be.visible')
  })

  describe('template spec', () => {
    it('Login com dados inválidos deve rtornar mensagem de erro', () => {
      //Act
      cy.get('#username').click().type('luana.freitas')
      cy.get('#senha').type('123456')
      cy.contains('button', 'Entrar').click()

      //Assert
      cy.get('.toast').should('have.text', 'Erro no login. Tente novamente.')
    })
  })
})

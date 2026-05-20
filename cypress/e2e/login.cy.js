describe('Login', () => {
  beforeEach(() => {
    //Arrange
    cy.visit('http://localhost:4000/')
  })

  it('Login com dados válidos deve permitir entrada no sistema', () => {
    //Act
    cy.fixture('credenciais').then(credenciais => {
      cy.get('#username').click().type(credenciais.valida.usuario)
      cy.get('#senha').type(credenciais.valida.senha)
    })

    cy.contains('button', 'Entrar').click()

    //Assert
    cy.contains('h4', 'Realizar Transferência').should('be.visible')
  })

  describe('template spec', () => {
    it('Login com dados inválidos deve rtornar mensagem de erro', () => {
      //Act
      cy.fixture('credenciais').then(credenciais => {
        cy.get('#username').click().type(credenciais.invalida.usuario)
        cy.get('#senha').type(credenciais.invalida.senha)
      })

      cy.contains('button', 'Entrar').click()

      //Assert
      cy.get('.toast').should('have.text', 'Erro no login. Tente novamente.')
    })
  })
})

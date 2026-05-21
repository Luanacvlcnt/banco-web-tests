describe('Login', () => {
  beforeEach(() => {
    //Arrange
    cy.visit('/')
  })

  it('Login com dados válidos deve permitir entrada no sistema', () => {
    //Act
    cy.fazerLoginComCredenciaisValidas()
    //Assert
    cy.contains('h4', 'Realizar Transferência').should('be.visible')
  })

  describe('template spec', () => {
    it('Login com dados inválidos deve retornar mensagem de erro', () => {
      //Act
      cy.fazerLoginComCredenciaisInvalidas()

      //Assert
      cy.verificarMensagemNoToast('Erro no login. Tente novamente.')
    })
  })
})

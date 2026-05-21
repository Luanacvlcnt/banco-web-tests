Cypress.Commands.add('realizarTransferencia', (contaOrigem, contaDestino, valor) => {
    cy.selecionarOpcaoNaCombobox('conta-origem', 'João da Silva')
    cy.selecionarOpcaoNaCombobox('conta-destino', 'Maria Oliveira')
    cy.get('#valor').click().type(valor)
    cy.contains('button', 'Transferir').click();
})
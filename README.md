# Banco Web Tests 🚀

Projeto de automação de testes end-to-end (E2E) utilizando **Cypress** e **JavaScript** para validar funcionalidades da aplicação Banco Web.

## 📋 Objetivo

Este projeto demonstra como implementar **automação de testes com Cypress** utilizando boas práticas de engenharia, incluindo:

- ✅ Testes E2E organizados e bem estruturados
- ✅ Custom Commands reutilizáveis
- ✅ Fixtures para dados de teste
- ✅ Separação de responsabilidades
- ✅ Padrão AAA (Arrange, Act, Assert)

## 🏗️ Componentes do Projeto

### Estrutura de Diretórios

```
banco-web-tests/
├── cypress/
│   ├── e2e/                      # Testes end-to-end
│   │   ├── login.cy.js          # Testes de autenticação
│   │   └── transferencia.cy.js  # Testes de transferências
│   ├── support/                  # Configurações e comandos
│   │   ├── e2e.js               # Arquivo de suporte E2E
│   │   ├── commands.js          # Importador de comandos
│   │   └── commands/
│   │       ├── common.js        # Comandos comuns
│   │       ├── login.js         # Comandos de login
│   │       └── transferencia.js # Comandos de transferência
│   └── fixtures/                 # Dados de teste
│       ├── credenciais.json     # Credenciais válidas e inválidas
│       └── example.json
├── cypress.config.js            # Configuração do Cypress
└── package.json                 # Dependências do projeto
```

### Projetos Relacionados

Este projeto depende de dois repositórios complementares:

1. **banco-api** (https://github.com/juliodelimas/banco-api)
   - API REST que fornece os endpoints para as operações bancárias
   - Necessária estar rodando na porta padrão

2. **banco-web** (https://github.com/juliodelimas/banco-web)
   - Aplicação frontend em React
   - Consome os endpoints da API
   - Necessária estar rodando em `http://localhost:4000`

## 📦 Dependências

| Dependência | Versão | Descrição |
|---|---|---|
| Cypress | ^15.15.0 | Framework de automação de testes E2E |
| Node.js | 14+ | Runtime JavaScript |

## 🚀 Guia de Instalação e Execução

### Pré-requisitos

- **Node.js** versão 14 ou superior instalado
- **npm** (incluído com Node.js)
- Acesso aos repositórios das dependências

### 1. Clonar o Repositório

```bash
git clone https://github.com/Luanacvlcnt/banco-web-tests.git
cd banco-web-tests
```

### 2. Instalar Dependências

```bash
npm install
```

### 3. Configurar Aplicações Dependentes

#### Instalar e Executar a API

```bash
# Clone a API
git clone https://github.com/juliodelimas/banco-api.git
cd banco-api
npm install
npm start
```

#### Instalar e Executar a Aplicação Web

Em outro terminal:

```bash
# Clone a aplicação web
git clone https://github.com/juliodelimas/banco-web.git
cd banco-web
npm install
npm start
```

A aplicação deve estar rodando em `http://localhost:4000`

### 4. Executar os Testes

#### Modo headless (sem interface gráfica)
```bash
npm test
```

#### Modo headed (com browser visível)
```bash
npm run cy:headed
```

#### Modo interativo (Cypress Test Runner)
```bash
npm run cy:open
```

## 📝 Documentação dos Testes

### Testes de Login (`cypress/e2e/login.cy.js`)

#### Teste 1: Login com Credenciais Válidas ✅
**Objetivo:** Validar que um usuário com credenciais corretas consegue fazer login

```javascript
it('Login com dados válidos deve permitir entrada no sistema', () => {
  cy.fazerLoginComCredenciaisValidas()
  cy.contains('h4', 'Realizar Transferência').should('be.visible')
})
```

**O que testa:**
- Campo de usuário está funcional
- Campo de senha está funcional
- Botão "Entrar" faz requisição correta para API
- Após sucesso, tela de transferência é exibida

#### Teste 2: Login com Credenciais Inválidas ❌
**Objetivo:** Validar que o sistema exibe erro ao tentar login com dados incorretos

```javascript
it('Login com dados inválidos deve retornar mensagem de erro', () => {
  cy.fazerLoginComCredenciaisInvalidas()
  cy.verificarMensagemNoToast('Erro no login. Tente novamente.')
})
```

**O que testa:**
- Validação de credenciais na API
- Exibição correta de mensagem de erro
- Toast de notificação funciona

---

### Testes de Transferência (`cypress/e2e/transferencia.cy.js`)

#### Teste 1: Transferência com Dados Válidos ✅
**Objetivo:** Validar que uma transferência com dados corretos é realizada

```javascript
it('Deve transferir quando informo dados e valor validos', () => {
  cy.fazerLoginComCredenciaisValidas()
  cy.realizarTransferencia('João da Silva', 'Maria Oliveira', '11')
  cy.verificarMensagemNoToast('Transferência realizada!')
})
```

**O que testa:**
- Seleção de conta origem funciona
- Seleção de conta destino funciona
- Campo de valor aceita entrada numérica
- Transferência é processada pela API
- Mensagem de sucesso é exibida

#### Teste 2: Transferência Acima de R$5.000 sem Autenticação ⚠️
**Objetivo:** Validar que transferências acima de R$5.000 requerem autenticação adicional

```javascript
it('Deve retornar erro quando tentar transferir mais que 5 mil sem o token', () => {
  cy.fazerLoginComCredenciaisValidas()
  cy.realizarTransferencia('João da Silva', 'Maria Oliveira', '6000')
  cy.verificarMensagemNoToast('Autenticação necessária para transferências acima de R$5.000,00.')
})
```

**O que testa:**
- Validação de limite de transferência
- Necessidade de autenticação adicional para altos valores
- Mensagem de erro apropriada é exibida

---

## 🛠️ Documentação de Custom Commands

Os custom commands são funções reutilizáveis que encapsulam ações comuns, melhorando a manutenibilidade e legibilidade dos testes.

### Comandos Comuns (`cypress/support/commands/common.js`)

#### `cy.verificarMensagemNoToast(mensagem)`
Verifica se uma mensagem específica é exibida no toast de notificação.

**Parâmetros:**
- `mensagem` (String): Texto esperado no toast

**Exemplo de uso:**
```javascript
cy.verificarMensagemNoToast('Transferência realizada!')
```

**Implementação:**
```javascript
Cypress.Commands.add('verificarMensagemNoToast', mensagem => {
  cy.get('.toast').should('have.text', mensagem)
})
```

---

#### `cy.selecionarOpcaoNaCombobox(labelDoCampo, opcao)`
Seleciona uma opção em um componente combobox.

**Parâmetros:**
- `labelDoCampo` (String): Atributo `for` do label associado (ex: 'conta-origem')
- `opcao` (String): Texto da opção a selecionar (ex: 'João da Silva')

**Exemplo de uso:**
```javascript
cy.selecionarOpcaoNaCombobox('conta-origem', 'João da Silva')
```

**Implementação:**
```javascript
Cypress.Commands.add('selecionarOpcaoNaCombobox', (labelDoCampo, opcao) => {
  cy.get(`label[for="${labelDoCampo}"]`).parent().as(`campo-${labelDoCampo}`)
  cy.get(`@campo-${labelDoCampo}`).click()
  cy.get(`@campo-${labelDoCampo}`).contains(opcao).click()
})
```

---

### Comandos de Login (`cypress/support/commands/login.js`)

#### `cy.fazerLoginComCredenciaisValidas()`
Realiza login usando credenciais válidas do arquivo de fixtures.


**Exemplo de uso:**
```javascript
cy.fazerLoginComCredenciaisValidas()
```

**Implementação:**
```javascript
Cypress.Commands.add('fazerLoginComCredenciaisValidas', () => {
  cy.fixture('credenciais').then(credenciais => {
    cy.get('#username').click().type(credenciais.valida.usuario)
    cy.get('#senha').type(credenciais.valida.senha)
  })
  cy.contains('button', 'Entrar').click()
})
```

---

#### `cy.fazerLoginComCredenciaisInvalidas()`
Realiza tentativa de login com credenciais inválidas do arquivo de fixtures.

**Credenciais:**
- Usuário: `usuario`
- Senha: `senha`

**Exemplo de uso:**
```javascript
cy.fazerLoginComCredenciaisInvalidas()
```

**Implementação:**
```javascript
Cypress.Commands.add('fazerLoginComCredenciaisInvalidas', () => {
  cy.fixture('credenciais').then(credenciais => {
    cy.get('#username').click().type(credenciais.invalida.usuario)
    cy.get('#senha').type(credenciais.invalida.senha)
  })
  cy.contains('button', 'Entrar').click()
})
```

---

### Comandos de Transferência (`cypress/support/commands/transferencia.js`)

#### `cy.realizarTransferencia(contaOrigem, contaDestino, valor)`
Realiza uma transferência bancária completa.

**Parâmetros:**
- `contaOrigem` (String): Nome da conta de origem (ex: 'João da Silva')
- `contaDestino` (String): Nome da conta de destino (ex: 'Maria Oliveira')
- `valor` (String): Valor a transferir em reais (ex: '100')

**Exemplo de uso:**
```javascript
cy.realizarTransferencia('João da Silva', 'Maria Oliveira', '50.00')
```

**Implementação:**
```javascript
Cypress.Commands.add('realizarTransferencia', (contaOrigem, contaDestino, valor) => {
  cy.selecionarOpcaoNaCombobox('conta-origem', 'João da Silva')
  cy.selecionarOpcaoNaCombobox('conta-destino', 'Maria Oliveira')
  cy.get('#valor').click().type(valor)
  cy.contains('button', 'Transferir').click()
})
```

---

## 📊 Estrutura de Fixtures

As fixtures armazenam dados de teste reutilizáveis.

### `cypress/fixtures/credenciais.json`
Contém credenciais válidas e inválidas para testes de login.

```json
{
  "valida": {
    "usuario": "usuario",
    "senha": "senha"
  },
  "invalida": {
    "usuario": "usuario",
    "senha": "senha"
  }
}
```

---

## ⚙️ Configuração do Cypress

### `cypress.config.js`

```javascript
const { defineConfig } = require("cypress");

module.exports = defineConfig({
  allowCypressEnv: false,

  e2e: {
    baseUrl: 'http://localhost:4000',
    setupNodeEvents(on, config) {
      // Listeners de eventos Node.js
    },
  },
});
```

**Configurações principais:**
- `baseUrl`: Define a URL base para as requisições (`http://localhost:4000`)
- `allowCypressEnv`: Desabilita variáveis de ambiente do Cypress

---

## 🎯 Scripts npm

| Comando | Descrição |
|---|---|
| `npm test` | Executa todos os testes em modo headless |
| `npm run cy:headed` | Executa testes com browser visível |
| `npm run cy:open` | Abre o Cypress Test Runner interativo |

---

## 💡 Boas Práticas Implementadas

✅ **Padrão AAA (Arrange, Act, Assert)**
- Cada teste segue a estrutura de preparação, ação e validação

✅ **Custom Commands Reutilizáveis**
- Reduz duplicação de código
- Facilita manutenção

✅ **Fixtures para Dados**
- Centraliza dados de teste
- Fácil modificação sem alterar testes

✅ **Separação de Responsabilidades**
- Testes em `e2e/`
- Comandos em `support/commands/`
- Dados em `fixtures/`

✅ **Nomenclatura Clara**
- Nomes descritivos em português
- Fácil entendimento do escopo dos testes

---

## 🐛 Troubleshooting

### Erro: "Não consigo acessar http://localhost:4000"
- Verifique se a aplicação `banco-web` está rodando
- Confirm a porta 4000 está disponível

### Erro: "Falha na autenticação"
- Verifique se a API `banco-api` está rodando
- Confirme as credenciais no arquivo `cypress/fixtures/credenciais.json`

### Testes não carregam elementos
- Adicione `cy.wait(1000)` para aguardar renderização
- Verifique seletores CSS no arquivo de teste

---

## 📚 Recursos Úteis

- [Documentação Cypress](https://docs.cypress.io/)
- [Custom Commands - Cypress](https://docs.cypress.io/api/cypress-api/custom-commands)
- [Best Practices - Cypress](https://docs.cypress.io/guides/references/best-practices)

---

## 👨‍💻 Autor

Projeto desenvolvido como demonstração de automação com Cypress.

## 📄 Licença

ISC

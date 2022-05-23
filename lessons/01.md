# Seu primeiro teste automatizado escrito com Cypress

Quando escrevendo testes automatizados para aplicações web, o primeiro passo é visitar a URL da aplicação a qual deseja-se testar.

Para isso, o Cypress dispõe do comando [`cy.visit()`](https://on.cypress.io/visit).

Para visitar uma página web com Cypress, basta passar a URL desejada como uma string ao comando `cy.visit()`.

Por exemplo: `cy.visit('https://google.com')`.

## Conteúdos sugeridos

Durante o curso, em vez de testarmos a aplicação CAC TAT rodando na internet, iremos testar uma versão local, ou seja, o arquivo `src/index.html`.

Portanto, recomendo ler o seguinte conteúdo antes de seguir adiante, além da documentação oficial do Cypress:

- [Como visitar uma página que está em meu computador com Cypress](https://talkingabouttesting.com/2021/02/11/como-visitar-uma-pagina-que-esta-em-meu-computador-com-cypress/)
- https://docs.cypress.io/api/commands/visit#Visit-local-files

## Exercício

1. Dentro do arquivo `cypress/integration/CAC-TAT.spec.js`, adicione a seguinte estrutura básica para sua suíte de testes:

```js
/// <reference types="Cypress" />

describe('Central de Atendimento ao Cliente TAT', function() {
  it('verifica o título da aplicação', function() {

  })
})

```

> 👨‍🏫 O bloco `describe` define a suíte de testes, e o bloco `it`, define um caso de teste.

2. Dentro da função de _callback_ do bloco `it`, adicione o código que visita a aplicação (através do caminho relativo `./src/index.html`) e verifique que o título da mesma é `Central de Atendimento ao Cliente TAT`.

> 👨‍🏫 Para a verificação do título, leia sobre a funcionalidade `cy.title()` direto da [documentação oficial do Cypress](https://on.cypress.io/title).
>
> Além disso, leia também sobre a funcionalidade [`.should()`](https://on.cypress.io/should).

3. Com o teste criado, modifique a seção de `scripts` do arquivo `package.json`, conforme abaixo:

```json
"scripts": {
  "cy:open": "cypress open",
  "test": "cypress run"
},

```

4. Por fim, no terminal de linha de comando, na raiz do projeto (ou no atalho do VS Code), execute o comando `npm run cy:open`, para abrir o _Test Runner_ e executar o novo teste em modo interativo.

> 👨‍🏫 Em Janeiro de 2022, fiz um vídeo no canal TAT chamado [Atalhos para npm scripts no VS Code](https://youtu.be/yq-6cNN29hA). Fica a dica!

___

Com o primeiro teste passando ✅, vá para a [aula 2](./02.md) para aprender como digitar em campos e clicar em elementos.

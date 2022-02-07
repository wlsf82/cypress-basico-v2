# Marcando _inputs_ do tipo `radio`

Outro elemento comum na web, é o _input_ do tipo `radio`.

_Inputs_ do tipo `radio` são elementos de seleção única.

Na aplicação CAC TAT, estes são os elementos para seleção do tipo de atendimento, onde o valor padrão é o primeiro campo (Ajuda) e as outras opções são: Elogio e Feedback.

Para lidar com _inputs_ do tipo `radio`, o Cypress dispões da funcionalidade [`.check()`](https://on.cypress.io/check).

Ou seja, depois da seleção de um elemento do tipo `radio`, basta encadear o comando `.check()`.

Por exemplo: `cy.get('input[type="radio"]').check()`.

> 👨‍🏫 O `.click()` também funciona para _inputs_ do tipo `radio`, porém, recomendo o uso do `.check()`, por questões de semântica.

## Exercício

1. Crie um teste chamado `marca o tipo de atendimento "Feedback"`
2. Faça a verificação que o valor correto foi selecionado após o `.check()`
3. Por fim, execute o novo teste no _Test Runner_

## Exercício extra

1. Crie um teste chamado `marca cada tipo de atendimento`
2. Faça a verificação de que após o `.check()`, cada `radio` foi marcado (`.should('be.checked')`)
3. Por fim, execute o novo teste no _Test Runner_

> 👨‍🏫 Para a solução do exercício extra, recomendo ler sobre a funcionalidades [`.each()`](https://on.cypress.io/each) e [`cy.wrap()`](https://on.cypress.io/wrap).
>
> Ou então, me assista criando o teste.

___

Com os novos testes passando, siga para a aula [aula 5](./05.md) para aprender como marcar (e desmarcar) _inputs_ do tipo `checkbox`.

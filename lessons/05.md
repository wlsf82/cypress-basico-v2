# Marcando (e desmarcando) _inputs_ do tipo `checkbox`

Como você deve estar imaginando, para marcarmos _inputs_ do tipo `checkbox`, também vamos utilizar a funcionalidade `.check()`.

Ou seja, depois da seleção de um elemento do tipo `checkbox`, basta encadear o comando `.check()`.

Por exemplo: `cy.get('input[type="checkbox"]').check()`.

Porém, para desmarcá-los, iremos utilizar o comando [`.uncheck()`](https://on.cypress.io/uncheck).

Por exemplo: `cy.get('input[type="checkbox"]').uncheck()`.

## Conteúdos sugeridos

Separei dois conteúdos que criei em 2021, sobre _checkboxes_.

Espero que goste!

- [Como marcar vários checkboxes de uma só vez com Cypress](https://talkingabouttesting.com/2021/06/14/como-marcar-varios-checkboxes-de-uma-so-vez-com-cypress/)
- [Como marcar um checkbox com Cypress sem correr o risco de desmarcá-lo](https://youtu.be/O8PJRPpfLl8)

## Exercício

1. Crie um teste chamado `marca ambos checkboxes, depois desmarca o último`
2. O teste deve possuir verificações de que ambos _checkboxes_ foram marcados, e depois, que o último ([`.last()`](https://on.cypress.io/last)) foi desmarcado
3. Por fim, execute o novo teste no _Test Runner_

## Exercício extra

1. Revise o teste chamado `exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário`, para garantir que em vez de um `.click()`, o comando `.check()` é utilizado para marcar o checkbox Telefone.
2. Por fim, execute o teste no _Test Runner_

## Conteúdos extras

Aí vão alguns links da documentação oficial do Cypress que podem lhe ajudar enquanto resolvendo os exercícios.

- https://on.cypress.io/each
- https://on.cypress.io/uncheck

___

Com os testes passando, siga para a aula [aula 6](./06.md) para aprender como fazer _upload_ de arquivos com Cypress.

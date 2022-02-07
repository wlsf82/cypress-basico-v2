# Selecionando opções em campos de seleção suspensa

Para a seleção de opções em campos de seleção suspensa, o Cypress oferece o comando [`.select()`](https://on.cypress.io/select).

Com tal comando, você pode identificar um elemento do tipo `select` (com um `cy.get('select')`, por exemplo), e então, encadear o comando `.select()`, passando o valor a ser escolhido (por seu texto, pelo valor do atributo `value`, ou por seu índice).

Veja alguns exemplos:

- `cy.get('select').select('Blog') // Seleção pelo texto Blog`
- `cy.get('select').select('youtube') // Seleção pelo value youtube`
- `cy.get('select').select(1) // Seleção pelo índice 1`

> 👨‍🏫 Se o campo for de múltipla escolha, você pode até mesmo passar os valores que deseja selecionar, listando-os em um [Array](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Global_Objects/Array). Este não é o caso da aplicação CAC TAT, mas é bom saber!

## Conteúdos sugeridos

Seguem dois vídeos que gravei em Setembro de 2021, demonstrando o uso da funcionalidade `.select()`.

Espero que te ajudem com os exercícios.

- [Selecionando uma opção aleatória a partir de um caixa de seleção suspensa](https://youtu.be/JyaiwAokZBc)
- [Selecionando uma opção aleatória a partir de um caixa de seleção suspensa - parte 2](https://youtu.be/11exKg4QkFY)

## Exercício

1. Crie um novo teste chamado `seleciona um produto (YouTube) por seu texto`
2. Verifique que após a seleção, tal opção foi realmente selecinada (`.should('have.value', 'valor-aqui')`)
3. Por fim, execute o novo teste no _Test Runner_

## Exercício extra 1

1. Crie um novo teste chamado `seleciona um produto (Mentoria) por seu valor (value)`
2. Verifique que após a seleção, tal opção foi realmente selecinada (`.should('have.value', 'valor-aqui')`)
3. Por fim, execute o novo teste no _Test Runner_

## Exercício extra 2

1. Crie um novo teste chamado `seleciona um produto (Blog) por seu índice`
2. Verifique que após a seleção, tal opção foi realmente selecinada (`.should('have.value', 'valor-aqui')`)
3. Por fim, execute o novo teste no _Test Runner_

___

Com os novos testes passando, siga para a aula [aula 4](./04.md) para aprender como marcar _inputs_ do tipo `radio`.

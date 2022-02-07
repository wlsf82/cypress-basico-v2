# Fazendo _upload_ de arquivos com Cypress

Na [versão 9.3.0](https://docs.cypress.io/guides/references/changelog#9-3-0), o Cypress lançou a funcionalidade [`.selectFile()`](https://docs.cypress.io/api/commands/selectfile).

Tal funcionalidade, como o nome sugere, serve para selecionar arquivos, quando por exemplo, precisamos adicionar um anexo, como a aplicação CAC TAT possibilita.

Ou seja, você usa um `cy.get('input[type="file"]')`, por exemplo, para identifcar um campo de seleção de arquivos, e encadeia um `.selectFile()`, passando ao mesmo (como uma string) o caminho relativo do arquivo que você pretende fazer o _upload_.

Por exemplo: `cy.get('input[type="file"]').selectFile('cypress/fixtures/example.json')`.

## Conteúdos sugeridos

Em Janeiro de 2022, lancei um vídeo chamado [Conheça a funcionalidade `.selectFile`, disponível na versão 9.3.0 do Cypress](https://youtu.be/xwltoOnmfVE).

Tal vídeo vai te ajudar com os exercícios que vem por aí, portanto, recomendo assistí-lo (são menos de 15 minutos).

## Exercício

1. Crie um teste chamado `seleciona um arquivo da pasta fixtures`
2. Tal teste deve verificar que, após a seleção do arquivo, o nome correto do arquivo é persistido no objeto de `files` do `input`
3. Por fim, execute o novo teste no _Test Runner_

## Exercício extra 1

1. Crie um teste chamado `seleciona um arquivo simulando um drag-and-drop`
2. Tal teste deve verificar que, após a seleção do arquivo, o nome correto do arquivo é persistido no objeto de `files` do `input`
3. Por fim, execute o novo teste no _Test Runner_

## Exercício extra 2

1. Crie um teste chamado `seleciona um arquivo utilizando uma fixture para a qual foi dada um alias`
2. Tal teste deve verificar que, após a seleção do arquivo, o nome correto do arquivo é persistido no objeto de `files` do `input`
3. Por fim, execute o novo teste no _Test Runner_

___

Com os novos testes passando, siga para a aula [aula 7](./07.md) para aprender como lidar com links que abrem em outra aba.

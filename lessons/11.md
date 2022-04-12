# Avançando no uso do Cypress

Como você já deve ter percebido, o Cypress é um framework de testes automatizados diferenciado.

E agora que você já conhece o básico, vou te mostrar (algumas) funcionalidas mais avançadas, só pra você "sentir um gostinho" do que mais o Cypress te deixa fazer.

## Controle o "relógio" 🕐 do navegador com os comandos `cy.clock()` e `cy.tick()`

Com a funcinalidade [`cy.clock()`](https://on.cypress.io/clock), você pode "congelar" 🧊 o relógio do navegador.

E com a funcionalidade [`cy.tick()`](https://on.cypress.io/tick), você pode avançar no tempo. 🕒

Veja um exemplo:

```js
it('exibe mensagem por 3 segundos', function() {
  cy.clock() // congela o relógio do navegador

  // (...) // ação que dispara algo que exibe uma mensagem por três segundos

  // (...) // verificação de que a mensagem está visível

  cy.tick(3000) // avança o relógio três segundos (em milissegundos). Avanço este tempo para não perdê-lo esperando.

  // (...) // verificação de que a mensagem não está mais visível
})
```

### Conteúdo sugerido

Em Junho de 2021, gravei um vídeo chamado [Como testar campos de data com Cypress](https://youtu.be/wiDOdfmuR2o), onde fiz uso da funcionalidade `cy.clock()`.

Ficou bem legal e recomendo assitir!

#### Atualização

Em Março de 2022, escrevi um conteúdo chamado [Controle o relógio do navegador com Cypress](https://talkingabouttesting.com/2022/03/20/controle-o-relogio-do-navegador-com-cypress/). Fica a recomendação também.

### Exercício

Nos testes que verificam mensagens (de sucesso e erro), use as funcionalidades `cy.clock()` e `cy.tick()`, para verificar não só que a mensagem aparece, mas também que desaparece após 3 segundos, porém, sem precisar esperar pelos 3 segundos (ganhando tempo na execução dos testes).

## lodash ([`Cypress._`](https://docs.cypress.io/api/utilities/_))

O [lodash](https://lodash.com) é uma biblioteca famosa no mundo JavaScript, com diversas funções utilitárias.

E o legal é que o Cypress já empacota o `lodash` junto com ele, através do módulo `Cypress._`.

Algumas das minhas funcionalidades favoritas do `._` são:

- [`Cypress._.times()`](https://lodash.com/docs/4.17.15#times)

> 👨‍🏫 A funcionalidade `_.times()` serve para você executar uma função de _callback_ um certo número de vezes, onde o número de vezes é o primeiro argumento, e a função de _callback_ é o segundo.

- [`Cypress._.repeat()`](https://lodash.com/docs/4.17.15#repeat)

> 👨‍🏫  A funcionalidade `_.repeat()` serve para repetir uma string um certo número de vezes, onde o primeiro argumento é a string a qual deseja-se repetir, e o segundo argumento quantas vezes tal string deve ser repetida.

### Conteúdos sugeridos

Escrevi conteúdos que fazem uso de ambos os comandos `_.times()` e `_.repeat()`.

- [Como rodar um teste várias vezes com Cypress para provar que ele é estável](https://talkingabouttesting.com/2021/02/06/como-rodar-um-teste-varias-vezes-com-cypress-para-provar-que-ele-e-estavel/)
- [Como “simular” um CTRL+V com Cypress](https://talkingabouttesting.com/2022/02/11/como-simular-um-ctrlv-com-cypress)

Recomendo a leitura.

### Exercício extra 1

Experimente a funcionalidade `Cypress._.times()` em algum dos testes, pra entender seu uso e praticar.

> 🙊 Use para rodar um mesmo teste várias vezes.

## Invoque atributos e métodos de elementos com o comando [`.invoke()`](https://on.cypress.io/invoke)

Vimos o invoke na aula [Lidando com links que abrem em outra aba](./07.md), para remover o atributo `target` de um elemento, evitando que quando clicado, a página não abra em outra aba.

Além disso, no conteúdo [Como “simular” um CTRL+V com Cypress](https://talkingabouttesting.com/2022/02/11/como-simular-um-ctrlv-com-cypress), demonstrei o uso do `.invoke('val')`, para definir o valor de um campo de texto, para quando precisamos digitar um texto longo e não queremos perder tempo.

Dois últimos usos do `.invoke()` que eu quero que você conheça são:

- `.invoke('show')`
- `.invoke('hide')`

Com o comando `.invoke('show')`, você pode forçar a exibição de um elemento HTML que esteja escondido, com um estilo `display: none;`, por exemplo.

E com o comando `.invoke('hide')`, você pode esconder um elemento que está sendo exibido.
### Exercício extra 2

1. Crie um teste chamado `exibe e esconde as mensagens de sucesso e erro usando o .invoke()`
2. 🙊 O teste deve ter a seguinte estrutura:

```js
it('exibe e esconde as mensagens de sucesso e erro usando o .invoke', () => {
    cy.get('.success')
      .should('not.be.visible')
      .invoke('show')
      .should('be.visible')
      .and('contain', 'Mensagem enviada com sucesso.')
      .invoke('hide')
      .should('not.be.visible')
    cy.get('.error')
      .should('not.be.visible')
      .invoke('show')
      .should('be.visible')
      .and('contain', 'Valide os campos obrigatórios!')
      .invoke('hide')
      .should('not.be.visible')
  })
```

3. Por fim, execute o novo teste no _Test Runner_ e siga para o próximo exercício quando o mesmo estiver passando.

### Exercício extra 3

1. Crie um teste chamado `preenche a area de texto usando o comando invoke`
2. Tal teste, conforme o nome sugere, deve fazer uso da funcionalidade `.invoke()` para preencher o campo de área de texto
3. Deve haver a verificação de que o valor foi realmente persistido no campo
4. Por fim, execute o novo teste no _Test Runner_ e siga adiante quando o teste estiver passando

## [`cy.request()`](https://on.cypress.io/request)

Um dos maiores "poderes" 🦸🏽‍♂️ do Cypress é a possibilidade de executar comandos à nível de rede.

Um destes comandos é o `cy.request()`.

Com o comando `cy.request()`, você pode executar requisições HTTP à nível de rede, ganhando tempo no _setup_ dos testes e focando no que interessa quando se trata de testar as coisas pela interface gráfica de usuário.

Se você quiser, você pode até mesmo usar o comando `cy.request()` para testar APIs [REST](https://pt.wikipedia.org/wiki/REST).

### Conteúdos sugeridos

- [Como testar APIs com Cypress](https://talkingabouttesting.com/2021/02/07/como-verificar-a-estrutura-do-body-de-um-esquema-json-com-cypress/)
- [Como fazer login de forma programática com Cypress](https://talkingabouttesting.com/2021/12/14/como-fazer-login-de-forma-programatica-com-cypress/)
- [cy.request vs. cy.intercept](https://dev.to/walmyrlimaesilv/cy-request-vs-cy-intercept-cmi) (conteúdo em inglês)

### Exercício extra 4

1. Crie um teste chamado `faz uma requisição HTTP`
2. Tal teste deve fazer uso da funcionalidade `cy.request()`, para fazer uma requisição do tipo `GET`, para a seguinte URL: `https://cac-tat.s3.eu-central-1.amazonaws.com/index.html`
3. Com a resposta da requisição, verifique que o `status` retornou `200`, o `statusText` retornour `OK` e o `body` inclui a _string_ `CAC TAT`
4. Por fim, execute o novo teste no _Test Runner_ e siga adiante quando o mesmo estiver passando

> 👨‍🏫 Quer saber mais sobre o comando `cy.request()`? Confira o [curso intermediário de Cypress da Escola TAT no Udemy](https://www.udemy.com/course/testes-automatizados-com-cypress-intermediario/?referralCode=F14505FB0076672E51A2).

___

Siga para a aula [aula 12](./12.md). Tenho um último desafio pra você!

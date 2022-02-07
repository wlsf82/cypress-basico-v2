# Lidando com links que abrem em outra aba

Na [página de _trade-offs_](https://docs.cypress.io/guides/references/trade-offs) da documentação oficial do Cypress (no momento da escrita desta aula), há uma seção que comenta da limitação do [Cypress funcinar somente em uma aba do navegador](https://docs.cypress.io/guides/references/trade-offs#Multiple-tabs).

Muitos vêem isso como uma limitação e não buscam entender como contornar tal situação.

Porém, dependendo do que você precisa testar, isso não seja tão difícil quanto você pensa.

Na aplicação CAC TAT, temos um link para a política de privacidade, o qual quando clicado, abre tal página em uma nova aba do navegador.

Como testar tal página?

Ou, que outras alternativas tenho à minha disposição?

Vou te apresentar duas alternativas, porém, na documentação oficial, você vai encontrar ainda mais.

## Alternativa 1 - confie que o navegador funciona (teste a aplicação, não o _browser_)

Ou seja, se um elemento do tipo âncora (`a`) possui o atributo `target` com o valor `_blank`, quando clicado, obrigatóriamente o valor do atributo `href` será aberto em uma nova aba. Este é o compartamento padrão em qualquer navegador.

Neste caso, podemos simplesmente verificar tal característica, sem nem mesmo precisar clicar no elemento.

Algo como o seguinte:

`cy.get('.some-link').should('have.attr', 'target', '_blank')`

## Alternativa 2 - remova o atributo `target` do elemento

Já se você precisa ir para esta outra página, o Cypress deixa você remover a propriedade `target` do elemento âncora.

Para isso, te apresento a funcionalidade [`.invoke()`](https://docs.cypress.io/api/commands/invoke).

Com a funcionalidade `invoke()`, você pode fazer o seguinte, por exemplo: `cy.get('#link-que-abre-em-outra-aba').invoke('removeAttr', 'target')`.

Veja [este exemplo](https://github.com/cypress-io/cypress-example-recipes/blob/master/examples/testing-dom__tab-handling-links/cypress/integration/tab_handling_anchor_links_spec.js#L70), direto de uma "receita" criada pelo time do Cypress.

> 👨‍🏫 Vale comentar que, para tal alternativa funcionar, a página que normalmente abre em outra aba deve estar no mesmo domínio (ou sub-domínio) da aplicação em teste.

## Exercício

1. Crie um teste chamado `verifica que a política de privacidade abre em outra aba sem a necessidade de um clique`
2. Tal teste deve utilizar a alternativa 1 demonstrada acima
3. Por fim, execute o novo teste no _Test Runner_, e quando o mesmo estiver passando, siga adiante para o próximo exercício

## Exercício extra 1

1. Crie um testes chamado `acessa a página da política de privacidade removendo o target e então clicanco no link`
2. Tal teste deve utilizar a alternativa 2 demonstrada acima
3. Por fim, execute o novo teste no _Test Runner_, e quando o mesmo estiver passando, siga adiante para o próximo exercício

## Exercício extra 2 - Desafio

1. Crie um testes chamado `testa a página da política de privavidade de forma independente`
2. Use sua criativade e as funcionalidades que aprendeu até aqui para realizar este teste (a solução é mais simples do que você imagina)
3. Por fim, execute o novo teste no _Test Runner_ e siga adiante somente quando o teste estiver passando

___

Siga para a aula [aula 8](./08.md) para aprender como rodar os testes simulando o _viewport_ de um dispositivo móvel.

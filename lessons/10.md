# Integração Contínua (_CI_) com _GitHub Actions_

Com a aplicação coberta com testes automatizados para suas funcionalidades mais importantes, chegou a hora de configurar um _pipeline_ de integração contínua.

A integração contínua é uma técnica em que o código de vários desenvolvedores(as), e testatores(as), é integrado diariamente (de preferência várias vezes ao dia) ao _branch_ principal de um repositório remoto.

Quando há uma mudança no repositório remoto (o local central onde fica o código que é implantado em produção), uma rotina automatizada dispara verificações automáticas, para garantir que a nova versão funciona.

Se a nova versão não funciona (provada pela falha em uma verificão), o _pipeline_ "quebra", e não corremos o risco de mandar software quebrado aos usuários.

Visto que o código do projeto está no GitHub, iremos utilizar o [_GitHub Actions_](https://github.com/features/actions) para a criação do _pipeline_ de integração contínua.

## Conteúdos sugeridos

Deixei abaixo a página sobre integração contínua da documentação oficial do Cypress, assim como a documentação oficial do Cypress GitHub Actions.

- https://docs.cypress.io/guides/continuous-integration/github-actions#Cypress-GitHub-Action
- https://github.com/cypress-io/github-action

## Exercício

1. Na raiz do projeto, crie um diretório oculto chamado `.github/`, e dentro dele, crie um sub-diretório chamado `workflows/`.

> 👨‍🏫 Você deve possuir a seguinte estrutura `.github/workflows/`

2. Dentro do diretório `.github/workflows/`, crie um arquivo chamado `ci.yml`, com o seguinte conteúdo:

```yml
name: End-to-end tests 🧪
on: [push]
jobs:
  cypress-run:
    runs-on: ubuntu-20.04
    steps:
      - name: Checkout
        uses: actions/checkout@v2
      # Install NPM dependencies, cache them correctly
      # and run all Cypress tests
      - name: Cypress run
        uses: cypress-io/github-action@v2
```

**Referência:** https://github.com/cypress-io/github-action#basic

> 👨‍🏫 O nome do arquivo poderia ser qualquer outro, escolhi `ci` pois é a versão curta para _continuous integration_ (em português, integração contínua).

3. Com o `git`, adicione todas suas mudanças para a área de _staging_ (`git add .`)
4. Faça um _commit_ com a mensagem `Create cypress project` (`git commit -m "Create cypress project"`)
5. Envie suas mudanças locais para seu fork remoto no GitHub (`git push origin main`)
6. Vá até o GitHub e veja sua mudança disparando o _pipeline_ (e se tudo der certo, veja seus testes passando)

## Exercício extra 1

1. Acesse o arquivo `src/script.js` e quebre algo de propósito
2. Adicione todas suas mudanças (`git add .`)
3. Faça um _commit_ com a mensagem `Break the app on purpose` (`git commit -m "Break the app on purpose"`)
4. Envie suas mudanças locais para seu fork remoto no GitHub (`git push origin main`)
5. Vá até o GitHub e veja suas mudanças disparando o _pipeline_ e um (ou mais) teste(s) falhando.

## Exercício extra 2

Corrija a alteração do exercício anterior, ou reverta a mudança, rode os comandos `git` necessários, vá até o GitHub e veja sua mudança disparando o _pipeline_ novamente (e se tudo der certo, veja seus testes passando de novo).

___

Siga para a aula [aula 11](./11.md) para aprender algumas questões nem tão básicas, mas que diferenciam o Cypress dos outros _frameworks_ de testes automatizados de interface gráfica de usuário.

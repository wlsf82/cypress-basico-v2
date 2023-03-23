# Testes automatizados com Cypress - Básico

👋 Seja bem-vindo(a)!

É muito bom tê-lo(a) aqui. Tenho certeza que você vai adorar este curso. ❤️

## O que você vai aprender

Durante o curso de testes automatizados com Cypress (básico), você vai aprender:

- Como configurar um projeto Cypress do zero
- Como visitar páginas locais e remotas
- Como lidar com os elementos mais comuns encontrados em aplicações web
- Como testar _upload_ de arquivos
- Como realizar as mais diversas verificações de resultados esperados
- Como criar comandos customizados
- Como lidar com links que abrem em outra aba do navegador
- Como rodar testes simulando as dimensões de um dispositivo móvel
- Como resolver os mesmos problemas de diferentes formas, conhecendo a [API do Cypress](https://docs.cypress.io/api/table-of-contents)
- Como executar os testes em um _pipeline_ de integração contínua sempre que mudanças ocorrerem no código da aplicação (ou dos testes)
- Como criar uma documentação mínima para seu projeto de testes automatizados

## Vamos começar?

Vá para a seção [estrutura do curso](./lessons/_course-structure_.md).

___

Este é mais um curso da [**Escola Talking About Testing**](https://udemy.com/user/walmyr).

<br>
<br>

## Como configurar o _setup_
* Primeiramente é necessário instalar as dependências do cypress. Neste curso, será utilizada a versão 9.5.1

```
$ npm install cypress@9.5.1 --save-dev
ou
$ npm i cypress@9.5.1 -D
```

* Para abrir o Cypress pela primeira vez, execute o comando abaixo:

```
$ npx cypress open
```

* Por fim, com o _Test Runner_ aberto, delete os exemplos criados automaticamente, crie um arquivo chamado `CAC-TAT.spec.js` e feche o _Test Runner_.

> **Obs. 2:** Quando inicializado pela primeira vez, o Cypress automaticamente cria o arquivo `cypress.json` e o diretório `cypress/`, com os sub-diretórios `fixtures/`, `integration/`, `plugins/` e `support/`, com seus respetivos arquivos (com exceção dos exemplos, que acabamos de deletar).

## Configurações extra

1. Atualize o arquivo `cypress.json` conforme abaixo.

```json
{
  "pluginsFile": false,
  "viewportHeight": 880,
  "viewportWidth": 1280
}
```

> 👨‍🏫 Com isso, estamos "dizendo ao Cypress" que:
>
> - Não vamos usar o arquivo de plugins (o qual é criado automaticamente e não precisaremos durante  o curso)
> - Iremos sobrescrever a altura e largura do [_viewport_ padrão do Cypress](https://docs.cypress.io/api/commands/viewport#Defaults)

2. Delete o diretório `cypress/plugins/`, visto que este não será necessário durante o curso.

3. Pronto!
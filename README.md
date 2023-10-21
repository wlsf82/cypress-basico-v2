# cypress básico-v2

[![main](https://github.com/wlsf82/cy-data-test/actions/workflows/ci.yml/badge.svg)](https://github.com/wlsf82/cy-data-test/actions)

Sample project for the basic course of the Talking About Testing online school.

## Pre-requirements

- [git](https://git-scm.com/) (estou usando a versão `2.34.1` enquanto escrevo esta aula)
- [Node.js](https://nodejs.org/en/) (estou usando a versão `v16.13.2` enquanto escrevo esta aula)
- npm (estou usando a versão `8.3.2` enquanto escrevo esta aula)
- [Google Chrome](https://www.google.com/intl/pt_br/chrome/) (estou usando a versão `98.0.4758.80 (Official Build) (x86_64)` enquanto escrevo esta aula)
- [Visual Studio Code](https://code.visualstudio.com/) (estou usando a versão `1.64.0` enquanto escrevo esta aula) ou alguma outra IDE de sua preferência

> **Obs.:** Recomendo utilizar as mesmas versões, ou versões mais recentes dos sistemas listados acima.
>
> **Obs. 2:** Ao instalar o Node.js o npm é instalado junto. 🎉
>
> **Obs. 3:** Para verificar as versões do git, Node.js e npm instaladas em seu computador, execute o comando `git --version && node --version && npm --version` no seu terminal de linha de comando.
>
> **Obs. 4:** Deixei links para os instaladores na lista de requisitos acima, caso não os tenha instalados ainda.

___

Legal, os pre-requisitos estão prontos. ☑️

## Installation

## Instalação e inicialização do [Cypress](https://cypress.io) 🌲

1. Na raiz do projeto, execute o comando `npm install cypress@9.5.1 --save-dev` (ou `npm i cypress@9.5.1 -D` para a versão curta)
2. Logo após, execute o comando `npx cypress open` para abrir o Cypress pela primeira vez
3. Por fim, com o _Test Runner_ aberto, delete os exemplos criados automaticamente, crie um arquivo chamado `CAC-TAT.spec.js` e feche o _Test Runner_.

> **Obs. 2:** Quando inicializado pela primeira vez, o Cypress automaticamente cria o arquivo `cypress.json` e o diretório `cypress/`, com os sub-diretórios `fixtures/`, `integration/`, `plugins/` e `support/`, com seus respetivos arquivos (com exceção dos exemplos, que acabamos de deletar).

> **Obs. 3:** ⚠️ Instale a exata versão do Cypress descrita nos passos acima. Ao final do curso deixo o link para um vídeo no Canal TAT no YouTube demonstrando como fazer o _upgrade_ para uma versão mais recente do Cypress (v10+).

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

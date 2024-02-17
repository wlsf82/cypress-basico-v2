# Description cy-data-test

[![main](https://github.com/wlsf82/cy-data-test/actions/workflows/ci.yml/badge.svg)](https://github.com/wlsf82/cy-data-test/actions)

Sample project to demonstrate a `cy.dataTest` Cypress custom command.


## Pre-requirements

It is required to have Node.js and npm installed to run this project.

> I used versions `v18.15.0` and `9.5.0` of Node.js and npm, respectively. I suggest you use the same or later versions.


## Installation

Run `npm install` (or `npm i` for the short version) to install the dev dependencies.


## Tests

> **Note:** Before running the tests, make a copy of the `cypress.env.example.json` file as `cypress.env.json`, which in the real world, you would update with valid credentials.
>
> The `cypress.env.json` file is included on [`.gitignore`](./.gitignore) and you're safe that confidential info won't be versioned.
> You can run the tests simulating a desktop or mobile viewport


### Desktop

Run `npm test` (or `npm t` for the short version) to run the test in headless mode on a desktop viewport.

Or, run `npm run cy:open` to open Cypress in interactive mode on a desktop viewport.


### Mobile

Run `npm run test:mobile` to run the test in headless mode on a mobile viewport.

Or, run `npm run cy:open` to open Cypress in interactive mode on a desktop viewport.

___

This project was created with 💚 by [Walmyr](https://walmyr.dev).


- Configurar pipeline de integração contínua ara executar todos os testes sempre que uma mudança ocorrer no código da aplicação ou nos códigos dos testes.
- A integração contínua é uma técnica em que o código dos desenvolvedores é integrado diariamente várias vezes ao dia ao branch principal de um repositório remoto e quando há uma mudança no repositório remoto, ou seja, 
quando envia o código do nosso computador para o GitHub, esse local central onde o código que é implementado em produção [GitHub], uma rotina automatizada dispara verificações automáticas para garantir que a nova versão funcione e
no nosso caso essas verificações automáticas são os testes que a gente vem criando ao longo do curso.
E se a nova versão não funciona aprovada, por exemplo pela falha de um teste, o pipeline quebra e não se corre o risco de mandar o software quebrado para os usuários. Vamos mandar o código para a produção somente quando todos os dados estiverem passando. Vvisto que nosso código ele está hospedado no GitHub, vamos utilizar o Github Actions para a criação do pipeline de integração contínua.
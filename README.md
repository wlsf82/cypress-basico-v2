# Automated tests with Cypress - Basic

Sample project to demonstrate Cypress basic commands.

## What I've learned?

- How to configure a Cypress project from the beginning
- How to visit local and remote pages
- How to deal with the most common elements found in web applications
- How to test _upload_ files
- How to perform the most diverse checks of expected results
- How to create custom commands
- How to handle links that open in another browser tab
- How to run tests simulating the dimensions of a mobile device
- How to solve the same problems in different ways, knowing the [Cypress API](https://docs.cypress.io/api/table-of-contents)
- How to run tests in a continuous integration _pipeline_ whenever changes occur in the application (or tests) code
- Como criar uma documentação mínima para seu projeto de testes automatizados
- How to create minimal documentation for your automated testing project

___

## Pre-requirements

It is required to have Node.js and npm installed to run this project.

> I used versions `v19.7.0` and `9.5.0` of Node.js and npm, respectively. I suggest you use the same or later versions.

## Installation

Run `npm install` (or `npm i` for the short version) to install the dev dependencies.

## Tests

> **Note:** Before running the tests, make a copy of the `cypress.env.example.json` file as `cypress.env.json`, which in the real world, you would update with valid credentials.
>
> The `cypress.env.json` file is included on [`.gitignore`](./.gitignore) and you're safe that confidential info won't be versioned.

Run `npm test` (or `npm t` for the short version) to run the test in headless mode.

Or, run `npm run cy:open` to open Cypress in interactive mode.

## Support this project

If you want to support this project, leave a ⭐.



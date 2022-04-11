# Simulando o _viewport_ de um dispositivo móvel

Com o Cypress, é possível redimensionar o navegador para simular o uso da aplicação em um dispositivo móvel.

A forma que considero mais simples de atingir tal resultado, é passar tais dimensões direto via linha de comando, ao executar o `cypress`.

Algo como o seguinte: `cypress open --config viewportWidth=370 viewportHeight=660`.

## Conteúdo sugerido

Em Fevereiro de 2021, criei um conteúdo chamado [Como rodar testes simulando dispositivos móveis com Cypress](https://talkingabouttesting.com/2021/02/22/como-rodar-testes-simulando-dispositivos-moveis-com-cypress/).

Recomendo a leitura!

## Exercicio

1. Crie um script no arquivo `package.json` que abre o _Cypress Runner_ simulando um dispositivo com 410 pixels de largura e 860 pixels de altura
2. Execute os testes e veja-os passando, simulando a execução em um _viewport mobile_

## Exercicio extra

1. Crie um script no arquivo `package.json` que rode os testes em modo _headless_, simulando um dispositivo com 410 pixels de largura e 860 pixels de altura
2. Execute os testes e veja-os passando, simulando a execução em um _viewport mobile_, agora em modo _headless_

> 👨‍🏫 Poste no LinkedIn o vídeo gerado na pasta `cypress/videos/` e mostre para sua rede o que você aprendeu até aqui.

___

Siga para a aula [aula 9](./09.md) para aprender como criar uma documentação mínima para seu projeto de testes automatizados com Cypress.

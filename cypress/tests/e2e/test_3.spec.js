describe('Suite de testes 2', () => {
    beforeEach(function() {
      cy.visit('./src/index.html') /* Visitar caminho relativo da aplicação */
    })

// ** Marcação e desmarcação de inputs do tipo "Checkbox"
// Comandos que marcam e desmarcam
// .check -> para marcar, e .uncheck -> para desmarcar

it('Marcação de ambos checkboxes, em seguida desmarcação apenas do último', function() {
    cy.get('input[type="checkbox"]') // Identificação os 2 checkboxes
      .check() // Marcação de todos os checkbox que encontrar
      .should('be.checked') // Verificação se não estão marcados
      .last() // Para considerar apena so último elemento
      .uncheck() // Desmarcar o último checkbox
      .should('not.be.checked') // Verificação se o último não está mais marcado
  })

  /** A função .selectFile seleciona arquivos, como por exemplo, adiciona um anexo.
   
  Ou seja, primeiramente se utiliza o `cy.get('input[type="file"]')` para identificar 
  um campo de seleção de arquivos, e em seguida encadeia um `.selectFile()`,
  passando ao mesmo o caminho relativo do arquivo (pasta fixture) que pretende fazer o_upload_ (string).

  .selectFile(file)  -> Passa um arquivo
  .selectFile(file, options)  -> Passa um arquivo e opções
  .selectFile([file1, file2, ...])  -> Passa um array (lista de arquivos)
  .selectFile([file1, file2, ...], options)  -> Passa um array e opções
*/

  it('Seleção de um arquivo da pasta fixtures', function() {
    cy.get('input[type="file"]#file-upload') // Ou apenas escrever o id cy.get(#file-upload)
    // Não deve inicialmente ter nenhum valor pois não foi selecionado ainda nenhum arquivo (verificação intermediária)
      .should('not.have.value') 
      // Caminho relativo do arquivo que quer fazer o upload (para a pasta fixtures dentro de Cypress)
      .selectFile('./cypress/fixtures/example.json')  
      // Verificação se que selecionou o arquivo corretamente,
      // ou seja, se após a seleção do arquivo o nome correto dele persiste no objeto files do input      
      .should(function($input) { // função recebe como o argumento o input do tipo file, pode usar jquery
        expect($input[0].files[0].name).to.equal('example.json')
        // Após o expect escrever propriedades do objeto: 
        // primeiramente que espera o "input" com índice 0 pois foi o primeiro qa retornar, 
        // o "files" com índice 0 também pois quer o primeiro arquivo do array, 
        // e escrever "name" a seguir pois espera que o nome seja x
      })
  })

  it('Seleção de um arquivo simulando um drag-and-drop', function() {
    cy.get('input[type="file"]')
      .should('not.have.value')
      // Primeiro argumento é o camilho relativo do arquivo 
      // e o segundo argumento é um objeto que vai ter a propriedade action com o valor 'drag-drop'
      // Assim, ao invés de simular que está clicando no campo para selecionar o arquivo, 
      // que está arrastando o arquivo para cima do input (campo de upload)
      .selectFile('./cypress/fixtures/example.json', { action: 'drag-drop' })
      .should(function($input) {
        // console.log($input)
        expect($input[0].files[0].name).to.equal('example.json') 
      })
  })

    // Dar um alias para uma fixture e selecionar o arquivo baseado no alias que deu par a fixture
  it('Seleção de um arquivo utilizando uma fixture para a qual foi dada um alias', function() {
    // Função cy.fixture não precisa passar o caminho relativo, apenas o nome do arquivo
    // e dar um nome para o arquivo, como sampleFile
    cy.fixture('example.json').as('sampleFile')
    cy.get('input[type="file"]')
      // Ao invés de passar o caminho relativo para a função selectFile, passa apenas o alias
      // Escrever o "@" antes do nome (alias)
      .selectFile('@sampleFile')
      .should(function($input) {
        expect($input[0].files[0].name).to.equal('example.json')
      })
  })

/** Lidando com links que abrem em outra aba - Limitação do cypress em funcionar em apenas uma ba do navegator
 
 * Na [página de _trade-offs_](https://docs.cypress.io/guides/references/trade-offs) 
 da documentação oficial do Cypress (no momento da escrita desta aula), 
 há uma seção que comenta da limitação do [Cypress funcionar somente em uma aba do navegador]
 (https://docs.cypress.io/guides/references/trade-offs#Multiple-tabs)
 
# Para abrir a página em uma nova aba do navegador abaixo há 2 alternativas, porém, 
na documentação oficial, há ainda mais:

## Alternativa 1 - Confiar que o navegador funciona, ou seja, se um elemento do tipo âncora (`a`) 
possui o atributo `target` com o valor `_blank`, quando clicado, obrigatoriamente o valor do atributo `href` 
será aberto em uma nova aba. Este é o compartamento padrão em qualquer navegador.
Neste caso, podemos simplesmente verificar tal característica, sem nem mesmo precisar clicar no elemento.
Ex: cy.get('.some-link').should('have.attr', 'target', '_blank')

## Alternativa 2 - Remover o atributo `target` do elemento
O Cypress deixa remover a propriedade `target` do elemento âncora.
Para isso, usar a função .invoke()
Ex: cy.get('#link-que-abre-em-outra-aba').invoke('removeAttr', 'target')

*/
  it('Verificação de que a política de privacidade abre em outra aba sem a necessidade de um clique', function() {
    // Verificação se há o target _blank, pois se há vai abrir em outra página
    cy.get('#privacy a').should('have.attr', 'target', '_blank')
  })


  it('Acesso a página da política de privacidade removendo o target e então clicanco no link', function() {
     // Identificar o link que abre em outra página, a página que vai abrir em outra aba tem que estar 
    cy.get('#privacy a')
    // Remover o atributo (a propriedade) target do elemento "a" (âncora) para abrir outra página
    // na mesma aba que o cypress está sendo executado, já que ele não executa os testes em outra aba
      .invoke('removeAttr', 'target') 
      .click()
    cy.contains('Talking About Testing').should('be.visible')
  })


  /*
O invoke pode ser utilizado para remover o atributo `target` de um elemento como no exemplo anterior, 
evitando que quando clicado, a página não abra em outra aba.

Além disso, no conteúdo [Como “simular” um CTRL+V com Cypress](https://talkingabouttesting.com/2022/02/11/como-simular-um-ctrlv-com-cypress), 
fica demonstrado o uso do "".invoke('val')"", para definir o valor de um campo de texto, 
a fim de não se perder tempo quando é necessário digitar um texto longo

2 outros usos do '.invoke()':
  - .invoke('show')
  - .invoke('hide')

O comando .invoke('show') força a exibição de um elemento HTML que esteja escondido, 
com um estilo "display: none;", por exemplo.
E o comando .invoke('hide') esconde um elemento que está sendo exibido. */


// Para funcionar esta segunda alternativa para a página abrir em outra aba 
// é necessário que a página esteja no mesmo domínio ou subdomínio da aplicação em teste 
// porque o Cypress tem uma limitação de não suportar múltiplos domínios 
  it('Exibição e omissão [esconde] das mensagens de sucesso e erro usando o .invoke', function() {
    cy.get('.success')
      .should('not.be.visible')
      .invoke('show')
      // Pode utilizar ".and" depois do should
      .should('be.visible').and('contain', 'Mensagem enviada com sucesso.')
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

  it('Preenchimento da área de texto usando o comando invoke', function() {
    const longText = Cypress._.repeat('0123456789', 20) // Inserção de 200 caracteres com este exemplo
    // Usar a função .invoke para preencher a área de texto
    cy.get('#open-text-area')
    // Invoca o valor do campo de texto e insere o valor sem precisar digitar, sendo ainda mais rápido que o uso de delay
      .invoke('val', longText) 
    // Verificação que o valor inserido persistiu no campo
      .should('have.value', longText)
  })

  it('Realização de uma requisição HTTP', function()  {
    /* cy.request -> Executa requisições HTTP a nível de rede (execução dos comandos à nível de rede),
    ganhando tempo no setup dos testes. Exemplos de uso:
    - Pode ser usado para obter a resposta do status (se retornou 200 ou não)
    - Pode simular que o usuario já fez o login sem passar pela página de login, através de um requisição, para entrar na página já logado
    Obs: cy.request e diferente de cy.intercept  */
    cy.request('https://cac-tat.s3.eu-central-1.amazonaws.com/index.html')
      // Verificar a resposta da requisição HTT 
      .should(function(response) {
      // Desestruturar a resposta da requisição, obtendo as informações abaixo
        const { status, statusText, body } = response
      // Verificações
        expect(status).to.equal(200)
        expect(statusText).to.equal('OK')
        // Pode usar .contains ao invés de .to.include
        expect(body).to.include('CAC TAT') // Verificar se no corpo há o texto incluso
      })
  })

  it('Encontrar o gato escondido', function() {
    cy.get('#cat') // Uso de # seleciona pelo ID
      .invoke('show')
      .should('be.visible')
    cy.get('#title')
      .invoke('text', 'CAT TAT')
    cy.get('#subtitle')
      .invoke('text', 'Eu 💚 gatos!')
  })
})

/* 
Redimensionar o navegador para simular o uso da aplicação em um dispositivo móvel
(em modo interativo ou em modo headless com viewport mobile)
Passar as dimensões diretamente via linha de comando ao executar o cypress
Ex: cypress open --config viewportWidth=370 viewportHeight=660

Exercício 1 - Criação de um script no arquivo package.json que abre o Cupress Runner simulando um dispositivo com 
410 pixels de largura e 860 pixels de altura, simulando a execução em viewport mobile.
*/
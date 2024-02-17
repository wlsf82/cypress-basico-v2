describe('Suite de testes 2', () => {
    beforeEach(function() {
      cy.visit('./src/index.html') /* Visitar caminho relativo da aplicação */
    })
  
// ** Seleção de opções em campos de seleção suspensa com o comando .select()

    it('Seleção do produto YouTube pelo seu "valor (value)" - Seleção de uma opção aleatório a partir de uma caixa de seleção suspensa', () => {
      // .select(value)
      // .select(values)
      // .select(value, options)
      // .select(values, options)
      /* Comando que identifica um elemento do tipo select com cy.get e então encadear o comando.select()
      passando um valor a ser escolhido (por seu texto, pelo valor do atributo value ou por seu índice [que começa com 0]) */
      // Se o campo for de múltipla escolha, pode passar os valores que deseja selecionar listando-os em um array
      cy.get('#product')
        .select('YouTube')
        .should('have.value', 'youtube') // YouTube com letra minúscula (inspect) pois se está verificando o VALOR e não o texto
    })
   
    it('Seleção do produto Mentoria pelo seu "texto" - Seleção de uma opção aleatório a partir de uma caixa de seleção suspensa', () => {
      /* 
      <div class="field">
          <label for="product"><strong>Produto</strong></label>
          <select id="product">
            <option selected="" disabled="" value="">Selecione</option>
            <option value="blog">Blog</option>
            <option value="cursos">Cursos</option>
            <option value="mentoria">Mentoria</option>
            <option value="youtube">YouTube</option>
          </select>
        </div>
      */
      cy.get('#product')
      // Seleção a partir do texto (que possui letra maiúscula)
        .select('Mentoria') 
      // Pode se utilizar também o contain ao invés de have.value e escrever com letra maiúscula
        .should('have.value', 'mentoria') 
    })

    it('Seleção do produto Blog pelo seu "índice" - Seleção de uma opção aleatório a partir de uma caixa de seleção suspensa', () => {
    cy.get('#product')
    // O índice é a ordem que as opções (options) são exibidas, que sempre inicia com 0
    .select(1)
    .should('have.value', 'blog') 
  })

// ** Seleção de opções (inputs) do tipo radio, que são de opção única
// Quando marca 1 opção e depois altera para outra, a escolhida anteriormente é automaticamente desmarcada
// Utilização das funções .check(), .each() e cy.wrap()

  it('Marcação da opção tipo de atendimento "Feedback" - Seleção inputs tipo radio', () => {
    // Identificação do elemento input pelo tipo e valor através do inspecionar no app local, pois o selector playground do Cypress não marcou de forma adequada
    cy.get('input[type="radio"][value="feedback"]')
    // A função .check serve tanto para inputs do tipo radio como do tipo checkbox, o click também funciona para os do tipo radio, apesat de que pode confundir com clicar
    .check() // Sem argumento
    .should('have.value', 'feedback') // Verificar se a opção correta foi selecionada
  })

  //.each() serve para iterar sobre uma estrutura de array, quando tem um cy.get que retornaq mais de 1 elemento
  //.wrap() empacota algo para usar posteriormente

  it('Marcação de cada tipo de atendimento - Seleção inputs tipo radio', () => {
    // Identificação do elemento input pelo tipo e valor através do inspecionar no app local, pois o selector playground do Cypress não marcou de forma adequada
    cy.get('input[type="radio"]') // Não fornecer o valor, apenas o tipo, para identificar todos os elemento do tipo radio
      .should('have.length', 3) // Verificar o comprimento, verificar se há 3 opções do tipo radio
      .each(function($radio) { // Vai marcar cada 1 dos inputs radio, 1 deles por vez a cada ITERAÇÂO. 
        // O .each recebe uma função de callback que recebe como argumento cada um dos itens a ser selecionado 
        // $ -> JQuery - Para selecionar e manipular elementos HTML, além de manipular eventos, de forma mais simples que o JavaScript
        cy.wrap($radio).check()
        cy.wrap($radio).should('be.checked')
      })
  }) // cada um dos elementos 

}) 



/* Uma função de callback, em termos simples, é uma função que é passada como argumento para outra função e é executada dentro dessa função. 
Em outras palavras, é uma função que você instrui outra função a chamar quando uma determinada operação for concluída, 
um evento ocorrer ou uma condição for atendida.
A função de callback é um conceito fundamental em linguagens de programação que suportam funções de primeira classe, como JavaScript. */
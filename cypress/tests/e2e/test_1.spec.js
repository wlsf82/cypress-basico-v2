describe('Suite de testes 1', () => {
    beforeEach(function() {
      cy.visit('./src/index.html') /* Visitar caminho relativo da aplicação */
    })
  
    it('Verificação do título da aplicação', () => {
      cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT')
    })

    it('Preenchimento dos campos do formulário e envio', () => {
      const longText = 'Teste Teste Teste 12345678910'
      cy.get('#firstName').should('be.visible').type('Carolina').should('have.value', 'Carolina')
      cy.get('#lastName').type('Araujo')
      cy.get('#email').type('carolinafa.eng@gmail.com')
      cy.get('#open-text-area').type(longText, { delay: 0 })
      cy.get('button[type="submit"]').click() /* Se não tives a chaveta colocar . antes de button, visto que é uma classe */
      cy.wait(2000) // Esperar 2 segundos
      cy.get('.success').should('be.visible') /* Verificar se mensagem de sucesso está visível, o ponto antes do error, signigicar que o elemento error é uma classe */
      /* 
      Pode usar acima cy.clock(), retirar o cy.wait e no fim acrescentar: 
      cy.tick(3000)
      cy.get('.success').should('not.be.visible')
      */
    })
  
    it('Exibição mensagem de erro ao submeter o formulário utilizando email com formatação inválida', () => {
      // A função _.repeat serve para repetir um string um certo número de vezes,
      // onde o 1º argumento é a string a qual se deseja repetir 
      // e o 2º argumento é quantas vezes tal string deve ser repetida
      // _.repeat serve para criar uma string com o texto longo
      const longText = Cypress._.repeat('Teste Teste Teste 12345678910', 20)
      // cy.clock() congela o tempo e cy.tick() avança no tempo
      cy.clock() // Congela o relógio do navegador
      cy.get('#firstName').should('be.visible').type('Carolina').should('have.value', 'Carolina')
      cy.get('#lastName').type('Araujo')
      cy.get('#email').type('carolinafa.enggmailcom') // Email com a formatação errada
      cy.get('#open-text-area').type(longText, { delay: 0 }) // Sobrescrever o delay default de 10 seguntos para 0 em textos longos
      cy.get('.button').click()
      // Ou usar: cy.contains('button', 'Enviar').click()
      // Ou usar: should('exist')
      cy.get('.error').should('be.visible') /* Verificar se mensagem de erro está visível */
      cy.tick(3000) // Avança no tempo em 3000ms (3 segundos) para que a mensagem desapareça
      // e não precise esperar como na função cy.wait
      cy.get('.error').should('not.be.visible') 
    })

    Cypress._.times(3, function() {
      //_.times serve para executar uma função de callback um certo número de vezes, provando que o teste é estável
      // O número de vezes a executar a função é o 1º argumento e a funnção é o segundo argumento
      it('Verificação se campo continua vazio quando preenchido com valor-não numérico - Verificação de valores de input', () => {
        cy.get('#phone')
          .type('abcde') // Encadeamento de comandos pode ser escrito embaixo
          .should('have.value', '') // Verificar string vazia, pois o campo não aceita uma string, apenas números
      })
    })

    it('Marcar o checkbox de telefone para torná-lo campo obrigatório e deixá-lo vazio - Verificação de campo obrigatório vazio e de msg de erro', () => {
      const longText = 'Teste Teste Teste 12345678910'
      cy.clock()
      cy.get('#firstName').should('be.visible').type('Carolina').should('have.value', 'Carolina')
      cy.get('#lastName').type('Araujo')
      cy.get('#email').type('carolinafa.eng@gmail.com')
      cy.get('#phone-checkbox').check() // Usar check ao invés de click por ser um checkbox
      cy.get('#open-text-area').type(longText, { delay: 0 })
      cy.get('.button').click()
      cy.get('.error').should('be.visible') /* Verificar se mensagem de erro está visível */
      cy.tick(3000)
      cy.get('.error').should('not.be.visible')
    })

    it('Preenchimento dos campos e em seguida clear', () => {
      cy.get('#firstName')
        .type('Carolina')
        .should('have.value', 'Carolina')
        .clear()
        .should('have.value', '')
      cy.get('#lastName')
        .type('Araujo')
        .should('have.value', 'Araujo')
        .clear()
        .should('have.value', '')
      cy.get('#email')
        .type('carolinafa.eng@gmail.com')
        .should('have.value', 'carolinafa.eng@gmail.com')
        .clear()
        .should('have.value', '')
      cy.get('#phone') // Campo telefone e não checkbox
        .type('12345') // Não é necessário escrever click, apenas type
        .should('have.value', '12345') // Campo telefone aceita quaisquer números
        .clear()
        .should('have.value', '')
    })

    it('Submissão formulário com campos obrigatórios vazios', () => {
      //Exemplo sem cy-clock(), cy.tick() e cy.get('.error').should('not.be.visible')
      cy.get('.button').click()
      cy.get('.error').should('be.visible') /* Verificar se mensagem de erro está visível */
    })

    it('Envio do formulário com sucesso usando comandos customizados - Criação do comando no arquivo Commands na pasta Support', () => {
      cy.clock()
      // Comandos customizados GUI (preferível custom commands ao invés de page objects) - Eliminaçao de duplicação de código, tornando os testes mais legíveis
      // Fornecer um nome para o comando e escrever parênteses assim como os outros comandos do cypress, chamando o comando no teste
      cy.fillMandatoryFieldsAndSubmit() 
      // Verificação do resultado esperado
      cy.get('.success').should('be.visible')
      cy.tick(3000)
      cy.get('.success').should('not.be.visible')
    })

    it('Utilização de cy.contains no lugar de cy.get', () => {
      // cy.get -> Seletor mais específico
      /* cy.contains -> Identifica um elemento DOM a partir de um texto único contido no elemento o qual deseja identificar
      (ex: contém texto ou contém seletor CSS [tag], texto) */
      // cy.contains(content)
      // cy.contains(content, options)
      // cy.contains(selector, content)
      // cy.contains(selector, content, options)
      // Abaixo no cy.contains o primeiro argumento é o seletor css (tag), e o segundo é um texto específico que é único e o identifica como elemento
      cy.contains('button', 'Enviar').click()
      cy.get('.error').should('be.visible') /* Verificar se mensagem de erro está visível */
    })
}) 
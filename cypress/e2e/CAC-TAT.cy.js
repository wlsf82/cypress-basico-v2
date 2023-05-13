describe('Central de Atendimento ao Cliente TAT', () => { 
  beforeEach(()=>{
    cy.visit('http://127.0.0.1:5500/src/index.html')
  })


  // Verifica se o titulo é o indicado
  it('Verifica o título da aplicação', ()=>{
    cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT')
  })

  // Digitando em campos e clicando em elementos - ex1
  it('Preencha os campos obrigatórios e envia o formulário', ()=>{

    const longText= 'Lorem Ipsum é simplesmente uma simulação de texto da indústria tipográfica e de impressos, e vem sendo utilizado desde o século XVI, quando um impressor desconhecido pegou uma bandeja de tipos e os embaralhou para fazer um livro de modelos de tipos. Lorem Ipsum sobreviveu não só a cinco séculos, como também ao salto para a editoração eletrônica, permanecendo essencialmente inalterado. Se popularizou na década de 60, quando a Letraset lançou decalques contendo passagens de Lorem Ipsum, e mais recentemente quando passou a ser integrado a softwares de editoração eletrônica como Aldus PageMaker.'

    cy.get('#firstName').type('Emerson')
    cy.get('#lastName').type('Patryck')
    cy.get('#email').type('emeps@ex.com')

    // Digitando em campos e clicando em elementos - eex1
    cy.get('#open-text-area').type(longText, {delay: 0})
    cy.get('button[type="submit"]').click()
    cy.get('.success').should('be.visible')
  })   

  // Validando a mensagem de erro - ex2
  it('Exibir mensagem de erro ao submeter o formulário com um email com formatação inválida', ()=>{

    const longText= 'Lorem Ipsum é simplesmente uma simulação de texto da indústria tipográfica e de impressos, e vem sendo utilizado desde o século XVI, quando um impressor desconhecido pegou uma bandeja de tipos e os embaralhou para fazer um livro de modelos de tipos. Lorem Ipsum sobreviveu não só a cinco séculos, como também ao salto para a editoração eletrônica, permanecendo essencialmente inalterado. Se popularizou na década de 60, quando a Letraset lançou decalques contendo passagens de Lorem Ipsum, e mais recentemente quando passou a ser integrado a softwares de editoração eletrônica como Aldus PageMaker.'
    cy.get('#firstName').type('Emerson')
    cy.get('#lastName').type('Patryck')
    cy.get('#email').type('emeps@ex,com')
    cy.get('#open-text-area').type(longText, {delay: 0})
    cy.get('button[type="submit"]').click()
    cy.get('.error').should('be.visible')
  })   

  // Verifica o campo telefone
  it('O campo telefone continua vazio quando preenchido com valor não numerico', ()=>{
    cy.get('#phone').type('amsdfaosdmfasdf').should('have.value', '')
  })

  // Verifica o campo telefone
  it('Exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', ()=>{
    const longText= 'Lorem Ipsum é simplesmente uma simulação de texto da indústria tipográfica e de impressos, e vem sendo utilizado desde o século XVI, quando um impressor desconhecido pegou uma bandeja de tipos e os embaralhou para fazer um livro de modelos de tipos. Lorem Ipsum sobreviveu não só a cinco séculos, como também ao salto para a editoração eletrônica, permanecendo essencialmente inalterado. Se popularizou na década de 60, quando a Letraset lançou decalques contendo passagens de Lorem Ipsum, e mais recentemente quando passou a ser integrado a softwares de editoração eletrônica como Aldus PageMaker.'
    cy.get('#firstName').type('Emerson')
    cy.get('#lastName').type('Patryck')
    cy.get('#email').type('emeps@ex.com')
    cy.get('#phone-checkbox').click()
    cy.get('#open-text-area').type(longText, {delay: 0})
    cy.get('button[type="submit"]').click()
    cy.get('.error').should('be.visible')
  })

  // Preencha e limpe os campos nome, sobrenome, email e tefone
  it('Preencha e limpe os campos nome, sobrenome, email e tefone', ()=>{
    cy.get('#firstName').type('Emerson').should('have.value','Emerson').clear().should('have.value', '')
    cy.get('#lastName').type('Patryck').should('have.value','Patryck').clear().should('have.value', '')
    cy.get('#email').type('emeps@ex.com').should('have.value','emeps@ex.com').clear().should('have.value', '')
    cy.get('#phone').type('27999712977').should('have.value', '27999712977').clear().should('have.value', '')
   
  })

  //Testa o erro do envio do formulário 
  it('Exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', ()=>{
    cy.get('button[type="submit"]').click()
    cy.get('.error').should('be.visible')
  })

  //Envia o formulário com sucesso usando um comando customizado
  it('Envia o formulário com sucesso usando um comando customizado', ()=>{
    cy.fillMandatoryFieldsAndSubmit()
    cy.get('.success').should('be.visible')
  })

  //Teste deve encontrar o elemento com respectivo conteudo
  it('Busca todos os elemento que contem "Enviar" ',()=>{
    cy.contains('button', 'Enviar')
  })
})

describe('Selecionando opções em campos de seleção suspensa',()=>{
  beforeEach(()=>{
    cy.visit('http://127.0.0.1:5500/src/index.html')
  })

  it('Buscar dentro do campo Produto a opção de Blog', ()=>{
    cy.get('select').select('Blog')
    cy.get('select').select('blog')
    cy.get('select').select(1)
  })
  it('Seleciona o produto pelo seu texto Youtube', ()=>{
    cy.get('select').select('YouTube').should('have.value', 'youtube')
  })
  it('Seleciona o produto pelo seu valor Mentoria', ()=>{
    cy.get('select').select('mentoria').should('have.value', 'mentoria')
  })
  it('Seleciona o produto pelo seu indice Blog', ()=>{
    cy.get('select').select(1).should('have.value', 'blog')
  })
})

describe('Marcando inputs do tipo radio',()=>{
  beforeEach(()=>{
    cy.visit('http://127.0.0.1:5500/src/index.html')
  })

  it('Marca o tipo de atendimento "Feedback"', ()=>{
    cy.get('input[type="radio"][value="feedback"]').check().should('have.value', 'feedback')
  })
  it('Marca cada tipo de atendimento', ()=>{
    cy.get('input[type="radio"]').should('have.length', 3).each(( $radio )=>{
      cy.wrap($radio).check()
      cy.wrap($radio).should('be.checked')
    })
  })

})

describe('Marcando e desmarcando checkboxes',()=>{
  beforeEach(()=>{
    cy.visit('http://127.0.0.1:5500/src/index.html')
  })

  it('Marcando ambos os checkboxes e desmarcando o ultimo', ()=>{
    cy.get('input[type="checkbox"]').check().last().uncheck().should('not.be.checked')
  })

  it('Exibe mensagem de erro quando o telefone se torna obrigatótio mas não é preenchido antes do envio do formulário', ()=>{
    cy.get('#phone-checkbox').check()
    cy.contains('button', 'Enviar').click();
    cy.get('.error').should('be.visible')
  })
})

describe('Uploads de Arquivos',()=>{
  beforeEach(()=>{
    cy.visit('http://127.0.0.1:5500/src/index.html')
  })

  it('Seleciona um arquivo da pasta fixtures', ()=>{
    cy.get('input[type="file"]').should('not.have.value').selectFile('./cypress/fixtures/example.json')
    .should($input=>{
      expect($input[0].files[0].name).to.equal('example.json')
    })
  })
  it('Seleciona um arquivo simulando drag-and-drop', ()=>{
    cy.get('input[type="file"]').should('not.have.value').selectFile('./cypress/fixtures/example.json', {action: "drag-drop"})
    .should($input=>{
      expect($input[0].files[0].name).to.equal('example.json')
    })
  })

  it('Seleciona um arquivo utilizando um fixture para a qual foi dada um alias', ()=>{
    cy.fixture('example.json').as('sampleFile')
    cy.get('input[type="file"]').should('not.have.value').selectFile('@sampleFile')
    .should($input=>{
      expect($input[0].files[0].name).to.equal('example.json')
    })
  })

})
# Conhecendo a aplicação em teste

Antes de começarmos a configurar o Cypress e escrever scripts de testes automatizados, deixa eu te apresentar a aplicação que vamos testar.

A aplicação se chama Central de Atendimento ao Cliente TAT - [**CAC TAT**](https://cac-tat.s3.eu-central-1.amazonaws.com/index.html) - e foi desenvolvida usando HTML, CSS e JavaScript.

## Funcionalidades da aplicação

A aplicação CAC TAT é um formulário para simular o envio de mensagens à uma central de atendimento ao cliente.

### Campos obrigatórios

Os seguintes campos são obrigatórios, por padrão:

- Nome (campo do tipo texto)
- Sobrenome (campo do tipo texto)
- Email (campo do tipo email, **com validacão**)
- Como podemos te ajudar? (campo de área de texto)

### Outros campos

Além dos campos obrigatórios, o "cliente" pode informar:

- Seu telefone (campo do tipo número)
- O produto ao qual deseja atendimento (campo de seleção suspensa com as opções Blog, Cursos, Mentoria e YouTube)
- O tipo de atendimento (campos do tipo radio com os valores Ajuda, Elogio e Feedback)
- Meio de contato preferêncial (campos de checkbox com os valores Email e Telefone)
- Um anexo (o "cliente" pode adicionar um arquivo como anexo ao atendimento)

### Regras dos meios de contato preferenciais

- Quando o checkbox Telefone é marcado, o input do número do telefone passa a ser obrigatório
- Ao desmarcar o checkbox Telefone, o input do número do telefone deixa de ser obrigatório

### Política de privacidade

Ao clicar no link [Política de privacidade](https://cac-tat.s3.eu-central-1.amazonaws.com/privacy.html), na parte inferior da página, tal página é aberta em uma nova aba do navegador.

### Mensagens

⚠️ Caso haja algum problema relacionado aos campos obrigatórios, a seguinte mensagem é exibida (em um fundo amarelo): `Valide os campos obrigatórios!`.

✅ Ao submeter o formulário com sucesso, a seguinte mensagem é exibida (em um fundo verde): `Mensagem enviada com sucesso.`

> Além disso, quando o formulário é enviado com sucesso, todos os campos voltam ao seu estado padrão.

## Teu desafio

Durante o curso de testes automatizados com Cypress (básico) da Escola TAT, te desafio a testar todas as funcionalidades da aplicação CAC TAT, além de configurar um pipeline de integração contínua que executa tais testes sempre que mudanças forem enviadas ao GitHub.

Espero que esteja tão ansioso(a) para começar como estou para te guiar ao longo do caminho! 🧑‍🏫

Vá para a [aula 0](./0.md) para fazer o setup do projeto de testes.

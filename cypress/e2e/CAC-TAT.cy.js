/// <reference types="Cypress" />

describe('Central de Atendimento ao Cliente TAT', () => {
	beforeEach(() => {
		cy.visit('./src/index.html');
	});

	it('verifica o título da aplicação', () => {
		cy.title()
			.should('be.equal', 'Central de Atendimento ao Cliente TAT');
	});

	it('preenche os campos obrigatórios e envia o formulário', () => {
		const longTextSample = 'Sample text here Sample text here Sample text here Sample text here Sample text here Sample text here'
		cy.get('#firstName')
			.should('be.visible')
			.type('John')
			.should('have.value', 'John');

		cy.get('#lastName')
			.should('be.visible')
			.type('Doe')
			.should('have.value', 'Doe');

		cy.get('#email')
			.should('be.visible')
			.type('john.doe@mail.com')
			.should('have.value', 'john.doe@mail.com');

		cy.get('#open-text-area')
		.should('be.visible')
		.type(longTextSample, { delay: 0 })
		.should('have.value', longTextSample);

		cy.get('button[type="submit"')
			.click()

		cy.get('.success > strong')
			.should('be.visible')
			.contains('Mensagem enviada com sucesso.')
	});

	it('exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', () => {
		cy.get('#firstName')
			.should('be.visible')
			.type('John')
			.should('have.value', 'John');

		cy.get('#lastName')
			.should('be.visible')
			.type('Doe')
			.should('have.value', 'Doe');

		cy.get('#email')
			.should('be.visible')
			.type('johndoemail.com')
			.should('have.value', 'johndoemail.com');

		cy.get('#open-text-area')
		.should('be.visible')
		.type('Sample text here')
		.should('have.value', 'Sample text here');

		cy.get('.button[type="submit"')
			.click();
	
		cy.get('.error > strong')
			.should('be.visible')
			.contains('Valide os campos obrigatórios!');
	});

	it('verifica que o campo de telefone aceita apenas números e ficará vazio quando um valor não-numérico for digitado', () => {
		cy.get('#phone')
		.should('be.visible')
		.type('xablau')
		.should('have.value', '');
	})

	it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', () => {
		cy.get('#firstName')
			.should('be.visible')
			.type('John')
			.should('have.value', 'John');

		cy.get('#lastName')
			.should('be.visible')
			.type('Doe')
			.should('have.value', 'Doe');

		cy.get('#email')
			.should('be.visible')
			.type('john.doe@mail.com')
			.should('have.value', 'john.doe@mail.com');

		cy.get('#open-text-area')
			.should('be.visible')
			.type('Sample text here')
			.should('have.value', 'Sample text here');

		cy.get('#phone-checkbox')
			.check();

		cy.get('.button')
			.click();

		cy.get('.error > strong')
			.should('be.visible')
			.contains('Valide os campos obrigatórios!')
	});

	it('preenche e limpa os campos nome, sobrenome, email e telefone', () => {
		cy.get('#firstName')
		.should('be.visible')
		.type('John')
		.should('have.value', 'John')
		.clear()
		.should('have.value', '');

	cy.get('#lastName')
		.should('be.visible')
		.type('Doe')
		.should('have.value', 'Doe')
		.clear()
		.should('have.value', '');

	cy.get('#email')
		.should('be.visible')
		.type('john.doe@mail.com')
		.should('have.value', 'john.doe@mail.com')
		.clear()
		.should('have.value', '');

		cy.get('#phone')
		.should('be.visible')
		.type(15)
		.should('have.value', 15)
		.clear()
		.should('have.value', '');
	});

	it('exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', () => {
		cy.get('.button[type="submit"')
		.click();

		cy.get('.error > strong')
		.should('be.visible')
		.contains('Valide os campos obrigatórios!');
	});

	it('envia o formuário com sucesso usando um comando customizado', () => {
		cy.fillMandatoryFieldsAndSubmit();
		cy.get('.success').should('be.visible');
	});

	it('utiliza contains ao invés de get', () => {
		cy.contains('Nome')
		.should('be.visible')
		.type('John')
		// .should('have.value', 'John');

		cy.contains('Sobrenome')
		.should('be.visible')
		.type('Doe')
	// 	.should('have.value', 'Doe');

		cy.contains('E-mail')
		.should('be.visible')
		.type('john.doe@mail.com')
	// 	.should('have.value', 'john.doe@mail.com'); 

	cy.contains('button', 'Enviar')
		.click();	
	});

	it('selecione um produto (YouTube) por seu texto', () => {
		cy.get('#product')
			.select('YouTube')
			.should('have.value', 'youtube');
	});

	it('seleciona um produto (Mentoria) por seu valor', () => {
		cy.get('#product')
		.select('mentoria')
		.should('have.value', 'mentoria');
	});

	it('seleciona um produto (Blog) por seu índice', () => {
		cy.get('#product')
		.select(1)
		.should('have.value', 'blog');
	});

	it('marca o tipo de atendimento "Feedback"', () => {
		cy.get('input[type="radio"][value="feedback"]')
			.should('be.visible')
			.check()
			.should('be.checked');
	});
	
	it('marca cada tipo de atendimento', () => {
		cy.get('[type="radio"]')
			.should('have.length', 3)
			.each(($radio) => {
				cy.wrap($radio).check()
				cy.wrap($radio).should('be.checked');
			});
	});

	it('marca ambos os checkboxes, depois desmarca o último', () => {
		cy.get('input[type="checkbox"]')
			.check()
			.last()
			.uncheck();

			cy.get('input[type="checkbox"]')
				.first()
				.should('be.checked');

			cy.get('input[type="checkbox"]')
				.last()
				.should('not.be.checked');
	});

	it('seleciona um arquivo da página fixtures', () => {
		cy.get('input[type="file"]')
			.selectFile('cypress/fixtures/example.json')
			.should((input) => {
				// console.log(input)
				expect(input[0].files[0].name).to.equal('example.json')
			});
	});

	it('seleciona um arquivo simulando um drag-and-drop', () => {
		cy.get('input[type="file"]')
		.selectFile('cypress/fixtures/example.json', { action: 'drag-drop' })
		.should((input) => {
			expect(input[0].files[0].name).to.equal('example.json')
		});
	});

	it('seleciona um arquivo utilizando uma fixture para a qual foi dada um alias', () => {
		cy.fixture('example.json').as('sampleFile')
		cy.get('input[type="file"]')
			.selectFile('@sampleFile')
			.should((input) => {
				expect(input[0].files[0].name).to.equal('example.json')
			});
	});

	describe('Lidando com links que abrem e outra aba', () => {
		beforeEach(() => {
			cy.visit('./src/index.html');
		});
		
		it('verifica que a política de privacidade abre em outra aba sem a necessidade de um clique', () => {
			cy.get('a[href="privacy.html"]')
				.should('have.attr', 'target', '_blank')
		});

		it('acessa a página da política de privacidade removendo o target e então clicando no link', () => {
			cy.get('a[href="privacy.html"]')
				.invoke('removeAttr', 'target')
				.click()
		
			cy.contains('CAC TAT - Política de privacidade')
				.should('be.visible');
		});
	});
});
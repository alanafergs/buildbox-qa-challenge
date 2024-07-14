import { CPFGenerate, emailGenerate } from '../support/tools.js';

describe('User Registration', () => {
  const user = {
    firstName: 'validUserfn',
    lastName: 'validUserln',
    birthDate: '26/07/1994',
    cpf: CPFGenerate(),
    email: emailGenerate(),
    password: 'StrongPassword123',
    cep: '54753080',
    addressNumber: '130',
    addressComplement: 'ComplementTest',
  };

  const openEnrollmentForm = () => {
    cy.get('#btn-enroll').should('be.visible').click();
  };

  const fillPersonalData = (userData) => {
    cy.get('#signup-personal-data-firstName').should('be.visible').type(userData.firstName);
    cy.get('#signup-personal-data-lastName').should('be.visible').type(userData.lastName);
    cy.get('#signup-personal-data-birthDate').should('be.visible').type(userData.birthDate);
    cy.get('#signup-personal-data-cpf').should('be.visible').type(userData.cpf);
    cy.get('#signup-personal-data-email').should('be.visible').type(userData.email);
    cy.get('#signup-personal-data-email-confirm').should('be.visible').type(userData.email);
    cy.get('#signup-personal-data-password').should('be.visible').type(userData.password);
    cy.get('#signup-personal-data-password-confirm').should('be.visible').type(userData.password);

    // Seleciona o nível de inglês
    cy.get('[x-ref="selectContainer"]').should('be.visible').first().click();
    cy.get('.overflow-y-scroll').contains('Intermediate').click();

    // Aceita os termos de uso
    cy.get('#signup-personal-data-lgpd').should('be.visible').click();
  };

  const submitPersonalData = () => {
    cy.get('#signup_submit_button_1').should('be.visible').click();
  };

  const fillAddressData = (userData) => {
    cy.get('#signup-address-cep').should('be.visible').type(userData.cep);
    cy.get('#signup-address-number').should('be.visible').type(userData.addressNumber);
    cy.get('#signup-address-complement').should('be.visible').type(userData.addressComplement);
  };

  const submitAddressData = () => {
    cy.get('#signup_submit_button_3').should('be.visible').click();
  };

  beforeEach(() => {
    cy.visit('/');
  });

  it('Registration with valid data', () => {
    // Abre o formulário de inscrição
    openEnrollmentForm();
    // Preenche o formulário
    fillPersonalData(user);
    // Envia o formulário
    submitPersonalData();
    // Preenche os dados de endereço
    fillAddressData(user);
    // Envia os dados de endereço
    submitAddressData();
    // Verifica se a mensagem de sucesso é exibida
    cy.get('[x-data="signUpFlow"]').contains('Thank you for joining us!').should('be.visible');
  });

  it('Registration with missing required fields', () => {
    // Abre o formulário de inscrição
    openEnrollmentForm();

    // Define os campos obrigatórios
    const requiredFields = [
      'input-signup-personal-data-firstName',
      'input-signup-personal-data-lastName',
      'input-signup-personal-data-birthDate',
      'input-signup-personal-data-cpf',
      'input-signup-personal-data-email',
      'input-signup-personal-data-email-confirm',
      'input-signup-personal-data-password',
      'input-signup-personal-data-password-confirm',
    ];

    // Verifica se todos os campos obrigatórios têm o atributo "required"
    requiredFields.forEach((field) => {
      cy.get(`[data-cy="${field}"]`).should('have.attr', 'required');
    });

    // Envia o formulário sem preencher os campos obrigatórios
    submitPersonalData();

    // Verifica se o campo "Primeiro Nome" está inválido
    cy.get('[data-cy="input-signup-personal-data-firstName"]:invalid').should('exist');
  });

  it('Registration with invalid birth date', () => {
    // Abre o formulário de inscrição
    openEnrollmentForm();

    // Preenche o formulário com uma data de nascimento inválida
    const invalidUser = { ...user, birthDate: '99/99/99', cpf: CPFGenerate(), email: emailGenerate() };
    fillPersonalData(invalidUser);
    submitPersonalData();
    fillAddressData(invalidUser);
    submitAddressData();

    // Verifica se a mensagem de erro é exibida
    cy.on('window:alert', (str) => {
      expect(str).to.equal('Data de Nascimento: Precisa ter um formato válido.');
    });
  });

  it('Registration with invalid email address', () => {
    // Abre o formulário de inscrição
    openEnrollmentForm();

    // Preenche o formulário com um email inválido
    const invalidUser = { ...user, email: 'invalidemail', cpf: CPFGenerate() };
    fillPersonalData(invalidUser);
    submitPersonalData();

    // Verifica se o campo "Email" está inválido
    cy.get('[data-cy="input-signup-personal-data-email"]:invalid').should('exist');
  });

  it('Registration with non-matching passwords', () => {
    // Abre o formulário de inscrição
    openEnrollmentForm();

    // Preenche o formulário com senhas que não coincidem
    cy.get('#signup-personal-data-firstName').should('be.visible').type(user.firstName);
    cy.get('#signup-personal-data-lastName').should('be.visible').type(user.lastName);
    cy.get('#signup-personal-data-birthDate').should('be.visible').type(user.birthDate);
    cy.get('#signup-personal-data-cpf').should('be.visible').type(user.cpf);
    cy.get('#signup-personal-data-email').should('be.visible').type(user.email);
    cy.get('#signup-personal-data-email-confirm').should('be.visible').type(user.email);
    cy.get('#signup-personal-data-password').should('be.visible').type('123456');
    cy.get('#signup-personal-data-password-confirm').should('be.visible').type('123654');

    cy.get('[x-ref="selectContainer"]').should('be.visible').first().click();
    cy.get('.overflow-y-scroll').contains('Intermediate').click();
    cy.get('#signup-personal-data-lgpd').should('be.visible').click();

    // Envia o formulário
    submitPersonalData();

    // Verifica se o campo "Senha" está inválido
    cy.get('[data-cy="input-signup-personal-data-password-confirm"]:invalid').should('exist');
  });

  it('Registration with already registered email address', () => {
    // Gera um email para ser reutilizado
    const email = emailGenerate();

    const registeredUser = { ...user, email: email, cpf: CPFGenerate() };

    // Abre o formulário de inscrição
    openEnrollmentForm();
    // Preenche o formulário com um email já registrado
    fillPersonalData(registeredUser);
    // Envia o formulário
    submitPersonalData();
    // Preenche os dados de endereço
    fillAddressData(registeredUser);
    // Envia os dados de endereço
    submitAddressData();

    // Verifica se a mensagem de sucesso é exibida
    cy.get('[x-data="signUpFlow"]').contains('Thank you for joining us!').should('be.visible');

    cy.visit('/');

    // Abre o formulário de inscrição novamente
    openEnrollmentForm();

    // Preenche o campo "Email" com um email já utilizado
    cy.get('#signup-personal-data-email').should('be.visible').type(email);
    cy.get('#signup-personal-data-email-confirm').should('be.visible').type(email);

    // Verifica se o campo "Email" está inválido
    cy.get('[data-cy="input-signup-personal-data-email"]:invalid').should('exist');
  });

  it('Registration with terms and conditions not accepted', () => {
    // Abre o formulário de inscrição
    openEnrollmentForm();

    // Preenche o formulário
    fillPersonalData(user);

    // Verifica se o checkd box têm o atributo "required"
    cy.get(`[data-cy="input-signup-personal-data-lgpd"]`).should('have.attr', 'required');
 
    // Desmarca o aceite dos termos de uso
    cy.get('#signup-personal-data-lgpd').should('be.visible').click();

    // Envia o formulário
    submitPersonalData();

    // Verifica se a mensagem de erro é exibida
    cy.get('[data-cy="input-signup-personal-data-lgpd"]:invalid').should('exist');
  });  
});

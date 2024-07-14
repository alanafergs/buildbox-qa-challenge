# User Registration Feature

Este repositório contém testes automatizados para validar o processo de registro de usuário na aplicação web [BuildBox](https://qastage.buildbox.one/18/cadastro).

## Descrição
Os testes automatizados foram desenvolvidos para garantir que o processo de registro de usuário na aplicação BuildBox funcione corretamente, cobrindo diversos cenários de uso e validação de dados.

## Cenários de Teste Automatizados

### Cenário 1: Registro com dados válidos
- **Descrição:** Verifica se o usuário consegue se registrar corretamente usando dados válidos.
- **Passos:**
  1. Acessar a página de registro.
  2. Preencher o formulário com dados válidos.
  3. Submeter o formulário.
- **Resultado Esperado:** Deve exibir uma mensagem de sucesso após o registro.

### Cenário 2: Registro com campos obrigatórios em falta
- **Descrição:** Garante que o sistema valide corretamente campos obrigatórios não preenchidos.
- **Passos:**
  1. Acessar a página de registro.
  2. Submeter o formulário sem preencher os campos obrigatórios.
- **Resultado Esperado:** Deve exibir uma mensagem de erro indicando os campos obrigatórios que faltam.

### Cenário 3: Registro com data de nascimento inválida
- **Descrição:** Verifica se o sistema detecta corretamente uma data de nascimento inválida.
- **Passos:**
  1. Acessar a página de registro.
  2. Preencher o campo de data de nascimento com um valor inválido.
  3. Submeter o formulário.
- **Resultado Esperado:** Deve exibir uma mensagem de erro indicando que a data de nascimento é inválida.

### Cenário 4: Registro com endereço de email inválido
- **Descrição:** Testa se o sistema valida corretamente um endereço de email inválido.
- **Passos:**
  1. Acessar a página de registro.
  2. Preencher o campo de email com um valor inválido.
  3. Submeter o formulário.
- **Resultado Esperado:** Deve exibir uma mensagem de erro indicando que o email é inválido.

### Cenário 5: Registro com senhas não correspondentes
- **Descrição:** Verifica se o sistema detecta senhas que não correspondem durante o registro.
- **Passos:**
  1. Acessar a página de registro.
  2. Preencher o campo de confirmação de senha com um valor diferente da senha principal.
  3. Submeter o formulário.
- **Resultado Esperado:** Deve exibir uma mensagem de erro indicando que as senhas não correspondem.

### Cenário 6: Registro com endereço de email já registrado
- **Descrição:** Testa se o sistema impede o registro com um endereço de email que já está em uso.
- **Passos:**
  1. Acessar a página de registro.
  2. Preencher o campo de email com um email que já está registrado.
  3. Submeter o formulário.
- **Resultado Esperado:** Deve exibir uma mensagem de erro indicando que o email já está registrado.

### Cenário 7: Registro sem aceitar os termos e condições
- **Descrição:** Garante que o sistema valide a aceitação dos termos e condições durante o registro.
- **Passos:**
  1. Acessar a página de registro.
  2. Submeter o formulário sem aceitar os termos e condições.
- **Resultado Esperado:** Deve exibir uma mensagem de erro indicando que os termos e condições devem ser aceitos.

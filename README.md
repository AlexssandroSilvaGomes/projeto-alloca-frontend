# Alocação RH - Frontend

Este projeto é o frontend do sistema de Alocação de RH, desenvolvido em React + TypeScript e utilizando Material UI para a interface. O objetivo é facilitar o gerenciamento de funcionários, geração de relatórios e autenticação de usuários.

## Estrutura das Páginas

- **Login/Registro**
  - Tela inicial para autenticação do usuário.
  - Permite login e criação de conta.
  - Formulário centralizado e responsivo.

- **Dashboard**
  - Layout principal após login.
  - Navegação entre as funcionalidades do sistema.

- **Funcionários**
  - Cadastro de novo funcionário.
  - Listagem dos funcionários cadastrados.
  - Formulário com validação e campos detalhados (nome, idade, gênero, departamento, cargo, salário, etc).

- **Relatórios**
  - Geração de relatórios batch sobre adequação dos funcionários.
  - Listagem dos relatórios gerados, com informações como data, total de funcionários, adequados e percentual.
  - Download dos relatórios em formato CSV.

## Estrutura de Pastas

```
src/
  components/
    Auth/           # Login e registro
    Employee/       # Cadastro e listagem de funcionários
    Layout/         # Layout do dashboard
    Report/         # Geração e listagem de relatórios
  context/
    AuthContext.tsx # Contexto de autenticação
  services/
    api.ts          # Configuração da API
    AuthService.ts  # Requisições de autenticação
    employeeService.ts # Requisições de funcionários
    reportService.ts   # Requisições de relatórios
  App.tsx           # Componente principal
  main.tsx          # Ponto de entrada
```

## Como rodar

1. Instale as dependências:
   ```
   npm install
   ```
2. Inicie o projeto:
   ```
   npm run dev
   ```

## Observações

- O frontend consome uma API REST (verifique o backend para detalhes).
- O layout é responsivo e utiliza tema claro.
- Os relatórios podem ser baixados em CSV, prontos para abrir no Excel.

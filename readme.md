# 🎟️ Rifa Online - Aplicação Fullstack com React + Supabase

Projeto desenvolvido para arrecadar fundos de forma prática e personalizada através de uma rifa online. A motivação foi uma necessidade real: comprar um fogão e uma máquina de lavar para a nossa república, e a solução encontrada foi desenvolver um sistema do zero para controle total e economia com plataformas de terceiros.

---

## 🧩 Funcionalidades

### 📦 Página principal (pública)
- Exibição visual de 600 números disponíveis
- Reserva de número via formulário com:
  - Nome/apelido
  - E-mail (com validação)
  - Número de telefone
- Validação para impedir duplicidade
- Indicadores visuais:
  - Verde (disponível)
  - Vermelho (reservado)

### 🔐 Painel de Administração
- Login via Supabase Auth
- Autenticação com controle de acesso via flag `isAdmin`
- Listagem de reservas com:
  - Filtro por nome, e-mail, telefone e status (pago/pendente)
  - Ordenação por nome, data e status
  - Edição de dados da rifa
  - Marcar como "pago" ou "pendente"
  - Exclusão de reservas
- Contador de rifas já vendidas
- Logout seguro

---

## ⚙️ Tecnologias Utilizadas

| Tecnologia        | Uso                                      |
|-------------------|-------------------------------------------|
| React + TypeScript | Frontend SPA com tipagem e performance  |
| Vite              | Build tool para desenvolvimento ágil     |
| Supabase          | Backend-as-a-Service (Auth + Realtime + DB) |
| Bootstrap         | Layout responsivo e estilização rápida   |

---

## 📁 Estrutura de Pastas

```bash
src/
│
├── components/         # Componentes reutilizáveis
│   └── Admin/          # Componentes específicos do painel admin
│
├── hooks/              # Hooks personalizados (ex: useAdmin)
│
├── pages/              # Páginas principais (Home e Admin)
│
├── services/           # Integração com Supabase
│
├── types/              # Tipagens customizadas (Rifa, User, etc)
│
├── App.tsx             # Configuração de rotas
└── main.tsx            # Ponto de entrada da aplicação

```

## 🚀 Como rodar localmente

### 1. Clone o repositório

```bash
git clone https://github.com/seu-usuario/rifa-online.git
cd rifa-online
```

### 2. Instale as dependências

Use o gerenciador de pacotes da sua preferência:

```bash
npm install
# ou
yarn install
```

### 3. Configure o Supabase

#### 🛠 Crie um projeto no Supabase

Acesse [supabase.com](https://supabase.com/), crie uma conta e inicie um novo projeto.

Crie um arquivo .env 
```bash
VITE_SUPABASE_URL=https://<sua-url>.supabase.co
VITE_SUPABASE_ANON_KEY=<sua-chave-anon>
```

---

#### 📄 Criação da tabela `rifas`

No painel do Supabase, vá em **SQL Editor** e execute o seguinte script para criar a tabela `rifas`:

```sql
create table rifas (
  id uuid primary key default gen_random_uuid(),
  nome text not null,
  email text not null,
  telefone text not null,
  numero int not null unique,
  pago boolean default false,
  created_at timestamp default now()
);
```


### 4. Autenticação

Esta aplicação utiliza a autenticação via Supabase.

#### Configuração:

1. No painel do Supabase, acesse a aba **Auth > Settings**.
2. Em **"Auth Providers"**, deixe ativado apenas o **Email**.
3. Vá em **Auth > Users** e crie manualmente um novo usuário com o e-mail que você deseja utilizar como administrador.
4. Após criar o usuário, clique nele e edite o campo `user_metadata` para incluir a seguinte informação:

```json
{
  "isAdmin": true
}
```
---

### 🔒 Regras de Negócio
Um número de rifa só pode ser reservado uma vez.

Os administradores podem editar status, corrigir dados ou excluir reservas.

Apenas usuários autenticados com isAdmin: true acessam o painel.

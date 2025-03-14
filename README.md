# NutriMacros - Calculadora de Macronutrientes

NutriMacros é uma aplicação web que ajuda usuários a calcular suas necessidades diárias de macronutrientes com base em informações pessoais e objetivos de condicionamento físico.

![NutriMacros Screenshot](./src/assets/screenshot.png)

## ✨ Características

- 📊 Cálculo de Taxa Metabólica Basal (TMB)
- 🔥 Determinação do Gasto Energético Total Diário (TDEE)
- 🥗 Personalização da distribuição de macronutrientes baseada em objetivos de fitness
- 👤 Interface amigável com orientações passo a passo
- 📱 Design responsivo para desktop e dispositivos móveis
- 🍲 Planejador de receitas com base nos ingredientes disponíveis
- 🔐 Sistema de autenticação de usuários

## 🚀 Tecnologias Utilizadas

- React + TypeScript
- Tailwind CSS
- shadcn/ui components
- Framer Motion para animações
- Firebase (Autenticação e Firestore)

## 🛠️ Instalação e Uso

### Requisitos

- Node.js (v14 ou superior)
- npm (v6 ou superior)
- Conta Firebase

### 1. Clone o repositório

```bash
git clone https://github.com/seu-usuario/nutri-macros.git
cd nutri-macros
```

### 2. Instale as dependências

```bash
npm install
```

### 3. Configure as variáveis de ambiente

Crie um arquivo `.env.local` na raiz do projeto com as seguintes variáveis:

```
VITE_FIREBASE_API_KEY=sua_chave_api_aqui
VITE_FIREBASE_AUTH_DOMAIN=seu_dominio_auth_aqui
VITE_FIREBASE_PROJECT_ID=seu_project_id_aqui
VITE_FIREBASE_STORAGE_BUCKET=seu_storage_bucket_aqui
VITE_FIREBASE_MESSAGING_SENDER_ID=seu_messaging_sender_id_aqui
VITE_FIREBASE_APP_ID=seu_app_id_aqui
```

### 4. Execute o projeto em modo de desenvolvimento

```bash
npm run dev
```

### 5. Build para produção

```bash
npm run build
```

## 📐 Implantação

Para implantar o projeto, consulte o [Guia de Implantação](./DEPLOYMENT.md) para instruções detalhadas.

## 🧪 Testes

```bash
npm run test
```

## 🤝 Contribuição

Contribuições são bem-vindas! Por favor, sinta-se à vontade para enviar um Pull Request.

## 📄 Licença

Este projeto está licenciado sob a licença MIT - veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## 📞 Contato

Para qualquer dúvida, entre em contato pelo email [enricosaito@gmail.com].

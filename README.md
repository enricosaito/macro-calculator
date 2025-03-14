# NutriMacros - Calculadora de Macronutrientes

NutriMacros é uma aplicação web que ajuda usuários a calcular suas necessidades diárias de macronutrientes com base em informações pessoais e objetivos de condicionamento físico.

## Características

- Cálculo de Taxa Metabólica Basal (TMB)
- Determinação do Gasto Energético Total Diário (TDEE)
- Personalização da distribuição de macronutrientes baseada em objetivos de fitness
- Interface amigável com orientações passo a passo
- Design responsivo para desktop e dispositivos móveis
- Planejador de receitas com base nos ingredientes disponíveis
- Sistema de autenticação de usuários

## Tecnologias Utilizadas

- React
- TypeScript
- Tailwind CSS
- shadcn/ui components
- Framer Motion para animações
- Firebase (Autenticação e Firestore)

## Requisitos

- Node.js (v14 ou superior)
- npm (v6 ou superior)
- Conta Firebase

## Configuração do Ambiente

1. Clone o repositório:

   ```
   git clone https://github.com/seu-usuario/nutri-macros.git
   ```

2. Navegue até o diretório do projeto:

   ```
   cd nutri-macros
   ```

3. Instale as dependências:

   ```
   npm install
   ```

4. Crie um arquivo `.env.local` na raiz do projeto com as seguintes variáveis:
   ```
   VITE_FIREBASE_API_KEY=sua_chave_api_aqui
   VITE_FIREBASE_AUTH_DOMAIN=seu_dominio_auth_aqui
   VITE_FIREBASE_PROJECT_ID=seu_project_id_aqui
   VITE_FIREBASE_STORAGE_BUCKET=seu_storage_bucket_aqui
   VITE_FIREBASE_MESSAGING_SENDER_ID=seu_messaging_sender_id_aqui
   VITE_FIREBASE_APP_ID=seu_app_id_aqui
   VITE_GA_MEASUREMENT_ID=seu_id_analytics_aqui  # Opcional
   ```

## Desenvolvimento

Inicie o servidor de desenvolvimento:

```
npm run dev
```

Acesse `http://localhost:5173` no seu navegador para visualizar a aplicação.

## Build para Produção

Para criar a versão de produção:

```
npm run build
```

Os arquivos serão gerados na pasta `dist`, prontos para serem implantados.

## Implantação

### Utilizando Firebase Hosting

1. Instale o Firebase CLI globalmente (se ainda não tiver):

   ```
   npm install -g firebase-tools
   ```

2. Faça login no Firebase:

   ```
   firebase login
   ```

3. Inicialize o Firebase no projeto (primeira vez apenas):

   ```
   firebase init
   ```

   Selecione Hosting e aponte para a pasta `dist` como diretório público.

4. Implante a aplicação:
   ```
   npm run deploy
   ```

### Utilizando Vercel

1. Instale a Vercel CLI:

   ```
   npm install -g vercel
   ```

2. Implante o projeto:

   ```
   vercel
   ```

3. Para ambiente de produção:
   ```
   vercel --prod
   ```

## Estrutura do Projeto

- `/src/components`: Componentes React organizados por funcionalidade
- `/src/context`: Contextos para gerenciamento de estado global
- `/src/hooks`: Hooks personalizados
- `/src/lib`: Utilitários, configurações e dados
- `/src/locales`: Arquivos de tradução
- `/src/pages`: Componentes de página
- `/src/types`: Definições de tipos TypeScript

## Contribuindo

Contribuições são bem-vindas! Por favor, sinta-se à vontade para enviar um Pull Request.

## Licença

Este projeto está licenciado sob a licença MIT - veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## Contato

Para qualquer dúvida, entre em contato pelo email [enricosaito@gmail.com].

# Descrição da solução

The Last Eyes é um aplicativo voltado para a saúde mental de colaboradores, oferecendo suporte diário para bem-estar emocional. Ele é integrado com inteligência artificial, que fornece conselhos personalizados e dicas práticas com base no humor do usuário. Além disso, o app conta com uma página de livros, indicando leituras clássicas que podem inspirar e relaxar, e uma página de hobbies, sugerindo novas atividades para estimular o aprendizado e o lazer.

## Integrantes

| Nome Completo                 | RM      |
|-----------------------------|---------|
| Pedro Henrique Lima Santos  | 558243  |
| Vitor Gomes Martins         | 558244  |
| Leonardo Pimentel Santos    | 557541  |

### Link do PITCH
```bash
https://youtu.be/5qq9vV_-OCQ
```
###  Link do deploy das API
- Deploy IoT: https://the-last-eyes-api.onrender.com/docs#
- Deploy Java: https://the-last-eyes-api-3v3p.onrender.com/swagger-ui/index.html#

## Contexto do Projeto

Com base na Global Solution fornecida pela FIAP e considerando como o mercado e as empresas estão reagindo à nova onda da inteligência artificial, desenvolvemos uma solução que integra a saúde mental dos colaboradores com uma IA capaz de auxiliar em diversas demandas dos usuários.

Nossa solução busca promover a colaboração entre colaboradores e IA, prevenindo que a sobrecarga de trabalho leve ao desenvolvimento de problemas de saúde mental.

## ✅ Solução Proposta

### 🧠 Suporte à Saúde Mental de Colaboradores
- O app ajuda colaboradores a monitorar e melhorar seu bem-estar mental
- Fornece dicas, conselhos e insights personalizados com base no humor e contexto
- Mantém histórico de humor para acompanhar a evolução ao longo do tempo

### 🤖 Integração com Inteligência Artificial
- A IA responde automaticamente às solicitações do usuário:
  - Sugestões de atividades e hábitos saudáveis
  - Recomendações de livros e leituras clássicas
  - Indicação de novos hobbies e práticas de lazer
- Respostas são contextualizadas pelo humor e contexto do usuário

### 📚 Indicação de Leituras
- Página dedicada a livros e conteúdos clássicos
  - Sugestões de leitura conforme interesses do usuário
  - Resumos e insights que ajudam no autodesenvolvimento e bem-estar

### 🎨 Novos Hobbies e Atividades
- Página interativa com sugestões de hobbies e atividades relaxantes
- Permite explorar opções de lazer para reduzir estresse e aumentar produtividade

### 📊 Visualização de Insights
- Dashboard com insights gerados pela IA:
  - Resumo do humor diário
  - Dicas práticas de melhoria
  - Recomendações personalizadas baseadas em hábitos e padrões do usuário

> ⚠️ Importante: o app **não substitui profissionais de saúde mental**, mas atua como **ferramenta complementar de suporte e prevenção**

## Estrutura do Projeto
```bash
/
├── assets                          # Imagens incluídas no sistema
├── src/                            # Código fonte da aplicação
│   ├── components/                 # Componentes visuais reutilizáveis
│   │   ├── Cards.tsx               # Componente de interface para exibir itens (livros/dados)
│   │   └── InputAI.tsx             # Componente de entrada de texto para recursos de IA
│   ├── config/                     # Arquivos de configuração estática
│   │   └── buildInfo.ts            # Informações da versão/build do app
│   ├── contexts/                   # Gerenciamento de estado global (Context API)
│   │   └── AuthContext.tsx         # Lógica de Login, Persistência de Token e Logout
│   ├── screens/                    # Telas da aplicação (Pages)
│   │   ├── AboutScreen/            # Tela com informações do projeto e grupo
│   │   ├── BooksScreen/            # Tela da biblioteca de livros recomendados
│   │   ├── ExploreScreen/          # Tela de funcionalidades extras
│   │   ├── HomeScreen/             # Tela inicial (Dashboard)
│   │   ├── LoginScreen/            # Tela de autenticação
│   │   ├── navigation/             # Configuração de rotas (Stack e Drawer Navigator)
│   │   ├── ProfileScreen/          # Tela de gestão de perfil (CRUD)
│   │   └── RegisterScreen/         # Tela de cadastro de novos usuários
│   └── services/                   # Camada de integração com APIs
│       ├── aiService.tsx           # Comunicação com API de Inteligência Artificial
│       ├── api.tsx                 # Cliente HTTP para API de IoT/Sensores
│       └── apiBackend.tsx          # Cliente HTTP para API Java (Auth e Usuários)
├── .gitignore                      # Arquivos ignorados pelo versionamento Git
├── app.json                        # Configurações do Expo (nome, slug, ícone, etc)
├── App.tsx                         # Componente Raiz (Entry Point da UI)
├── babel.config.js                 # Configurações do compilador Babel
├── index.ts                        # Ponto de entrada do registro do App
├── package-lock.json               # Árvore de dependências travada (versões exatas)
├── package.json                    # Manifesto do projeto (scripts e libs instaladas)
├── readme.md                       # Documentação do projeto (Instruções, Integrantes)
└── tsconfig.json                   # Configurações do TypeScript
```

## 🧩 Dependências

Este projeto utiliza **React Native com Expo** e as bibliotecas abaixo para garantir uma experiência rica e funcional:

**🔀 Navegação:**
- `@react-navigation/native`
- `@react-navigation/native-stack`
- `@react-navigation/drawer`

**🛠️ Utilitários para navegação e gestos:**
- `react-native-screens`
- `react-native-safe-area-context`
- `react-native-gesture-handler`
- `react-native-reanimated`
- `react-native-worklets@0.5.1`

**🎛️ Picker (seleção de opções):**
- `@react-native-picker/picker`

**💻 Tipagem e utilitários TS/JS:**
- `@types/react-native-vector-icons`
- `@babel/plugin-proposal-optional-chaining`
- `@babel/plugin-proposal-nullish-coalescing-operator`
- `babel-preset-expo`

**💾 Requisições HTTP:**
- `axios`

**🖼️ Componentes mascarados:**
- `@react-native-masked-view/masked-view`

## 🚀 Como Inicializar o Projeto

Siga os passos abaixo para executar o projeto localmente:

### 1. Clone o repositório:
```bash
git clone https://github.com/montclio-globalsolution/the-last-eyes.git
cd the-last-eyes
```

###  2. Instale as dependências:
```bash
npm install @react-navigation/native
npm install @react-navigation/native-stack  
npm install @react-navigation/drawer
npx expo install react-native-screens react-native-safe-area-context
npx expo install react-native-gesture-handler
npx expo install react-native-reanimated
npx expo install @react-native-picker/picker
npm install @react-native-masked-view/masked-view
npm install axios
npm install babel-preset-expo --save-dev
npm install --save-dev @babel/plugin-proposal-optional-chaining @babel/plugin-proposal-nullish-coalescing-operator
npx expo install react-native-worklets@0.5.1
npm i --save-dev @types/react-native-vector-icons
```

### 3. Inicie o servidor de desenvolvimento:
```bash
npx expo start
```

### 4. Execute no dispositivo ou emulador:  

📱 Escaneie o QR Code com o aplicativo **Expo Go** no seu celular;  

💻 Ou selecione um emulador Android/iOS no menu web do Expo.

### QRcode para instalar o APP em seu dispositivo móvel
<img width="356" height="435" alt="image" src="https://github.com/user-attachments/assets/09d0304e-98e2-465f-91cc-f1050a5f76d1" />

© 2025 MontClio. Todos os direitos reservados.

# MCP Client Gemini - Frontend React

Frontend moderno e interativo construído com React + Vite para a aplicação MCP Gemini Chat.

## 🚀 Features

- ⚡ Built with React 18 e Vite
- 🎨 Interface moderna e responsiva
- 💬 Chat em tempo real
- 🔄 Indicador de carregamento
- 📱 Mobile-friendly
- 🎯 Zero configuração

## 📦 Instalação

### 1. Instalar dependências do frontend

```bash
cd frontend
npm install
```

### 2. Construir o frontend

```bash
npm run build
```

Isso irá compilar o React e gerar os arquivos estáticos na pasta `../public`.

### 3. Iniciar o servidor backend

Do diretório raiz do projeto:

```bash
npm start
```

O servidor estará disponível em `http://localhost:3000` (ou a porta configurada em `.env`).

## 🛠️ Desenvolvimento

Para desenvolver com hot reload:

```bash
cd frontend
npm run dev
```

O Vite irá iniciar em `http://localhost:5173` com proxy configurado para `/chat`.

## 📁 Estrutura

```
frontend/
├── src/
│   ├── components/
│   │   ├── ChatContainer.jsx      # Container principal
│   │   ├── ChatMessages.jsx       # Lista de mensagens
│   │   ├── Message.jsx            # Componente de mensagem
│   │   ├── LoadingIndicator.jsx   # Indicador de carregamento
│   │   └── InputArea.jsx          # Área de input
│   ├── App.jsx                    # Componente principal
│   ├── App.css
│   ├── index.css
│   └── main.jsx
├── index.html                     # Ponto de entrada HTML
├── vite.config.js                 # Configuração Vite
└── package.json
```

## 🎨 Customização

- **Cores**: Edite as cores do gradiente nos arquivos CSS
- **Temas**: Modifique os estilos nos arquivos `.css` de cada componente
- **Componentes**: Adicione novos componentes em `src/components/`

## 🔗 API

O frontend envia requisições POST para `/chat`:

```json
{
  "message": "sua mensagem"
}
```

E espera uma resposta:

```json
{
  "response": "resposta do servidor"
}
```

## 📝 Licença

MIT

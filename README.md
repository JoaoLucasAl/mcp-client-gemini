# MCP Client Gemini

Um cliente web para interação com o Google Gemini 2.0 Flash integrado ao Model Context Protocol (MCP), permitindo o uso de ferramentas externas através de servidores MCP.

## Descrição

Este projeto implementa uma interface de chat web que se conecta ao Google Gemini e utiliza o protocolo MCP para integrar ferramentas externas, como:
- Sistema de arquivos
- API Pix (Efí Bank)
- E outros servidores MCP compatíveis

## Funcionalidades

- Interface web de chat intuitiva
- Integração com Google Gemini 2.0 Flash
- Suporte a múltiplos servidores MCP
- Histórico de ferramentas utilizadas
- Renderização de Markdown nas respostas
- API REST para comunicação

## Tecnologias

- **Backend**: Node.js, Express, TypeScript
- **Frontend**: React 18, Vite, CSS3
- **IA**: Google Gemini 2.0 Flash
- **Protocolo**: Model Context Protocol (MCP)
- **Renderização**: Marked.js (Markdown)

## Instalação

1. **Clone o repositório:**
```bash
git clone git@github.com:JoaoLucasAl/mcp-client-gemini.git
cd mcp-client-gemini
```

2. **Instale as dependências:**
```bash
npm install
```

3. **Configure as variáveis de ambiente:**
```bash
cp .env.example .env
```

Edite o arquivo `.env` com suas configurações:
```env
GEMINI_API_KEY=sua_chave_api_do_gemini
CONFIG_PATH=./mcp-config.json
```

4. **Configure os servidores MCP:**
```bash
cp mcp-config.json.example mcp-config.json
```

Edite o arquivo `mcp-config.json` com suas configurações de servidores MCP.

5. **Instale as dependências do frontend React:**
```bash
cd frontend
npm install
cd ..
```

## Configuração

### Chave API do Gemini

1. Acesse o [Google AI Studio](https://aistudio.google.com/)
2. Crie uma nova chave API
3. Adicione a chave no arquivo `.env`

### Servidores MCP

O arquivo `mcp-config.json` define os servidores MCP disponíveis:

```json
{
    "mcpServers": {
        "filesystem": {
            "command": "npx",
            "args": [
                "-y",
                "@modelcontextprotocol/server-filesystem",
                "C:\\caminho\\para\\diretorio"
            ]
        },
        "mcp-server-efi": {
            "command": "npx",
            "args": [
                "-y",
                "mcp-server-efi",
                "--sandbox=false",
                "--client-id=seu_client_id",
                "--client-secret=seu_client_secret",
                "--certificate=seu_certificado_base64",
                "--validate-mtls=true"
            ]
        }
    }
}
```

## Uso

### Desenvolvimento

Para desenvolver apenas o backend:
```bash
npm run dev
```

Para desenvolver o frontend com hot reload:
```bash
cd frontend
npm run dev
```

Acesse `http://localhost:5173` (o Vite fará proxy para `/chat`).

### Build e Produção

Para fazer build completo (backend + frontend):
```bash
npm run build
```

Para iniciar em produção:
```bash
npm start
```

O servidor estará disponível em `http://localhost:3000`

### Desenvolvimento do Frontend

O frontend está em uma estrutura modular com React:

```bash
cd frontend
npm run dev      # Inicia servidor de desenvolvimento (hot reload)
npm run build    # Faz build para produção
npm run preview  # Visualiza build de produção localmente
```

## Como Usar

1. Acesse `http://localhost:3000` no seu navegador
2. Digite sua mensagem no campo de entrada
3. Pressione Enter para enviar
4. O Gemini processará sua mensagem e poderá usar ferramentas MCP quando necessário
5. As respostas serão exibidas com formatação Markdown

### Exemplos de Uso

**Listar arquivos:**
```
Liste os arquivos no diretório Downloads
```

**Chamadas nas APIs do Efí Bank:**
```
Consulte o saldo da minha conta Efí
```

**Operações com arquivos:**
```
Leia o conteúdo do arquivo exemplo.txt
```

## Estrutura do Projeto

```
mcp-client-gemini/
├── frontend/               # Frontend React + Vite
│   ├── src/
│   │   ├── components/    # Componentes React
│   │   │   ├── ChatContainer.jsx
│   │   │   ├── ChatMessages.jsx
│   │   │   ├── Message.jsx
│   │   │   ├── LoadingIndicator.jsx
│   │   │   └── InputArea.jsx
│   │   ├── App.jsx        # Componente principal
│   │   ├── main.jsx       # Ponto de entrada
│   │   └── index.css      # Estilos globais
│   ├── index.html         # Template HTML
│   ├── vite.config.js     # Configuração Vite
│   └── package.json
├── public/                # Build de saída do frontend (gerado automaticamente)
├── src/                   # Código TypeScript do backend
│   ├── server.ts          # Servidor Express principal
│   ├── config/
│   │   └── env.ts         # Configurações de ambiente
│   ├── gemini/
│   │   └── chatManager.ts # Gerenciamento do chat Gemini
│   ├── handlers/
│   │   └── chatHandler.ts # Manipulador de mensagens
│   ├── mcp/
│   │   ├── clientManager.ts # Gerenciamento de clientes MCP
│   │   └── types.ts       # Tipos TypeScript
│   └── utils/
│       └── index.ts       # Utilitários
├── .env                   # Variáveis de ambiente
├── mcp-config.json        # Configuração dos servidores MCP
└── package.json           # Dependências e scripts
```

## API Endpoints

### POST `/chat`

Processa uma mensagem do usuário.

**Request:**
```json
{
    "message": "Sua mensagem aqui"
}
```

**Response:**
```json
{
    "response": "Resposta do Gemini"
}
```

## Contribuindo

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## Importante

- Mantenha sua chave API do Gemini segura e nunca a compartilhe
- O arquivo `.env` e `mcp-config.json` estão no `.gitignore` por motivos de segurança

## Problemas Conhecidos

- Certifique-se de que os servidores MCP estejam acessíveis
- Verifique se as dependências npm estão instaladas corretamente
- Confirme que a chave API do Gemini é válida

## Suporte

Se encontrar problemas ou tiver dúvidas:
1. Verifique os logs do servidor
2. Confirme as configurações do `.env` e `mcp-config.json`
3. Abra uma issue no repositório
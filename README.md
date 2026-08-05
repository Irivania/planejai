# 🚀 Planej.ai — Planejador Financeiro Inteligente

O **Planej.ai** é uma aplicação web desenvolvida para ajudar os usuários a organizarem suas finanças pessoais e atingirem metas de curto, médio e longo prazo. A plataforma calcula a viabilidade dos objetivos financeiros e conta com uma inteligência artificial integrada que atua como um educador financeiro personalizado.

---

## 🎯 O que o projeto faz

* **Simulação de Metas:** Permite cadastrar a renda mensal, custos fixos, dívidas ativas e o objetivo financeiro desejado (custo e prazo).
* **Diagnóstico Financeiro:** Calcula automaticamente a economia mensal necessária e verifica se a meta é viável dentro do orçamento do usuário.
* **Insights com IA:** Gera análises preditivas personalizadas com dicas de corte de gastos, sugestões de investimentos e estratégias para renda extra.
* **Educador Financeiro AI (Chat Interativo):** Um assistente virtual inteligente com o qual o usuário pode conversar para tirar dúvidas específicas sobre sua simulação.
* **Histórico de Simulações:** Armazena localmente todas as simulações e conversas para consulta futura.

---

## 🛠️ Tecnologias Utilizadas

* **Frontend:** React 18, TypeScript, Vite
* **Estilização:** Tailwind CSS, Lucide React (ícones)
* **Roteamento:** React Router DOM
* **Inteligência Artificial:** Google Gemini API (`gemini-flash-latest`)
* **Armazenamento:** `localStorage`
* **Gerenciador de Pacotes:** `pnpm`

---

## ✨ Melhorias Implementadas (Desafio 2)

Durante o desenvolvimento do desafio, adicionei a funcionalidade do **Educador Financeiro AI**, permitindo um chat contínuo e contextualizado:

1. **Chat Contextual:** O usuário pode fazer perguntas ilimitadas dentro de cada simulação (ex: *"Qual o melhor investimento para essa meta?"*).
2. **Persistência de Dados:** O histórico completo de perguntas e respostas é salvo no `localStorage` vinculado a cada simulação.
3. **Rolagem Automática (Auto-Scroll):** A área de chat rola suavemente para o final a cada nova mensagem enviada ou resposta recebida.
4. **Tratamento de Estados:** Adicionados feedbacks visuais de carregamento (*loading spinner*) e mensagens de erro tratadas para falhas de requisição na API.
5. **Fallback Local:** Em caso de indisponibilidade ou falha de chave da API, a aplicação mantém um diagnóstico financeiro local seguro.

---

## 🚀 Como Executar a Aplicação

### Pré-requisitos
* Node.js (versão 18 ou superior)
* `pnpm` instalado (`npm install -g pnpm`)

### Passo a Passo

1. **Clone o repositório:**
   ```bash
   git clone [https://github.com/SEU_USUARIO/planejai.git](https://github.com/SEU_USUARIO/planejai.git)
   cd planejai

   Aqui está a versão final e consolidada do **`README.md`** contendo toda a documentação, instruções de execução, histórico de aprendizados, melhorias e as imagens do projeto configuradas com os caminhos da sua pasta `src/assets/images`:

```markdown
# 🚀 Planej.ai — Planejador Financeiro Inteligente

O **Planej.ai** é uma aplicação web desenvolvida para ajudar os usuários a organizarem suas finanças pessoais e atingirem metas de curto, médio e longo prazo. A plataforma calcula a viabilidade dos objetivos financeiros e conta com uma inteligência artificial integrada que atua como um educador financeiro personalizado.

---

## 🎯 O que o projeto faz

* **Simulação de Metas:** Permite cadastrar a renda mensal, custos fixos, dívidas ativas e o objetivo financeiro desejado (custo e prazo).
* **Diagnóstico Financeiro:** Calcula automaticamente a economia mensal necessária e verifica se a meta é viável dentro do orçamento do usuário.
* **Insights com IA:** Gera análises preditivas personalizadas com dicas de corte de gastos, sugestões de investimentos e estratégias para renda extra.
* **Educador Financeiro AI (Chat Interativo):** Um assistente virtual inteligente com o qual o usuário pode conversar para tirar dúvidas específicas sobre sua simulação.
* **Histórico de Simulações:** Armazena localmente todas as simulações e conversas para consulta futura.

---

## 🛠️ Tecnologias Utilizadas

* **Frontend:** React 18, TypeScript, Vite
* **Estilização:** Tailwind CSS, Lucide React (ícones)
* **Roteamento:** React Router DOM
* **Inteligência Artificial:** Google Gemini API (`gemini-flash-latest`)
* **Armazenamento:** `localStorage`
* **Gerenciador de Pacotes:** `pnpm`

---

## ✨ Melhorias Implementadas (Desafio 2)

Durante o desenvolvimento do desafio, adicionei a funcionalidade do **Educador Financeiro AI**, permitindo um chat contínuo e contextualizado:

1. **Chat Contextual:** O usuário pode fazer perguntas ilimitadas dentro de cada simulação (ex: *"Qual o melhor investimento para essa meta?"*).
2. **Persistência de Dados:** O histórico completo de perguntas e respostas é salvo no `localStorage` vinculado a cada simulação.
3. **Rolagem Automática (Auto-Scroll):** A área de chat rola suavemente para o final a cada nova mensagem enviada ou resposta recebida.
4. **Tratamento de Estados:** Adicionados feedbacks visuais de carregamento (*loading spinner*) e mensagens de erro tratadas para falhas de requisição na API.
5. **Fallback Local:** Em caso de indisponibilidade ou falha de chave da API, a aplicação mantém um diagnóstico financeiro local seguro.

---

## 🚀 Como Executar a Aplicação

### Pré-requisitos
* Node.js (versão 18 ou superior)
* `pnpm` instalado (`npm install -g pnpm`)

### Passo a Passo

1. **Clone o repositório:**
   ```bash
   git clone [https://github.com/SEU_USUARIO/planejai.git](https://github.com/SEU_USUARIO/planejai.git)
   cd planejai

```

2. **Instale as dependências:**
```bash
pnpm install

```


3. **Configure as variáveis de ambiente:**
Crie um arquivo `.env.local` na raiz do projeto com a sua chave da API do Google Gemini:
```env
VITE_GEMINI_API_KEY=sua_chave_do_gemini_aqui

```


4. **Inicie o servidor de desenvolvimento:**
```bash
pnpm dev

```


Acesse a aplicação no navegador em `http://localhost:5173`.

---

## 🧪 Como Testar o Fluxo Principal

1. **Criar uma Simulação:**
* Na página inicial, clique em iniciar simulação.
* Preencha os passos: Renda Mensal (ex: R$ 5.000), Custos Fixos (ex: R$ 2.000), Dívidas (ex: R$ 500), Nome da Meta (ex: *Comprar Carro*), Custo da Meta (ex: R$ 20.000) e Prazo (ex: 12 meses).
* Clique em **Gerar simulação ✨**.


2. **Visualizar Diagnóstico:**
* Confira os cards com o cálculo da economia mensal recomendada e os insights gerados pela IA.


3. **Interagir com o Educador Financeiro:**
* Na seção **Educador Financeiro AI**, digite uma pergunta no campo de texto (ex: *"Qual investimento rende mais para esse prazo?"*).
* Verifique o indicador de carregamento e a resposta retornada pela IA.
* Envie uma segunda pergunta e observe o histórico sendo mantido e o scroll rolando automaticamente.


4. **Testar Persistência:**
* Recarregue a página (`F5`). O histórico de mensagens continuará disponível na tela!



---

## 📸 Demonstração da Aplicação

### 📑 Formulário de Simulação (Passo a Passo)

| Renda Mensal | Custo Fixo |
| --- | --- |
|  |  |

| Dívidas e Parcelas | Objetivo |
| --- | --- |
|  |  |

| Valor do Objetivo | Prazo Desejado |
| --- | --- |
|  |  |

---

### 📊 Resultado da Simulação & Educador Financeiro AI

#### Tema Claro

#### Tema Escuro

---

### 📜 Histórico de Simulações

---

## 📚 O que Aprendi Durante o Desafio

* **Integração com APIs de LLM:** Compreendi como integrar a API do Google Gemini consumindo endpoints REST via `fetch` de forma assíncrona.
* **Engenharia de Prompt:** Aprendi a estruturar prompts no backend/front enviando dados de contexto (histórico da conversa + dados do orçamento do usuário) para obter respostas precisas e didáticas.
* **Tipagem Avançada em TypeScript:** Aprimorei o uso de `interfaces` e `types` para representar estados complexos, como histórico de chat aninhado em registros de simulação.
* **Gerenciamento de Estado e Refs no React:** Utilizei o hook `useRef` para controlar a rolagem do container de chat (`scrollToBottom`) e manipulei os estados locais para garantir atualizações em tempo real sem travamentos.

```

```
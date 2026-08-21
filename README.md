# 🚀 Planej.ai — Planejador Financeiro Inteligente

O **Planej.ai** é uma aplicação web desenvolvida para auxiliar usuários na organização das finanças pessoais e no planejamento de metas financeiras de curto, médio e longo prazo. 

A aplicação permite realizar simulações financeiras, calcular a economia mensal necessária para alcançar uma determinada meta e receber insights personalizados por meio de uma integração com inteligência artificial. O projeto também conta com um **Educador Financeiro AI**, um chat contextual que utiliza os dados da simulação para responder dúvidas relacionadas ao planejamento financeiro.

📚 *Contexto do projeto:* Desenvolvido como desafio prático para aplicação dos conhecimentos adquiridos em desenvolvimento web, React, TypeScript, integração com APIs de IA e testes automatizados.

---

## 🎯 Funcionalidades

### 💰 Simulação de Metas
O usuário pode informar:
* Renda mensal
* Custos fixos
* Dívidas e parcelas
* Nome da meta
* Valor desejado
* Prazo para alcançar o objetivo

A aplicação utiliza essas informações para realizar uma análise da situação financeira e calcular a economia mensal necessária para atingir a meta.

### 📊 Diagnóstico Financeiro
Após a simulação, o sistema apresenta informações como:
* Economia mensal recomendada
* Análise da viabilidade da meta
* Informações sobre o orçamento
* Insights personalizados

### 🤖 Insights com Inteligência Artificial
O Planej.ai utiliza a **Google Gemini API** (`gemini-flash-latest`) para gerar análises contextualizadas a partir dos dados financeiros informados pelo usuário. A IA apresenta sugestões sobre organização do orçamento, redução de gastos, estratégias para alcançar objetivos e possibilidades de aumento de renda.
> *Observação: os conteúdos gerados pela IA possuem finalidade educacional e informativa e não substituem orientação de um profissional financeiro.*

### 💬 Educador Financeiro AI
O projeto possui um chat interativo que permite ao usuário fazer perguntas relacionadas à própria simulação. O contexto da conversa considera as informações financeiras para tornar as respostas mais relevantes.

### 💾 Histórico de Simulações
As simulações e conversas são armazenadas localmente utilizando `localStorage`, permitindo consultar os dados posteriormente no mesmo navegador.

### ⚠️ Fallback Local
Caso ocorra uma falha na integração com a API de IA, a aplicação possui um mecanismo de fallback para manter o diagnóstico financeiro local disponível de forma segura.

### 📱 Interface Responsiva
A interface foi desenvolvida para se adaptar a diferentes tamanhos de tela (desktop, tablet e dispositivos móveis), contando também com suporte aos temas **claro** e **escuro**.

---

## 🛠️ Tecnologias Utilizadas

* **Frontend:** React 18, TypeScript, Vite
* **Estilização:** Tailwind CSS, Lucide React (ícones)
* **Roteamento:** React Router DOM
* **Inteligência Artificial:** Google Gemini API (`gemini-flash-latest`)
* **Testes Automatizados:** Vitest
* **Armazenamento:** `localStorage`
* **Gerenciador de Pacotes:** `pnpm`

---

## ✨ Melhorias Implementadas — Desafio 2

Durante a evolução do projeto, foi desenvolvido o **Educador Financeiro AI**, adicionando uma experiência de conversa contextual à aplicação:

1. **💬 Chat Contextual:** O usuário pode realizar perguntas relacionadas à sua simulação financeira (ex: *"Como posso economizar para alcançar essa meta mais rapidamente?"*).
2. **💾 Persistência das Conversas:** O histórico de perguntas e respostas é armazenado no `localStorage`, associado à respectiva simulação.
3. **📜 Rolagem Automática:** O chat possui rolagem automática para acompanhar novas mensagens enviadas e respostas recebidas.
4. **⏳ Tratamento de Estados:** Adicionados estados visuais para carregamento da resposta da IA, processamento de requisição e erros.
5. **🛡️ Tratamento de Erros e Fallback:** Tratamento de falhas na comunicação com a API com exibição de diagnóstico local.

---

## 🧪 Testes Automatizados

O projeto utiliza **Vitest** para testar regras de negócio relacionadas aos cálculos financeiros e às previsões das metas.

Para executar os testes no terminal:
```bash
pnpm vitest

🚀 Como Executar o Projeto Localmente
Pré-requisitos
Node.js — versão 18 ou superior

pnpm — gerenciador de pacotes

Passo a Passo

Clone o repositório:
git clone [https://github.com/Irivania/planejai.git](https://github.com/Irivania/planejai.git)
cd planejai

Instale as dependências:

Bash
pnpm install
Configure a variável de ambiente:
Crie um arquivo chamado .env.local na raiz do projeto e adicione sua chave da API do Google Gemini:

Snippet de código
VITE_GEMINI_API_KEY=sua_chave_do_gemini_aqui
🔐 Importante: nunca publique sua chave da API no GitHub. O arquivo .env.local deve permanecer no .gitignore.

Inicie o servidor de desenvolvimento:

Bash
pnpm dev
A aplicação estará disponível no endereço indicado pelo Vite, normalmente: http://localhost:5173.

🧭 Como Testar o Fluxo Principal
Criar uma simulação: Preencha renda, custos fixos, dívidas, nome da meta, valor e prazo desejado. Clique em Gerar Simulação ✨.

Conferir o diagnóstico: Verifique o cálculo da economia mensal, viabilidade e os insights gerados pela IA.

Testar o Educador Financeiro AI: Utilize o chat para fazer perguntas baseadas no contexto da sua simulação.

Testar a persistência: Atualize a página utilizando F5 e verifique se os dados e o histórico permanecem salvos.

📸 Demonstração da Aplicação
📝 Formulário de Simulação
📊 Resultado da Simulação (Tema Claro)
🤖 Educador Financeiro AI (Tema Escuro)
📚 O que Aprendi Durante o Desenvolvimento
🔌 Integração com APIs de IA: Conectar uma aplicação frontend a uma API de inteligência artificial via requisições assíncronas.

🧠 Engenharia de Prompt: Estruturar prompts utilizando dados de contexto (simulação e histórico) para obter respostas didáticas.

🧪 Testes Automatizados: Aplicar testes unitários com Vitest para assegurar a confiabilidade das regras de negócio financeiras.

📘 TypeScript: Utilização avançada de interfaces, tipos, tipagem de estados e estruturas de dados complexas.

⚛️ React: Uso de componentização, hooks, gerenciamento de estado, useRef e renderização condicional.

📜 Persistência e Responsividade: Uso de localStorage para salvamento local e estilização adaptável com Tailwind CSS.

👩‍💻 Autora
Irivânia Melo

Estudante de Gestão da Tecnologia da Informação, com interesse em desenvolvimento de software, inteligência artificial e tecnologia.

🔗 GitHub

📄 Licença
Este projeto foi desenvolvido para fins educacionais e de portfólio.


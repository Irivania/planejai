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
* **Testes Automatizados:** Vitest
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

   Instale as dependências:

Bash
pnpm install
Configure as variáveis de ambiente:
Crie um arquivo .env.local na raiz do projeto com a sua chave da API do Google Gemini:

Snippet de código
VITE_GEMINI_API_KEY=sua_chave_do_gemini_aqui
Inicie o servidor de desenvolvimento:

Bash
pnpm dev
Acesse a aplicação no navegador em http://localhost:5173.

🧪 Como Testar e Rodar a Validação1. Testes Automatizados (Unitários)O projeto conta com suítes de testes unitários desenvolvidas com Vitest para garantir a estabilidade dos cálculos financeiros e de viabilidade de metas.Para rodar os testes, execute:Bashpnpm vitest
2. Testar o Fluxo Principal no NavegadorCriar uma Simulação: Na página inicial, preencha a Renda Mensal, Custos Fixos, Dívidas, Nome da Meta, Custo e Prazo. Clique em Gerar simulação ✨.Visualizar Diagnóstico: Confira os cards com o cálculo da economia mensal recomendada e os insights gerados pela IA.Interagir com o Educador Financeiro: Na seção de chat, envie perguntas sobre o orçamento e observe o histórico e o scroll automático funcionando.Testar Persistência: Recarregue a página (F5) para verificar que os dados continuam salvos no navegador.📸 Demonstração da Aplicação📑 Formulário de Simulação (Passo a Passo)Renda MensalCusto FixoInput de RendaInput de CustosDívidas e ParcelasObjetivoInput de DívidasNome da MetaValor do ObjetivoPrazo DesejadoCusto TotalMeses/Anos📊 Resultado da Simulação & Educador Financeiro AITema Claro & Tema Escuro: Interface totalmente adaptada e responsiva.📚 O que Aprendi Durante o DesafioIntegração com APIs de LLM: Compreendi como integrar a API do Google Gemini consumindo endpoints REST de forma assíncrona.Engenharia de Prompt: Aprendi a estruturar prompts no front-end enviando dados de contexto (histórico da conversa + dados do orçamento do usuário) para obter respostas precisas e didáticas.Testes Automatizados (TDD/Unitários): Aprimorei a validação de regras de negócio utilizando Vitest para garantir a robustez dos algoritmos financeiros.Tipagem Avançada em TypeScript: Aprimorei o uso de interfaces e types para representar estados complexos, como histórico de chat aninhado em registros de simulação.Gerenciamento de Estado e Refs no React: Utilizei o hook useRef para controlar a rolagem do container de chat (scrollToBottom) e manipulei os estados locais para garantir atualizações em tempo real sem travamentos.
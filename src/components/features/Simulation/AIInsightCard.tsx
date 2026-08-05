import { Button } from '@/components/shared/Button';
import type { ChatMessage, SimulationRecord } from '@/data/simulation';
import { useSimulationStorage } from '@/hooks/useSimulationStorage';
import { askFinancialEducator } from '@/services/aiService';

import { AlertCircle, Bot, Loader2, Send, Sparkles, User } from 'lucide-react';
import { type FormEvent, useEffect, useRef, useState } from 'react';

interface AIInsightCardProps {
  simulation: SimulationRecord;
}

export function AIInsightCard({ simulation }: AIInsightCardProps) {
  const { saveChatMessage } = useSimulationStorage();
  const [messages, setMessages] = useState<ChatMessage[]>(
    simulation.chatHistory || [],
  );
  const [inputQuestion, setInputQuestion] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const chatContainerRef = useRef<HTMLDivElement>(null);

  // 💡 Scroll automático ao receber ou enviar nova mensagem
  const scrollToBottom = () => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTo({
        top: chatContainerRef.current.scrollHeight,
        behavior: 'smooth',
      });
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const handleSendMessage = async (e: FormEvent) => {
    e.preventDefault();
    if (!inputQuestion.trim() || isLoading) return;

    const userText = inputQuestion.trim();
    setInputQuestion('');
    setErrorMessage(null);

    const userMessage: ChatMessage = {
      id: crypto.randomUUID(),
      role: 'user',
      content: userText,
      timestamp: new Date().toISOString(),
    };

    // Atualiza estado local e salva no localStorage
    setMessages((prev) => [...prev, userMessage]);
    saveChatMessage(simulation.id, userMessage);
    setIsLoading(true);

    try {
      const historyContext = messages.map((m) => ({
        role: m.role,
        content: m.content,
      }));

      const aiResponseText = await askFinancialEducator(
        userText,
        simulation,
        historyContext,
      );

      const assistantMessage: ChatMessage = {
        id: crypto.randomUUID(),
        role: 'assistant',
        content: aiResponseText,
        timestamp: new Date().toISOString(),
      };

      setMessages((prev) => [...prev, assistantMessage]);
      saveChatMessage(simulation.id, assistantMessage);
    } catch (error) {
      console.error('Erro ao consultar o educador financeiro:', error);
      setErrorMessage(
        'Não foi possível obter uma resposta agora. Tente novamente em alguns instantes.',
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-card flex flex-col rounded-2xl p-6 shadow-[4px_4px_18px_0px_rgba(0,0,0,0.2)]">
      {/* Cabeçalho */}
      <div className="mb-4 flex items-center gap-3 border-b border-border pb-4">
        <div className="bg-primary/10 flex h-10 w-10 items-center justify-center rounded-xl text-primary">
          <Sparkles className="h-5 w-5" />
        </div>
        <div>
          <h3 className="text-foreground font-semibold text-lg">
            Educador Financeiro AI
          </h3>
          <p className="text-muted-foreground text-xs">
            Tire suas dúvidas sobre a meta{' '}
            <strong>{simulation.goalName}</strong>
          </p>
        </div>
      </div>

      {/* Área de Histórico de Conversas com Scroll */}
      <div
        ref={chatContainerRef}
        className="flex max-h-[400px] min-h-[180px] flex-col gap-4 overflow-y-auto pr-2"
      >
        {messages.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-8 text-center text-muted-foreground">
            <Bot className="mb-2 h-8 w-8 text-primary" />
            <p className="text-sm">
              Faça qualquer pergunta sobre seu plano financeiro!
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              Ex: "Como posso juntar esse valor mais rápido?"
            </p>
          </div>
        ) : (
          messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex gap-3 ${
                msg.role === 'user' ? 'justify-end' : 'justify-start'
              }`}
            >
              {msg.role === 'assistant' && (
                <div className="bg-primary/10 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-primary">
                  <Bot className="h-4 w-4" />
                </div>
              )}

              <div
                className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm whitespace-pre-wrap ${
                  msg.role === 'user'
                    ? 'bg-primary text-primary-foreground rounded-br-none'
                    : 'bg-muted text-foreground rounded-bl-none border border-border'
                }`}
              >
                {msg.content}
              </div>

              {msg.role === 'user' && (
                <div className="bg-secondary flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-foreground">
                  <User className="h-4 w-4" />
                </div>
              )}
            </div>
          ))
        )}

        {/* Feedback de Carregamento */}
        {isLoading && (
          <div className="flex items-center gap-2 text-muted-foreground text-xs py-2">
            <Loader2 className="h-4 w-4 animate-spin text-primary" />
            <span>O educador está analisando sua pergunta...</span>
          </div>
        )}

        {/* Feedback de Erro */}
        {errorMessage && (
          <div className="flex items-center gap-2 rounded-xl bg-red-500/10 p-3 text-xs text-red-500">
            <AlertCircle className="h-4 w-4 shrink-0" />
            <span>{errorMessage}</span>
          </div>
        )}
      </div>

      {/* Formulário de Pergunta */}
      <form
        onSubmit={handleSendMessage}
        className="mt-4 flex gap-2 border-t border-border pt-4"
      >
        <input
          type="text"
          value={inputQuestion}
          onChange={(e) => setInputQuestion(e.target.value)}
          placeholder="Pergunte algo sobre a simulação..."
          disabled={isLoading}
          className="bg-background border-input placeholder:text-muted-foreground focus-visible:ring-primary flex-1 rounded-xl border px-4 py-2 text-sm outline-none transition-colors focus-visible:ring-2 disabled:opacity-50"
        />
        <Button
          type="submit"
          variant="primary"
          disabled={isLoading || !inputQuestion.trim()}
          className="px-4"
        >
          <Send className="h-4 w-4" />
        </Button>
      </form>
    </div>
  );
}

export default AIInsightCard;
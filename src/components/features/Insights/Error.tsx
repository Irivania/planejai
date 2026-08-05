import { AlertCircle, RefreshCw } from 'lucide-react'
import { Button } from '../../shared/Button'

interface ErrorProps {
  message?: string
  onRetry?: () => void
}

export function Error({ message, onRetry }: ErrorProps) {
  return (
    <div className="bg-card flex flex-col items-center justify-center rounded-2xl p-8 text-center shadow-[4px_4px_18px_0px_rgba(0,0,0,0.2)]">
      <AlertCircle className="mb-3 h-10 w-10 text-rose-500" />
      <h3 className="text-lg font-semibold text-foreground">
        Não foi possível gerar os Insights
      </h3>
      <p className="mt-1 max-w-md text-sm text-muted-foreground">
        {message ||
          'Ocorreu uma falha ao conectar com a IA. Verifique sua chave API no arquivo .env.local.'}
      </p>

      {onRetry && (
        <Button
          variant="primary"
          className="mt-4 px-6"
          icon={RefreshCw}
          onClick={onRetry}
        >
          Tentar novamente
        </Button>
      )}
    </div>
  )
}

export default Error
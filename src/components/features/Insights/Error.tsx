import { AlertCircle } from 'lucide-react'

interface ErrorProps {
  message?: string
}

export function Error({ message }: ErrorProps) {
  return (
    <div className="bg-card flex flex-col items-center justify-center rounded-2xl p-8 text-center shadow-[4px_4px_18px_0px_rgba(0,0,0,0.2)]">
      <AlertCircle className="text-rose-500 mb-3 h-10 w-10" />
      <h3 className="text-foreground font-semibold text-lg">
        Não foi possível gerar os Insights
      </h3>
      <p className="text-muted-foreground mt-1 text-sm max-w-md">
        {message || 'Ocorreu uma falha ao conectar com a IA. Verifique sua chave API no arquivo .env.local.'}
      </p>
    </div>
  )
}

export default Error
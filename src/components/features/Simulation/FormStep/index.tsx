import { ArrowLeft, ArrowRight, type LucideIcon } from 'lucide-react'
import type { FormEvent } from 'react'
import { Button } from '@/components/shared/Button'
import { Input, type InputProps } from '@/components/shared/Input'
import { formatCurrency, parseCurrency } from '@/utils/currency'

export interface FormStepProps {
  id: string
  icon: LucideIcon
  title: string
  question: string
  inputProps: InputProps
  submitButtonProps?: {
    label: string
    emojiIcon?: string
  }
}

export type FormStepComponentProps = FormStepProps & {
  value: string
  onChange: (value: string) => void
  onSubmit: (event: FormEvent<HTMLFormElement>) => void
  onBack?: () => void
  isFirstStep: boolean
  isLastStep: boolean
  isValid: boolean
}

function formatCurrencyValue(value: string) {
  if (!value) return ''
  const numericValue = parseCurrency(value)
  if (!numericValue) return ''
  return formatCurrency(numericValue).replace('R$', '').trim()
}

export function FormStep({
  icon: Icon,
  title,
  question,
  inputProps,
  submitButtonProps,
  value,
  onChange,
  onSubmit,
  onBack,
  isFirstStep,
  isLastStep,
  isValid,
}: FormStepComponentProps) {
  const isCurrencyStep = inputProps.prefix === 'R$'
  const displayValue = isCurrencyStep ? formatCurrencyValue(value) : value

  return (
    <div className="rounded-2xl bg-card p-6 shadow-[4px_4px_18px_0px_rgba(0,0,0,0.2)] sm:p-8">
      <div className="mb-4 flex h-15 w-15 items-center justify-center rounded-xl bg-primary">
        <Icon size={32} className="text-primary-foreground" />
      </div>
      <h2 className="mb-1 text-xs font-semibold uppercase tracking-widest text-primary">
        {title}
      </h2>
      <h3 className="mb-6 text-xl font-semibold leading-snug text-foreground sm:text-2xl">
        {question}
      </h3>
      <form className="flex flex-col gap-4" onSubmit={onSubmit}>
        <Input
          {...inputProps}
          value={displayValue}
          onChange={(event) => {
            if (isCurrencyStep) {
              const rawDigits = event.target.value.replace(/\D/g, '')
              onChange(rawDigits)
            } else {
              onChange(event.target.value)
            }
          }}
        />
        <div className="flex flex-col gap-3 sm:flex-row sm:gap-6">
          <Button
            type="button"
            variant="ghost"
            className="order-2 flex-1 justify-center rounded-xl py-3 sm:order-1"
            onClick={onBack}
            disabled={isFirstStep}
          >
            <ArrowLeft size={16} />
            Voltar
          </Button>
          <Button
            type="submit"
            variant="primary"
            className="order-1 flex-1 sm:order-2"
            disabled={!isValid}
          >
            {submitButtonProps?.label ?? (isLastStep ? 'Finalizar' : 'Próximo')}
            {submitButtonProps?.emojiIcon ? (
              <span>{submitButtonProps.emojiIcon}</span>
            ) : (
              <ArrowRight size={16} />
            )}
          </Button>
        </div>
      </form>
    </div>
  )
}

export default FormStep
// src/utils/currency.ts

export function parseCurrency(value: string | number): number {
  if (typeof value === 'number') return value
  if (!value) return 0

  const cleanValue = String(value).replace(/\D/g, '')
  if (!cleanValue) return 0

  return parseFloat(cleanValue) / 100
}

export function formatCurrency(value: number): string {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(value)
}

export function formatCurrencyMask(value: string): string {
  if (!value) return ''
  return value.replace(/\D/g, '')
}
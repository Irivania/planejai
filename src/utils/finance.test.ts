import { calcularViabilidade } from '@/utils/finance';

import { describe, expect, it } from 'vitest';

describe('Cálculos Financeiros e Viabilidade de Metas (Planej.ai)', () => {
  it('deve calcular corretamente a sobra mensal e indicar que a meta é viável', () => {
    // Renda: 5000 | Custos Fixos: 2000 | Dívidas: 500 -> Gastos Totais: 2500 -> Sobra: 2500
    // Meta: 12000 em 12 meses -> Economia necessária: 1000 por mês
    const resultado = calcularViabilidade(5000, 2000, 500, 12000, 12);

    expect(resultado.sobraMensal).toBe(2500);
    expect(resultado.economiaNecessaria).toBe(1000);
    expect(resultado.viavel).toBe(true);
  });

  it('deve indicar que a meta NÃO é viável quando a economia necessária é maior que a sobra mensal', () => {
    // Renda: 3000 | Custos Fixos: 2200 | Dívidas: 400 -> Gastos Totais: 2600 -> Sobra: 400
    // Meta: 10000 em 5 meses -> Economia necessária: 2000 por mês
    const resultado = calcularViabilidade(3000, 2200, 400, 10000, 5);

    expect(resultado.sobraMensal).toBe(400);
    expect(resultado.economiaNecessaria).toBe(2000);
    expect(resultado.viavel).toBe(false);
  });

  it('deve tratar prazos zerados evitando divisão por zero', () => {
    const resultado = calcularViabilidade(4000, 1500, 0, 5000, 0);

    expect(resultado.economiaNecessaria).toBe(0);
  });
});

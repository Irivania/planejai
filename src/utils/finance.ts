export function calcularViabilidade(
  renda: number,
  custosFixos: number,
  dividas: number,
  custoMeta: number,
  prazoMeses: number
) {
  const totalGastos = custosFixos + dividas;
  const sobraMensal = renda - totalGastos;
  const economiaNecessaria = prazoMeses > 0 ? custoMeta / prazoMeses : 0;
  
  const viavel = sobraMensal >= economiaNecessaria;

  return {
    sobraMensal,
    economiaNecessaria,
    viavel,
  };
}
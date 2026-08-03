import Button from '@/components/shared/Button';
import Input from '@/components/shared/Input';

function Form() {
  return (
    <form className="mt-6 grid gap-4 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <Input label="Meta financeira" placeholder="Ex.: Reserva de emergência" />
      <Input label="Renda mensal" placeholder="Ex.: 5000" />
      <Input label="Despesas mensais" placeholder="Ex.: 3200" />
      <div className="flex gap-3">
        <Button>Salvar simulação</Button>
        <Button variant="secondary">Limpar</Button>
      </div>
    </form>
  );
}

export default Form;

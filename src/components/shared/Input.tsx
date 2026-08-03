type InputProps = {
  label: string;
  placeholder?: string;
};

function Input({ label, placeholder }: InputProps) {
  return (
    <label className="flex flex-col gap-2 text-sm font-medium text-slate-700">
      <span>{label}</span>
      <input
        className="rounded-lg border border-slate-300 px-3 py-2 outline-none transition focus:border-slate-500"
        placeholder={placeholder}
      />
    </label>
  );
}

export default Input;

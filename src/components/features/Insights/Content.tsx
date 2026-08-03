type ContentProps = {
  text: string;
};

function Content({ text }: ContentProps) {
  return <p className="text-sm leading-6 text-slate-600">{text}</p>;
}

export default Content;

type ErrorProps = {
  message: string;
};

function Error({ message }: ErrorProps) {
  return <p className="text-sm text-rose-600">{message}</p>;
}

export default Error;

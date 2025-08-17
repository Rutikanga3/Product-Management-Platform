interface ErrorProps {
  message: string;
}

export default function ErrorMessage({ message }: ErrorProps) {
  return <div className="text-red-600 text-center py-4">{message}</div>;
}

interface ButtonProps {
    label: string;
    onClick?: () => void;
    type?: 'button' | 'submit' | 'reset';
    className?: string;
}

export default function Button(
    { label, onClick, type = 'button', className = 'bg-teal-400 text-white px-4 py-2 rounded-md hover:bg-teal-500 transition-colors duration-300' }: ButtonProps
) {

  return (
    <button className={className} type={type} onClick={onClick} >
        {label}

    </button>
  )
}

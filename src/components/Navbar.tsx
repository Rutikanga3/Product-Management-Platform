import { useNavigate } from 'react-router-dom';
import Button from "./Button"

export default function Navbar() {
  const navigate = useNavigate();

  return (
    <div>
      <nav className="bg-white shadow flex items-center justify-between p-5">
        <h2
          className="text-teal-400 font-medium text-xl cursor-pointer"
          onClick={() => navigate('/products')}
        >
          Product Management
        </h2>
        <div className="flex gap-5">
          <Button
            label="Products"
            onClick={() => navigate('/products')}
            className="bg-teal-400 text-white px-4 py-2 rounded-md hover:bg-teal-500 transition-colors duration-300"
          />
          <Button
            label="Categories"
            onClick={() => navigate('/categories')}
            className="bg-teal-400 text-white px-4 py-2 rounded-md hover:bg-teal-500 transition-colors duration-300"
          />
        </div>
      </nav>
    </div>
  )
}

import { useNavigate } from 'react-router-dom';
import Button from "./Button"
import { useState } from 'react';
import { FaUserCircle } from "react-icons/fa";

export default function Navbar() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [dropdownOpen,setDropdownOpen]= useState(false);

  const handleLogout = () => {
    
    localStorage.removeItem('loggedInUser');
    navigate('/'); 
  };

  return (
    <div>
      <nav className="bg-white shadow p-5  ">
        <div className="flex items-center justify-between">
          <h2
            className="text-teal-400 font-medium text-xl cursor-pointer"
            onClick={() => navigate('/products')}
          >
            Product Management
          </h2>
          <button
            className="sm:hidden inline-flex items-center px-3 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
            onClick={() => setOpen(!open)}
            aria-label="Toggle navigation"
          >
            Menu
          </button>
          {/* User Icon */}
            <div className="relative">
              <FaUserCircle
                className="text-teal-400 text-2xl cursor-pointer"
                onClick={() => setDropdownOpen(!dropdownOpen)}
              />
              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg">
                  <button
                    onClick={handleLogout}
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
        </div>

        <div className={`${open ? 'flex' : 'hidden'}  sm:flex flex-col sm:flex-row gap-3 sm:gap-5 mt-4 sm:mt-4`}>
          <Button
            label="Products"
            onClick={() => { setOpen(false); navigate('/products'); }}
            className="bg-teal-400 text-white px-4 py-2 rounded-md hover:bg-teal-500 transition-colors duration-300"
          />
          <Button
            label="Categories"
            onClick={() => { setOpen(false); navigate('/categories'); }}
            className="bg-teal-400 text-white px-4 py-2 rounded-md hover:bg-teal-500 transition-colors duration-300"
          />
          <Button
            label="Carts"
            onClick={() => { setOpen(false); navigate('/carts'); }}
            className="bg-teal-400 text-white px-4 py-2 rounded-md hover:bg-teal-500 transition-colors duration-300"
          />
        </div>
      </nav>
    </div>
  )
}

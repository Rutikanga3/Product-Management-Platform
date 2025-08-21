import { useState } from "react";
import { fetchLoginUser,fetchCurrentUser,fetchRefreshAuth } from "../app/api";
import type { User } from "../types/user";
import { useNavigate } from "react-router-dom";

export default function Login() {
  
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState('')
  const[error,setError]= useState<string | null>(null);
   const[user,setUser]= useState<User| null>(null);
   const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    try{
        const response = await fetchLoginUser({
            username,
            password,
        });
        setUser(response)
        navigate('/home');
        
    }
    catch(err:any){
        setError(err.response?.data?.message || 'login failed. please try again.')
        console.log('Login error:', err);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-6">Login</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Email Field */}
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-gray-700">
              Username
            </label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-teal-500 focus:border-teal-500"
              placeholder="Enter your username"
              required
            />
          </div>

          {/* Password Field */}
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-teal-500 focus:border-teal-500"
              placeholder="Enter your password"
              required
            />
          </div>
          {error && <p className="text-red-500 text-sm">{error}</p>}

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-teal-500 text-white py-2 px-4 rounded-lg hover:bg-teal-600 focus:outline-none focus:ring-2 focus:ring-teal-400 focus:ring-offset-2"
          >
            Login
          </button>
        </form>

         {user && (
          <div className="mt-6">
            <h3 className="text-lg font-bold">Welcome, {user.username}!</h3>
            <p>Email: {user.email}</p>
          </div>
        )}
      </div>
    </div>
  );
}
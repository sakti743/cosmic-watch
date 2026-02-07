"use client"; // Required for App Router hooks
import React, { useState } from 'react';
import { Telescope } from 'lucide-react';
import { useRouter } from 'next/navigation';
import axios from 'axios';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      // Connect to your backend running on 5001
      const response = await axios.post('http://localhost:5001/api/auth/login', {
        username,
        password
      });

      // Save the JWT token for secure NASA data access
      localStorage.setItem('token', response.data.token);
      
      // Redirect to the Dashboard after success
      router.push('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Access Denied: Invalid Credentials');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#05060b] text-gray-300 font-sans px-4">
      <div className="w-full max-w-md p-8 bg-[#0a0b14] rounded-2xl border border-gray-800 shadow-2xl relative overflow-hidden">
        
        {/* Visual Flair: Glow background */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-blue-600/10 blur-3xl rounded-full -mr-16 -mt-16"></div>

        <div className="flex flex-col items-center mb-8 relative">
          <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mb-4 shadow-[0_0_30px_rgba(79,70,229,0.3)]">
            <Telescope size={32} className="text-white" />
          </div>
          <h1 className="text-3xl font-black tracking-widest text-white mb-2 italic">
            COSMIC<span className="text-blue-500 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">WATCH</span>
          </h1>
          <p className="text-[10px] text-gray-500 uppercase tracking-widest font-mono">Satellite Uplink Authorization</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label className="block text-[10px] uppercase tracking-widest text-gray-500 mb-2 ml-1">Username</label>
            <input 
              type="text" 
              required
              className="w-full bg-[#11121d] border border-gray-800 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition-all placeholder:text-gray-700"
              placeholder="commander_id"
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-[10px] uppercase tracking-widest text-gray-500 mb-2 ml-1">Access Cipher</label>
            <input 
              type="password" 
              required
              className="w-full bg-[#11121d] border border-gray-800 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition-all placeholder:text-gray-700"
              placeholder="••••••••"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          {error && <p className="text-red-500 text-[10px] text-center font-mono animate-pulse uppercase">{error}</p>}
          
          <button 
            type="submit"
            className="w-full py-4 px-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-bold rounded-lg shadow-lg transition-all transform active:scale-95 uppercase tracking-widest text-xs"
          >
            Login
          </button>
        </form>

        <div className="mt-8 pt-6 border-t border-gray-900 text-center">
          <p className="text-[9px] text-gray-600 font-mono uppercase">Secure AES-256 Encrypted Connection</p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
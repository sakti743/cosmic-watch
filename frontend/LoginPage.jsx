import React from 'react';
import { Telescope } from 'lucide-react';

const LoginPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0a0b14] text-gray-300 font-sans">
      {/* Main Card */}
      <div className="w-full max-w-md p-8 bg-[#11121d] rounded-2xl border border-gray-800 shadow-2xl">
        
        {/* Logo Section */}
        <div className="flex flex-col items-center mb-8">
          <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mb-4 shadow-[0_0_20px_rgba(79,70,229,0.5)]">
            <Telescope size={32} className="text-white" />
          </div>
          <h1 className="text-4xl font-black tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400 mb-2">
            COSMIC WATCH
          </h1>
          <p className="text-sm text-gray-500">Enter credentials to access telemetry.</p>
        </div>

        {/* Toggle Buttons */}
        <div className="flex bg-[#0a0b14] p-1 rounded-lg mb-8">
          <button className="flex-1 py-2 rounded-md bg-[#1a1b26] text-white shadow-sm">Login</button>
          <button className="flex-1 py-2 rounded-md text-gray-500 hover:text-gray-300 transition-colors">Register</button>
        </div>

        {/* Form Fields */}
        <div className="space-y-6">
          <div>
            <label className="block text-xs uppercase tracking-widest text-gray-500 mb-2 ml-1">Username</label>
            <input 
              type="text" 
              className="w-full bg-[#1a1b26] border border-gray-800 rounded-lg px-4 py-3 focus:outline-none focus:border-purple-500 transition-colors"
              placeholder="username"
            />
          </div>
          <div>
            <label className="block text-xs uppercase tracking-widest text-gray-500 mb-2 ml-1">Password</label>
            <input 
              type="password" 
              className="w-full bg-[#1a1b26] border border-gray-800 rounded-lg px-4 py-3 focus:outline-none focus:border-purple-500 transition-colors"
              placeholder="••••••"
            />
          </div>
          
          <button className="w-full py-3 px-4 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white font-bold rounded-lg shadow-lg shadow-purple-900/20 transition-all transform active:scale-95">
            Access System
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
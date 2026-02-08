"use client";
import React, { useState } from 'react';
import { UserPlus, Mail, User, ShieldCheck, Lock } from 'lucide-react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import axios from 'axios';
import LoginVideo from '../Video/LoginVideo';

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    username: '',
    password: ''
  });
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');
    
    try {
      // Connect to your backend enrollment endpoint
      await axios.post('http://localhost:5001/api/auth/register', formData);

      setMessage('IDENTITY VERIFIED. REDIRECTING TO UPLINK...');
      
      setTimeout(() => {
        router.push('/login');
      }, 2000);
      
    } catch (err) {
      setError(err.response?.data?.message || 'ENROLLMENT FAILED. CHECK SYSTEM LOGS.');
    }
  };

  return (
   <>
   <LoginVideo />
     <div className="min-h-screen flex items-center justify-center  text-gray-300 font-sans px-4">
      <div className="w-full max-w-md p-8 h-[36rem] rounded-2xl border border-white/15 bg-white/5  shadow-[0_0_80px_rgb(140,120,255,0.45)] relative overflow-hidden">
        
        {/* Visual Flair: Purple Glow */}
        <div className="absolute top-0 left-0 w-32 h-27 bg-purple-600/10 blur-3xl rounded-full -ml-16 -mt-16"></div>

        <div className="flex flex-col items-center mb-6 relative">
          <div className="w-14 h-14 bg-gradient-to-br from-purple-500 to-blue-600 rounded-2xl flex items-center justify-center mb-4 shadow-[0_0_30px_rgba(147,51,234,0.3)]">
            <UserPlus size={28} className="text-white" />
          </div>
          <h1 className="text-2xl font-black tracking-widest text-white mb-1 italic text-center">
            NEW<span className="text-purple-500 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">ENROLLMENT</span>
          </h1>
          <p className="text-[9px] text-gray-500 uppercase tracking-widest font-mono text-center">Personnel Data Acquisition</p>
        </div>

        <form onSubmit={handleRegister} className="space-y-4">
          {/* Full Name Field */}
          <div>
            <label className="block text-[9px] uppercase tracking-widest text-gray-500 mb-1.5 ml-1">Full Name</label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-600" size={14} />
              <input 
                name="name"
                type="text" 
                required
                className="w-full bg-[#11121d] border border-gray-800 rounded-lg pl-10 pr-4 py-2.5 text-white focus:outline-none focus:border-purple-500 transition-all text-sm"
                placeholder="Commander Name"
                onChange={handleChange}
              />
            </div>
          </div>

          {/* Email Field */}
          <div>
            <label className="block text-[9px] uppercase tracking-widest text-gray-500 mb-1.5 ml-1">Secure Email</label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-600" size={14} />
              <input 
                name="email"
                type="email" 
                required
                className="w-full bg-[#11121d] border border-gray-800 rounded-lg pl-10 pr-4 py-2.5 text-white focus:outline-none focus:border-purple-500 transition-all text-sm"
                placeholder="uplink@agency.gov"
                onChange={handleChange}
              />
            </div>
          </div>

          {/* Username Field */}
          <div>
            <label className="block text-[9px] uppercase tracking-widest text-gray-500 mb-1.5 ml-1">Operator ID</label>
            <div className="relative">
              <ShieldCheck className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-600" size={14} />
              <input 
                name="username"
                type="text" 
                required
                className="w-full bg-[#11121d] border border-gray-800 rounded-lg pl-10 pr-4 py-2.5 text-white focus:outline-none focus:border-purple-500 transition-all text-sm"
                placeholder="astronomer_01"
                onChange={handleChange}
              />
            </div>
          </div>

          {/* Password Field */}
          <div>
            <label className="block text-[9px] uppercase tracking-widest text-gray-500 mb-1.5 ml-1">Access Cipher</label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-600" size={14} />
              <input 
                name="password"
                type="password" 
                required
                className="w-full bg-[#11121d] border border-gray-800 rounded-lg pl-10 pr-4 py-2.5 text-white focus:outline-none focus:border-purple-500 transition-all text-sm"
                placeholder="••••••••"
                onChange={handleChange}
              />
            </div>
          </div>

          {error && <p className="text-red-500 text-[9px] text-center font-mono animate-pulse uppercase">{error}</p>}
          {message && <p className="text-green-500 text-[9px] text-center font-mono uppercase">{message}</p>}
           <button className="group relative w-full py-4 px-4 border border-purple-300 color-blue-700 rounded-lg font-bold overflow-hidden transition-all duration-300">
       <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600
 -translate-x-full group-hover:translate-x-0 uppercase transition-transform duration-300 ease-out"></div>

  <p className="relative z-10 transition-colors text-purple-300 duration-300 group-hover:text-white">
    Create crendentials
  </p>
</button>
        </form>

        <div className="mt-6 pt-5 border-t border-gray-900 text-center space-y-2">
          <p className="text-[10px] text-gray-400">
            Already registered? 
            <Link href="/login" className="text-blue-400 hover:text-purple-400 ml-1 font-bold transition-colors">
               Login Here
            </Link>
          </p>
          <p className="text-[8px] text-gray-700 font-mono uppercase tracking-[0.2em] text-center">
            Identity Provisioning Protocol Active
          </p>
        </div>
      </div>
    </div>
   </>
  );
};

export default RegisterPage;
"use client";
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Activity, Radio, AlertCircle, Shield, Search, LogOut } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function Dashboard() {
  const router = useRouter();
  const [asteroids, setAsteroids] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState(''); // State for Search Bar

  useEffect(() => {
    const fetchTelemetry = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get('http://localhost:5001/api/asteroids/feed', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setAsteroids(res.data);
      } catch (err) {
        console.error("Uplink Error:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchTelemetry();
  }, []);

  // Secure Logout Function
  const handleLogout = () => {
    localStorage.removeItem('token'); // Clear the session
    router.push('/login'); // Redirect to login page
  };

  // Search Filtering Logic
  const filteredAsteroids = asteroids.filter((neo) =>
    neo.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) return (
    <div className="min-h-screen bg-[#05060b] flex items-center justify-center text-blue-500 font-mono animate-pulse">
      ESTABLISHING SATELLITE UPLINK...
    </div>
  );

  return (
    <div className="min-h-screen bg-[#05060b] text-gray-300 p-6 font-sans">
      <header className="max-w-7xl mx-auto mb-6 flex justify-between items-end border-b border-gray-900 pb-6">
        <div>
          <h1 className="text-3xl font-black text-white italic tracking-tighter">
            COSMIC<span className="text-blue-500">WATCH</span>
          </h1>
          <p className="text-[10px] text-gray-500 uppercase tracking-[0.3em] font-mono mt-1">
            Real-Time Deep Space Surveillance
          </p>
        </div>
        
        <div className="flex gap-4 items-center">
          {/* Status Indicator */}
          <div className="hidden sm:flex bg-[#0a0b14] border border-gray-800 px-4 py-2 rounded-md items-center gap-2">
            <Radio size={14} className="text-green-500 animate-ping" />
            <span className="text-[10px] font-mono text-gray-400">NASA_LINK: STABLE</span>
          </div>

          {/* Secure Logout Button */}
          <button 
            onClick={handleLogout}
            className="flex items-center gap-2 bg-red-950/30 border border-red-900/50 text-red-500 px-4 py-2 rounded-md hover:bg-red-500 hover:text-white transition-all text-[10px] font-bold uppercase tracking-widest"
          >
            <LogOut size={14} />
            Termination
          </button>
        </div>
      </header>

      {/* Search Bar Section */}
      <div className="max-w-7xl mx-auto mb-8">
        <div className="relative group">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600 group-focus-within:text-blue-500 transition-colors" size={18} />
          <input 
            type="text"
            placeholder="FILTER BY ASTEROID DESIGNATION (E.G. 2024 BX)..."
            className="w-full bg-[#0a0b14] border border-gray-800 rounded-xl py-4 pl-12 pr-4 text-xs font-mono tracking-widest text-white focus:outline-none focus:border-blue-500/50 transition-all placeholder:text-gray-700"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* Results Grid */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredAsteroids.length > 0 ? (
          filteredAsteroids.map((neo) => (
            <div key={neo.id} className="bg-[#0a0b14] border border-gray-800 p-5 rounded-xl hover:border-blue-500/50 transition-all group">
              <div className="flex justify-between items-start mb-4">
                <h3 className="font-bold text-white group-hover:text-blue-400 transition-colors">{neo.name}</h3>
                {neo.isHazardous ? <AlertCircle className="text-red-500" size={18} /> : <Shield className="text-green-500" size={18} />}
              </div>

              <div className="grid grid-cols-2 gap-4 mb-6 text-[11px] font-mono uppercase text-gray-500">
                <div>
                  <p>Velocity</p>
                  <p className="text-white text-xs mt-1">{neo.velocity}</p>
                </div>
                <div>
                  <p>Diameter</p>
                  <p className="text-white text-xs mt-1">{neo.size}</p>
                </div>
              </div>

              <div className="pt-4 border-t border-gray-900">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-[9px] font-bold text-gray-600 uppercase">Impact Risk Index</span>
                  <span className="text-[10px] font-bold text-blue-500">{neo.riskScore}%</span>
                </div>
                <div className="w-full bg-gray-950 h-1 rounded-full overflow-hidden">
                  <div 
                    className={`h-full transition-all duration-1000 ${neo.riskScore > 60 ? 'bg-red-500' : 'bg-blue-600'}`}
                    style={{ width: `${neo.riskScore}%` }}
                  />
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full py-20 text-center border-2 border-dashed border-gray-900 rounded-3xl">
            <p className="text-gray-600 font-mono text-xs tracking-widest uppercase">No matching orbital bodies detected in current sector.</p>
          </div>
        )}
      </div>
    </div>
  );
}
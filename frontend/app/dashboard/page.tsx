"use client";
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Activity, Radio, AlertCircle, Shield, Search, LogOut, BarChart3, Target } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';

// Internal Chart Component for better organization
const RiskAnalysisChart = ({ data }) => {
  const chartData = [
    { name: 'Low Risk', value: data.filter(a => a.riskScore < 30).length, color: '#22c55e' },
    { name: 'Medium Risk', value: data.filter(a => a.riskScore >= 30 && a.riskScore < 70).length, color: '#eab308' },
    { name: 'High Threat', value: data.filter(a => a.riskScore >= 70).length, color: '#ef4444' },
  ].filter(item => item.value > 0); // Only show segments with data

  return (
    <div className="bg-[#0a0b14] border border-gray-800 p-5 rounded-xl h-[300px]">
      <h3 className="text-[10px] text-gray-500 uppercase tracking-[0.2em] font-mono mb-2 flex items-center gap-2">
        <BarChart3 size={14} className="text-blue-500" /> Threat Distribution
      </h3>
      <ResponsiveContainer width="100%" height="90%">
        <PieChart>
          <Pie
            data={chartData}
            innerRadius={60}
            outerRadius={80}
            paddingAngle={5}
            dataKey="value"
          >
            {chartData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} stroke="none" />
            ))}
          </Pie>
          <Tooltip 
            contentStyle={{ backgroundColor: '#05060b', border: '1px solid #1f2937', borderRadius: '8px', fontSize: '10px' }}
          />
          <Legend iconType="circle" wrapperStyle={{ fontSize: '10px', paddingTop: '10px' }} />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default function Dashboard() {
  const router = useRouter();
  const [asteroids, setAsteroids] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

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

  const handleLogout = () => {
    localStorage.removeItem('token');
    router.push('/login');
  };

  const filteredAsteroids = asteroids.filter((neo) =>
    neo.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) return (
    <div className="min-h-screen bg-[#05060b] flex items-center justify-center text-blue-500 font-mono animate-pulse tracking-[0.5em]">
      ESTABLISHING SATELLITE UPLINK...
    </div>
  );

  return (
    <div className="min-h-screen bg-[#05060b] text-gray-300 p-6 font-sans">
      <header className="max-w-7xl mx-auto mb-6 flex justify-between items-end border-b border-gray-900 pb-6">
        <div>
          <h1 className="text-3xl font-black text-white italic tracking-tighter">
            COSMIC<span className="text-blue-500 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">WATCH</span>
          </h1>
          <p className="text-[10px] text-gray-500 uppercase tracking-[0.3em] font-mono mt-1">
            Real-Time Deep Space Surveillance
          </p>
        </div>
        
        <div className="flex gap-4 items-center">
          <div className="hidden sm:flex bg-[#0a0b14] border border-gray-800 px-4 py-2 rounded-md items-center gap-2 shadow-inner">
            <Radio size={14} className="text-green-500 animate-ping" />
            <span className="text-[10px] font-mono text-gray-400">NASA_LINK: STABLE</span>
          </div>

          <button 
            onClick={handleLogout}
            className="flex items-center gap-2 bg-red-950/20 border border-red-900/40 text-red-500 px-4 py-2 rounded-md hover:bg-red-600 hover:text-white transition-all text-[10px] font-bold uppercase tracking-widest shadow-lg shadow-red-900/10"
          >
            <LogOut size={14} />
            Termination
          </button>
        </div>
      </header>

      {/* --- NEW DATA VISUALIZATION SECTION --- */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <div className="lg:col-span-1">
          <RiskAnalysisChart data={filteredAsteroids} />
        </div>
        
        <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="bg-[#0a0b14] border border-gray-800 p-6 rounded-xl flex flex-col justify-center relative overflow-hidden group hover:border-blue-500/30 transition-colors">
            <Activity className="absolute right-[-10px] bottom-[-10px] text-gray-800/20 group-hover:text-blue-500/10 transition-colors" size={120} />
            <span className="text-gray-500 text-[10px] uppercase font-mono tracking-widest mb-1">Total Sector Detections</span>
            <span className="text-5xl font-black text-white">{filteredAsteroids.length}</span>
            <p className="text-[9px] text-blue-400 mt-2 font-mono">SCANNED_OBJECTS_OK</p>
          </div>

          <div className="bg-[#0a0b14] border border-red-900/30 p-6 rounded-xl flex flex-col justify-center relative overflow-hidden border-l-4 border-l-red-600 group">
            <Target className="absolute right-[-10px] bottom-[-10px] text-red-900/10 group-hover:text-red-500/10 transition-colors" size={120} />
            <span className="text-red-500 text-[10px] uppercase font-mono tracking-widest mb-1">High-Hazard Alerts</span>
            <span className="text-5xl font-black text-white">
              {filteredAsteroids.filter(a => a.isHazardous).length}
            </span>
            <p className="text-[9px] text-red-600 mt-2 font-mono font-bold animate-pulse">CRITICAL_THREATS_DETECTED</p>
          </div>
        </div>
      </div>

      {/* Search Bar Section */}
      <div className="max-w-7xl mx-auto mb-8">
        <div className="relative group">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600 group-focus-within:text-blue-500 transition-colors" size={18} />
          <input 
            type="text"
            placeholder="FILTER BY ASTEROID DESIGNATION (E.G. 2024 BX)..."
            className="w-full bg-[#0a0b14] border border-gray-800 rounded-xl py-4 pl-12 pr-4 text-xs font-mono tracking-widest text-white focus:outline-none focus:border-blue-500/50 transition-all placeholder:text-gray-700 shadow-2xl"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* Results Grid */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pb-12">
        {filteredAsteroids.length > 0 ? (
          filteredAsteroids.map((neo) => (
            <div key={neo.id} className="bg-[#0a0b14] border border-gray-800 p-5 rounded-xl hover:border-blue-500/50 hover:bg-[#0d0e1a] transition-all group relative overflow-hidden shadow-xl">
              <div className="flex justify-between items-start mb-4 relative z-10">
                <h3 className="font-bold text-white group-hover:text-blue-400 transition-colors tracking-tight">{neo.name}</h3>
                {neo.isHazardous ? <AlertCircle className="text-red-500 animate-pulse" size={18} /> : <Shield className="text-green-500" size={18} />}
              </div>

              <div className="grid grid-cols-2 gap-4 mb-6 text-[11px] font-mono uppercase text-gray-500 relative z-10">
                <div className="bg-black/20 p-2 rounded-lg">
                  <p>Velocity</p>
                  <p className="text-white text-xs mt-1 font-bold">{neo.velocity}</p>
                </div>
                <div className="bg-black/20 p-2 rounded-lg">
                  <p>Diameter</p>
                  <p className="text-white text-xs mt-1 font-bold">{neo.size}</p>
                </div>
              </div>

              <div className="pt-4 border-t border-gray-900 relative z-10">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-[9px] font-bold text-gray-600 uppercase tracking-tighter">Impact Risk Index</span>
                  <span className={`text-[10px] font-bold ${neo.riskScore > 70 ? 'text-red-500' : 'text-blue-500'}`}>{neo.riskScore}%</span>
                </div>
                <div className="w-full bg-gray-950 h-1.5 rounded-full overflow-hidden shadow-inner">
                  <div 
                    className={`h-full transition-all duration-1000 ease-out ${neo.riskScore > 70 ? 'bg-gradient-to-r from-red-600 to-red-400' : 'bg-gradient-to-r from-blue-600 to-cyan-400'}`}
                    style={{ width: `${neo.riskScore}%` }}
                  />
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full py-20 text-center border-2 border-dashed border-gray-900 rounded-3xl bg-[#070810]">
            <p className="text-gray-600 font-mono text-xs tracking-widest uppercase">No matching orbital bodies detected in current sector.</p>
          </div>
        )}
      </div>
    </div>
  );
}
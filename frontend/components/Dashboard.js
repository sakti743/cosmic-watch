import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Activity, AlertTriangle, ShieldCheck } from 'lucide-react';

const Dashboard = () => {
  const [asteroids, setAsteroids] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get('http://localhost:5001/api/asteroids/feed');
        setAsteroids(res.data);
      } catch (err) {
        console.error("Error fetching telemetry:", err);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="min-h-screen bg-[#0a0b14] p-8 text-gray-100">
      <div className="max-w-6xl mx-auto">
        <header className="flex justify-between items-center mb-12">
          <div>
            <h2 className="text-3xl font-bold tracking-tighter text-blue-400">NEO TELEMETRY FEED</h2>
            <p className="text-gray-500 text-sm">Real-time tracking of Near-Earth Objects</p>
          </div>
          <div className="flex gap-4">
            <div className="bg-[#11121d] px-4 py-2 rounded-lg border border-gray-800 flex items-center gap-2">
              <Activity className="text-green-500" size={18} />
              <span className="text-xs font-mono uppercase">System: Online</span>
            </div>
          </div>
        </header>

        {/* Asteroid Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {asteroids.map((neo) => (
            <div key={neo.id} className="bg-[#11121d] border border-gray-800 rounded-xl p-6 hover:border-blue-500/50 transition-all group">
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-xl font-bold text-gray-200 group-hover:text-blue-400">{neo.name}</h3>
                {neo.isHazardous ? (
                  <AlertTriangle className="text-red-500" size={20} />
                ) : (
                  <ShieldCheck className="text-green-500" size={20} />
                )}
              </div>
              
              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Diameter:</span>
                  <span className="font-mono">{neo.size}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Velocity:</span>
                  <span className="font-mono">{neo.velocity}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Miss Distance:</span>
                  <span className="font-mono text-xs text-blue-300">{neo.distance}</span>
                </div>
              </div>

              {/* Risk Score Bar */}
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-xs uppercase tracking-widest text-gray-500">Risk Score</span>
                  <span className="text-xs font-bold text-blue-400">{neo.riskScore}%</span>
                </div>
                <div className="w-full bg-gray-900 rounded-full h-1.5 overflow-hidden">
                  <div 
                    className={`h-full transition-all duration-1000 ${neo.riskScore > 50 ? 'bg-red-500 shadow-[0_0_10px_rgba(239,68,68,0.5)]' : 'bg-blue-500'}`}
                    style={{ width: `${neo.riskScore}%` }}
                  ></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
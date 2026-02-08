import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Activity, AlertTriangle, ShieldCheck } from 'lucide-react';
import './globals.css'


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
   <div
  key={neo.id}
  className="relative bg-[#0b0e1a] rounded-xl p-6 border border-blue-500/30 
  shadow-[0_0_40px_rgba(99,102,241,0.25)]
  hover:-translate-y-2 hover:rotate-[0.3deg]
  transition-all duration-500 group overflow-hidden float"
>

  {/* SCAN LINE */}
  <div className="scan-line" />

  {/* CORNER HUD */}
  <span className="absolute top-2 left-2 w-3 h-3 border-t border-l border-blue-400" />
  <span className="absolute top-2 right-2 w-3 h-3 border-t border-r border-purple-400" />
  <span className="absolute bottom-2 left-2 w-3 h-3 border-b border-l border-blue-400" />
  <span className="absolute bottom-2 right-2 w-3 h-3 border-b border-r border-purple-400" />

  {/* CONTENT */}
  <div className="relative z-10">
    <div className="flex justify-between items-start mb-4">
      <h3 className="text-lg font-black tracking-widest text-blue-300">
        {neo.name}
      </h3>

      {neo.isHazardous ? (
        <AlertTriangle className="text-red-500 animate-pulse" size={20} />
      ) : (
        <ShieldCheck className="text-green-400" size={20} />
      )}
    </div>

    <div className="space-y-3 mb-6 text-xs font-mono uppercase tracking-widest">
      <div className="flex justify-between">
        <span className="text-gray-500">ffff</span>
        <span className="text-blue-300">{neo.size} m</span>
      </div>

      <div className="flex justify-between">
        <span className="text-gray-500">Velocity</span>
        <span className="text-blue-300">{neo.velocity}</span>
      </div>

      <div className="flex justify-between">
        <span className="text-gray-500">Miss Dist</span>
        <span className="text-blue-300">{neo.distance}</span>
      </div>
    </div>

    {/* RISK BAR */}
    <div>
      <div className="flex justify-between mb-1">
        <span className="text-[10px] text-gray-500 uppercase tracking-widest">
          Threat Index
        </span>
        <span className="text-xs font-bold text-blue-400">
          {neo.riskScore}%
        </span>
      </div>

      <div className="w-full h-2 bg-[#020617] rounded-full overflow-hidden">
        <div
          className={`h-full ${
            neo.riskScore > 50
              ? 'bg-red-500 animate-[pulseGlow_2s_infinite]'
              : 'bg-blue-500 shadow-[0_0_12px_rgba(59,130,246,0.8)]'
          }`}
          style={{ width: `${neo.riskScore}%` }}
        />
      </div>
    </div>
  </div>
</div>


  );
};

export default Dashboard;
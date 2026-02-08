"use client";
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { 
  Activity, Radio, AlertCircle, Shield, Search, LogOut, 
  BarChart3, Target, Crosshair, AlertTriangle, Zap, Filter, Star,
  ArrowLeftRight, Info, HardHat, Globe, Rocket, Bomb, Flame, Mountain,
  FileText, FileDown 
} from 'lucide-react';
import { useRouter } from 'next/navigation';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

// --- NEW: IMPACT SIMULATOR MODAL COMPONENT ---
const ImpactSimulator = ({ neo, onClose }) => {
  if (!neo) return null;

  // Predictive Physics Logic
  const v = parseFloat(neo.velocity) || 0;
  const d = parseFloat(neo.size) || 0;
  const radiusMeters = (d * 1000) / 2;
  const volume = (4 / 3) * Math.PI * Math.pow(radiusMeters, 3);
  const mass = volume * 2600; // Average density of stony asteroid
  const energyJoules = 0.5 * mass * Math.pow(v * 1000, 2);
  const megatons = energyJoules / (4.184 * Math.pow(10, 15));
  
  // Scaled consequence radius
  const blastRadius = 0.045 * Math.pow(megatons, 0.4) * 100; 

  // Deflection & Time metrics
  const deflectionDifficulty = Math.min(10, Math.max(1, Math.ceil(Math.log10(megatons + 1))));
  const timeToImpactHours = v > 0 ? (1000000 / (v * 3600)) : 0;

  const consequenceText = megatons < 5 ? "Regional damage. Atmospheric entry shockwave detected." :
                          megatons < 500 ? "Continental catastrophe. Massive thermal radiation and seismic event." :
                          "Global extinction event. Atmospheric debris will cause multi-year solar blackout.";

  const handleDownloadTacticalData = () => {
    try {
      const doc = new jsPDF();
      doc.setFillColor(153, 27, 27); 
      doc.rect(0, 0, 210, 40, 'F');
      doc.setTextColor(255, 255, 255);
      doc.setFontSize(22);
      doc.text("TACTICAL IMPACT ANALYSIS", 15, 25);
      doc.setFontSize(8);
      doc.text(`SIMULATION REF: ${neo.id} | ${new Date().toLocaleString()}`, 15, 33);

      autoTable(doc, {
        startY: 50,
        head: [['ANALYSIS METRIC', 'VALUE']],
        body: [
          ['Object Name', neo.name],
          ['Tracking ID', neo.id],
          ['Relative Velocity', `${v.toLocaleString()} km/s`],
          ['Object Diameter', `${d.toLocaleString()} km`],
          ['Kinetic Yield', `${megatons.toLocaleString(undefined, {maximumFractionDigits: 2})} MT`],
          ['Blast Radius', `${blastRadius.toLocaleString(undefined, {maximumFractionDigits: 2})} KM`],
          ['Deflection Difficulty', `${deflectionDifficulty}/10`],
          ['Estimated Impact Window', `${timeToImpactHours.toFixed(1)} Hours`],
          ['Outcome Prediction', consequenceText]
        ],
        theme: 'grid',
        headStyles: { fillColor: [153, 27, 27] },
        styles: { font: 'courier', fontSize: 9 }
      });

      doc.save(`SIMULATION_${neo.name.replace(/\s+/g, '_')}.pdf`);
    } catch (error) {
      console.error("PDF Export Error:", error);
      alert("Error generating Tactical PDF.");
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/90 backdrop-blur-md">
      <div className="bg-[#0a0b14] border-2 border-red-500/50 w-full max-w-2xl rounded-2xl overflow-hidden shadow-[0_0_80px_rgba(239,68,68,0.3)]">
        <div className="bg-red-600 p-4 flex justify-between items-center">
          <h2 className="text-white font-black uppercase tracking-tighter flex items-center gap-2 text-sm">
            <Bomb size={18} /> Impact Prediction Engine v1.0
          </h2>
          <button onClick={onClose} className="text-white hover:bg-white/20 p-1 rounded transition-colors font-bold">✕</button>
        </div>
        
        <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="relative aspect-square bg-black rounded-full border-4 border-dashed border-red-900/30 flex items-center justify-center overflow-hidden">
             <div className="absolute inset-0 bg-[radial-gradient(circle,rgba(239,68,68,0.3)_0%,transparent_70%)] animate-pulse" />
             <div className="text-center z-10">
                <div className="text-red-500 font-black text-3xl mb-1">
                    {megatons > 1000 ? (megatons/1000).toFixed(1) + 'GT' : megatons.toFixed(1) + 'MT'}
                </div>
                <div className="text-[10px] text-gray-500 uppercase font-mono tracking-widest">Kinetic Yield</div>
             </div>
             <div className="absolute w-full h-full border-2 border-red-500 rounded-full animate-ping opacity-10" />
          </div>

          <div className="space-y-6">
            <div>
              <label className="text-[10px] text-gray-500 uppercase font-mono tracking-widest">Simulated Object</label>
              <p className="text-xl font-bold text-white italic tracking-tight">{neo.name}</p>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white/5 p-3 rounded border border-white/10">
                <span className="block text-[9px] text-gray-500 uppercase font-bold text-red-400">Deflect Risk</span>
                <span className="text-lg font-black text-red-500">{deflectionDifficulty}/10</span>
              </div>
              <div className="bg-white/5 p-3 rounded border border-white/10">
                <span className="block text-[9px] text-gray-500 uppercase font-bold text-blue-400">Impact Window</span>
                <span className="text-lg font-black text-blue-500">{timeToImpactHours.toFixed(1)}h</span>
              </div>
            </div>

            <div className="p-4 bg-red-950/20 border border-red-900/50 rounded-lg">
              <h4 className="text-red-500 text-[10px] font-black uppercase mb-2 flex items-center gap-2">
                <AlertTriangle size={12} /> Predicted Consequence
              </h4>
              <p className="text-xs text-gray-400 font-mono leading-relaxed">
                {consequenceText}
              </p>
            </div>
          </div>
        </div>
        
        <div className="p-4 bg-black/40 border-t border-gray-900 flex justify-end gap-3">
            <button onClick={onClose} className="px-6 py-2 text-[10px] font-bold text-gray-500 uppercase tracking-widest hover:text-white">Abort</button>
            <button 
              onClick={handleDownloadTacticalData}
              className="px-6 py-2 bg-red-600 text-white text-[10px] font-black uppercase tracking-widest rounded hover:bg-red-500 shadow-lg shadow-red-900/20 transition-all"
            >
              Download Tactical Data
            </button>
        </div>
      </div>
    </div>
  );
};

// --- EMERGENCY ALERT BANNER ---
const AlertBanner = ({ highRiskCount }) => {
  if (highRiskCount === 0) return null;
  return (
    <div className="max-w-7xl mx-auto mb-6 animate-pulse">
      <div className="bg-red-600/10 border border-red-500/50 rounded-xl p-4 flex items-center justify-between shadow-[0_0_20px_rgba(239,68,68,0.15)]">
        <div className="flex items-center gap-4">
          <div className="bg-red-600 p-2 rounded-lg">
            <AlertTriangle className="text-white" size={20} />
          </div>
          <div>
            <h2 className="text-red-500 font-black text-sm uppercase tracking-tighter">Critical Threat Detected</h2>
            <p className="text-[10px] text-red-400/80 font-mono uppercase">
              {highRiskCount} Object(s) exceeding safety threshold. Automated defense protocols standby.
            </p>
          </div>
        </div>
        <div className="hidden md:flex items-center gap-2">
          <span className="text-[9px] font-mono text-red-500 font-bold bg-red-500/10 px-2 py-1 rounded border border-red-500/20">DEFCON 2</span>
          <Zap size={14} className="text-red-500 fill-red-500" />
        </div>
      </div>
    </div>
  );
};

// --- SECTOR RADAR MAP ---
const SectorMap = ({ data }) => {
  return (
    <div className="bg-[#0a0b14] border border-gray-800 p-5 rounded-xl h-[300px] relative overflow-hidden flex items-center justify-center">
      <div className="absolute inset-0 flex items-center justify-center opacity-20">
        <div className="absolute w-16 h-16 border border-blue-500 rounded-full"></div>
        <div className="absolute w-32 h-32 border border-blue-500 rounded-full"></div>
        <div className="absolute w-48 h-48 border border-blue-500 rounded-full"></div>
        <div className="absolute w-full h-[1px] bg-blue-500/30"></div>
        <div className="absolute h-full w-[1px] bg-blue-500/30"></div>
        <div className="absolute w-full h-full animate-spin-slow origin-center bg-gradient-to-tr from-blue-500/10 to-transparent rounded-full" style={{ animationDuration: '6s' }}></div>
      </div>
      <h3 className="absolute top-4 left-5 text-[10px] text-gray-500 uppercase tracking-[0.2em] font-mono flex items-center gap-2">
        <Crosshair size={14} className="text-blue-500" /> Sector Visualization
      </h3>
      <div className="relative w-48 h-48">
        {data.map((neo) => {
          const seed = neo.id.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
          const angle = (seed * 137.5) % 360; 
          const radius = (seed % 40) + 10;
          return (
            <div
              key={neo.id}
              className={`absolute w-1.5 h-1.5 rounded-full cursor-help transition-all duration-700 hover:scale-150 shadow-[0_0_8px] ${
                neo.riskScore >= 75 ? 'bg-red-500 shadow-red-500 animate-pulse' : 'bg-blue-500 shadow-blue-500'
              }`}
              style={{
                left: `calc(50% + ${Math.cos(angle) * radius}% - 0.75px)`,
                top: `calc(50% + ${Math.sin(angle) * radius}% - 0.75px)`,
              }}
              title={`${neo.name} | Risk: ${neo.riskScore}%`}
            />
          );
        })}
      </div>
    </div>
  );
};

// --- RISK ANALYSIS CHART ---
const RiskAnalysisChart = ({ data }) => {
  const chartData = [
    { name: 'Low Risk', value: data.filter(a => a.riskScore < 30).length, color: '#22c55e' },
    { name: 'Medium Risk', value: data.filter(a => a.riskScore >= 30 && a.riskScore < 70).length, color: '#eab308' },
    { name: 'High Threat', value: data.filter(a => a.riskScore >= 70).length, color: '#ef4444' },
  ].filter(item => item.value > 0);

  return (
    <div className="bg-[#0a0b14] border border-gray-800 p-5 rounded-xl h-[300px]">
      <h3 className="text-[10px] text-gray-500 uppercase tracking-[0.2em] font-mono mb-2 flex items-center gap-2">
        <BarChart3 size={14} className="text-blue-500" /> Threat Distribution
      </h3>
      <ResponsiveContainer width="100%" height="90%">
        <PieChart>
          <Pie data={chartData} innerRadius={60} outerRadius={80} paddingAngle={5} dataKey="value">
            {chartData.map((entry, index) => <Cell key={`cell-${index}`} fill={entry.color} stroke="none" />)}
          </Pie>
          <Tooltip contentStyle={{ backgroundColor: '#05060b', border: '1px solid #1f2937', borderRadius: '8px', fontSize: '10px' }} />
          <Legend iconType="circle" wrapperStyle={{ fontSize: '10px', paddingTop: '10px' }} />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

// --- COMPARISON TOOL + PHYSICS + PDF ---
const AsteroidComparison = ({ selected }) => {
  if (selected.length === 0) return (
    <div className="bg-[#0a0b14] border border-dashed border-gray-800 rounded-xl p-8 text-center">
      <ArrowLeftRight className="mx-auto text-gray-700 mb-2" size={32} />
      <p className="text-gray-500 font-mono text-[10px] uppercase tracking-widest">Select asteroids from cards to compare data</p>
    </div>
  );

  const getPhysicsData = (vStr, sStr) => {
    const v = parseFloat(vStr) || 0;
    const d = parseFloat(sStr) || 0;
    const radiusMeters = (d * 1000) / 2;
    const density = 2600; 
    const mass = (4/3) * Math.PI * Math.pow(radiusMeters, 3) * density;
    const joules = 0.5 * mass * Math.pow(v * 1000, 2);
    const megatons = joules / (4.184 * Math.pow(10, 15));
    const craterDiameter = 1.161 * Math.pow(megatons, 0.28) * (d < 0.1 ? 5 : 8); 
    const fireballRadius = 0.045 * Math.pow(megatons, 0.4);
    const forceNeeded = (mass * 0.01) / 3600; 
    return { megatons, craterDiameter, fireballRadius, forceNeeded };
  };

  const generateTacticalReport = () => {
    try {
      const doc = new jsPDF();
      const now = new Date().toLocaleString();
      doc.setFillColor(10, 11, 20);
      doc.rect(0, 0, 210, 40, 'F');
      doc.setTextColor(255, 255, 255);
      doc.setFontSize(22);
      doc.text("COSMICWATCH: TACTICAL BRIEFING", 15, 25);
      doc.setFontSize(8);
      doc.text(`GENERATED: ${now} | AUTH: SATELLITE_UPLINK_01`, 15, 32);

      const tableData = selected.map(neo => {
        const p = getPhysicsData(neo.velocity, neo.size);
        return [neo.name, neo.id, neo.velocity, neo.size, `${neo.riskScore}%`, `${p.megatons.toFixed(1)} MT`, `${p.craterDiameter.toFixed(2)} KM`, `${(p.forceNeeded / 1e6).toFixed(1)} MN` ];
      });

      autoTable(doc, {
        startY: 50,
        head: [['NAME', 'ID', 'VELOCITY', 'DIAMETER', 'RISK', 'YIELD', 'CRATER', 'DEFLECT']],
        body: tableData,
        theme: 'grid',
        headStyles: { fillColor: [59, 130, 246], textColor: 255, fontSize: 7 },
        bodyStyles: { fontSize: 7, font: 'courier' },
      });

      doc.save(`TACTICAL_REPORT_${selected[0].name.replace(/\s+/g, '_')}.pdf`);
    } catch (error) { console.error(error); }
  };

  return (
    <div className="bg-[#0a0b14] border border-blue-500/30 rounded-xl p-6 mb-8 overflow-x-auto shadow-[inset_0_0_20px_rgba(59,130,246,0.05)]">
      <div className="flex items-center justify-between mb-6">
        <div className="flex flex-col">
          <h3 className="text-blue-400 font-black text-sm uppercase tracking-widest flex items-center gap-2">
            <Globe size={18} /> Impact & Deflection Analysis Module
          </h3>
          <p className="text-[8px] text-gray-600 font-mono uppercase mt-1">Cross-referencing orbital dynamics & impact physics</p>
        </div>
        <button onClick={generateTacticalReport} className="flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-lg text-[10px] font-bold uppercase tracking-widest transition-all">
          <FileText size={14} /> Export Tactical PDF
        </button>
      </div>

      <table className="w-full text-left font-mono text-[11px] border-collapse">
        <thead>
          <tr className="text-gray-500 border-b border-gray-800">
            <th className="pb-4 font-normal">PARAMETER</th>
            {selected.map(neo => <th key={neo.id} className="pb-4 font-bold text-white text-center uppercase tracking-tighter">{neo.name}</th>)}
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-900/50">
          <tr>
            <td className="py-4 text-gray-500 uppercase">Velocity</td>
            {selected.map(neo => <td key={neo.id} className="py-4 text-center text-blue-400">{neo.velocity}</td>)}
          </tr>
          <tr>
            <td className="py-4 text-gray-500 uppercase">Diameter</td>
            {selected.map(neo => <td key={neo.id} className="py-4 text-center text-white">{neo.size}</td>)}
          </tr>
          <tr className="bg-yellow-500/5">
            <td className="py-4 text-yellow-500/80 font-bold flex items-center gap-2"><Zap size={12} /> Kinetic Yield</td>
            {selected.map(neo => (<td key={neo.id} className="py-4 text-center text-yellow-500 font-bold">{getPhysicsData(neo.velocity, neo.size).megatons.toLocaleString(undefined, { maximumFractionDigits: 1 })} MT</td>))}
          </tr>
          <tr className="bg-red-500/5">
            <td className="py-4 text-red-400 font-bold flex items-center gap-2"><Mountain size={12} /> Crater Diameter</td>
            {selected.map(neo => (<td key={neo.id} className="py-4 text-center text-red-500 font-bold">{getPhysicsData(neo.velocity, neo.size).craterDiameter.toLocaleString(undefined, { maximumFractionDigits: 2 })} KM</td>))}
          </tr>
          <tr className="bg-blue-500/5">
            <td className="py-4 text-blue-400 font-bold flex items-center gap-2"><Rocket size={12} /> Deflection Req.</td>
            {selected.map(neo => (<td key={neo.id} className="py-4 text-center"><div className="text-blue-400 font-bold">{(getPhysicsData(neo.velocity, neo.size).forceNeeded / 1e6).toLocaleString(undefined, { maximumFractionDigits: 1 })} MN</div></td>))}
          </tr>
        </tbody>
      </table>
      <div className="mt-4 flex items-center gap-2 text-[8px] text-gray-600 font-mono uppercase bg-black/40 p-2 rounded border border-gray-900">
        <Info size={12} className="text-blue-500" />
        Simulations based on kinetic yield $E_k = \frac{1}{2}mv^2$ and Holsapple crater scaling laws.
      </div>
    </div>
  );
};

// --- MAIN DASHBOARD COMPONENT ---
export default function Dashboard() {
  const router = useRouter();
  const [asteroids, setAsteroids] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [showOnlyThreats, setShowOnlyThreats] = useState(false);
  const [showOnlyWatchlist, setShowOnlyWatchlist] = useState(false);
  const [favorites, setFavorites] = useState([]);
  const [compareList, setCompareList] = useState([]); 
  const [simulatingNeo, setSimulatingNeo] = useState(null);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('watchlist') || '[]');
    setFavorites(saved);
    const fetchTelemetry = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get('http://localhost:5001/api/asteroids/feed', { headers: { Authorization: `Bearer ${token}` } });
        setAsteroids(res.data);
      } catch (err) { console.error("Uplink Error:", err); } finally { setLoading(false); }
    };
    fetchTelemetry();
  }, []);

  useEffect(() => { localStorage.setItem('watchlist', JSON.stringify(favorites)); }, [favorites]);

  const toggleFavorite = (id) => { setFavorites(prev => prev.includes(id) ? prev.filter(favId => favId !== id) : [...prev, id]); };

  const toggleCompare = (neo) => {
    setCompareList(prev => {
      const exists = prev.find(item => item.id === neo.id);
      if (exists) return prev.filter(item => item.id !== neo.id);
      return prev.length >= 3 ? [...prev.slice(1), neo] : [...prev, neo];
    });
  };

  const handleLogout = () => { localStorage.removeItem('token'); router.push('/login'); };

  const generateGlobalReport = () => {
    try {
      const doc = new jsPDF();
      doc.setFillColor(10, 11, 20); doc.rect(0, 0, 210, 40, 'F');
      doc.setTextColor(255, 255, 255); doc.setFontSize(22); doc.text("COSMICWATCH: GLOBAL SURVEILLANCE", 15, 25);
      const tableData = asteroids.map(neo => [neo.name, neo.id, neo.velocity, neo.size, neo.riskScore >= 75 ? 'CRITICAL' : 'MONITORED', `${neo.riskScore}%`]);
      autoTable(doc, { startY: 50, head: [['DESIGNATION', 'ID', 'VELOCITY', 'DIAMETER', 'STATUS', 'RISK INDEX']], body: tableData, theme: 'grid' });
      doc.save(`COSMICWATCH_GLOBAL_REPORT.pdf`);
    } catch (error) { alert("Failed to generate global report."); }
  };

  const filteredAsteroids = asteroids.filter((neo) => {
    const matchesSearch = neo.name.toLowerCase().includes(searchTerm.toLowerCase());
    let pass = matchesSearch;
    if (showOnlyThreats) pass = pass && neo.riskScore >= 75;
    if (showOnlyWatchlist) pass = pass && favorites.includes(neo.id);
    return pass;
  });

  const highRiskCount = asteroids.filter(a => a.riskScore >= 75).length;

  if (loading) return <div className="min-h-screen bg-[#05060b] flex items-center justify-center text-blue-500 font-mono animate-pulse tracking-[0.5em]">ESTABLISHING SATELLITE UPLINK...</div>;

  return (
    <div className="min-h-screen bg-[#05060b] text-gray-300 p-6 font-sans">
      <header className="max-w-7xl mx-auto mb-6 flex justify-between items-end border-b border-gray-900 pb-6">
        <div>
          <h1 className="text-3xl font-black text-white italic tracking-tighter">COSMIC<span className="text-blue-500">WATCH</span></h1>
          <p className="text-[10px] text-gray-500 uppercase tracking-[0.3em] font-mono mt-1">Real-Time Deep Space Surveillance</p>
        </div>
        <div className="flex gap-4 items-center">
          <button onClick={generateGlobalReport} className="flex items-center gap-2 bg-blue-600/20 border border-blue-500/40 text-blue-400 px-4 py-2 rounded-md hover:bg-blue-600 hover:text-white transition-all text-[10px] font-bold uppercase tracking-widest shadow-[0_0_15px_rgba(59,130,246,0.2)]">
            <FileDown size={14} /> Intelligence Report
          </button>
          <div className="hidden sm:flex bg-[#0a0b14] border border-gray-800 px-4 py-2 rounded-md items-center gap-2">
            <Radio size={14} className="text-green-500 animate-ping" />
            <span className="text-[10px] font-mono text-gray-400 tracking-wider">NASA_LINK: STABLE</span>
          </div>
          <button onClick={handleLogout} className="flex items-center gap-2 bg-red-950/20 border border-red-900/40 text-red-500 px-4 py-2 rounded-md hover:bg-red-600 transition-all text-[10px] font-bold uppercase tracking-widest">
            <LogOut size={14} /> Termination
          </button>
        </div>
      </header>

      <AlertBanner highRiskCount={highRiskCount} />

      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <RiskAnalysisChart data={asteroids} /> 
        <SectorMap data={filteredAsteroids} />
        <div className="lg:col-span-1 grid grid-cols-1 gap-6">
          <div className="bg-[#0a0b14] border border-gray-800 p-6 rounded-xl relative overflow-hidden group">
            <Activity className="absolute right-[-10px] bottom-[-10px] text-gray-800/20" size={120} />
            <span className="text-gray-500 text-[10px] uppercase font-mono tracking-widest mb-1">Total Detections</span>
            <span className="text-5xl font-black text-white">{asteroids.length}</span>
          </div>
          <div className={`bg-[#0a0b14] border p-6 rounded-xl relative overflow-hidden transition-all duration-500 ${highRiskCount > 0 ? 'border-red-500 border-l-4' : 'border-gray-800'}`}>
            <Target className="absolute right-[-10px] bottom-[-10px] text-gray-800/10" size={120} />
            <span className="text-gray-500 text-[10px] uppercase font-mono tracking-widest mb-1">Critical Hazards</span>
            <span className="text-5xl font-black text-white">{highRiskCount}</span>
          </div>
        </div>
      </div>

      <AsteroidComparison selected={compareList} />

      <div className="max-w-7xl mx-auto mb-8 flex flex-col md:flex-row gap-4">
        <div className="relative group flex-grow">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600" size={18} />
          <input type="text" placeholder="FILTER BY ASTEROID DESIGNATION..." className="w-full bg-[#0a0b14] border border-gray-800 rounded-xl py-4 pl-12 pr-4 text-xs font-mono tracking-widest text-white focus:outline-none focus:border-blue-500/50" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
        </div>
        <div className="flex gap-2">
            <button onClick={() => setShowOnlyThreats(!showOnlyThreats)} className={`px-4 py-4 rounded-xl border font-mono text-[9px] tracking-widest uppercase flex items-center gap-2 ${showOnlyThreats ? 'bg-red-600 border-red-500 text-white' : 'bg-[#0a0b14] border-gray-800 text-gray-500'}`}>
                <Filter size={12} /> {showOnlyThreats ? "THREATS ON" : "ALL THREATS"}
            </button>
            <button onClick={() => setShowOnlyWatchlist(!showOnlyWatchlist)} className={`px-4 py-4 rounded-xl border font-mono text-[9px] tracking-widest uppercase flex items-center gap-2 ${showOnlyWatchlist ? 'bg-yellow-600 border-yellow-500 text-white' : 'bg-[#0a0b14] border-gray-800 text-gray-500'}`}>
                <Star size={12} className={showOnlyWatchlist ? "fill-white" : ""} /> {showOnlyWatchlist ? "WATCHLIST ONLY" : "VIEW WATCHLIST"}
            </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pb-12">
        {filteredAsteroids.map((neo) => {
          const isComparing = compareList.some(item => item.id === neo.id);
          return (
            <div key={neo.id} className={`bg-[#0a0b14] border p-5 rounded-xl transition-all group relative overflow-hidden ${neo.riskScore >= 75 ? 'border-red-600 bg-red-950/5' : 'border-gray-800 hover:border-blue-500/50'} ${isComparing ? 'ring-2 ring-blue-500' : ''}`}>
              <div className="flex justify-between items-start mb-4 relative z-10">
                <div className="flex flex-col">
                    <h3 className="font-bold text-white tracking-tight">{neo.name}</h3>
                    <span className="text-[8px] text-gray-600 font-mono mt-1">ID: {neo.id}</span>
                </div>
                <div className="flex gap-2">
                    <button onClick={() => toggleCompare(neo)} className={`p-1 rounded ${isComparing ? 'bg-blue-600 text-white' : 'text-gray-700 hover:bg-gray-800'}`}><ArrowLeftRight size={14} /></button>
                    <button onClick={() => toggleFavorite(neo.id)} className={`transition-colors ${favorites.includes(neo.id) ? 'text-yellow-500' : 'text-gray-700 hover:text-yellow-500'}`}><Star size={18} fill={favorites.includes(neo.id) ? "currentColor" : "none"} /></button>
                    {neo.riskScore >= 75 ? <AlertCircle className="text-red-500 animate-pulse" size={18} /> : <Shield className="text-green-500" size={18} />}
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4 mb-6 text-[11px] font-mono uppercase text-gray-500">
                <div className="bg-black/20 p-2 rounded-lg"><p>Velocity</p><p className="text-white text-xs mt-1 font-bold">{neo.velocity}</p></div>
                <div className="bg-black/20 p-2 rounded-lg"><p>Diameter</p><p className="text-white text-xs mt-1 font-bold">{neo.size}</p></div>
              </div>
              <div className="pt-4 border-t border-gray-900 relative z-10">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-[9px] font-bold text-gray-600 uppercase">Risk Index</span>
                  <span className={`text-[10px] font-bold ${neo.riskScore >= 75 ? 'text-red-500' : 'text-blue-500'}`}>{neo.riskScore}%</span>
                </div>
                <div className="w-full bg-gray-950 h-1.5 rounded-full overflow-hidden mb-4">
                  <div className={`h-full ${neo.riskScore >= 75 ? 'bg-red-500' : 'bg-blue-500'}`} style={{ width: `${neo.riskScore}%` }} />
                </div>
                <button onClick={() => setSimulatingNeo(neo)} className="w-full border-2 border-red-600/30 text-red-500 py-3 rounded-xl text-[10px] font-black uppercase tracking-[0.2em] hover:bg-red-600 hover:text-white transition-all">
                  Run Impact Simulation
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {simulatingNeo && <ImpactSimulator neo={simulatingNeo} onClose={() => setSimulatingNeo(null)} />}
    </div>
  );
}
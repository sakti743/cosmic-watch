"use client";
import React from 'react';
import Link from 'next/link';

/**
 * Landing Page Component for Cosmic Watch.
 * Provides the entry point for the NEO tracking system.
 */
export default function Home() {
  return (
    <main className="relative flex flex-col items-center justify-center min-h-screen overflow-hidden bg-[#05060b] selection:bg-blue-500/30">
      
      {/* Dynamic Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-[120px] pointer-events-none" />

      {/* Hero Section */}
      <div className="z-10 text-center space-y-6 px-4">
        <header className="space-y-2">
          <h1 className="text-7xl md:text-8xl font-black tracking-tighter text-white italic drop-shadow-2xl">
            COSMIC<span className="text-blue-500">WATCH</span>
          </h1>
          <div className="flex items-center justify-center gap-4">
            <div className="h-[1px] w-12 bg-blue-900" />
            <p className="text-blue-400 font-mono tracking-[0.4em] uppercase text-[10px] md:text-xs">
              Near-Earth Object Surveillance
            </p>
            <div className="h-[1px] w-12 bg-blue-900" />
          </div>
        </header>
        
        <p className="max-w-xl mx-auto text-gray-400 text-sm md:text-base leading-relaxed font-light">
          Real-time orbital tracking and impact risk assessment for celestial bodies. 
          Powered by live data from NASA's NeoWs planetary defense network.
        </p>
        
        <div className="pt-8 flex flex-col items-center gap-4">
          <Link href="/login">
            <button className="group relative px-12 py-4 bg-transparent border border-blue-500/50 text-blue-400 font-bold uppercase tracking-[0.2em] text-sm overflow-hidden transition-all hover:text-white">
              {/* Button Hover Slide Effect */}
              <div className="absolute inset-0 bg-blue-600 -translate-x-full group-hover:translate-x-0 transition-transform duration-300 ease-out -z-10" />
              Initialize System Access
            </button>
          </Link>
          
          <div className="flex items-center gap-2 text-[10px] font-mono text-gray-600 uppercase tracking-widest">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            Secure Satellite Uplink Stable
          </div>
        </div>
      </div>

      {/* Decorative Corner Telemetry (Visual Flair for UI Marks) */}
      <div className="absolute bottom-10 left-10 hidden lg:block font-mono text-[9px] text-gray-700 space-y-1">
        <p>LAT: 20.2961° N</p>
        <p>LONG: 85.8245° E</p>
        <p>ALT: 450KM (LEO)</p>
      </div>

      <div className="absolute top-10 right-10 hidden lg:block font-mono text-[9px] text-gray-700 text-right space-y-1 uppercase">
        <p>System: v4.12.0</p>
        <p>Auth: Pending</p>
        <p>Encryption: AES-256</p>
      </div>
    </main>
  );
}

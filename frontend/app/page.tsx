"use client";
import React from 'react';
import Link from 'next/link';
import { motion } from "framer-motion";
import AnimatedHeading from './Others/AnimatedHeading';
import BackVideo from './Video/BackVideo'

/**
 * Landing Page Component for Cosmic Watch.
 * Provides the entry point for the NEO tracking system.
 */
export default function Home() {
  return (  
   

    <motion.main
  initial={{
    opacity: 0,
    scale: 0.96,
    filter: "blur(6px)",
    backgroundColor: "rgba(255,255,255,0.15)",
  }}
  animate={{
    opacity: 1,
    scale: 1,
    filter: "blur(0px)",
    backgroundColor: "rgba(255,255,255,0)",
  }}
  transition={{
    duration: 2,
    ease: [0.16, 1, 0.3, 1], // cinematic ease-out
  }}
  className="relative flex flex-col items-center justify-center min-h-screen overflow-hidden selection:bg-blue-500/30"
>

         <BackVideo/>
      {/* Dynamic Background Glow */}
      <div className="" />
         
      {/* Hero Section */}
      <div className="z-10 text-center space-y-6 px-4">
        <header className="space-y-2">
         <AnimatedHeading/>
          <div className="flex items-center justify-center gap-4">
            <div className="h-[1px] w-12 bg-blue-900" />
            <p className="text-blue-400 font-mono tracking-[0.4em] uppercase text-[10px] md:text-xs">
              Near-Earth Object Surveillance
            </p>
            <div className="h-[1px] w-12 bg-blue-900" />
          </div>
        </header>
        
    <p
  className="max-w-xl mx-auto text-gray-400 text-sm md:text-base
             leading-relaxed font-light
             opacity-0 animate-slide-up
             transition-transform duration-300 ease-out
             hover:-translate-y-2  mt-[2rem]"
  style={{ animationDelay: "0.15s" }}
>
  Real-time orbital tracking and impact risk assessment for celestial bodies. 
  Powered by live data from NASA's NeoWs planetary defense network.
</p>


        
        <div className="pt-8 flex flex-col items-center gap-4">
          <Link href="/login">
            <button className="group relative w-full py-4 px-4 border border-blue-200 color-blue-700 rounded-lg font-bold -mt-[1.2rem] overflow-hidden transition-all duration-300">
       <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-green-100 -translate-x-full group-hover:translate-x-0  transition-transform duration-300 ease-out"></div>

  <p className="relative z-10 transition-colors uppercase mt-4px text-blue-300 duration-300 group-hover:text-white">
    initialize sysytem access
  </p>
</button>
          </Link>
          
          <div className="flex items-center gap-2 text-[10px] font-mono text-gray-300 uppercase tracking-widest">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            Secure Satellite Uplink Stable
          </div>
        </div>
      </div>

      {/* Decorative Corner Telemetry (Visual Flair for UI Marks) */}
    <div
  className="absolute bottom-10 left-10 hidden lg:block
             font-mono text-[12px] text-gray-300 space-y-1
             opacity-0 animate-slide-up
             transition-transform duration-300 ease-out
             hover:-translate-y-2"
>
  <p>LAT: 20.2961° N</p>
  <p>LONG: 85.8245° E</p>
  <p>ALT: 450KM (LEO)</p>
</div>




  <div
  className="absolute top-10 right-10 hidden lg:block
             font-mono text-[12px] text-gray-300 text-right space-y-1 uppercase
             opacity-0 animate-slide-up
             transition-transform duration-300 ease-out
             hover:-translate-y-2"
  style={{ animationDelay: "0.2s" }}
>
  <p>System: v4.12.0</p>
  <p>Auth: Pending</p>
  <p>Encryption: AES-256</p>
</div>



    </motion.main>
  );
}

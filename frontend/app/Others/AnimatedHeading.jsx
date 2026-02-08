import React from 'react';
import { motion } from "framer-motion";
const title = "COSMICWATCH";

export default function AnimatedTitle() {
  return (
    <motion.h1
      className="text-7xl md:text-8xl font-black tracking-tighter italic drop-shadow-2xl"
      initial="hidden"
      animate="visible" delay={0.5}
      variants={{
        hidden: {},
        visible: {
          transition: {
            staggerChildren: 0.08,

          },
        },
      }}
    >
      {title.split("").map((char, index) => (
        <motion.span
          key={index}
          className={`inline-block ${
            char === "W" ? "text-blue-500" : "text-white"
          }`}
          variants={{
            hidden: {
              opacity: 0,
              y: -60,   // 👈 COMES FROM TOP
            },
            visible: {
              opacity: 1,
              y: 0,     // 👈 ORIGINAL POSITION
            },
          }}
          transition={{
            duration: 0.6,
            ease: "easeOut",
          }}
        >
          {char}
        </motion.span>
      ))}
    </motion.h1>
  );
}

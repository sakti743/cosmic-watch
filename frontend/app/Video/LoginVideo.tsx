"use client";
import React from "react";

export default function BackVideo() {
  return (
    <div className="absolute inset-0 -z-10 overflow-hidden">
      <video
        autoPlay
        loop
        muted
        playsInline
        className="w-full h-full object-cover"
      >
        <source src="Video2.mp4" type="video/mp4" />
      </video>

      {/* Dark overlay so text is readable */}
      <div className="absolute inset-0 bg-black/60" />
    </div>
  );
}

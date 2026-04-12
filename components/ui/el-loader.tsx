'use client';

import React from 'react';

export function ELLoader() {
  return (
    <div className="flex items-center justify-center w-full h-full">
      <style>{`
        @keyframes elPulse {
          0%, 100% {
            opacity: 1;
            transform: scale(1);
          }
          50% {
            opacity: 0.6;
            transform: scale(1.1);
          }
        }

        @keyframes elGradientShift {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }

        @keyframes elCharGlow {
          0%, 100% {
            text-shadow: 
              0 0 10px rgba(34, 211, 238, 0.5),
              0 0 20px rgba(59, 130, 246, 0.3),
              0 0 30px rgba(34, 211, 238, 0.2);
          }
          50% {
            text-shadow: 
              0 0 20px rgba(34, 211, 238, 0.8),
              0 0 40px rgba(59, 130, 246, 0.6),
              0 0 60px rgba(34, 211, 238, 0.4),
              0 0 80px rgba(168, 85, 247, 0.3);
          }
        }

        @keyframes elRotate {
          0%, 100% {
            transform: rotateY(0deg) rotateZ(0deg);
          }
          25% {
            transform: rotateY(10deg) rotateZ(-2deg);
          }
          50% {
            transform: rotateY(0deg) rotateZ(0deg);
          }
          75% {
            transform: rotateY(-10deg) rotateZ(2deg);
          }
        }

        .el-text {
          animation: 
            elPulse 2s ease-in-out infinite,
            elCharGlow 2.5s ease-in-out infinite,
            elRotate 4s ease-in-out infinite;
          font-weight: 900;
          letter-spacing: 0.15em;
        }

        .el-text-gradient {
          background: linear-gradient(135deg, 
            #06b6d4 0%, 
            #3b82f6 25%, 
            #a855f7 50%, 
            #ec4899 75%, 
            #06b6d4 100%);
          background-size: 300% 300%;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          animation: elGradientShift 4s ease infinite;
        }

        .el-dot {
          display: inline-block;
          width: 8px;
          height: 8px;
          border-radius: 50%;
          margin: 0 4px;
          background: linear-gradient(135deg, #06b6d4, #3b82f6);
          animation: elPulse 1.5s ease-in-out infinite;
        }

        .el-dot:nth-child(2) {
          animation-delay: 0.2s;
        }

        .el-dot:nth-child(3) {
          animation-delay: 0.4s;
        }

        .el-container {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 2rem;
        }

        .el-text-wrapper {
          perspective: 1000px;
        }

        .el-subtitle {
          font-size: 0.875rem;
          color: #94a3b8;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          animation: fadeInOut 2s ease-in-out infinite;
        }

        @keyframes fadeInOut {
          0%, 100% {
            opacity: 0.4;
          }
          50% {
            opacity: 1;
          }
        }
      `}</style>

      <div className="el-container">
        <div className="el-text-wrapper">
          <div className="el-text el-text-gradient text-7xl sm:text-8xl md:text-9xl">
            EL
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <div className="el-dot" />
          <div className="el-dot" />
          <div className="el-dot" />
        </div>

        <p className="el-subtitle">Building Your Marketplace</p>
      </div>
    </div>
  );
}

export function ELLoaderSmall() {
  return (
    <div className="flex items-center justify-center">
      <style>{`
        @keyframes smallElPulse {
          0%, 100% {
            opacity: 1;
            transform: scale(1);
          }
          50% {
            opacity: 0.6;
            transform: scale(1.05);
          }
        }

        .small-el-text {
          animation: smallElPulse 1.5s ease-in-out infinite;
          font-weight: 900;
          background: linear-gradient(135deg, #06b6d4, #3b82f6, #a855f7);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
      `}</style>

      <span className="small-el-text text-4xl sm:text-5xl font-black">EL</span>
    </div>
  );
}

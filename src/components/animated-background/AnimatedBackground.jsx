// components/AnimatedBackground.jsx
'use client';

import { motion } from 'framer-motion';

const AnimatedBackground = () => {
  // Floating elements animation variants
  const floatVariants = {
    animate: (custom) => ({
      y: [0, custom.yDistance, 0],
      x: [0, custom.xDistance, 0],
      rotate: [0, custom.rotate, 0],
      scale: [1, custom.scale, 1],
      transition: {
        duration: 15 + custom.delay,
        repeat: Infinity,
        ease: "easeInOut"
      }
    })
  };

  // Pulse animation variants
  const pulseVariants = {
    animate: {
      scale: [1, 1.2, 1],
      opacity: [0.3, 0.6, 0.3],
      transition: {
        duration: 8,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  // Subtle glow animation variants
  const glowVariants = {
    animate: (custom) => ({
      opacity: [0.2, 0.4, 0.2],
      transition: {
        duration: 10 + custom.delay,
        repeat: Infinity,
        ease: "easeInOut"
      }
    })
  };

  // Floating elements data
  const floatingElements = [
    { id: 1, size: 120, yDistance: 60, xDistance: 40, rotate: 5, scale: 1.1, delay: 0, xPos: '10%', yPos: '20%' },
    { id: 2, size: 160, yDistance: 80, xDistance: -60, rotate: -8, scale: 1.2, delay: 3, xPos: '85%', yPos: '70%' },
    { id: 3, size: 140, yDistance: 70, xDistance: 50, rotate: 10, scale: 1.15, delay: 6, xPos: '75%', yPos: '15%' },
  ];

  // Glow elements data
  const glowElements = [
    { id: 1, size: 200, delay: 0, xPos: '20%', yPos: '30%' },
    { id: 2, size: 180, delay: 4, xPos: '70%', yPos: '60%' },
    { id: 3, size: 220, delay: 8, xPos: '40%', yPos: '80%' },
  ];

  return (
    <div className="fixed inset-0 overflow-hidden -z-10 pointer-events-none">
      {/* Main container */}
      <div className="absolute inset-0">
        
        {/* Large floating elements with subtle gradients */}
        {floatingElements.map((element) => (
          <motion.div
            key={element.id}
            className="absolute rounded-lg filter blur-xl opacity-40 dark:opacity-20"
            style={{
              width: element.size,
              height: element.size,
              left: element.xPos,
              top: element.yPos,
              background: "radial-gradient(circle, rgba(120,119,198,0.3) 0%, rgba(255,255,255,0) 70%)",
            }}
            custom={{ 
              yDistance: element.yDistance, 
              xDistance: element.xDistance, 
              rotate: element.rotate,
              scale: element.scale,
              delay: element.delay 
            }}
            variants={floatVariants}
            animate="animate"
          />
        ))}
        
        {/* Subtle glow elements */}
        {glowElements.map((element) => (
          <motion.div
            key={element.id}
            className="absolute rounded-full filter blur-2xl"
            style={{
              width: element.size,
              height: element.size,
              left: element.xPos,
              top: element.yPos,
              background: "radial-gradient(circle, rgba(255,255,255,0.5) 0%, rgba(255,255,255,0) 70%)",
            }}
            custom={{ delay: element.delay }}
            variants={glowVariants}
            animate="animate"
          />
        ))}
        
        {/* Central pulse effect */}
        <motion.div
          className="absolute top-1/2 left-1/2 w-64 h-64 rounded-full filter blur-xl opacity-30 dark:opacity-15"
          style={{
            background: "radial-gradient(circle, rgba(255,255,255,0.6) 0%, rgba(255,255,255,0) 70%)",
            transform: "translate(-50%, -50%)"
          }}
          variants={pulseVariants}
          animate="animate"
        />
        
        {/* Subtle animated gradient overlay */}
        <motion.div 
          className="absolute inset-0 opacity-20 dark:opacity-10"
          animate={{
            background: [
              "linear-gradient(45deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0) 50%)",
              "linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0) 50%)",
              "linear-gradient(225deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0) 50%)",
              "linear-gradient(315deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0) 50%)",
              "linear-gradient(45deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0) 50%)",
            ]
          }}
          transition={{
            duration: 30,
            repeat: Infinity,
            ease: "linear"
          }}
        />

        {/* Subtle particles */}
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full opacity-40 dark:opacity-20"
            style={{
              width: 4 + (i % 3),
              height: 4 + (i % 3),
              background: "rgba(255, 255, 255, 0.8)",
              left: `${5 + (i * 7) % 90}%`,
              top: `${10 + (i * 11) % 80}%`,
              boxShadow: "0 0 8px rgba(255, 255, 255, 0.5)",
            }}
            animate={{
              y: [0, -20, 0],
              x: [0, i % 2 === 0 ? 10 : -10, 0],
              scale: [1, 1.3, 1],
              opacity: [0.4, 0.8, 0.4],
            }}
            transition={{
              duration: 5 + i,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.5,
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default AnimatedBackground;
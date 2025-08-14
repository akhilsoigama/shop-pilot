'use client'

import { motion } from 'framer-motion'
import { CircularProgress } from '@mui/material'

export default function LoadingLogo() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/90 backdrop-blur-sm dark:bg-gray-950">
      <motion.div
        initial={{ opacity: 0, scale: 0.6, rotate: -15 }}
        animate={{ 
          opacity: 1, 
          scale: 1, 
          rotate: 0,
        }}
        exit={{ 
          opacity: 0, 
          scale: 0.6, 
          rotate: 15,
          transition: { duration: 0.4 }
        }}
        transition={{ 
          duration: 0.8, 
          ease: [0.22, 1, 0.36, 1],
        }}
        className="relative w-40 h-40 flex items-center dark:bg-gray-950 justify-center" // Increased container size
      >
        {/* Glow Effect */}
        <motion.div
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.8, 1, 0.8],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute inset-0 rounded-full bg-primary-100/30  dark:bg-gray-950/20 blur-md"
        />

        <motion.div
          animate={{ rotate: 360 }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute"
          style={{ width: '90%', height: '90%' }} 
        >
          <CircularProgress
            size="100%"
            thickness={1.5}
            className="text-primary-500/30 dark:text-primary-400/30"
            variant="determinate"
            value={75}
          />
        </motion.div>

        <motion.div
          animate={{ rotate: -360 }}
          transition={{
            duration: 2.5,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute"
          style={{ width: '75%', height: '75%' }} 
        >
          <CircularProgress
            size="100%"
            thickness={1.5}
            className="text-primary-500/50 dark:text-primary-400/50"
            variant="determinate"
            value={50}
          />
        </motion.div>

        <motion.div
          animate={{
            scale: [1, 1.05, 1],
            opacity: [0.9, 1, 0.9],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute"
          style={{ width: '60%', height: '60%' }} 
        >
          <CircularProgress
            size="100%"
            thickness={3}
            className="text-primary-500 dark:text-primary-400"
          />
        </motion.div>

        <motion.img 
          src="/logo.png" 
          alt="Logo"
          initial={{ y: 0 }}
          animate={{ 
            y: [-4, 4, -4],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="w-24 h-24 z-10 drop-shadow-lg" 
          style={{ margin: '8%' }} 
        />
      </motion.div>
    </div>
  )
}
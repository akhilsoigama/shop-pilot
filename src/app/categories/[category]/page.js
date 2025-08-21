'use client'

import { Subcategories } from '@/lib/category'
import { useRouter, useParams } from 'next/navigation'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { Sparkles, ArrowRight, Zap, ChevronRight, Star } from 'lucide-react'
import { useEffect, useState } from 'react'

// Floating particles background
const FloatingParticles = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full"
          style={{
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            width: `${Math.random() * 8 + 2}px`,
            height: `${Math.random() * 8 + 2}px`,
            background: `radial-gradient(circle, 
              ${i % 4 === 0 ? 'rgba(59, 130, 246, 0.6)' : 
                i % 4 === 1 ? 'rgba(168, 85, 247, 0.6)' : 
                i % 4 === 2 ? 'rgba(236, 72, 153, 0.6)' :
                'rgba(34, 197, 94, 0.6)'})`,
            boxShadow: `0 0 ${Math.random() * 8 + 4}px ${
              i % 4 === 0 ? 'rgba(59, 130, 246, 0.8)' : 
              i % 4 === 1 ? 'rgba(168, 85, 247, 0.8)' : 
              i % 4 === 2 ? 'rgba(236, 72, 153, 0.8)' :
              'rgba(34, 197, 94, 0.8)'
            }`
          }}
          animate={{
            y: [0, -40, 0],
            x: [0, Math.random() * 30 - 15, 0],
            opacity: [0, 1, 0],
            scale: [0, 1, 0]
          }}
          transition={{
            duration: Math.random() * 6 + 4,
            repeat: Infinity,
            delay: Math.random() * 3
          }}
        />
      ))}
    </div>
  )
}

// Container animations
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
}

// Item animations
const itemVariants = {
  hidden: { 
    y: 20,
    opacity: 0,
    scale: 0.95
  },
  visible: {
    y: 0,
    opacity: 1,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 12
    }
  },
  hover: {
    y: -8,
    scale: 1.03,
    transition: {
      type: "spring",
      stiffness: 400,
      damping: 15
    }
  }
}

// Shimmer effect for images
const ShimmerEffect = () => {
  return (
    <motion.div 
      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent -skew-x-12"
      initial={{ x: "-100%" }}
      whileHover={{ x: "200%" }}
      transition={{ duration: 0.8, ease: "easeInOut" }}
    />
  )
}

export default function SubcategoryPage() {
  const router = useRouter()
  const { category } = useParams()
  const decodedCategory = decodeURIComponent(category)
  const subcatObj = Subcategories.find(sc => sc.name === decodedCategory)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Simulate loading delay for animations
    const timer = setTimeout(() => setIsLoading(false), 300)
    return () => clearTimeout(timer)
  }, [])

  if (!subcatObj) return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900"
    >
      <div className="text-center p-8 bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl rounded-2xl shadow-2xl border border-gray-200/30 dark:border-gray-700/30">
        <motion.div
          animate={{ 
            rotate: [0, 10, -10, 0],
            scale: [1, 1.1, 1]
          }}
          transition={{ duration: 0.5 }}
          className="text-6xl mb-4"
        >😢</motion.div>
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">Category Not Found</h2>
        <p className="text-gray-600 dark:text-gray-300">The requested category does not exist.</p>
      </div>
    </motion.div>
  )

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 p-4 md:p-8 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-blue-400/10 to-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-to-r from-pink-400/10 to-amber-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <FloatingParticles />
      </div>

      {/* Premium badge */}
      <motion.div 
        className="absolute top-6 right-6 z-10"
        initial={{ scale: 0, rotate: 180 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ type: "spring", delay: 0.5 }}
      >
        <div className="bg-gradient-to-r from-amber-500 to-orange-600 text-white text-xs font-bold py-2 px-4 rounded-full shadow-lg flex items-center gap-2 backdrop-blur-sm">
          <Star className="h-4 w-4 fill-current" />
          <span>PREMIUM COLLECTION</span>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-8 md:mb-12 relative"
      >
        <motion.div
          animate={{ 
            rotate: 360,
            scale: [1, 1.1, 1]
          }}
          transition={{ 
            rotate: { duration: 20, repeat: Infinity, ease: "linear" },
            scale: { duration: 2, repeat: Infinity }
          }}
          className="absolute -top-2 left-1/2 -translate-x-1/2 w-16 h-16 opacity-20"
        >
          <Sparkles className="w-full h-full text-blue-500" />
        </motion.div>
        
        <h1 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 mb-3">
          {decodedCategory}
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
          Explore our premium collection of {decodedCategory.toLowerCase()} categories
        </p>
      </motion.div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 max-w-7xl mx-auto"
      >
        {subcatObj.subcategories.map((subcat, index) => (
          <motion.button
            key={`${subcat.name}-${index}`}
            variants={itemVariants}
            whileHover="hover"
            whileTap={{ scale: 0.98 }}
            onClick={() =>
              router.push(
                `/categories/${encodeURIComponent(decodedCategory)}/${encodeURIComponent(subcat.name)}`
              )
            }
            className="group relative p-6 rounded-2xl transition-all bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl border border-gray-200/50 dark:border-gray-700/30 shadow-lg hover:shadow-2xl overflow-hidden"
          >
            {/* Background gradient on hover */}
            <motion.div 
              className="absolute inset-0 bg-gradient-to-br from-blue-50/50 to-purple-50/50 dark:from-blue-900/20 dark:to-purple-900/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
              initial={false}
            />
            
            {/* Shimmer effect */}
            <ShimmerEffect />
            
            {/* Animated border */}
            <motion.div 
              className="absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-blue-300/30 dark:group-hover:border-purple-500/30"
              initial={false}
              transition={{ duration: 0.3 }}
            />
            
            <div className="relative z-10 flex flex-col items-center">
              {/* Image container with floating animation */}
              <motion.div 
                className="relative w-20 h-20 mb-4 overflow-hidden"
                whileHover={{ 
                  y: -5,
                  transition: { type: "spring", stiffness: 400, damping: 10 }
                }}
              >
                <Image
                  src={subcat.imageUrl}
                  alt={subcat.name}
                  fill
                  className="object-contain transition-transform duration-500 group-hover:scale-110"
                  sizes="(max-width: 768px) 80px, 96px"
                />
                
                {/* Glow effect */}
                <motion.div 
                  className="absolute inset-0 bg-blue-500/10 rounded-full blur-md group-hover:bg-blue-500/20 transition-colors duration-500"
                  initial={false}
                />
              </motion.div>

              {/* Subcategory name */}
              <motion.span 
                className="text-lg font-semibold text-gray-800 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300 mb-2 text-center"
                initial={false}
              >
                {subcat.name}
              </motion.span>

              {/* Animated arrow */}
              <motion.div
                className="flex items-center text-sm text-blue-600 dark:text-blue-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                initial={false}
              >
                <span>Explore</span>
                <motion.div
                  animate={{ x: [0, 4, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  <ArrowRight className="h-4 w-4 ml-1" />
                </motion.div>
              </motion.div>
            </div>

            {/* Decorative corner elements */}
            <motion.div 
              className="absolute top-2 right-2 w-3 h-3 border-t-2 border-r-2 border-blue-400/50 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
              initial={false}
            />
            <motion.div 
              className="absolute bottom-2 left-2 w-3 h-3 border-b-2 border-l-2 border-purple-400/50 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
              initial={false}
            />
          </motion.button>
        ))}
      </motion.div>

      {/* Floating action button */}
      <motion.button
        className="fixed bottom-6 left-6 bg-gradient-to-r from-blue-500 to-purple-600 text-white p-4 rounded-full shadow-2xl z-10"
        whileHover={{ scale: 1.1, rotate: 5 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => router.push('/')}
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.8, type: "spring" }}
      >
        <ChevronRight className="h-6 w-6 rotate-180" />
      </motion.button>
    </div>
  )
}
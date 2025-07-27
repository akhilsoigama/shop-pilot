'use client'

import { motion, useScroll, useMotionValueEvent } from 'framer-motion'
import MenuIcon from '@mui/icons-material/Menu'
import { useState } from 'react'
import { categories } from '@/lib/category'

const Navbaar = () => {
  const [isScrolled, setIsScrolled] = useState(false)
  const { scrollY } = useScroll()

  useMotionValueEvent(scrollY, 'change', (latest) => {
    setIsScrolled(latest > 10)
  })

  return (
    <div
      className={`w-full fixed z-30 bg-gray-800 text-white shadow-md transition-all duration-300 ${
        isScrolled ? 'top-0' : 'top-20'
      }`}
    >
      <div className="relative px-4 md:px-8 py-3">
        <div className="flex items-center gap-3 overflow-x-auto scrollbar-hide">
          {/* All Categories Button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-1 whitespace-nowrap px-3 py-1 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-white"
          >
            <MenuIcon fontSize="small" />
            <span className="text-sm font-medium">All</span>
          </motion.button>

          {/* Category List */}
          {categories.map((category) => (
            <motion.button
              key={category}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-3 py-1 rounded-full text-sm font-medium whitespace-nowrap text-gray-300 hover:bg-gray-100 hover:text-gray-800 dark:hover:bg-gray-700"
            >
              {category}
            </motion.button>
          ))}
        </div>

        {/* Fade effect (right edge) */}
        <div className="absolute right-0 top-0 bottom-0 w-10 bg-gradient-to-l from-gray-800 to-transparent pointer-events-none" />
      </div>
    </div>
  )
}

export default Navbaar

'use client'
import { motion, useScroll, useMotionValueEvent } from 'framer-motion'
import MenuIcon from '@mui/icons-material/Menu'
import { useState } from 'react'

const categories = [
  'Electronics',
  'Fashion & Apparel',
  'Home & Kitchen',
  'Beauty & Personal Care',
  'Health & Wellness',
  'Sports & Outdoors',
  'Automotive',
  'Books & Stationery',
  'Toys & Games',
  'Baby Products',
  'Groceries & Gourmet',
  'Pet Supplies',
  'Office Supplies',
  'Jewelry & Accessories',
  'Footwear',
  'Tools & Hardware',
  'Furniture & Decor',
  'Mobile Phones & Accessories',
  'Laptops & Computers',
  'Watches & Wearables',
]

const Navbaar = () => {
  const [isScrolled, setIsScrolled] = useState(false)
  const { scrollY } = useScroll()

  useMotionValueEvent(scrollY, "change", (latest) => {
    if (latest > 10) {
      setIsScrolled(true)
    } else {
      setIsScrolled(false)
    }
  })

  return (
    <div className={`w-full bg-gray-800 shadow-sm scrollbar-hide fixed z-10 transition-all duration-300 ${isScrolled ? 'top-2' : 'top-20'}`}>
      <div className="relative px-4 py-3">
        <div className="flex items-center space-x-4 overflow-x-auto scrollbar-hide">
          {/* All Categories Button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center space-x-1 whitespace-nowrap px-3 py-1 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-white"
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
              className="px-3 py-1 rounded-full text-sm font-medium whitespace-nowrap text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              {category}
            </motion.button>
          ))}
        </div>

        {/* Fade effect for scroll indication */}
        <div className="absolute right-0 top-0 bottom-0 w-10 bg-gradient-to-l from-white dark:from-gray-800 to-transparent pointer-events-none" />
      </div>
    </div>
  )
}

export default Navbaar
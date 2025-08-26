'use client';
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { Input } from '@/components/ui/input';
import { Search, ArrowRight, Star, TrendingUp, Zap, Sparkles, Grid3X3 } from 'lucide-react';
import { categories, categoryImages } from '@/lib/category';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { useMediaQuery } from '@mui/material';

export default function CategoriesPage() {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState('');
  const [isVisible, setIsVisible] = useState(false);
  const [activeFilter, setActiveFilter] = useState('all');
  const isMobile = useMediaQuery('(max-width:768px)');
  const containerRef = useRef(null);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const filteredCategories = categories.filter(cat => 
    cat.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.07,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0, scale: 0.9 },
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
        duration: 0.3,
        ease: "easeOut"
      }
    },
    tap: {
      scale: 0.98
    }
  };

  const titleVariants = {
    hidden: { y: -30, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { 
        type: "spring", 
        stiffness: 120,
        delay: 0.1
      }
    }
  };

  const searchVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.5,
        delay: 0.3
      }
    }
  };

  const filterVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.05,
        delayChildren: 0.4
      }
    }
  };

  const filterItemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: { 
        type: "spring", 
        stiffness: 100 
      }
    }
  };

  // Popular categories for featured section
  const popularCategories = ['Electronics', 'Fashion', 'Home & Kitchen', 'Beauty'];

  return (
    <div className="min-h-screen pt-20 pb-10 px-4">
      <div className="max-w-7xl mx-auto">
        <motion.div
          variants={titleVariants}
          initial="hidden"
          animate="visible"
          className="mb-8 md:mb-10 text-center"
        >
          <motion.div 
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="inline-flex items-center justify-center mb-3 md:mb-4"
          >
            <div className="p-2 rounded-full bg-blue-100 dark:bg-blue-900/30 mr-2 md:mr-3">
              <Grid3X3 className="h-4 w-4 md:h-5 md:w-5 text-blue-600 dark:text-blue-400" />
            </div>
            <span className="text-xs md:text-sm font-medium text-blue-600 dark:text-blue-400">PRODUCT CATEGORIES</span>
          </motion.div>
          
          <motion.h1 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="text-3xl md:text-4xl lg:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 dark:from-blue-400 dark:via-purple-400 dark:to-pink-400"
          >
            Discover Our Categories
          </motion.h1>
          
          <motion.p 
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="mt-3 md:mt-4 text-base md:text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto"
          >
            Explore our extensive collection of products across various categories. Find exactly what you need with our intuitive filtering system.
          </motion.p>
        </motion.div>

        {/* Animated Search Bar */}
        <motion.div
          variants={searchVariants}
          initial="hidden"
          animate="visible"
          className="mb-6 md:mb-8 max-w-2xl mx-auto"
        >
          <div className="relative">
            <motion.div
              animate={{ 
                rotate: [0, -5, 0],
                transition: { 
                  repeat: Infinity, 
                  repeatDelay: 3,
                  duration: 1.5 
                } 
              }}
            >
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 md:h-5 md:w-5 text-gray-400 z-10" />
            </motion.div>
            <Input
              type="text"
              placeholder="Search categories..."
              className="pl-10 md:pl-12 py-4 md:py-6 rounded-xl md:rounded-2xl shadow-md border-0 text-base md:text-lg focus-visible:ring-2 focus-visible:ring-blue-500/50"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </motion.div>

        {/* Filter Tabs */}
        <motion.div
          variants={filterVariants}
          initial="hidden"
          animate="visible"
          className="flex justify-center mb-6 md:mb-8"
        >
          <div className="inline-flex border-1 p-2 rounded-lg md:rounded-xl">
            {['all', 'popular', 'trending', 'new'].map((filter, index) => (
              <motion.button
                key={filter}
                variants={filterItemVariants}
                className={`px-3 py-1.5 md:px-4 md:py-2 rounded-lg md:rounded-xl text-xs md:text-sm font-medium capitalize flex items-center transition-all ${
                  activeFilter === filter 
                    ? 'bg-white dark:bg-gray-800 text-blue-600 dark:text-blue-400 shadow-sm' 
                    : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                }`}
                onClick={() => setActiveFilter(filter)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {filter === 'popular' && <Star className="h-3 w-3 md:h-4 md:w-4 mr-1" />}
                {filter === 'trending' && <TrendingUp className="h-3 w-3 md:h-4 md:w-4 mr-1" />}
                {filter === 'new' && <Zap className="h-3 w-3 md:h-4 md:w-4 mr-1" />}
                {filter}
              </motion.button>
            ))}
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mb-8 md:mb-10"
        >
          <div className="flex items-center mb-4 md:mb-6">
            <div className="h-6 w-1 bg-blue-600 rounded-full mr-2 md:mr-3"></div>
            <h2 className="text-xl md:text-2xl font-bold text-gray-800 dark:text-white">Featured Categories</h2>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
            {popularCategories.map((cat, index) => (
              <motion.div
                key={cat}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 + index * 0.1 }}
                whileHover={{ 
                  y: -5,
                  transition: { duration: 0.2 }
                }}
              >
                <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-900/25 dark:to-gray-950/25 border-0 overflow-hidden cursor-pointer group h-full"
                  onClick={() => router.push(`/categories/${encodeURIComponent(cat)}`)}
                >
                  <CardHeader className="pb-2 p-4 md:p-5">
                    <div className="flex justify-between items-start">
                      <CardTitle className="text-base md:text-lg font-semibold text-gray-800 dark:text-white">{cat}</CardTitle>
                      <motion.div
                        initial={{ rotate: 0 }}
                        whileHover={{ rotate: 90 }}
                        transition={{ duration: 0.3 }}
                      >
                        <Sparkles className="h-4 w-4 md:h-5 md:w-5 text-blue-500" />
                      </motion.div>
                    </div>
                  </CardHeader>
                  <CardContent className="p-4 md:p-5 pt-0">
                    <motion.div 
                      className="text-xs md:text-sm text-gray-600 dark:text-gray-400 mb-2 md:mb-3"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.7 + index * 0.1 }}
                    >
                      Explore latest products
                    </motion.div>
                    <Button 
                      size="sm" 
                      variant="ghost" 
                      className="p-0 text-blue-600 dark:text-blue-400 flex items-center gap-1 group-hover:gap-2 transition-all text-xs md:text-sm"
                    >
                      Shop now <ArrowRight className="h-3 w-3 md:h-4 md:w-4" />
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* All Categories Section */}
        <div className="flex items-center mb-4 md:mb-6">
          <div className="h-6 w-1 bg-purple-600 rounded-full mr-2 md:mr-3"></div>
          <h2 className="text-xl md:text-2xl font-bold text-gray-800 dark:text-white">All Categories</h2>
        </div>

        {/* Mobile/Tablet Horizontal Scroll View */}
        {isMobile ? (
          <ScrollArea className="w-full whitespace-nowrap mb-6" ref={containerRef}>
            <motion.div 
              className="flex space-x-4 pb-4"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {filteredCategories.map((cat, index) => (
                <motion.div 
                  key={cat}
                  variants={itemVariants}
                  className="flex-shrink-0 w-40 md:w-48"
                  whileHover="hover"
                  whileTap="tap"
                >
                  <Card 
                    className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-900/25 dark:to-gray-950/25 h-full flex flex-col cursor-pointer border-0 shadow-md overflow-hidden group"
                    onClick={() => router.push(`/categories/${encodeURIComponent(cat)}`)}
                  >
                    <div className="relative h-32 md:h-40 overflow-hidden">
                      <Image
                        src={categoryImages[cat] || '/placeholder.jpg'}
                        alt={cat}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-500"
                        sizes="(max-width: 640px) 100vw, 20vw"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                      <motion.div 
                        className="absolute top-2 right-2 bg-white/90 dark:bg-gray-800/90 rounded-full p-1 md:p-1.5"
                        whileHover={{ scale: 1.1, rotate: 5 }}
                      >
                        <Sparkles className="h-3 w-3 md:h-4 md:w-4 text-blue-600 dark:text-blue-400" />
                      </motion.div>
                    </div>
                    <CardHeader className="p-3 md:p-4 pb-1 md:pb-2">
                      <CardTitle className="text-sm md:text-base font-semibold line-clamp-2 text-gray-800 dark:text-white">
                        {cat}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="p-3 md:p-4 pt-0 mt-auto">
                      <motion.div
                        whileHover={{ x: 3 }}
                        transition={{ type: "spring", stiffness: 400 }}
                      >
                        <Button 
                          size="sm" 
                          variant="ghost" 
                          className="text-xs p-0 h-auto flex items-center gap-1 text-blue-600 dark:text-blue-400"
                        >
                          Explore <ArrowRight className="h-3 w-3" />
                        </Button>
                      </motion.div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
            <ScrollBar orientation="horizontal" />
          </ScrollArea>
        ) : (
          <motion.div 
            className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            ref={containerRef}
          >
            <AnimatePresence>
              {filteredCategories.map((cat, index) => (
                <motion.div 
                  key={cat}
                  variants={itemVariants}
                  whileHover="hover"
                  whileTap="tap"
                  layout
                >
                  <Card 
                    className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-900/25 dark:to-gray-950/25 h-full flex flex-col cursor-pointer border-0 shadow-lg overflow-hidden group"
                    onClick={() => router.push(`/categories/${encodeURIComponent(cat)}`)}
                  >
                    <div className="relative h-40 sm:h-48 md:h-52 overflow-hidden">
                      <Image
                        src={categoryImages[cat] || '/placeholder.jpg'}
                        alt={cat}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-700"
                        sizes="(max-width: 1024px) 50vw, 20vw"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                      <motion.div 
                        className="absolute top-2 right-2 bg-white/90 dark:bg-gray-800/90 rounded-full p-1.5 md:p-2 shadow-md"
                        whileHover={{ scale: 1.1, rotate: 5 }}
                      >
                        <Sparkles className="h-3 w-3 md:h-4 md:w-4 text-blue-600 dark:text-blue-400" />
                      </motion.div>
                    </div>
                    <CardHeader className="p-2 md:p-2 pb-1 md:pb-2">
                      <CardTitle className="text-sm md:text-base font-semibold line-clamp-2 text-gray-800 dark:text-white">
                        {cat}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="p-2 md:p-2 pt-0 ">
                      <motion.div
                        whileHover={{ x: 5 }}
                        transition={{ type: "spring", stiffness: 400 }}
                      >
                        <Button 
                          size="sm" 
                          variant="ghost" 
                          className="p-0 flex items-center gap-1 text-blue-600 dark:text-blue-400 group-hover:gap-2 transition-all text-xs md:text-sm"
                        >
                          Discover <ArrowRight className="h-3 w-3 md:h-4 md:w-4" />
                        </Button>
                      </motion.div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        )}

        {/* Empty State */}
        {filteredCategories.length === 0 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-12 md:py-16"
          >
            <motion.div
              animate={{ 
                rotate: [0, 5, -5, 0],
                transition: { duration: 2, repeat: Infinity, repeatDelay: 2 } 
              }}
              className="bg-gray-200 dark:bg-gray-800 border-2 border-dashed rounded-xl w-16 h-16 md:w-20 md:h-20 mx-auto flex items-center justify-center"
            >
              <Search className="h-8 w-8 md:h-10 md:w-10 text-gray-400" />
            </motion.div>
            <h3 className="mt-4 md:mt-6 text-lg md:text-xl font-semibold text-gray-800 dark:text-white">No categories found</h3>
            <p className="mt-1 md:mt-2 text-sm md:text-base text-gray-500 dark:text-gray-400">
              Try adjusting your search term or explore our featured categories
            </p>
            <Button 
              className="mt-3 md:mt-4 text-sm"
              onClick={() => setSearchTerm('')}
              variant="outline"
              size="sm"
            >
              Clear search
            </Button>
          </motion.div>
        )}
      </div>
    </div>
  );
}
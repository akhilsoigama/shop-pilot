'use client';
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { Input } from '@/components/ui/input';
import { Search, ArrowRight } from 'lucide-react';
import { categories, categoryImages } from '@/lib/category';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

export default function CategoriesPage() {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState('');
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const filteredCategories = categories.filter(cat => 
    cat.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.05,
        delayChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { 
        type: "spring", 
        stiffness: 120 
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-950 pt-20 pb-10 px-4">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.4 }}
          className="mb-8 text-center"
        >
          <h1 className="text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400">
            Browse Categories
          </h1>
          <p className="mt-2 text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Explore our wide range of product categories to find exactly what you need
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-8 max-w-xl mx-auto"
        >
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              type="text"
              placeholder="Search categories..."
              className="pl-10 py-5 rounded-xl shadow-sm"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </motion.div>

        {/* Mobile/Tablet Horizontal Scroll View */}
        {isMobile ? (
          <ScrollArea className="w-full whitespace-nowrap mb-6">
            <motion.div 
              className="flex space-x-4 pb-4"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {filteredCategories.map((cat) => (
                <motion.div 
                  key={cat}
                  variants={itemVariants}
                  className="flex-shrink-0 w-40"
                >
                  <Card 
                    className="h-full flex flex-col cursor-pointer hover:shadow-lg transition-shadow"
                    onClick={() => router.push(`/categories/${encodeURIComponent(cat)}`)}
                  >
                    <div className="relative h-32">
                      <Image
                        src={categoryImages[cat] || '/placeholder.jpg'}
                        alt={cat}
                        fill
                        className="object-cover rounded-t-lg"
                        sizes="(max-width: 640px) 100vw, 20vw"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    </div>
                    <CardHeader className="p-3">
                      <CardTitle className="text-sm font-medium line-clamp-2">
                        {cat}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="p-3 pt-0 mt-auto">
                      <Button 
                        size="sm" 
                        variant="ghost" 
                        className="text-xs p-0 h-auto flex items-center gap-1"
                      >
                        View products <ArrowRight className="h-3 w-3" />
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
            <ScrollBar orientation="horizontal" className="hidden" />
          </ScrollArea>
        ) : (
          /* Desktop Grid View */
          <motion.div 
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {filteredCategories.map((cat) => (
              <motion.div 
                key={cat}
                variants={itemVariants}
                whileHover={{ y: -5 }}
              >
                <Card 
                  className="h-full flex flex-col cursor-pointer hover:shadow-lg transition-shadow"
                  onClick={() => router.push(`/categories/${encodeURIComponent(cat)}`)}
                >
                  <div className="relative h-48">
                    <Image
                      src={categoryImages[cat] || '/placeholder.jpg'}
                      alt={cat}
                      fill
                      className="object-cover rounded-t-lg"
                      sizes="(max-width: 1024px) 50vw, 20vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  </div>
                  <CardHeader className="p-4">
                    <CardTitle className="font-semibold line-clamp-2">
                      {cat}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-4 pt-0 mt-auto">
                    <Button 
                      size="sm" 
                      variant="ghost" 
                      className="p-0 flex items-center gap-1"
                    >
                      Explore products <ArrowRight className="h-4 w-4" />
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        )}

        {filteredCategories.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <div className="bg-gray-200 dark:bg-gray-800 border-2 border-dashed rounded-xl w-16 h-16 mx-auto" />
            <h3 className="mt-4 text-xl font-semibold">No categories found</h3>
            <p className="mt-2 text-gray-500 dark:text-gray-400">
              Try adjusting your search term
            </p>
          </motion.div>
        )}
      </div>
    </div>
  );
}
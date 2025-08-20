'use client'
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { Heart, Search, X, Star, Zap } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import Link from "next/link";

export default function Subcategory({
  products,
  isLoading,
  isError,
  searchQuery,
  setSearchQuery,
  activeFilters,
  priceRange,
  minPrice,
  maxPrice,
  decodedSubcategory,
  onViewProduct,
  hoveredProduct,
  setHoveredProduct,
  onClearAll,
  category,
  subcategory
}) {
  const noProductsFound = products && products.length === 0 &&
    (searchQuery.trim() !== '' || Object.keys(activeFilters).length > 0 ||
      priceRange[0] !== minPrice || priceRange[1] !== maxPrice);

  if (isLoading) return (
    <div className="p-4 md:p-6 lg:p-8 bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-950 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col items-center mb-8">
          <Skeleton className="h-8 w-64 rounded-full" />
          <Skeleton className="h-4 w-48 mt-2 rounded-full" />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
            >
              <Card className="rounded-2xl overflow-hidden h-[380px]">
                <Skeleton className="w-full h-48 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800/30 dark:to-gray-900/50" />
                <CardContent className="p-4 space-y-3">
                  <Skeleton className="h-5 w-3/4 bg-gray-100 dark:bg-gray-800 rounded-full" />
                  <Skeleton className="h-4 w-1/2 bg-gray-100 dark:bg-gray-800 rounded-full" />
                  <div className="flex justify-between items-center pt-2">
                    <Skeleton className="h-6 w-16 bg-gray-100 dark:bg-gray-800 rounded-full" />
                    <Skeleton className="h-9 w-24 bg-gray-100 dark:bg-gray-800 rounded-lg" />
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );

  if (isError) return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex flex-col items-center justify-center min-h-[60vh] p-6 text-center bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-950"
    >
      <div className="relative mb-6">
        <X className="h-16 w-16 text-red-500/90 mx-auto" />
        <motion.div
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="absolute inset-0 rounded-full bg-red-100/30 dark:bg-red-900/20"
        />
      </div>
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
        Error loading products
      </h2>
      <p className="text-gray-600 dark:text-gray-400 max-w-md">
        We encountered an issue while loading products. Please refresh the page or try again later.
      </p>
      <Button
        variant="outline"
        className="mt-4 px-6 py-2 rounded-full border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800"
        onClick={() => window.location.reload()}
      >
        Retry
      </Button>
    </motion.div>
  );

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-950 min-h-screen flex-1"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-16">
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="mb-8 md:mb-12 lg:mb-16 text-center"
        >
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-2">
            {decodedSubcategory}
          </h1>
          <p className="text-gray-500 dark:text-gray-400 max-w-2xl mx-auto">
            Discover our premium collection of {decodedSubcategory.toLowerCase()} products
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-6 max-w-2xl mx-auto"
        >
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder={`Search ${decodedSubcategory.toLowerCase()}...`}
              className="block w-full pl-12 pr-4 py-3 border-0 rounded-full bg-white dark:bg-gray-800 shadow-md text-gray-900 dark:text-white placeholder-gray-400 focus:ring-2 focus:ring-primary/50 focus:outline-none transition-all duration-300"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          {noProductsFound && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              className="mt-4 flex flex-col items-center justify-center bg-white dark:bg-gray-900 rounded-xl p-6 border border-gray-200 dark:border-gray-800 shadow-sm"
            >
              <div className="flex flex-col items-center text-center">
                <Search className="h-8 w-8 text-gray-400 mb-3" />
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                  No products found
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  {searchQuery.trim() !== ''
                    ? `No products match your search for "${searchQuery}"`
                    : 'No products match your current filters'}
                </p>
                <Button
                  variant="default"
                  size="sm"
                  onClick={onClearAll}
                  className="flex items-center gap-2"
                >
                  <X className="h-4 w-4" />
                  Clear all filters
                </Button>
              </div>
            </motion.div>
          )}
        </motion.div>

        <div className="flex-1">
          {products && products.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {products.map((product) => (
                <motion.div
                  key={product._id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4 }}
                  whileHover={{
                    y: -5,
                    transition: { type: "spring", stiffness: 300, damping: 15 }
                  }}
                  className="relative"
                >
                  <Card className="relative rounded-2xl overflow-hidden h-full flex flex-col bg-white dark:bg-gray-900 border border-gray-200/50 dark:border-gray-800/50 shadow-md hover:shadow-lg transition-all duration-300 group">
                    <div className="relative w-full h-48 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800/30 dark:to-gray-900/50 overflow-hidden">
                      <motion.div
                        className="absolute inset-0 flex items-center justify-center p-4"
                        whileHover={{ scale: 1.03 }}
                      >
                        <Image
                          src={product.productImage?.[0] || '/placeholder-product.jpg'}
                          alt={product.productName}
                          fill
                          className="object-contain w-full h-full transition-transform duration-300 group-hover:scale-105"
                          sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, (max-width: 1024px) 25vw, 20vw"
                          priority={products.indexOf(product) < 8}
                        />
                      </motion.div>

                      {product.discount > 20 && (
                        <motion.div
                          className="absolute top-3 right-3 z-10"
                          initial={{ scale: 0.8, rotate: -15 }}
                          animate={{ scale: 1, rotate: 12 }}
                          transition={{ type: 'spring', stiffness: 500 }}
                        >
                          <Badge
                            variant="destructive"
                            className="px-2.5 py-1 text-[8px] font-bold shadow-md"
                          >
                            {product.discount > 40 ? (
                              <div className="flex items-center gap-1">
                                <Zap className="h-3 w-3 fill-current" />
                                <span>MEGA DEAL</span>
                              </div>
                            ) : 'HOT DEAL'}
                          </Badge>
                        </motion.div>
                      )}

                      {product.rating >= 4 && (
                        <div className="absolute bottom-3 left-3 z-10">
                          <Badge className="bg-amber-500/90 text-white flex items-center gap-1 text-xs px-2.5 py-1 backdrop-blur-sm">
                            <Star className="h-3 w-3 fill-current" />
                            <span>{product.rating.toFixed(1)}</span>
                          </Badge>
                        </div>
                      )}

                      <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-black/0 to-black/0" />
                    </div>

                    <CardContent className="p-4 flex flex-col gap-2 flex-grow">
                      <div className="space-y-1">
                        <h2 className="font-semibold text-base leading-tight line-clamp-2 text-gray-900 dark:text-white group-hover:text-primary transition-colors">
                          {product.productName}
                        </h2>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          {product.brand}
                        </p>
                      </div>

                      <div className="mt-auto pt-2">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-baseline gap-1">
                            <p className="font-bold text-primary">
                              ₹{product.discountPrice.toLocaleString()}
                            </p>
                            <p className="line-through text-gray-500 dark:text-gray-400 text-xs">
                              ₹{product.price.toLocaleString()}
                            </p>
                          </div>
                          <Badge className="text-xs px-2 py-0.5 bg-primary/90">
                            {product.discount}% OFF
                          </Badge>
                        </div>

                        <Link href={`/categories/${category}/${subcategory}/${product._id}`}>
                          <Button
                            size="sm"
                            className="w-full py-2 text-sm bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary"
                          >
                            View Details
                          </Button>
                        </Link>
                      </div>
                    </CardContent>

                    {product.isNew && (
                      <div className="absolute top-0 left-0 w-28 h-7 overflow-hidden">
                        <div className="absolute -left-8 top-1 w-36 bg-gradient-to-r from-primary to-primary/80 rotate-45 text-center text-[10px] text-white font-bold py-1">
                          NEW ARRIVAL
                        </div>
                      </div>
                    )}

                    <motion.button
                      className="absolute top-3 left-3 z-10 p-2 rounded-full bg-white/80 dark:bg-gray-800/80 backdrop-blur-md border border-gray-200 dark:border-gray-600 shadow-sm hover:bg-red-50 dark:hover:bg-red-900/30 transition-colors"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onMouseEnter={() => setHoveredProduct(product._id)}
                      onMouseLeave={() => setHoveredProduct(null)}
                    >
                      <Heart
                        className={cn(
                          "w-4 h-4 transition-colors",
                          hoveredProduct === product._id ? "text-red-500 fill-red-500" : "text-gray-400 hover:text-red-500"
                        )}
                      />
                    </motion.button>
                  </Card>
                </motion.div>
              ))}
            </div>
          ) : null}
        </div>
      </div>
    </motion.section>
  );
}
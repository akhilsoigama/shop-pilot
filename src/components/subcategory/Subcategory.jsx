'use client'
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { Heart, Search, X, Star, Zap, SortAsc, Grid, List, ChevronLeft, ChevronRight, Trash2, Sparkles, Filter, Eye } from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { useState, useMemo, useEffect } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useWishlist } from "@/context/wishlistContext";
import { toast } from "sonner";
import LikeButton from "../like-count/LikeCount";

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
  subcategory,
  user 
}) {
  const [viewMode, setViewMode] = useState('grid');
  const [sortBy, setSortBy] = useState('recommended');
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage, setProductsPerPage] = useState(12);
  const [isScrolled, setIsScrolled] = useState(false);
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();

  const noProductsFound = products && products.length === 0 &&
    (searchQuery.trim() !== '' || Object.keys(activeFilters).length > 0 ||
      priceRange[0] !== minPrice || priceRange[1] !== maxPrice);

  const decodedCategory = decodeURIComponent(category);

  // Scroll detection for header styling
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const sortedProducts = useMemo(() => {
    if (!products) return [];

    let sorted = [...products];

    switch (sortBy) {
      case 'newest':
        sorted.sort((a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0));
        break;
      case 'price-low':
        sorted.sort((a, b) => (a.discountPrice || a.price) - (b.discountPrice || b.price));
        break;
      case 'price-high':
        sorted.sort((a, b) => (b.discountPrice || b.price) - (a.discountPrice || a.price));
        break;
      case 'popularity':
        sorted.sort((a, b) => (b.popularity || 0) - (a.popularity || 0));
        break;
      case 'recommended':
      default:
        break;
    }

    return sorted;
  }, [products, sortBy]);

  // Pagination logic
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = sortedProducts.slice(indexOfFirstProduct, indexOfLastProduct);
  const totalPages = Math.ceil(sortedProducts.length / productsPerPage);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };
  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // Handle products per page change
  const handleProductsPerPageChange = (value) => {
    const newProductsPerPage = parseInt(value);
    setProductsPerPage(newProductsPerPage);
    setCurrentPage(1);
  };

  // Generate page numbers for pagination
  const pageNumbers = [];
  const maxVisiblePages = 5;

  if (totalPages <= maxVisiblePages) {
    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(i);
    }
  } else {
    if (currentPage <= 3) {
      for (let i = 1; i <= 4; i++) {
        pageNumbers.push(i);
      }
      pageNumbers.push('...');
      pageNumbers.push(totalPages);
    } else if (currentPage >= totalPages - 2) {
      pageNumbers.push(1);
      pageNumbers.push('...');
      for (let i = totalPages - 3; i <= totalPages; i++) {
        pageNumbers.push(i);
      }
    } else {
      pageNumbers.push(1);
      pageNumbers.push('...');
      for (let i = currentPage - 1; i <= currentPage + 1; i++) {
        pageNumbers.push(i);
      }
      pageNumbers.push('...');
      pageNumbers.push(totalPages);
    }
  }

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05
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
        stiffness: 100
      }
    }
  };

  const shimmerVariants = {
    initial: { x: "-100%" },
    animate: {
      x: "100%",
      transition: {
        duration: 1.5,
        repeat: Infinity,
        repeatType: "loop"
      }
    }
  };

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="bg-gradient-to-br from-slate-50 via-white to-indigo-50/30 dark:from-gray-900 dark:via-gray-950 dark:to-indigo-950/20 min-h-screen flex-1"
    >
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute -top-40 -right-32 w-80 h-80 bg-purple-300/10 rounded-full blur-3xl"></div>
        <div className="absolute top-1/3 -left-32 w-96 h-96 bg-blue-300/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-1/3 w-80 h-80 bg-pink-300/10 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-3 py-6 lg:py-5">
        {/* Breadcrumb */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center text-sm text-gray-500 dark:text-gray-400 mb-4 lg:mb-6 overflow-x-auto whitespace-nowrap py-2"
        >
          <Link href="/" className="hover:text-primary transition-colors flex items-center">
            Home
          </Link>
          <span className="mx-2 text-gray-300 dark:text-gray-600">/</span>
          <Link href={`/categories/${decodedCategory}`} className="hover:text-primary capitalize transition-colors flex items-center">
            {decodedCategory}
          </Link>
          <span className="mx-2 text-gray-300 dark:text-gray-600">/</span>
          <span className="text-gray-900 dark:text-white capitalize font-medium flex items-center">
            {decodedSubcategory}
          </span>
        </motion.div>

        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="mb-8 lg:mb-12 text-center relative py-6 lg:py-8 rounded-2xl bg-gradient-to-r from-blue-50/70 to-purple-50/70 dark:from-gray-900/50 dark:to-gray-800/50 backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/30 overflow-hidden"
        >
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute -top-20 -left-20 w-40 h-40 bg-primary/5 rounded-full blur-xl animate-pulse"></div>
            <div className="absolute -bottom-20 -right-20 w-40 h-40 bg-purple-500/5 rounded-full blur-xl animate-pulse delay-1000"></div>
            <div className="absolute top-1/2 left-1/4 w-24 h-24 bg-blue-400/10 rounded-full blur-lg animate-pulse delay-500"></div>
          </div>

          <motion.div
            className="relative mb-4 lg:mb-6"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.3, type: "spring", stiffness: 100 }}
          >
            <div className="relative inline-flex">
              <div className="absolute inset-0 bg-gradient-to-r from-primary to-purple-600 rounded-full blur-lg opacity-30 animate-pulse"></div>
              <motion.div
                className="relative bg-gradient-to-br from-white/90 to-gray-100/90 dark:from-gray-800/90 dark:to-gray-900/90 p-5 rounded-2xl border border-white/30 dark:border-gray-700/30 shadow-lg backdrop-blur-md"
                whileHover={{ scale: 1.05, rotate: 2 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <div className="absolute -inset-3 bg-gradient-to-r from-primary/20 to-purple-600/20 rounded-2xl blur-md opacity-70 group-hover:opacity-100 transition-opacity duration-300"></div>
                <Sparkles className="h-16 w-16 text-primary animate-pulse" />
              </motion.div>
            </div>
          </motion.div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-3 lg:mb-4 relative">
            <span className="absolute -left-8 top-1/2 -translate-y-1/2 opacity-20">
              <Sparkles className="h-10 w-10 text-primary" />
            </span>
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary via-purple-600 to-primary bg-300% animate-gradient">
              {decodedSubcategory}
            </span>
            <span className="absolute -right-8 top-1/2 -translate-y-1/2 opacity-20">
              <Sparkles className="h-10 w-10 text-purple-600" />
            </span>
          </h1>

          <p className="text-lg lg:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto px-4 relative z-10 font-medium">
            Discover our premium collection of <span className="text-primary font-semibold">{decodedSubcategory.toLowerCase()}</span> products
          </p>

          {/* Decorative elements */}
          <div className="absolute bottom-0 left-0 w-full flex justify-center">
            <div className="h-1 bg-gradient-to-r from-transparent via-primary/50 to-transparent w-3/4 opacity-60"></div>
          </div>
        </motion.div>

        {/* Sticky Search and Controls */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className={cn(
            "mb-6 lg:mb-8 transition-all duration-300",
          )}
        >
          <div className="flex flex-col lg:flex-row gap-3 lg:gap-4 justify-between items-stretch">
            <div className="relative flex-1 max-w-2xl">
              <div className="absolute inset-y-0 left-0 pl-3 lg:pl-4 flex items-center pointer-events-none">
                <Search className="h-4 w-4 lg:h-5 lg:w-5 text-gray-400" />
              </div>
              <motion.input
                whileFocus={{ scale: 1.01 }}
                type="text"
                placeholder={`Search ${decodedSubcategory.toLowerCase()}...`}
                className="block w-full pl-10 lg:pl-12 pr-3 lg:pr-4 py-3 lg:py-3 border-0 rounded-2xl bg-white dark:bg-gray-800 shadow-sm text-sm lg:text-base text-gray-900 dark:text-white placeholder-gray-400 focus:ring-2 focus:ring-primary/50 focus:outline-none transition-all duration-300"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            <div className="flex flex-wrap gap-2 lg:gap-3 justify-end items-center">
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-[160px] lg:w-[180px] h-11 lg:h-12 rounded-2xl bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 text-xs lg:text-sm shadow-sm">
                  <div className="flex items-center">
                    <SortAsc className="h-3 w-3 lg:h-4 lg:w-4 mr-1 lg:mr-2" />
                    <SelectValue placeholder="Sort by" />
                  </div>
                </SelectTrigger>
                <SelectContent className={"bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 rounded-2xl shadow-xl"}>
                  <SelectItem value="recommended">Recommended</SelectItem>
                  <SelectItem value="newest">Newest First</SelectItem>
                  <SelectItem value="price-low">Price: Low to High</SelectItem>
                  <SelectItem value="price-high">Price: High to Low</SelectItem>
                  <SelectItem value="popularity">Popularity</SelectItem>
                </SelectContent>
              </Select>

              <Tabs value={viewMode} onValueChange={setViewMode} className="w-auto hidden sm:block">
                <TabsList className="grid w-full grid-cols-2 h-11 lg:h-12 p-1 bg-gray-100 dark:bg-gray-800 rounded-2xl shadow-inner">
                  <TabsTrigger value="grid" className="rounded-xl data-[state=active]:bg-white data-[state=active]:shadow-sm dark:data-[state=active]:bg-gray-900 p-2 transition-all">
                    <Grid className="h-4 w-4 lg:h-4 lg:w-4" />
                  </TabsTrigger>
                  <TabsTrigger value="list" className="rounded-xl data-[state=active]:bg-white data-[state=active]:shadow-sm dark:data-[state=active]:bg-gray-900 p-2 transition-all">
                    <List className="h-4 w-4 lg:h-4 lg:w-4" />
                  </TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
          </div>

          {noProductsFound && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              className="mt-4 lg:mt-6 flex flex-col items-center justify-center bg-white dark:bg-gray-900 rounded-2xl p-4 lg:p-6 border border-gray-200 dark:border-gray-800 shadow-sm"
            >
              <div className="flex flex-col items-center text-center">
                <Search className="h-10 w-10 lg:h-12 lg:w-12 text-gray-400 mb-3 lg:mb-4" />
                <h3 className="text-lg lg:text-xl font-semibold text-gray-900 dark:text-white mb-2 lg:mb-3">
                  No products found
                </h3>
                <p className="text-sm lg:text-base text-gray-600 dark:text-gray-400 mb-4 lg:mb-5">
                  {searchQuery.trim() !== ''
                    ? `No products match your search for "${searchQuery}"`
                    : 'No products match your current filters'}
                </p>
                <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                  <Button
                    variant="default"
                    size="lg"
                    onClick={onClearAll}
                    className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-primary to-purple-600"
                  >
                    <X className="h-4 w-4" />
                    Clear all filters
                  </Button>
                </motion.div>
              </div>
            </motion.div>
          )}
        </motion.div>

        {sortedProducts && sortedProducts.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex flex-col sm:flex-row justify-between items-center mb-4 lg:mb-6 gap-4"
          >
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Showing {indexOfFirstProduct + 1}-{Math.min(indexOfLastProduct, sortedProducts.length)} of {sortedProducts.length} products
            </p>

            {/* Products per page selector */}
            <div className="flex items-center gap-3">
              <span className="text-sm text-gray-600 dark:text-gray-400 whitespace-nowrap">
                Show:
              </span>
              <Select value={productsPerPage.toString()} onValueChange={handleProductsPerPageChange}>
                <SelectTrigger className="w-[80px] h-9 rounded-xl bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 text-xs shadow-sm">
                  <SelectValue placeholder="12" />
                </SelectTrigger>
                <SelectContent className={"bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 rounded-xl shadow-xl"}>
                  <SelectItem value="12">12</SelectItem>
                  <SelectItem value="24">24</SelectItem>
                  <SelectItem value="36">36</SelectItem>
                  <SelectItem value="48">48</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {totalPages > 1 && (
              <div className="flex items-center gap-2">
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={prevPage}
                    disabled={currentPage === 1}
                    className="h-9 px-3 rounded-xl gap-1"
                  >
                    <ChevronLeft className="h-4 w-4" />
                    Previous
                  </Button>
                </motion.div>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={nextPage}
                    disabled={currentPage === totalPages}
                    className="h-9 px-3 rounded-xl gap-1"
                  >
                    Next
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </motion.div>
              </div>
            )}
          </motion.div>
        )}

        {/* Products Grid */}
        <div className="flex-1">
          {currentProducts && currentProducts.length > 0 ? (
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className={cn(
                "grid gap-5 lg:gap-6",
                viewMode === 'grid'
                  ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
                  : "grid-cols-1"
              )}
            >
              {currentProducts.map((product, index) => (
                <motion.div
                  key={product._id}
                  variants={itemVariants}
                  custom={index}
                  className="relative"
                >
                  <Card className={cn(
                    "relative rounded-2xl overflow-hidden flex bg-white dark:bg-gray-900 border border-gray-200/30 dark:border-gray-800/50 shadow-md hover:shadow-2xl transition-all duration-500 group backdrop-blur-sm bg-opacity-90",
                    viewMode === 'list' && "flex-col sm:flex-row h-auto sm:h-72"
                  )}>
                    {/* Product image container */}
                    <div className={cn(
                      "relative bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800/30 dark:to-gray-900/50 overflow-hidden",
                      viewMode === 'grid' ? "w-full h-52 lg:h-64" : "w-full sm:w-56 lg:w-64 h-52 sm:h-full flex-shrink-0"
                    )}>
                      <motion.div
                        className="absolute inset-0 flex items-center justify-center p-4 lg:p-5"
                        whileHover={{ scale: 1.05 }}
                        transition={{ type: "spring", stiffness: 300 }}
                      >
                        <Image
                          src={product.productImage?.[0] || '/placeholder-product.jpg'}
                          alt={product.productName}
                          fill
                          className="object-contain w-full h-full transition-transform duration-500 group-hover:scale-110"
                          sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, (max-width: 1024px) 25vw, 20vw"
                          priority={index < 4}
                        />
                      </motion.div>

                      {/* Rating badge */}
                      {product.rating >= 4 && (
                        <motion.div
                          className="absolute bottom-3 left-3 z-10"
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1 }}
                        >
                          <Badge className="bg-amber-500/90 text-white flex items-center gap-1 text-xs px-2.5 py-1 backdrop-blur-sm">
                            <Star className="h-3.5 w-3.5 fill-current" />
                            <span>{product.rating.toFixed(1)}</span>
                          </Badge>
                        </motion.div>
                      )}


                      {/* Gradient overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-black/0 to-black/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                      {/* Shimmer effect on hover */}
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -skew-x-12"
                        variants={shimmerVariants}
                        initial="initial"
                        whileHover="animate"
                      />

                      {/* Discount badge - top left corner */}
                      {product.discount > 0 && (
                        <motion.div
                          className="absolute top-2 left-[-5px] z-10"
                          initial={{ scale: 0, rotate: -15 }}
                          animate={{ scale: 1, rotate: -5 }}
                          transition={{ type: 'spring', stiffness: 500, delay: index * 0.05 }}
                        >
                          <div className="bg-gradient-to-r from-rose-500 to-pink-600 text-white text-xs font-bold py-1.5 px-2.5 rounded-lg shadow-lg flex items-center gap-1">
                            <Zap className="h-3 w-3 fill-current" />
                            <span>{product.discount}% OFF</span>
                          </div>
                        </motion.div>
                      )}
                    </div>

                    <CardContent className={cn(
                      "px-4 lg:px-5 flex flex-col flex-grow",
                      viewMode === 'list' && "justify-center"
                    )}>
                      <div className="space-y-2 mb-1">
                        <h2 className="font-semibold text-[15px] sm:text-[16px] leading-tight line-clamp-2 text-gray-900 dark:text-white group-hover:text-primary transition-colors">
                          {product.productName}
                        </h2>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          {product.brand}
                        </p>

                        <div className="flex items-baseline gap-2 pt-1">
                          <p className="font-bold text-lg text-primary">
                            ₹{product.discountPrice.toLocaleString()}
                          </p>
                          <p className="line-through text-gray-500 dark:text-gray-400 text-sm">
                            ₹{product.price.toLocaleString()}
                          </p>
                        </div>

                        <div className="pt-1">
                          <div className="flex items-center justify-between text-xs text-rose-600 dark:text-rose-400">
                            <span>You save</span>
                            <span className="font-semibold">
                              ₹{(product.price - product.discountPrice).toLocaleString()}
                            </span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-1.5 mt-1 dark:bg-gray-700">
                            <div
                              className="bg-gradient-to-r from-rose-500 to-pink-600 h-1.5 rounded-full"
                              style={{ width: `${Math.min(product.discount, 100)}%` }}
                            ></div>
                          </div>
                        </div>
                      </div>

                      <div className="mt-auto pt-2">
                        <div className="flex gap-2">
                          <Link href={`/categories/${decodedCategory}/${subcategory}/${product._id}`} className="flex-1">
                            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                              <Button
                                size="sm"
                                className="w-full py-5 dark:text-white text-sm bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 hover:from-blue-600 hover:via-purple-600 hover:to-pink-600 dark:bg-gradient-to-r dark:from-blue-600 dark:via-purple-600 dark:to-pink-600 dark:hover:from-blue-700 dark:hover:via-purple-700 dark:hover:to-pink-700 rounded-xl transition-all duration-500 shadow-lg hover:shadow-xl relative overflow-hidden group/btn"
                              >
                                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -skew-x-12 -translate-x-full group-hover/btn:translate-x-full transition-transform duration-1000"></div>
                                <span className="relative z-10 flex items-center justify-center gap-1">
                                  <Eye className="h-4 w-4" />
                                  View Details
                                </span>
                              </Button>
                            </motion.div>
                          </Link>
                          {/* <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}> */}
                            {/* <Button
                              size="icon"
                              variant="outline"
                              className="rounded-xl border-gray-300 dark:border-gray-700 h-11 w-11"
                              onClick={() => {
                                if (isInWishlist(product._id)) {
                                  removeFromWishlist(product._id);
                                  toast.success("Removed from wishlist", {
                                    icon: <Trash2 className="w-4 h-4" />,
                                  });
                                } else {
                                  addToWishlist(product);
                                  toast.success("Added to wishlist", {
                                    icon: <Heart className="w-4 h-4" fill="currentColor" />,
                                  });
                                }
                              }}
                            >
                              <Heart
                                className={cn(
                                  "w-5 h-5 transition-all duration-300",
                                  isInWishlist(product._id)
                                    ? "text-red-500 fill-red-500 scale-110"
                                    : hoveredProduct === product._id
                                      ? "text-red-500"
                                      : "text-gray-400 group-hover:text-red-500"
                                )}
                              />
                            </Button> */}
                             <LikeButton productId={product._id} userId={user?.id}  productData={product}  />
                          {/* </motion.div> */}
                        </div>
                      </div>
                    </CardContent>

                    {/* New arrival ribbon */}
                    {product.isNew && (
                      <div className="absolute top-0 left-0 w-28 h-7 overflow-hidden">
                        <div className="absolute -left-8 top-1 w-36 bg-gradient-to-r from-primary to-primary/80 rotate-45 text-center text-[10px] text-white font-bold py-1">
                          NEW ARRIVAL
                        </div>
                      </div>
                    )}
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          ) : null}
        </div>

        {sortedProducts && sortedProducts.length > 0 && totalPages > 1 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="flex justify-center mt-12"
          >
            <div className="flex items-center gap-2 flex-wrap">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={prevPage}
                  disabled={currentPage === 1}
                  className="rounded-xl h-10 w-10"
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
              </motion.div>

              {pageNumbers.map((pageNumber, index) => (
                pageNumber === '...' ? (
                  <span key={`ellipsis-${index}`} className="px-2 text-gray-500">
                    ...
                  </span>
                ) : (
                  <motion.div
                    key={pageNumber}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <Button
                      variant={currentPage === pageNumber ? "default" : "outline"}
                      size="icon"
                      onClick={() => paginate(pageNumber)}
                      className={`rounded-xl h-10 w-10 ${currentPage === pageNumber
                        ? "bg-gradient-to-r from-primary to-purple-600 text-white shadow-md"
                        : "hover:bg-gray-100 dark:hover:bg-gray-800"
                        }`}
                    >
                      {pageNumber}
                    </Button>
                  </motion.div>
                )
              ))}

              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={nextPage}
                  disabled={currentPage === totalPages}
                  className="rounded-xl h-10 w-10"
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </motion.div>
            </div>
          </motion.div>
        )}
      </div>
    </motion.section>
  );
}
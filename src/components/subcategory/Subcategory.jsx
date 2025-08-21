'use client'
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import Image from "next/image";
import { Heart, Search, X, Star, Zap, SortAsc, Grid, List, ChevronLeft, ChevronRight, Trash2 } from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { useState, useMemo } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useWishlist } from "@/context/wishlistContext";
import { toast } from "sonner";

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
  const [viewMode, setViewMode] = useState('grid');
  const [sortBy, setSortBy] = useState('recommended');
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage, setProductsPerPage] = useState(10);
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  const noProductsFound = products && products.length === 0 &&
    (searchQuery.trim() !== '' || Object.keys(activeFilters).length > 0 ||
      priceRange[0] !== minPrice || priceRange[1] !== maxPrice);

  const decodedCategory = decodeURIComponent(category);

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
    setCurrentPage(1); // Reset to first page when changing products per page
  };

  // Generate page numbers for pagination
  const pageNumbers = [];
  const maxVisiblePages = 5;

  if (totalPages <= maxVisiblePages) {
    // Show all pages if total pages is less than max visible
    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(i);
    }
  } else {
    // Show limited pages with ellipsis
    if (currentPage <= 3) {
      // Show first 4 pages and last page
      for (let i = 1; i <= 4; i++) {
        pageNumbers.push(i);
      }
      pageNumbers.push('...');
      pageNumbers.push(totalPages);
    } else if (currentPage >= totalPages - 2) {
      // Show first page and last 4 pages
      pageNumbers.push(1);
      pageNumbers.push('...');
      for (let i = totalPages - 3; i <= totalPages; i++) {
        pageNumbers.push(i);
      }
    } else {
      // Show pages current page
      pageNumbers.push(1);
      pageNumbers.push('...');
      for (let i = currentPage - 1; i <= currentPage + 1; i++) {
        pageNumbers.push(i);
      }
      pageNumbers.push('...');
      pageNumbers.push(totalPages);
    }
  }

  // Mobile responsive styles
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-950 min-h-screen flex-1"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-3 py-6 lg:py-12">
        {/* Breadcrumb */}
        <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mb-4 lg:mb-6 overflow-x-auto whitespace-nowrap">
          <Link href="/" className="hover:text-primary">Home</Link>
          <span className="mx-2">/</span>
          <Link href={`/categories/${decodedCategory}`} className="hover:text-primary capitalize">
            {decodedCategory}
          </Link>
          <span className="mx-2">/</span>
          <span className="text-gray-900 dark:text-white capitalize">{decodedSubcategory}</span>
        </div>

        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="mb-6 lg:mb-10 text-center"
        >
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-2 lg:mb-3">
            {decodedSubcategory}
          </h1>
          <p className="text-sm lg:text-base text-gray-500 dark:text-gray-400 max-w-2xl mx-auto px-2">
            Discover our premium collection of {decodedSubcategory.toLowerCase()} products
          </p>
        </motion.div>

        {/* Search and Controls */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-6 lg:mb-8"
        >
          <div className="flex flex-col lg:flex-row gap-3 lg:gap-4 justify-between items-stretch">
            <div className="relative flex-1 max-w-2xl">
              <div className="absolute inset-y-0 left-0 pl-3 lg:pl-4 flex items-center pointer-events-none">
                <Search className="h-4 w-4 lg:h-5 lg:w-5 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder={`Search ${decodedSubcategory.toLowerCase()}...`}
                className="block w-full pl-10 lg:pl-12 pr-3 lg:pr-4 py-2 lg:py-3 border-0 rounded-xl bg-white dark:bg-gray-800 shadow-sm text-sm lg:text-base text-gray-900 dark:text-white placeholder-gray-400 focus:ring-2 focus:ring-primary/50 focus:outline-none transition-all duration-300"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            <div className="flex flex-wrap gap-2 lg:gap-3 justify-end items-center">
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-[160px] lg:w-[180px] h-10 lg:h-12 rounded-xl bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 text-xs lg:text-sm">
                  <div className="flex items-center">
                    <SortAsc className="h-3 w-3 lg:h-4 lg:w-4 mr-1 lg:mr-2" />
                    <SelectValue placeholder="Sort by" />
                  </div>
                </SelectTrigger>
                <SelectContent className={"bg-white  dark:bg-gray-800 border-gray-200 dark:border-gray-700 rounded-xl shadow-lg"}>
                  <SelectItem value="recommended">Recommended</SelectItem>
                  <SelectItem value="newest">Newest First</SelectItem>
                  <SelectItem value="price-low">Price: Low to High</SelectItem>
                  <SelectItem value="price-high">Price: High to Low</SelectItem>
                  <SelectItem value="popularity">Popularity</SelectItem>
                </SelectContent>
              </Select>

              <Tabs value={viewMode} onValueChange={setViewMode} className="w-auto hidden sm:block">
                <TabsList className="grid w-full grid-cols-2 h-10 lg:h-12 p-1 bg-gray-100 dark:bg-gray-800 rounded-xl">
                  <TabsTrigger value="grid" className="rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-sm dark:data-[state=active]:bg-gray-900 p-2">
                    <Grid className="h-3 w-3 lg:h-4 lg:w-4" />
                  </TabsTrigger>
                  <TabsTrigger value="list" className="rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-sm dark:data-[state=active]:bg-gray-900 p-2">
                    <List className="h-3 w-3 lg:h-4 lg:w-4" />
                  </TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
          </div>

          {noProductsFound && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              className="mt-4 lg:mt-6 flex flex-col items-center justify-center bg-white dark:bg-gray-900 rounded-xl p-4 lg:p-6 border border-gray-200 dark:border-gray-800 shadow-sm"
            >
              <div className="flex flex-col items-center text-center">
                <Search className="h-8 w-8 lg:h-10 lg:w-10 text-gray-400 mb-2 lg:mb-3" />
                <h3 className="text-base lg:text-lg font-medium text-gray-900 dark:text-white mb-1 lg:mb-2">
                  No products found
                </h3>
                <p className="text-xs lg:text-sm text-gray-600 dark:text-gray-400 mb-3 lg:mb-4">
                  {searchQuery.trim() !== ''
                    ? `No products match your search for "${searchQuery}"`
                    : 'No products match your current filters'}
                </p>
                <Button
                  variant="default"
                  size={isMobile ? "sm" : "lg"}
                  onClick={onClearAll}
                  className="flex items-center gap-2 rounded-xl"
                >
                  <X className="h-3 w-3 lg:h-4 lg:w-4" />
                  Clear all filters
                </Button>
              </div>
            </motion.div>
          )}
        </motion.div>

        {/* Products Count and Pagination Info */}
        {sortedProducts && sortedProducts.length > 0 && (
          <div className="flex flex-col sm:flex-row justify-between items-center mb-4 lg:mb-6 gap-4">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Showing {indexOfFirstProduct + 1}-{Math.min(indexOfLastProduct, sortedProducts.length)} of {sortedProducts.length} products
            </p>

            {/* Products per page selector */}
            <div className="flex items-center gap-3">
              <span className="text-sm text-gray-600 dark:text-gray-400 whitespace-nowrap">
                Show:
              </span>
              <Select value={productsPerPage.toString()} onValueChange={handleProductsPerPageChange}>
                <SelectTrigger className="w-[80px] h-8 rounded-lg bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 text-xs">
                  <SelectValue placeholder="10" />
                </SelectTrigger>
                <SelectContent className={"bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 rounded-xl shadow-lg"}>
                  <SelectItem value="10">10</SelectItem>
                  <SelectItem value="20">20</SelectItem>
                  <SelectItem value="30">30</SelectItem>
                  <SelectItem value="50">50</SelectItem>
                  <SelectItem value="100">100</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {totalPages > 1 && (
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={prevPage}
                  disabled={currentPage === 1}
                  className="h-8 px-3 rounded-lg"
                >
                  <ChevronLeft className="h-4 w-4 mr-1" />
                  Previous
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={nextPage}
                  disabled={currentPage === totalPages}
                  className="h-8 px-3 rounded-lg"
                >
                  Next
                  <ChevronRight className="h-4 w-4 ml-1" />
                </Button>
              </div>
            )}
          </div>
        )}

        {/* Products Grid */}
        <div className="flex-1">
          {currentProducts && currentProducts.length > 0 ? (
            <div className={cn(
              "grid gap-4 lg:gap-6",
              viewMode === 'grid'
                ? "grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
                : "grid-cols-1"
            )}>
              {currentProducts.map((product) => (
                <motion.div
                  key={product._id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4 }}
                  whileHover={{
                    y: viewMode === 'grid' ? -5 : 0,
                    transition: { type: "spring", stiffness: 300, damping: 15 }
                  }}
                  className="relative"
                >
                  <Card className={cn(
                    "relative rounded-2xl overflow-hidden flex bg-white dark:bg-gray-900 border border-gray-200/50 dark:border-gray-800/50 shadow-md hover:shadow-xl transition-all duration-300 group",
                    viewMode === 'list' && "flex-col sm:flex-row h-auto sm:h-60"
                  )}>
                    <div className={cn(
                      "relative bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800/30 dark:to-gray-900/50 overflow-hidden",
                      viewMode === 'grid' ? "w-full h-48 lg:h-60" : "w-full sm:w-48 lg:w-60 h-48 sm:h-full flex-shrink-0"
                    )}>
                      <motion.div
                        className="absolute inset-0 flex items-center justify-center p-3 lg:p-4"
                        whileHover={{ scale: 1.03 }}
                      >
                        <Image
                          src={product.productImage?.[0] || '/placeholder-product.jpg'}
                          alt={product.productName}
                          fill
                          className="object-contain w-full h-full transition-transform duration-300 group-hover:scale-105"
                          sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, (max-width: 1024px) 25vw, 20vw"
                          priority={currentProducts.indexOf(product) < 8}
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

                    <CardContent className={cn(
                      "p-4 flex flex-col flex-grow",
                      viewMode === 'list' && "justify-center"
                    )}>
                      <div className="space-y-2 mb-3">
                        <h2 className="font-semibold text-[14px] sm:text-[16px] leading-tight line-clamp-2 text-gray-900 dark:text-white group-hover:text-primary transition-colors">
                          {product.productName}
                        </h2>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          {product.brand}
                        </p>
                      </div>

                      <div className="mt-auto">
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-baseline gap-2">
                            <p className="font-bold  xl:text-xl lg:text-[16px] text-primary">
                              ₹{product.discountPrice.toLocaleString()}
                            </p>
                            <p className="line-through text-gray-500 dark:text-gray-400 text-sm">
                              ₹{product.price.toLocaleString()}
                            </p>
                          </div>
                          <Badge className="text-xs px-2 py-1 bg-primary/90">
                            {product.discount}% OFF
                          </Badge>
                        </div>

                        <div className="flex gap-2">
                          <Link href={`/categories/${decodedCategory}/${subcategory}/${product._id}`} className="flex-1">
                            <Button
                              size="sm"
                              className="w-full py-2.5 dark:text-white text-sm bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 hover:from-blue-600 hover:via-purple-600 hover:to-pink-600 dark:bg-gradient-to-r dark:from-blue-600 dark:via-purple-600 dark:to-pink-600 dark:hover:from-blue-700 dark:hover:via-purple-700 dark:hover:to-pink-700 rounded-xl transition-all duration-500 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 hover:scale-105 relative overflow-hidden group"
                            >
                              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 delay-75"></div>
                              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 delay-300"></div>

                              <span className="relative z-10">View Details</span>
                            </Button>
                          </Link>
                          <Button
                            size="icon"
                            variant="outline"
                            className="rounded-xl border-gray-300 dark:border-gray-700"
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
                                "w-4 h-4 transition-colors",
                                isInWishlist(product._id)
                                  ? "text-red-500 fill-red-500"
                                  : hoveredProduct === product._id
                                    ? "text-red-500"
                                    : "text-gray-400"
                              )}
                            />
                          </Button>
                        </div>
                      </div>
                    </CardContent>

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
            </div>
          ) : null}
        </div>

        {/* Pagination */}
        {sortedProducts && sortedProducts.length > 0 && totalPages > 1 && (
          <div className="flex justify-center mt-12">
            <div className="flex items-center gap-2 flex-wrap">
              <Button
                variant="outline"
                size="icon"
                onClick={prevPage}
                disabled={currentPage === 1}
                className="rounded-xl h-10 w-10"
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>

              {pageNumbers.map((pageNumber, index) => (
                pageNumber === '...' ? (
                  <span key={`ellipsis-${index}`} className="px-2 text-gray-500">
                    ...
                  </span>
                ) : (
                  <Button
                    key={pageNumber}
                    variant={currentPage === pageNumber ? "default" : "outline"}
                    size="icon"
                    onClick={() => paginate(pageNumber)}
                    className={`rounded-xl h-10 w-10 ${currentPage === pageNumber
                      ? "bg-primary text-white"
                      : "hover:bg-gray-100 dark:hover:bg-gray-800"
                      }`}
                  >
                    {pageNumber}
                  </Button>
                )
              ))}

              <Button
                variant="outline"
                size="icon"
                onClick={nextPage}
                disabled={currentPage === totalPages}
                className="rounded-xl h-10 w-10"
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        )}
      </div>
    </motion.section>
  );
}
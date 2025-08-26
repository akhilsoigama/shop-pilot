'use client'

import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Heart, Trash2, ArrowLeft, ShoppingBag, Eye, Sparkles, Star, Zap, Gem, Crown, ShoppingCart, TrendingUp } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Skeleton } from '@/components/ui/skeleton';
import { toast } from 'sonner';
import { useWishlist } from '@/context/wishlistContext';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export const FloatingParticles = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {[...Array(25)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full"
          style={{
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            width: `${Math.random() * 8 + 2}px`,
            height: `${Math.random() * 8 + 2}px`,
            background: `radial-gradient(circle, 
              ${i % 5 === 0 ? 'rgba(168, 85, 247, 0.6)' : 
                i % 5 === 1 ? 'rgba(236, 72, 153, 0.6)' : 
                i % 5 === 2 ? 'rgba(59, 130, 246, 0.6)' :
                i % 5 === 3 ? 'rgba(34, 197, 94, 0.6)' :
                'rgba(245, 158, 11, 0.6)'})`,
            boxShadow: `0 0 ${Math.random() * 10 + 5}px ${
              i % 5 === 0 ? 'rgba(168, 85, 247, 0.8)' : 
              i % 5 === 1 ? 'rgba(236, 72, 153, 0.8)' : 
              i % 5 === 2 ? 'rgba(59, 130, 246, 0.8)' :
              i % 5 === 3 ? 'rgba(34, 197, 94, 0.8)' :
              'rgba(245, 158, 11, 0.8)'
            }`
          }}
          animate={{
            y: [0, -50, 0],
            x: [0, Math.random() * 40 - 20, 0],
            opacity: [0, 1, 0],
            scale: [0, 1, 0]
          }}
          transition={{
            duration: Math.random() * 8 + 6,
            repeat: Infinity,
            delay: Math.random() * 4
          }}
        />
      ))}
    </div>
  )
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
}

const itemVariants = {
  hidden: { 
    y: 30,
    opacity: 0,
    scale: 0.9,
    rotateX: -15
  },
  visible: {
    y: 0,
    opacity: 1,
    scale: 1,
    rotateX: 0,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 15
    }
  },
  hover: {
    y: -10,
    scale: 1.03,
    transition: {
      type: "spring",
      stiffness: 400,
      damping: 15
    }
  }
}

const ShimmerEffect = () => {
  return (
    <motion.div 
      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent -skew-x-12 dark:via-purple-100/20"
      initial={{ x: "-100%" }}
      whileHover={{ x: "200%" }}
      transition={{ duration: 0.8, ease: "easeInOut" }}
    />
  )
}

export default function WishlistPage() {
    const { wishlist, removeFromWishlist, isInitialized } = useWishlist();
    const [isClient, setIsClient] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        setIsClient(true);
        const timer = setTimeout(() => setIsLoading(false), 800);
        return () => clearTimeout(timer);
    }, []);

    const totalSavings = wishlist.reduce((total, product) => {
        return total + (product.price - (product.discountPrice || product.price));
    }, 0);

    if (!isInitialized || !isClient || isLoading) {
        return (
            <div className="min-h-screen ">
                <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6 py-8 sm:py-12">
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 sm:gap-5">
                        {Array.from({ length: 10 }).map((_, index) => (
                            <Card key={index} className="overflow-hidden border-0 shadow-lg rounded-xl bg-white/80 dark:bg-purple-800/30 backdrop-blur-sm ">
                                <Skeleton className="h-48 w-full rounded-none bg-gradient-to-br from-purple-100 to-pink-100 dark:from-purple-900/30 dark:to-pink-900/30" />
                                <CardContent className="p-3 sm:p-4">
                                    <Skeleton className="h-5 w-4/5 mb-2 bg-purple-200 dark:bg-purple-800/30" />
                                    <Skeleton className="h-4 w-2/5 mb-3 bg-purple-200 dark:bg-purple-800/30" />
                                    <div className="flex justify-between items-center">
                                        <Skeleton className="h-5 w-1/3 bg-purple-200 dark:bg-purple-800/30" />
                                        <Skeleton className="h-4 w-1/4 bg-purple-200 dark:bg-purple-800/30" />
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen  pb-12 sm:pb-16 relative overflow-hidden">
            <div className="fixed inset-0 -z-10 overflow-hidden">
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-full blur-3xl animate-pulse dark:from-purple-500/10 dark:to-pink-500/10"></div>
                <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-to-r from-blue-500/10 to-cyan-500/10 rounded-full blur-3xl animate-pulse delay-1000 dark:from-blue-500/10 dark:to-cyan-500/10"></div>
                <FloatingParticles />
            </div>

            <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6 py-8 sm:py-12 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: -30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, type: "spring" }}
                    className="flex flex-col items-center mb-8 sm:mb-12 text-center relative"
                >
                    <motion.div
                        className="inline-flex items-center justify-center p-3 bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 rounded-2xl mb-4 shadow-2xl"
                        animate={{ 
                            rotate: [0, 5, -5, 0],
                            scale: [1, 1.1, 1]
                        }}
                        transition={{ 
                            duration: 4,
                            repeat: Infinity,
                            ease: "easeInOut"
                        }}
                    >
                        <Crown className="h-8 w-8 sm:h-10 sm:w-10 text-white" fill="currentColor" />
                    </motion.div>
                    
                    <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-3 bg-clip-text text-transparent bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 dark:from-purple-400 dark:via-pink-400 dark:to-blue-400 bg-300% animate-gradient">
                        My Wishlist
                    </h1>
                    <p className="text-gray-600 dark:text-gray-400 max-w-md text-sm sm:text-base">
                        Your curated collection of favorite products
                    </p>

                    <motion.div 
                        className="absolute -top-4 -left-4 opacity-30"
                        animate={{ rotate: 360 }}
                        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    >
                        <Sparkles className="h-16 w-16 text-purple-500" />
                    </motion.div>
                    <motion.div 
                        className="absolute -bottom-4 -right-4 opacity-30"
                        animate={{ rotate: -360 }}
                        transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                    >
                        <Sparkles className="h-20 w-20 text-pink-500" />
                    </motion.div>
                </motion.div>

                {wishlist.length > 0 && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8"
                    >
                        <div className="bg-gradient-to-r from-purple-100 to-pink-100 dark:from-purple-900/40 dark:to-pink-900/40 backdrop-blur-sm rounded-2xl p-4 border border-purple-300 dark:border-purple-500/20">
                            <div className="flex items-center">
                                <div className="p-2 bg-purple-500/20 rounded-lg mr-3">
                                    <ShoppingBag className="h-5 w-5 text-purple-600 dark:text-purple-300" />
                                </div>
                                <div>
                                    <p className="text-sm text-gray-600 dark:text-gray-400">Total Items</p>
                                    <p className="text-xl font-bold text-gray-800 dark:text-white">{wishlist.length}</p>
                                </div>
                            </div>
                        </div>
                        
                        <div className="bg-gradient-to-r from-blue-100 to-cyan-100 dark:from-blue-900/40 dark:to-cyan-900/40 backdrop-blur-sm rounded-2xl p-4 border border-blue-300 dark:border-blue-500/20">
                            <div className="flex items-center">
                                <div className="p-2 bg-blue-500/20 rounded-lg mr-3">
                                    <TrendingUp className="h-5 w-5 text-blue-600 dark:text-blue-300" />
                                </div>
                                <div>
                                    <p className="text-sm text-gray-600 dark:text-gray-400">Total Savings</p>
                                    <p className="text-xl font-bold text-gray-800 dark:text-white">₹{totalSavings.toFixed(2)}</p>
                                </div>
                            </div>
                        </div>
                        
                        <div className="bg-gradient-to-r from-pink-100 to-rose-100 dark:from-pink-900/40 dark:to-rose-900/40 backdrop-blur-sm rounded-2xl p-4 border border-pink-300 dark:border-pink-500/20">
                            <div className="flex items-center">
                                <div className="p-2 bg-pink-500/20 rounded-lg mr-3">
                                    <Gem className="h-5 w-5 text-pink-600 dark:text-pink-300" />
                                </div>
                                <div>
                                    <p className="text-sm text-gray-600 dark:text-gray-400">Premium Items</p>
                                    <p className="text-xl font-bold text-gray-800 dark:text-white">{wishlist.filter(p => p.discount > 20).length}</p>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                )}

                <div className="flex justify-between items-center mb-6">
                    <p className="text-gray-600 dark:text-gray-400 text-sm sm:text-base">
                        {wishlist.length} {wishlist.length === 1 ? 'premium item' : 'premium items'} in your collection
                    </p>
                    <Button 
                        variant="outline" 
                        size="sm" 
                        asChild 
                        className="hidden sm:flex bg-white/60 dark:bg-[#1a152f]/60 backdrop-blur-sm border-purple-300 dark:border-purple-500/30 text-gray-800 dark:text-white hover:bg-purple-100 dark:hover:bg-purple-500/20"
                    >
                        <Link href="/">
                            <ArrowLeft className="w-4 h-4 mr-2" />
                            Continue Shopping
                        </Link>
                    </Button>
                    <Button 
                        variant="outline" 
                        size="icon" 
                        asChild 
                        className="sm:hidden bg-white/60 dark:bg-[#1a152f]/60 backdrop-blur-sm border-purple-300 dark:border-purple-500/30 text-gray-800 dark:text-white hover:bg-purple-100 dark:hover:bg-purple-500/20"
                    >
                        <Link href="/">
                            <ArrowLeft className="w-4 h-4" />
                        </Link>
                    </Button>
                </div>

                <AnimatePresence mode="wait">
                    {wishlist.length === 0 ? (
                        <motion.div
                            key="empty-state"
                            initial={{ opacity: 0, y: 30, scale: 0.9 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: -30, scale: 0.9 }}
                            transition={{ duration: 0.7, type: "spring" }}
                            className="text-center py-16 sm:py-24"
                        >
                            <motion.div
                                animate={{
                                    scale: [1, 1.1, 1],
                                    rotate: [0, 5, -5, 0]
                                }}
                                transition={{
                                    repeat: Infinity,
                                    duration: 4,
                                    ease: "easeInOut"
                                }}
                                className="inline-flex items-center justify-center p-6 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-3xl mb-6 backdrop-blur-sm border border-purple-500/30"
                            >
                                <Heart className="w-16 h-16 sm:w-20 sm:h-20 text-purple-500 dark:text-purple-400" fill="currentColor" />
                            </motion.div>
                            <h3 className="text-2xl sm:text-3xl font-semibold text-gray-800 dark:text-white mb-3">Your wishlist is empty</h3>
                            <p className="text-gray-600 dark:text-gray-400 max-w-md mx-auto mb-8 text-sm sm:text-base">
                                Discover amazing products and add them to your wishlist. They all appear here!
                            </p>
                            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                                <Button 
                                    asChild 
                                    size="lg" 
                                    className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white shadow-lg shadow-purple-500/30"
                                >
                                    <Link href="/">
                                        <ShoppingBag className="w-5 h-5 mr-2" />
                                        Start Shopping
                                    </Link>
                                </Button>
                            </motion.div>
                        </motion.div>
                    ) : (
                        <motion.div
                            key="wishlist-grid"
                            variants={containerVariants}
                            initial="hidden"
                            animate="visible"
                            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 sm:gap-5"
                        >
                            {wishlist.map((product) => (
                                <motion.div
                                    key={product._id}
                                    variants={itemVariants}
                                    whileHover="hover"
                                    layout
                                    className="group relative"
                                >
                                    <Card className="overflow-hidden border-0 rounded-2xl transition-all duration-500 bg-white/80 dark:bg-[#1a152f]/80 backdrop-blur-sm hover:bg-white/90 dark:hover:bg-[#2a1f45]/90  border-purple-300 dark:border-purple-500/20 hover:border-purple-500/40 shadow-xl hover:shadow-2xl shadow-purple-500/10">
                                        <div className="aspect-square relative overflow-hidden flex items-center justify-center bg-gradient-to-br from-purple-100 to-pink-100 dark:from-purple-900/30 dark:to-pink-900/30 p-4">
                                            {/* Shimmer effect */}
                                            <ShimmerEffect />
                                            
                                            <div className="relative w-full h-full">
                                                <Image
                                                    src={product.productImage[0]}
                                                    alt={product.productName}
                                                    fill
                                                    className="object-contain p-3 group-hover:scale-110 transition-transform duration-500"
                                                    sizes="(max-width: 640px) 280px, (max-width: 768px) 200px, (max-width: 1024px) 220px, 200px"
                                                    onError={(e) => {
                                                        e.target.src = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgZmlsbD0iIzMzMyIvPjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBkeT0iLjM1ZW0iIGZpbGw9IiM4ODgiIHRleHQtYW5jaG9y=";
                                                    }}
                                                />
                                            </div>
                                            
                                            {/* Gradient overlay */}
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 dark:from-black/50"></div>

                                            <div className="absolute top-3 right-3 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300">
                                                <motion.div
                                                    whileHover={{ scale: 1.1 }}
                                                    whileTap={{ scale: 0.9 }}
                                                >
                                                    <Button
                                                        variant="ghost"
                                                        size="icon"
                                                        className="rounded-full bg-red-500/90 backdrop-blur-sm h-9 w-9 hover:bg-red-600 text-white shadow-md"
                                                        onClick={async () => {
                                                            try {
                                                                await removeFromWishlist(product._id, { syncServer: true });
                                                                toast.success("Removed from wishlist", {
                                                                    icon: <Trash2 className="w-4 h-4" />,
                                                                });
                                                            } catch (error) {
                                                                toast.error("Failed to remove from wishlist");
                                                            }
                                                        }}
                                                    >
                                                        <Trash2 className="w-4 h-4" />
                                                    </Button>
                                                </motion.div>
                                            </div>

                                            {product.discount > 0 && (
                                                <motion.div 
                                                    className="absolute top-3 left-3"
                                                    whileHover={{ scale: 1.1 }}
                                                >
                                                    <Badge className="bg-gradient-to-r from-red-500 to-pink-500 text-white border-0 px-2 py-1 text-xs font-bold shadow-lg">
                                                        {product.discount}% OFF
                                                    </Badge>
                                                </motion.div>
                                            )}

                                            {product.discount > 30 && (
                                                <motion.div 
                                                    className="absolute bottom-3 left-3"
                                                    animate={{ scale: [1, 1.1, 1] }}
                                                    transition={{ duration: 2, repeat: Infinity }}
                                                >
                                                    <Badge className="bg-gradient-to-r from-amber-500 to-orange-500 text-white border-0 px-2 py-1 text-[10px] font-bold shadow-lg flex items-center gap-1">
                                                        <Zap className="w-3 h-3 fill-current" />
                                                        PREMIUM DEAL
                                                    </Badge>
                                                </motion.div>
                                            )}
                                        </div>

                                        <CardContent className="p-4">
                                            <div className="flex justify-between items-start mb-2">
                                                <h3 className="font-semibold text-gray-800 dark:text-white line-clamp-2 text-sm h-10 overflow-hidden leading-tight">
                                                    {product.productName}
                                                </h3>
                                                <Button variant="ghost" size="icon" className="h-7 w-7 rounded-full ml-1">
                                                    <Heart className="w-4 h-4 text-red-500 dark:text-red-400" fill="currentColor" />
                                                </Button>
                                            </div>
                                            <p className="text-xs text-gray-600 dark:text-gray-300 mb-3 truncate">{product.brand}</p>

                                            <div className="flex items-center justify-between mb-4">
                                                <div className="flex items-center gap-1">
                                                    <span className="text-base font-bold text-gray-800 dark:text-white">
                                                        ₹{(product.discountPrice || product.price).toFixed(2)}
                                                    </span>
                                                    {product.discountPrice && product.price > product.discountPrice && (
                                                        <span className="text-xs text-gray-500 dark:text-gray-400 line-through">
                                                            ₹{product.price.toFixed(2)}
                                                        </span>
                                                    )}
                                                </div>

                                                <div className="flex items-center bg-purple-100 dark:bg-purple-900/40 px-2 py-1 rounded-full">
                                                    <Star className="w-3 h-3 text-yellow-500 dark:text-yellow-400 fill-current" />
                                                    <span className="text-xs font-medium text-gray-800 dark:text-white ml-1">4.5</span>
                                                </div>
                                            </div>

                                            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                                                <Button
                                                    className="w-full text-white bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-sm h-9 shadow-lg shadow-purple-500/30 relative overflow-hidden group/btn"
                                                    asChild
                                                >
                                                    <Link
                                                        href={`/categories/${encodeURIComponent(product.category)}/${encodeURIComponent(product.subCategory)}/${product._id}`}
                                                    >
                                                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 -translate-x-full group-hover/btn:translate-x-full transition-transform duration-700"></div>
                                                        <Eye className="w-4 h-4 mr-2" />
                                                        View Details
                                                    </Link>
                                                </Button>
                                            </motion.div>
                                        </CardContent>
                                    </Card>
                                </motion.div>
                            ))}
                        </motion.div>
                    )}
                </AnimatePresence>

                {wishlist.length > 0 && (
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.8 }}
                        className="mt-16 bg-gradient-to-r from-purple-100 to-blue-100 dark:from-purple-900/30 dark:to-blue-900/30 backdrop-blur-sm rounded-2xl p-6 border border-purple-300 dark:border-purple-500/20"
                    >
                        <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-4 flex items-center">
                            <Sparkles className="h-5 w-5 text-purple-600 dark:text-purple-400 mr-2" />
                            You Might Also Like
                        </h3>
                        <p className="text-gray-600 dark:text-gray-400 mb-4">Based on your wishlist preferences</p>
                        <Button 
                            variant="outline" 
                            className="border-purple-300 dark:border-purple-500/30 text-purple-600 dark:text-purple-300 hover:bg-purple-100 dark:hover:bg-purple-500/20 hover:text-purple-700 dark:hover:text-white"
                            asChild
                        >
                            <Link href="/">
                                <ShoppingCart className="h-4 w-4 mr-2" />
                                Discover More
                            </Link>
                        </Button>
                    </motion.div>
                )}
            </div>

            <motion.div 
                className="fixed bottom-6 right-6 z-50 flex flex-col gap-3"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1 }}
            >
                <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="p-3 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full shadow-lg shadow-purple-500/50 text-white"
                    onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                >
                    <ArrowLeft className="h-5 w-5 rotate-90" />
                </motion.button>
                
                <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="p-3 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-full shadow-lg shadow-blue-500/50 text-white"
                    onClick={() => {
                        if (wishlist.length > 0) {
                            toast.success("Shared your wishlist!", {
                                icon: <Sparkles className="w-4 h-4" />,
                            });
                        }
                    }}
                >
                    <Sparkles className="h-5 w-5" />
                </motion.button>
            </motion.div>
        </div>
    );
}
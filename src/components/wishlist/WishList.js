'use client'

import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Heart, Trash2, ArrowLeft, ShoppingBag, Eye, Sparkles, Star } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Skeleton } from '@/components/ui/skeleton';
import { toast } from 'sonner';
import { useWishlist } from '@/context/wishlistContext';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export default function WishlistPage() {
    const { wishlist, removeFromWishlist, isInitialized } = useWishlist();
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
    }, []);

    if (!isInitialized || !isClient) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-950">
                <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6 py-8 sm:py-10">
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 sm:gap-5">
                        {Array.from({ length: 10 }).map((_, index) => (
                            <Card key={index} className="overflow-hidden border-0 shadow-lg rounded-xl">
                                <Skeleton className="h-48 w-full rounded-none" />
                                <CardContent className="p-3 sm:p-4">
                                    <Skeleton className="h-5 w-4/5 mb-2" />
                                    <Skeleton className="h-4 w-2/5 mb-3" />
                                    <div className="flex justify-between items-center">
                                        <Skeleton className="h-5 w-1/3" />
                                        <Skeleton className="h-4 w-1/4" />
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
        <div className="min-h-screen bg-[#0a071e] pb-12 sm:pb-16">
            <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6 py-8 sm:py-12">
                {/* Premium Header */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="flex flex-col items-center mb-8 sm:mb-12 text-center"
                >
                    <motion.div
                        className="inline-flex items-center justify-center p-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full mb-3 sm:mb-4"
                        whileHover={{ scale: 1.05, rotate: 5 }}
                        transition={{ type: "spring", stiffness: 300 }}
                    >
                        <Sparkles className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
                    </motion.div>
                    <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold  dark:text-white mb-2 bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600 text-transparent">
                        My Wishlist
                    </h1>
                    <p className="text-gray-600 dark:text-gray-400 max-w-md text-sm sm:text-base">
                        Curated collection of your favorite products
                    </p>
                </motion.div>

                <div className="flex justify-between items-center mb-6">
                    <p className="text-gray-600 dark:text-gray-400 text-sm sm:text-base">
                        {wishlist.length} {wishlist.length === 1 ? 'item' : 'items'} in wishlist
                    </p>
                    <Button variant="outline" size="sm" asChild className="hidden sm:flex">
                        <Link href="/">
                            <ArrowLeft className="w-4 h-4 mr-2" />
                            Continue Shopping
                        </Link>
                    </Button>
                    <Button variant="outline" size="icon" asChild className="sm:hidden">
                        <Link href="/">
                            <ArrowLeft className="w-4 h-4" />
                        </Link>
                    </Button>
                </div>

                <AnimatePresence mode="wait">
                    {wishlist.length === 0 ? (
                        <motion.div
                            key="empty-state"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 20 }}
                            transition={{ duration: 0.5 }}
                            className="text-center py-12 sm:py-16"
                        >
                            <motion.div
                                animate={{
                                    scale: [1, 1.05, 1],
                                    rotate: [0, 5, -5, 0]
                                }}
                                transition={{
                                    repeat: Infinity,
                                    duration: 4,
                                    ease: "easeInOut"
                                }}
                                className="inline-flex items-center justify-center p-4 bg-gradient-to-r from-purple-100 to-pink-100 dark:from-purple-900/30 dark:to-pink-900/30 rounded-2xl mb-5 sm:mb-6"
                            >
                                <Heart className="w-12 h-12 sm:w-16 sm:h-16 text-purple-500" fill="currentColor" />
                            </motion.div>
                            <h3 className="text-xl sm:text-2xl font-semibold text-gray-900 dark:text-white mb-2 sm:mb-3">Your wishlist is empty</h3>
                            <p className="text-gray-500 dark:text-gray-400 max-w-md mx-auto mb-6 sm:mb-8 text-sm sm:text-base">
                                  Discover amazing products and add them to your wishlist. They&apos;ll appear here!
                            </p>
                            <Button asChild size="lg" className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700">
                                <Link href="/">
                                    <ShoppingBag className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                                    Start Shopping
                                </Link>
                            </Button>
                        </motion.div>
                    ) : (
                        <motion.div
                            key="wishlist-grid"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-4 md:gap-5"
                        >
                            {wishlist.map((product) => (
                                <motion.div
                                    key={product._id}
                                    layout
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.9 }}
                                    transition={{ duration: 0.3 }}
                                    whileHover={{ y: -5 }}
                                    className="group relative"
                                >
                                    <Card className="overflow-hidden border-0 shadow-lg rounded-xl transition-all duration-300 group-hover:shadow-xl bg-[#1a152f]/90 backdrop-blur-sm hover:bg-[#2a1f45]/90">
                                        <div className="aspect-square relative overflow-hidden flex items-center justify-center bg-gray-900/20 p-4">
                                            <div className="relative w-full h-full">
                                                <Image
                                                    src={product.productImage[0]}
                                                    alt={product.productName}
                                                    fill
                                                    className="object-contain p-2 group-hover:scale-110 transition-transform duration-500"
                                                    sizes="(max-width: 640px) 280px, (max-width: 768px) 200px, (max-width: 1024px) 220px, 200px"
                                                    onError={(e) => {
                                                        // Fallback for broken images
                                                        e.target.src = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgZmlsbD0iIzMzMyIvPjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBkeT0iLjM1ZW0iIGZpbGw9IiM4ODgiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGZvbnQtc2l6ZT0iMjAiPk5vIEltYWdlPC90ZXh0Pjwvc3ZnPg==";
                                                    }}
                                                />
                                            </div>
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                                            {/* Action buttons */}
                                            <div className="absolute top-2 right-2 flex flex-col gap-1 sm:gap-2">
                                                <Button
                                                    variant="ghost"
                                                    size="icon"
                                                    className="rounded-full bg-[#0a071e]/80 backdrop-blur-sm h-8 w-8 sm:h-9 sm:w-9 hover:bg-red-500 hover:text-white transition-all duration-200 shadow-md"
                                                    onClick={() => {
                                                        removeFromWishlist(product._id);
                                                        toast.success("Removed from wishlist", {
                                                            icon: <Trash2 className="w-4 h-4" />,
                                                        });
                                                    }}
                                                >
                                                    <Trash2 className="w-3 h-3 sm:w-4 sm:h-4" />
                                                </Button>
                                            </div>

                                            {/* Discount badge */}
                                            {product.discount > 0 && (
                                                <div className="absolute top-2 left-2">
                                                    <Badge className="bg-gradient-to-r from-red-500 to-pink-500 text-white border-0 px-1.5 py-0.5 text-xs font-bold">
                                                        {product.discount}% OFF
                                                    </Badge>
                                                </div>
                                            )}
                                        </div>

                                        <CardContent className="p-3 sm:p-4">
                                            <div className="flex justify-between items-start mb-2">
                                                <h3 className="font-semibold text-white line-clamp-2 text-xs sm:text-sm h-8 sm:h-10 overflow-hidden">
                                                    {product.productName}
                                                </h3>
                                                <Button variant="ghost" size="icon" className="h-6 w-6 sm:h-7 sm:w-7 rounded-full ml-1">
                                                    <Heart className="w-3 h-3 sm:w-4 sm:h-4 text-red-400" fill="currentColor" />
                                                </Button>
                                            </div>
                                            <p className="text-xs text-gray-300 mb-2 sm:mb-3 truncate">{product.brand}</p>

                                            <div className="flex items-center justify-between mb-3 sm:mb-4">
                                                <div className="flex items-center gap-1">
                                                    <span className="text-sm sm:text-base font-bold text-white">
                                                        ₹{(product.discountPrice || product.price).toFixed(2)}
                                                    </span>
                                                    {product.discountPrice && product.price > product.discountPrice && (
                                                        <span className="text-xs text-gray-400 line-through">
                                                            ₹{product.price.toFixed(2)}
                                                        </span>
                                                    )}
                                                </div>

                                                {/* Rating */}
                                                <div className="flex items-center">
                                                    <Star className="w-3 h-3 sm:w-4 sm:h-4 text-yellow-400 fill-current" />
                                                    <span className="text-xs font-medium text-white ml-0.5">4.0</span>
                                                </div>
                                            </div>

                                            <Button
                                                className="w-full text-white bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-xs sm:text-sm h-8 sm:h-9"
                                                asChild
                                            >
                                                <Link
                                                    href={`/categories/${encodeURIComponent(product.category)}/${encodeURIComponent(product.subcategory)}/${product._id}`}
                                                >
                                                    <Eye className="w-3 h-3 sm:w-4 text-white sm:h-4 mr-1 sm:mr-2" />
                                                    View Details
                                                </Link>
                                            </Button>
                                        </CardContent>
                                    </Card>

                                </motion.div>
                            ))}
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
}
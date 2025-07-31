'use client'

import { useProducts } from "@/hooks/useProduct"
import { useParams } from "next/navigation"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import Image from "next/image"
import { CheckCircle, Heart, XCircle } from "lucide-react"
import { Skeleton } from "@mui/material"

export default function Subcategory() {
    const { category, subcategory } = useParams()
    const decodedCategory = decodeURIComponent(category)
    const decodedSubcategory = decodeURIComponent(subcategory)

    const { products, isLoading, isError } = useProducts(decodedCategory, decodedSubcategory)

    if (isLoading) return (
        <div className="p-4 md:p-6 lg:p-8 bg-white dark:bg-gray-950">
            <Skeleton className="h-8 w-64 mb-6 bg-gray-200 dark:bg-gray-800" />
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
                {[...Array(8)].map((_, i) => (
                    <Card key={i} className="rounded-xl overflow-hidden bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800">
                        <Skeleton className="w-full h-40 bg-gray-100 dark:bg-gray-800" />
                        <CardContent className="p-4 space-y-3">
                            <Skeleton className="h-5 w-3/4 bg-gray-200 dark:bg-gray-800" />
                            <Skeleton className="h-4 w-1/2 bg-gray-200 dark:bg-gray-800" />
                            <Skeleton className="h-4 w-full bg-gray-200 dark:bg-gray-800" />
                            <Skeleton className="h-10 w-full mt-4 bg-gray-200 dark:bg-gray-800" />
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    )

    if (isError) return (
        <div className="flex flex-col items-center justify-center min-h-[50vh] p-4 text-center">
            <XCircle className="h-12 w-12 text-red-500 mb-4" />
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                Error loading products
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
                Failed to load products. Please try again later.
            </p>
        </div>
    )

    if (!products.length) return (
        <div className="flex flex-col items-center justify-center min-h-[50vh] p-4 text-center">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                No products found
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
                We couldn't find any products in this category.
            </p>
        </div>
    )

    return (
        <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-8 lg:py-10">
            <div className="mb-6 md:mb-8 lg:mb-10">
                <h1 className="text-2xl text-center sm:text-3xl font-bold text-gray-900 dark:text-white">
                    {decodedSubcategory}
                </h1>
            </div>

            <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 sm:gap-5 md:gap-6">
                {products.map((product) => (
                    <motion.div
                        key={product._id}
                        whileHover={{
                            y: -8,
                            transition: { type: "spring", stiffness: 300, damping: 15 }
                        }}
                        whileTap={{ scale: 0.98 }}
                        transition={{ duration: 0.3 }}
                        className="w-full h-96"
                    >
                        <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-primary/10 to-secondary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                        <Card className="relative rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden h-full flex flex-col bg-white dark:bg-gray-900 border border-gray-200/70 dark:border-gray-700/50 group hover:border-primary/30 dark:hover:border-primary/50">
                            <div className="relative w-full h-48 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 overflow-hidden">
                                <motion.div
                                    className="absolute inset-0 flex items-center justify-center p-4"
                                    whileHover={{ scale: 1.05 }}
                                    transition={{ type: "spring", stiffness: 400 }}
                                >
                                    <Image
                                        src={product.productImage?.[0]}
                                        alt={product.productName}
                                        fill
                                        className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-110"
                                        sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, (max-width: 1024px) 25vw, 20vw"
                                        style={{
                                            objectPosition: 'center center'
                                        }}
                                    />
                                </motion.div>

                                {product.discount > 20 && (
                                    <motion.div
                                        className="absolute top-3 right-3 z-10"
                                        initial={{ scale: 0.8, rotate: -15 }}
                                        animate={{ scale: 1, rotate: 12 }}
                                        transition={{ type: 'spring', stiffness: 500 }}
                                    >
                                        <Badge variant="destructive" className="px-2 py-1 text-xs font-bold shadow-lg animate-pulse">
                                            {product.discount > 40 ? 'MEGA DEAL' : 'HOT DEAL'}
                                        </Badge>
                                    </motion.div>
                                )}

                                {product.rating >= 4 && (
                                    <div className="absolute bottom-2 left-2 z-10">
                                        <Badge className="bg-amber-500/90 text-white flex items-center gap-1 text-xs px-2 py-0.5 backdrop-blur-sm">
                                            ⭐ {product.rating.toFixed(1)}
                                        </Badge>
                                    </div>
                                )}

                                <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-black/0 to-black/0" />
                            </div>

                            <CardContent className="p-4 flex flex-col gap-2 h-48">
                                <div className="space-y-1 flex-grow">
                                    <h2 className="font-semibold line-clamp-2 text-sm md:text-base leading-tight tracking-tight group-hover:text-primary transition-colors">
                                        {product.productName}
                                    </h2>
                                    <p className="text-xs text-muted-foreground dark:text-gray-400 font-medium">
                                        {product.brand}
                                    </p>

                                    <div className="flex flex-wrap gap-1 mt-1">
                                        {product.tags?.slice(0, 2).map(tag => (
                                            <Badge
                                                key={tag}
                                                variant="outline"
                                                className="text-[10px] py-0 px-1.5 h-5 font-normal opacity-80"
                                            >
                                                {tag}
                                            </Badge>
                                        ))}
                                    </div>
                                </div>

                                <div className="flex items-center gap-2 mt-auto">
                                    <div className="flex items-baseline gap-1">
                                        <p className="font-bold text-primary text-lg">
                                            ₹{product.discountPrice}
                                        </p>
                                        <p className="line-through text-gray-500 dark:text-gray-400 text-xs">
                                            ₹{product.price}
                                        </p>
                                    </div>
                                    <Badge
                                        variant="destructive"
                                        className="ml-auto text-xs px-2 py-0.5 font-bold bg-primary/90 hover:bg-primary"
                                    >
                                        {product.discount}% OFF
                                    </Badge>
                                </div>

                                <div className="flex justify-between items-center mt-2">
                                    {product.inStock ? (
                                        <Badge variant="success" className="bg-green-100/90 text-green-800 flex items-center gap-1 dark:bg-green-900/80 dark:text-green-200 text-xs px-2 py-0.5">
                                            <CheckCircle size={12} className="shrink-0" />
                                            <span>In Stock</span>
                                            {product.fastDelivery && (
                                                <span className="ml-1">• 🚚 Fast</span>
                                            )}
                                        </Badge>
                                    ) : (
                                        <Badge variant="secondary" className="bg-red-100/90 text-red-800 flex items-center gap-1 dark:bg-red-900/80 dark:text-red-200 text-xs px-2 py-0.5">
                                            <XCircle size={12} className="shrink-0" />
                                            <span>Out of Stock</span>
                                        </Badge>
                                    )}
                                    <Button
                                        size="sm"
                                        className="ml-auto text-xs px-3 py-1 h-7 hover:scale-105 transition-transform bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary dark:text-white dark:from-gray-800 dark:to-gray-700 dark:hover:to-gray-900"
                                    >
                                        <span className="truncate">View Details</span>
                                    </Button>
                                </div>
                            </CardContent>

                            <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

                            {product.isNew && (
                                <div className="absolute top-0 left-0 w-24 h-6 overflow-hidden">
                                    <div className="absolute -left-8 top-1 w-32 bg-primary rotate-45 text-center text-[10px] text-white font-bold py-0.5">
                                        NEW
                                    </div>
                                </div>
                            )}

                            <button className="absolute top-2 left-2 z-10 p-2 rounded-full bg-white/80 dark:bg-gray-800/80 backdrop-blur-md border border-gray-200 dark:border-gray-600 shadow-sm hover:bg-red-50 dark:hover:bg-red-900/30 transition-colors">
                                <Heart className="w-4 h-4 text-gray-400 hover:text-red-500" />
                            </button>
                        </Card>
                    </motion.div>
                ))}
            </div>
        </section>
    )
}
'use client'

import { useState, useEffect, useCallback } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Skeleton } from "@/components/ui/skeleton"
import {
    ChevronLeft,
    ChevronRight,
    CheckCircle,
    XCircle,
    ShoppingCart,
    Star,
    ArrowLeft,
    Share2,
    Truck,
    Shield,
    RotateCcw,
    CreditCard,
    AlertCircle,
    Crown,
} from "lucide-react"
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { cn } from "@/lib/utils"
import { useCart } from "@/context/cartContext"
import useCheckout from "@/hooks/useCheckout"
import { toast } from "sonner"
import { useUser } from "@clerk/nextjs"
import ShareModal from "../share-model/ShareModel"
import { useWishlist } from "@/context/wishlistContext"
import LikeButton from "../like-count/LikeCount"

// Custom Carousel Component 
function ImageCarousel({ images }) {
    const [currentIndex, setCurrentIndex] = useState(0)

    const nextImage = useCallback(() => {
        setCurrentIndex((prev) => (prev + 1) % images.length)
    }, [images.length])

    const prevImage = useCallback(() => {
        setCurrentIndex((prev) => (prev - 1 + images.length) % images.length)
    }, [images.length])

    return (
        <div className="relative w-full">
            {/* Main Image */}
            <div className="relative aspect-square rounded-2xl overflow-hidden bg-gray-50 dark:bg-gray-900">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={currentIndex}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="w-full h-full relative"
                    >
                        <Image
                            src={images[currentIndex]}
                            alt={`Product image ${currentIndex + 1}`}
                            fill
                            className="object-contain"
                            sizes="(max-width: 1024px) 100vw, 50vw"
                            priority={currentIndex === 0}
                        />
                    </motion.div>
                </AnimatePresence>

                {/* Navigation Arrows */}
                {images.length > 1 && (
                    <>
                        <button
                            onClick={(e) => {
                                e.stopPropagation()
                                prevImage()
                            }}
                            className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 dark:bg-gray-900/80 p-2 rounded-full shadow-lg hover:scale-110 transition-transform backdrop-blur-sm"
                        >
                            <ChevronLeft className="w-5 h-5 text-gray-700 dark:text-gray-300" />
                        </button>
                        <button
                            onClick={(e) => {
                                e.stopPropagation()
                                nextImage()
                            }}
                            className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 dark:bg-gray-900/80 p-2 rounded-full shadow-lg hover:scale-110 transition-transform backdrop-blur-sm"
                        >
                            <ChevronRight className="w-5 h-5 text-gray-700 dark:text-gray-300" />
                        </button>
                    </>
                )}

                {/* Image Counter */}
                {images.length > 1 && (
                    <div className="absolute bottom-2 left-1/2 -translate-x-1/2 bg-black/50 text-white px-2 py-1 rounded-full text-xs backdrop-blur-sm">
                        {currentIndex + 1} / {images.length}
                    </div>
                )}
            </div>

            {/* Thumbnails */}
            {images.length > 1 && (
                <div className="flex gap-2 mt-4 overflow-x-auto py-2">
                    {images.map((img, index) => (
                        <button
                            key={index}
                            onClick={() => setCurrentIndex(index)}
                            className={cn(
                                "relative w-16 h-16 rounded-lg overflow-hidden transition-all duration-200 flex-shrink-0",
                                currentIndex === index
                                    ? "ring-2 ring-primary ring-offset-2"
                                    : "opacity-70 hover:opacity-100"
                            )}
                        >
                            <Image
                                src={img}
                                alt={`Thumbnail ${index + 1}`}
                                fill
                                className="object-cover"
                                sizes="64px"
                            />
                        </button>
                    ))}
                </div>
            )}
        </div>
    )
}

export default function ProductDetailPage({ product }) {
    const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
    const isFavorite = isInWishlist(product._id);
    const [selectedVariant, setSelectedVariant] = useState(null)
    const [selectedOptions, setSelectedOptions] = useState({})
    const [quantity, setQuantity] = useState(1)
    const [isLoading, setIsLoading] = useState(true)
    const { checkout, loading } = useCheckout();
    const { user } = useUser();
    const router = useRouter()
    const { addToCart, isInitialized } = useCart()
    const [isShareModalOpen, setIsShareModalOpen] = useState(false)


    const handleCheckout = async () => {
        try {
            if (!user) {
                router.push('/sign-in');
                return;
            }

            const lineItems = [{
                price_data: {
                    currency: "inr",
                    product_data: {
                        name: product.productName,
                        images: [product.productImage[0]],
                        metadata: {
                            productId: product._id,
                            variantId: selectedVariant?._id || ''
                        },
                    },
                    unit_amount: (discountPrice || price) * 100,
                },
                quantity: quantity,
            }];

            const primaryEmail = user.emailAddresses[0]?.emailAddress;

            if (!primaryEmail) {
                throw new Error("Please add an email address to your account");
            }

            const { sessionId, error } = await checkout({
                items: lineItems,
                customerEmail: primaryEmail,
            });

            if (error) {
                throw new Error(error);
            }

            router.push(`/checkout/${sessionId}`);
        } catch (err) {
            toast.error(err.message || "Checkout failed");
            console.error('Checkout error:', err);
        }
    };

    useEffect(() => {
        if (product) {
            setIsLoading(false)
            if (product.variants && product.variants.length > 0) {
                setSelectedVariant(product.variants[0])
                const initialOptions = {}
                product.variants[0].specifications.forEach(spec => {
                    initialOptions[spec.name] = spec.value
                })
                setSelectedOptions(initialOptions)
            }
        }
    }, [product])

    const getAvailableOptions = (specName) => {
        if (!product?.variants) return []
        const options = new Set()
        product.variants.forEach(variant => {
            variant.specifications.forEach(spec => {
                if (spec.name === specName) {
                    options.add(spec.value)
                }
            })
        })
        return Array.from(options)
    }

    const handleOptionSelect = (specName, value) => {
        const newOptions = { ...selectedOptions, [specName]: value }
        setSelectedOptions(newOptions)

        const matchingVariant = product.variants.find(variant =>
            variant.specifications.every(spec => newOptions[spec.name] === spec.value)
        )

        if (matchingVariant) {
            setSelectedVariant(matchingVariant)
        }
    }

    const getPriceDisplay = () => {
        if (selectedVariant) {
            return {
                price: selectedVariant.price || 0,
                discountPrice: selectedVariant.discountPrice || selectedVariant.price || 0,
                discount: selectedVariant.discount || 0
            }
        }
        return {
            price: product?.price || 0,
            discountPrice: product?.discountPrice || product?.price || 0,
            discount: product?.discount || 0
        }
    }

    const { price, discountPrice, discount } = getPriceDisplay()
    const inStock = selectedVariant ? selectedVariant.inStock : product?.inStock
    const finalPrice = discountPrice || price

    const handleAddToCart = () => {
        addToCart({
            ...product,
            quantity,
            selectedVariant,
            selectedOptions,
            finalPrice: discountPrice || price
        })
    }

    if (!isInitialized) {
        return <ProductDetailSkeleton />
    }

    if (!product) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
                <Card className="p-8 text-center">
                    <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                        Product Not Found
                    </h2>
                    <p className="text-gray-600 dark:text-gray-400 mb-4">
                        The product you're looking for doesn't exist.
                    </p>
                    <Button onClick={() => router.back()}>
                        <ArrowLeft className="w-4 h-4 mr-2" />
                        Go Back
                    </Button>
                </Card>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-white dark:bg-gray-950">
            {/* Navigation */}
            <motion.div
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                className="bg-white/95 dark:bg-gray-950/95 backdrop-blur-sm border-b border-gray-200 dark:border-gray-800 z-50"
            >
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                    <div className="flex items-center justify-between">
                        <Button
                            variant="ghost"
                            onClick={() => router.back()}
                            className="flex items-center gap-2 group"
                        >
                            <motion.div whileHover={{ x: -4 }}>
                                <ArrowLeft className="w-5 h-5" />
                            </motion.div>
                            <span className="hidden sm:inline">Back to Products</span>
                        </Button>

                        <div className="flex items-center gap-2">
                            <LikeButton productId={product._id} userId={user?.id} productData={product} />
                            <TooltipProvider>
                                <Tooltip>
                                    <TooltipTrigger asChild>
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            onClick={() => setIsShareModalOpen(true)}
                                            className="rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-all"
                                        >
                                            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                                                <Share2 className="w-5 h-5" />
                                            </motion.div>
                                        </Button>
                                    </TooltipTrigger>
                                    <TooltipContent>
                                        <p>Share product</p>
                                    </TooltipContent>
                                </Tooltip>
                            </TooltipProvider>
                        </div>
                    </div>
                </div>
            </motion.div>

            {/* Main Content */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
                    {/* Image Gallery */}
                    <div className="space-y-4">
                        <ImageCarousel images={product.productImage} />
                    </div>

                    {/* Product Info */}
                    <div className="space-y-6">
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.2 }}
                        >
                            <div className="space-y-3">
                                <Badge variant="secondary" className="text-sm">
                                    {product.brand}
                                </Badge>

                                <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white leading-tight">
                                    {product.productName}
                                </h1>

                                {/* Rating */}
                                <div className="flex items-center gap-3">
                                    <div className="flex items-center">
                                        {[1, 2, 3, 4, 5].map((star) => (
                                            <Star
                                                key={star}
                                                className={`w-5 h-5 ${star <= 4 ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                                                    }`}
                                            />
                                        ))}
                                    </div>
                                    <span className="text-sm text-gray-600 dark:text-gray-400">
                                        4.0 • 24 reviews • 152 sold
                                    </span>
                                </div>
                            </div>

                            {/* Price Section */}
                            <div className="space-y-2 pt-4">
                                <div className="flex items-center gap-4 flex-wrap">
                                    {/* Discounted Price (Final Price) */}
                                    <span className="text-4xl font-bold text-primary">
                                        ₹{discountPrice.toFixed(2)}
                                    </span>

                                    {/* Original Price (if discount exists) */}
                                    {discount > 0 && price > discountPrice && (
                                        <span className="line-through text-2xl text-gray-500 dark:text-gray-400">
                                            ₹{price.toFixed(2)}
                                        </span>
                                    )}

                                    {/* Discount Percentage Badge */}
                                    {discount > 0 && (
                                        <Badge className="bg-green-500 text-white text-lg px-3 py-1">
                                            {discount}% OFF
                                        </Badge>
                                    )}
                                </div>

                                {/* Price Breakdown */}
                                {discount > 0 && (
                                    <div className="text-sm text-gray-600 dark:text-gray-400">
                                        <span>You save: ₹{(price - discountPrice).toFixed(2)}</span>
                                    </div>
                                )}

                                <div className="text-green-600 dark:text-green-400 font-medium">
                                    • Inclusive of all taxes
                                </div>
                            </div>
                            {/* Stock Status */}
                            <div className="pt-4">
                                {inStock ? (
                                    <div className="flex items-center gap-2 text-green-600 dark:text-green-400">
                                        <CheckCircle className="w-5 h-5" />
                                        <span className="font-medium">In Stock</span>
                                        {selectedVariant?.availableStock && (
                                            <span className="text-sm text-gray-500 dark:text-gray-400 ml-2">
                                                (Only {selectedVariant.availableStock} left!)
                                            </span>
                                        )}
                                    </div>
                                ) : (
                                    <div className="flex items-center gap-2 text-red-600 dark:text-red-400">
                                        <XCircle className="w-5 h-5" />
                                        <span className="font-medium">Out of Stock</span>
                                    </div>
                                )}
                            </div>
                        </motion.div>

                        {/* Variant Selectors */}
                        {product.variants && product.variants.length > 0 && (
                            <motion.div
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.3 }}
                                className="space-y-4 pt-4 border-t border-gray-200 dark:border-gray-800"
                            >
                                {product.variants[0].specifications.map((spec, index) => (
                                    <div key={index} className="space-y-3">
                                        <Label className="text-sm font-medium text-gray-900 dark:text-white">
                                            {spec.name}
                                        </Label>
                                        <div className="flex flex-wrap gap-2">
                                            {getAvailableOptions(spec.name).map((option) => (
                                                <motion.button
                                                    key={option}
                                                    onClick={() => handleOptionSelect(spec.name, option)}
                                                    whileHover={{ scale: 1.05 }}
                                                    whileTap={{ scale: 0.95 }}
                                                    className={`px-4 py-2 border-2 rounded-lg text-sm font-medium transition-all ${selectedOptions[spec.name] === option
                                                        ? "border-primary bg-primary/10 text-primary"
                                                        : "border-gray-300 text-gray-700 dark:border-gray-600 dark:text-gray-300 hover:border-primary"
                                                        }`}
                                                >
                                                    {option}
                                                </motion.button>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </motion.div>
                        )}

                        {/* Quantity Selector */}
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.4 }}
                            className="space-y-3 border-t border-gray-200 dark:border-gray-800 pt-4"
                        >
                            <Label className="text-sm font-medium">Quantity</Label>
                            <div className="flex items-center gap-3">
                                <Button
                                    variant="outline"
                                    size="icon"
                                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                    disabled={quantity <= 1}
                                >
                                    <ChevronLeft className="w-4 h-4" />
                                </Button>
                                <Input
                                    type="number"
                                    value={quantity}
                                    onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                                    className="w-20 text-center"
                                    min="1"
                                />
                                <Button
                                    variant="outline"
                                    size="icon"
                                    onClick={() => setQuantity(quantity + 1)}
                                >
                                    <ChevronRight className="w-4 h-4" />
                                </Button>
                            </div>
                        </motion.div>

                        {/* Action Buttons */}
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.5 }}
                            className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-gray-200 dark:border-gray-800"
                        >
                            <Button
                                size="lg"
                                className="flex-1 h-14 text-lg bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 dark:from-blue-600 dark:to-purple-700 dark:hover:from-blue-700 dark:hover:to-purple-800 transition-all duration-300 transform hover:scale-105 hover:shadow-2xl shadow-lg rounded-xl border-0 text-white font-bold relative overflow-hidden group"
                                onClick={handleAddToCart}
                                disabled={!inStock}
                            >
                                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>

                                <motion.div
                                    whileTap={{ scale: 0.95 }}
                                    className="flex items-center justify-center relative z-10"
                                >
                                    <ShoppingCart className="w-5 h-5 mr-2" />
                                    Add to Cart
                                </motion.div>
                            </Button>
                            <Button
                                variant="default"
                                size="lg"
                                className="flex-1 h-14 text-lg bg-gradient-to-r from-amber-500 to-yellow-600 hover:from-amber-600 hover:to-yellow-700 dark:from-amber-600 dark:to-yellow-700 dark:hover:from-amber-700 dark:hover:to-yellow-800 transition-all duration-300 transform hover:scale-105 hover:shadow-2xl shadow-lg rounded-xl border-0 text-white font-bold relative overflow-hidden group"
                                disabled={!inStock || loading}
                                onClick={handleCheckout}
                            >
                                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-yellow-200/40 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>

                                <div className="flex items-center justify-center relative z-10">
                                    <AnimatePresence mode="wait">
                                        {loading ? (
                                            <motion.div
                                                key="loading"
                                                initial={{ opacity: 0, scale: 0.8 }}
                                                animate={{ opacity: 1, scale: 1 }}
                                                exit={{ opacity: 0, scale: 0.8 }}
                                                className="flex items-center"
                                            >
                                                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                                                Processing...
                                            </motion.div>
                                        ) : (
                                            <motion.div
                                                key="content"
                                                initial={{ opacity: 0, scale: 0.8 }}
                                                animate={{ opacity: 1, scale: 1 }}
                                                exit={{ opacity: 0, scale: 0.8 }}
                                                className="flex items-center"
                                            >
                                                <Crown className="w-5 h-5 mr-2 fill-current" />
                                                Buy Now
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>
                            </Button>
                        </motion.div>

                        {/* Features */}
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.6 }}
                            className="grid grid-cols-2 lg:grid-cols-4 gap-4 pt-6"
                        >
                            <div className="text-center">
                                <Truck className="w-8 h-8 text-primary mx-auto mb-2" />
                                <p className="text-sm font-medium">Free Shipping</p>
                                <p className="text-xs text-gray-600 dark:text-gray-400">Over ₹500</p>
                            </div>
                            <div className="text-center">
                                <RotateCcw className="w-8 h-8 text-primary mx-auto mb-2" />
                                <p className="text-sm font-medium">30-Day Returns</p>
                                <p className="text-xs text-gray-600 dark:text-gray-400">Easy returns</p>
                            </div>
                            <div className="text-center">
                                <Shield className="w-8 h-8 text-primary mx-auto mb-2" />
                                <p className="text-sm font-medium">2-Year Warranty</p>
                                <p className="text-xs text-gray-600 dark:text-gray-400">Full coverage</p>
                            </div>
                            <div className="text-center">
                                <CreditCard className="w-8 h-8 text-primary mx-auto mb-2" />
                                <p className="text-sm font-medium">Secure Payment</p>
                                <p className="text-xs text-gray-600 dark:text-gray-400">256-bit SSL</p>
                            </div>
                        </motion.div>
                    </div>
                </div>

                {/* Product Details Tabs */}
                <Tabs defaultValue="description" className="w-full mt-5 dark:bg-gray-950">
                    <TabsList className="w-full overflow-x-auto dark:bg-gray-900 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden justify-start">
                        {['description', 'specifications', 'reviews', 'shipping'].map((tab) => (
                            <TabsTrigger
                                key={tab}
                                value={tab}
                                asChild
                            >
                                <motion.div
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    transition={{ duration: 0.2, ease: "easeInOut" }}
                                    className="relative px-4 py-2"
                                >
                                    {tab === 'description' && 'Description'}
                                    {tab === 'specifications' && 'Specifications'}
                                    {tab === 'reviews' && 'Reviews (24)'}
                                    {tab === 'shipping' && 'Shipping & Returns'}
                                </motion.div>
                            </TabsTrigger>
                        ))}
                    </TabsList>

                    <TabsContent value="description" className="pt-6">
                        <motion.div
                            key="description"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3 }}
                        >
                            <div
                                className="prose prose-lg dark:prose-invert max-w-none"
                                dangerouslySetInnerHTML={{ __html: product.productDescription || "No description available." }}
                            />
                        </motion.div>
                    </TabsContent>

                    <TabsContent value="specifications" className="pt-6">
                        <motion.div
                            key="specifications"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3 }}
                        >
                            <div className="grid gap-4">
                                {product.specifications?.map((spec, index) => (
                                    <div key={`${spec.name}-${index}`} className="flex justify-between py-3 border-b">
                                        <span className="font-medium text-gray-900 dark:text-white">{spec.name}</span>
                                        <span className="text-gray-600 dark:text-gray-400">{spec.value}</span>
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    </TabsContent>

                    <TabsContent value="reviews" className="pt-6">
                        <motion.div
                            key="reviews"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3 }}
                        >
                            <div className="space-y-4">
                                <p className="text-gray-600 dark:text-gray-400">Reviews coming soon...</p>
                            </div>
                        </motion.div>
                    </TabsContent>

                    <TabsContent value="shipping" className="pt-6">
                        <motion.div
                            key="shipping"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3 }}
                        >
                            <div className="space-y-4">
                                <h4 className="font-semibold">Shipping Information</h4>
                                <p>Free standard shipping on orders over ₹500. Express shipping available.</p>
                                <h4 className="font-semibold">Return Policy</h4>
                                <p>30-day return policy. Free return shipping for defective items.</p>
                            </div>
                        </motion.div>
                    </TabsContent>
                </Tabs>
            </div>
            <ShareModal
                product={product}
                isOpen={isShareModalOpen}
                onClose={() => setIsShareModalOpen(false)}
            />
        </div>
    )
}


export function ProductDetailSkeleton() {
    return (
        <div className="min-h-screen bg-white dark:bg-gray-950">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
                    {/* Image Skeleton */}
                    <div className="space-y-4">
                        <Skeleton className="aspect-square rounded-2xl" />
                        <div className="flex gap-3">
                            {[1, 2, 3, 4].map((i) => (
                                <Skeleton key={i} className="w-20 h-20 rounded-lg" />
                            ))}
                        </div>
                    </div>

                    {/* Content Skeleton */}
                    <div className="space-y-6">
                        <div className="space-y-3">
                            <Skeleton className="h-6 w-32" />
                            <Skeleton className="h-10 w-full" />
                            <Skeleton className="h-4 w-48" />
                        </div>

                        <div className="space-y-2">
                            <Skeleton className="h-8 w-32" />
                            <Skeleton className="h-6 w-24" />
                        </div>

                        <Skeleton className="h-6 w-20" />

                        <div className="space-y-4 pt-4">
                            {[1, 2].map((i) => (
                                <div key={i} className="space-y-2">
                                    <Skeleton className="h-5 w-24" />
                                    <div className="flex gap-2">
                                        {[1, 2, 3].map((j) => (
                                            <Skeleton key={j} className="h-10 w-20 rounded-lg" />
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="flex gap-3 pt-4">
                            <Skeleton className="h-14 flex-1" />
                            <Skeleton className="h-14 flex-1" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
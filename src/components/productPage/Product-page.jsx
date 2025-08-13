'use client'

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  ChevronLeft,
  ChevronRight,
  CheckCircle,
  XCircle,
  ShoppingCart,
  X,
  Star,
  Heart
} from "lucide-react"
import Image from "next/image"
import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"

export default function ProductPage({ product, onAddToCart, isOpen, onClose }) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isMobile, setIsMobile] = useState(false)
  const [isFavorite, setIsFavorite] = useState(false)
  const [selectedThumbnail, setSelectedThumbnail] = useState(0)

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768)
    handleResize()
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  useEffect(() => {
    setCurrentIndex(0)
    setSelectedThumbnail(0)
  }, [product])

  if (!isOpen || !product) return null

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 20 }}
        transition={{ duration: 0.3 }}
        className="fixed top-20 inset-0 z-30 bg-white dark:bg-gray-950 scrollbar-hide overflow-y-auto shadow-2xl"
      >
        {/* Close Button */}
        <button
          className="fixed top-20 right-4 bg-white dark:bg-gray-900 p-2 rounded-full z-50 shadow-lg hover:scale-105 transition-transform"
          onClick={onClose}
          aria-label="Close product view"
        >
          <X className="w-5 h-5 text-gray-700 dark:text-gray-300" />
        </button>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-10 relative">
          <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
            {/* Image Gallery */}
            <div className="w-full lg:w-1/2">
              <div className="flex flex-col-reverse md:flex-row gap-4">
                {/* Thumbnails (Vertical) */}
                <div className="hidden md:flex flex-col gap-3 w-20">
                  {product.productImage.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => {
                        setCurrentIndex(idx)
                        setSelectedThumbnail(idx)
                      }}
                      className={`relative w-full aspect-square rounded-lg overflow-hidden transition-all duration-200 ${selectedThumbnail === idx ? "ring-2 ring-primary ring-offset-2" : "opacity-70 hover:opacity-100"}`}
                    >
                      <Image
                        src={img}
                        alt={`Thumbnail ${idx + 1}`}
                        fill
                        className="object-cover"
                        sizes="80px"
                      />
                    </button>
                  ))}
                </div>

                {/* Main Image */}
                <div className="relative w-full aspect-[4/5] rounded-2xl overflow-hidden bg-gray-50 dark:bg-gray-900 shadow-sm">
                  <motion.div
                    key={currentIndex}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                    className="w-full h-full relative"
                  >
                    <Image
                      src={product.productImage[currentIndex]}
                      alt={`Product image ${currentIndex + 1}`}
                      fill
                      className="object-contain"
                      sizes="(max-width: 1024px) 100vw, 50vw"
                      priority
                    />
                  </motion.div>

                  <button
                    onClick={() => setIsFavorite(!isFavorite)}
                    className="absolute top-4 right-4 p-2 rounded-full bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm shadow hover:scale-110 transition-transform"
                    aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
                  >
                    <Heart
                      className={`w-5 h-5 ${isFavorite ? "fill-red-500 text-red-500" : "text-gray-700 dark:text-gray-300"}`}
                    />
                  </button>

                  {product.productImage.length > 1 && (
                    <>
                      <button
                        onClick={() => {
                          const newIndex = currentIndex === 0 ? product.productImage.length - 1 : currentIndex - 1
                          setCurrentIndex(newIndex)
                          setSelectedThumbnail(newIndex)
                        }}
                        className="absolute top-1/2 left-4 -translate-y-1/2 bg-white/80 dark:bg-gray-900/80 p-2 rounded-full shadow-lg hover:scale-110 transition-transform"
                        aria-label="Previous image"
                      >
                        <ChevronLeft className="w-5 h-5 text-gray-700 dark:text-gray-300" />
                      </button>
                      <button
                        onClick={() => {
                          const newIndex = currentIndex === product.productImage.length - 1 ? 0 : currentIndex + 1
                          setCurrentIndex(newIndex)
                          setSelectedThumbnail(newIndex)
                        }}
                        className="absolute top-1/2 right-4 -translate-y-1/2 bg-white/80 dark:bg-gray-900/80 p-2 rounded-full shadow-lg hover:scale-110 transition-transform"
                        aria-label="Next image"
                      >
                        <ChevronRight className="w-5 h-5 text-gray-700 dark:text-gray-300" />
                      </button>
                    </>
                  )}
                </div>
              </div>

              {/* Mobile Thumbnails (Horizontal) */}
              <div className="md:hidden flex gap-3 mt-4 overflow-x-auto py-2">
                {product.productImage.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      setCurrentIndex(idx)
                      setSelectedThumbnail(idx)
                    }}
                    className={`relative w-16 h-16 rounded-lg overflow-hidden transition-all duration-200 shrink-0 ${selectedThumbnail === idx ? "ring-2 ring-primary ring-offset-2" : "opacity-70 hover:opacity-100"}`}
                  >
                    <Image
                      src={img}
                      alt={`Thumbnail ${idx + 1}`}
                      fill
                      className="object-cover"
                      sizes="64px"
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Product Info */}
            <div className="w-full lg:w-1/2 space-y-6">
              <div>
                <div className="flex justify-between items-start">
                  <div>
                    <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-gray-900 dark:text-white">
                      {product.productName}
                    </h1>
                    <p className="text-lg text-gray-600 dark:text-gray-400 mt-1">
                      {product.brand}
                    </p>
                  </div>
                </div>

                {/* Rating */}
                <div className="flex items-center mt-3">
                  <div className="flex items-center">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        className={`w-4 h-4 ${star <= 4 ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`}
                      />
                    ))}
                  </div>
                  <span className="text-sm text-gray-500 dark:text-gray-400 ml-2">
                    (24 reviews)
                  </span>
                </div>
              </div>

              {/* Price Section */}
              <div className="space-y-2">
                <div className="flex items-center gap-4">
                  <span className="text-3xl font-bold text-primary">
                    ₹{product.discountPrice.toLocaleString()}
                  </span>
                  {product.price > product.discountPrice && (
                    <span className="line-through text-gray-500 dark:text-gray-400">
                      ₹{product.price.toLocaleString()}
                    </span>
                  )}
                  {product.discount > 0 && (
                    <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200 text-sm font-medium">
                      {product.discount}% OFF
                    </Badge>
                  )}
                </div>

                <div className="text-sm text-green-600 dark:text-green-400">
                  Inclusive of all taxes
                </div>
              </div>

              {/* Stock Status */}
              {product.inStock ? (
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span className="text-green-600 dark:text-green-400">In Stock</span>
                  <span className="text-sm text-gray-500 dark:text-gray-400 ml-2">
                    (Only {Math.floor(Math.random() * 10) + 5} left!)
                  </span>
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <XCircle className="w-5 h-5 text-red-500" />
                  <span className="text-red-600 dark:text-red-400">Out of Stock</span>
                </div>
              )}

              {/* Color/Size Selector (Example) */}
              <div className="space-y-3">
                <div>
                  <h4 className="font-medium text-gray-900 dark:text-white">Color</h4>
                  <div className="flex gap-2 mt-2">
                    {['Black', 'White', 'Blue'].map((color) => (
                      <button
                        key={color}
                        className="w-8 h-8 rounded-full border-2 border-gray-300 dark:border-gray-600 hover:border-primary focus:outline-none focus:ring-2 focus:ring-primary"
                        style={{ backgroundColor: color.toLowerCase() }}
                        aria-label={`Select ${color} color`}
                      />
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="font-medium text-gray-900 dark:text-white">Size</h4>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {['S', 'M', 'L', 'XL'].map((size) => (
                      <button
                        key={size}
                        className="px-4 py-2 border rounded-md text-sm font-medium hover:bg-gray-50 dark:hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-primary"
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Description */}
              <div className="pt-2">
                <h4 className="font-medium text-gray-900 dark:text-white mb-3">Product Details</h4>
                <div
                  className="prose prose-sm dark:prose-invert max-w-none text-gray-600 dark:text-gray-300"
                  dangerouslySetInnerHTML={{ __html: product.productDescription || "No description available." }}
                />
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Button
                  size="lg"
                  className="flex-1 h-12 p-2"
                  onClick={() => onAddToCart({
                    _id: product._id,
                    productName: product.productName,
                    brand: product.brand,
                    price: product.price,
                    discountPrice: product.discountPrice,
                    productImage: product.productImage,
                    quantity: 1
                  })}
                  disabled={!product.inStock}
                >
                  <ShoppingCart className="mr-2 h-5 w-5" />
                  Add to Cart
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  className="flex-1 h-12"
                  disabled={!product.inStock}
                >
                  Buy Now
                </Button>
              </div>

              {/* Additional Info */}
              <div className="pt-4 border-t border-gray-200 dark:border-gray-800">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <h5 className="font-medium text-gray-500 dark:text-gray-400">Delivery</h5>
                    <p className="text-gray-900 dark:text-white">
                      Free shipping on orders over ₹500
                    </p>
                    <p className="text-gray-500 dark:text-gray-400">
                      Estimated delivery: 2-4 days
                    </p>
                  </div>
                  <div>
                    <h5 className="font-medium text-gray-500 dark:text-gray-400">Returns</h5>
                    <p className="text-gray-900 dark:text-white">
                      Easy 30-day returns
                    </p>
                    <p className="text-gray-500 dark:text-gray-400">
                      Free return shipping
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  )
}
'use client'

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  ChevronLeft,
  ChevronRight,
  CheckCircle,
  XCircle,
  ShoppingCart,
  X
} from "lucide-react"
import Image from "next/image"
import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import clsx from "clsx"

export default function ProductPage({ product, onAddToCart, isOpen, onClose }) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768)
    handleResize()
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  useEffect(() => {
    setCurrentIndex(0)
  }, [product])

  if (!isOpen || !product) return null

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 20 }}
        transition={{ duration: 0.3 }}
        className="fixed pt-[75px] inset-0 z-50 bg-white dark:bg-black overflow-y-auto shadow-2xl text-[clamp(0.8rem,2vw,1rem)]"
      >
        <div className="max-w-7xl mx-auto px-4 py-6 md:py-10 relative">
          {/* Close Button */}
          <button
            className="absolute top-4 right-4 bg-gray-100 dark:bg-gray-800 p-2 rounded-full z-50"
            onClick={onClose}
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex flex-col md:flex-row gap-8">
            {/* Left: Images */}
            <div className="flex flex-col md:flex-row gap-4 w-full md:w-1/2">
              {/* Thumbs */}
              <div className="hidden md:flex flex-col gap-2 w-20">
                {product.productImage.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentIndex(idx)}
                    className={`w-full h-20 rounded border ${idx === currentIndex ? "border-primary" : "border-gray-300"}`}
                  >
                    <Image
                      src={img}
                      alt={`Thumbnail ${idx + 1}`}
                      width={70}
                      height={70}
                      className="object-contain w-full h-full rounded"
                    />
                  </button>
                ))}
              </div>

              {/* Main Image */}
              <div className="relative w-full aspect-[4/5] rounded-lg overflow-hidden bg-gray-100 dark:bg-gray-800">
                <motion.div
                  key={currentIndex}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="w-full h-full relative"
                >
                  <Image
                    src={product.productImage[currentIndex]}
                    alt={`Product image ${currentIndex + 1}`}
                    fill
                    className="object-contain p-4"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </motion.div>

                {/* Arrows */}
                {product.productImage.length > 1 && (
                  <>
                    <button
                      onClick={() =>
                        setCurrentIndex((prev) =>
                          prev === 0 ? product.productImage.length - 1 : prev - 1
                        )
                      }
                      className="absolute top-1/2 left-2 -translate-y-1/2 bg-white dark:bg-gray-700 p-2 rounded-full shadow"
                    >
                      <ChevronLeft className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() =>
                        setCurrentIndex((prev) =>
                          prev === product.productImage.length - 1 ? 0 : prev + 1
                        )
                      }
                      className="absolute top-1/2 right-2 -translate-y-1/2 bg-white dark:bg-gray-700 p-2 rounded-full shadow"
                    >
                      <ChevronRight className="w-5 h-5" />
                    </button>
                  </>
                )}
              </div>
            </div> 

            {/* Right: Info */}
            <div className="w-full md:w-1/2 space-y-6">
              <div>
                <h1 className="text-xl md:text-3xl font-semibold mb-2">
                  {product.productName}
                </h1>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {product.brand}
                </p>
              </div>

              <div className="flex items-center gap-4">
                <span className="text-2xl font-bold text-primary">
                  ₹{product.discountPrice.toLocaleString()}
                </span>
                {product.price > product.discountPrice && (
                  <span className="line-through text-gray-500">
                    ₹{product.price.toLocaleString()}
                  </span>
                )}
                {product.discount > 0 && (
                  <Badge variant="destructive">{product.discount}% OFF</Badge>
                )}
              </div>

              {product.inStock ? (
                <Badge
                  variant="success"
                  className="bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-200"
                >
                  <CheckCircle className="w-4 h-4 mr-1" /> In Stock
                </Badge>
              ) : (
                <Badge
                  variant="secondary"
                  className="bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-200"
                >
                  <XCircle className="w-4 h-4 mr-1" /> Out of Stock
                </Badge>
              )}

              <div>
                <h4 className="font-medium mb-1">Description</h4>
                <div
                  className="text-sm text-gray-600 dark:text-gray-300 space-y-2"
                  dangerouslySetInnerHTML={{ __html: product.productDescription || "No description available." }}
                />
              </div>

              <Button
                size="lg"
                className="w-full md:w-2/3"
                onClick={() => onAddToCart(product)}
                disabled={!product.inStock}
              >
                <ShoppingCart className="mr-2 h-5 w-5" />
                Add to Cart
              </Button>
            </div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  )
}

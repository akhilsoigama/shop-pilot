'use client'

import { useParams } from "next/navigation"
import { useProduct } from "@/hooks/useProduct" 
import { useCart } from "@/context/cartContext"
import ProductDetailPage, { ProductDetailSkeleton } from "@/components/product-details-page/ProductDetailPage"

export default function ProductPage() {
  const { productId } = useParams()
  
  const { product, isLoading, isError } = useProduct(productId)
  const { addToCart } = useCart()

  if (isLoading) return  <ProductDetailSkeleton />
  if (isError) return <div>Error loading product</div>
  if (!product) return <div>Product not found</div>

  return <ProductDetailPage product={product} onAddToCart={addToCart} />
}
'use client'

import { useProducts } from "@/hooks/useProduct"
import { useParams } from "next/navigation"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import Image from "next/image"
import { CheckCircle, XCircle } from "lucide-react"

export default function ProductsPage() {
  const { category, subcategory } = useParams()
  const decodedCategory = decodeURIComponent(category)
  const decodedSubcategory = decodeURIComponent(subcategory)

  const { products, isLoading, isError } = useProducts(decodedCategory, decodedSubcategory)

  if (isLoading) return <div className="p-4">Loading...</div>
  if (isError) return <div className="p-4 text-red-500">Error loading products</div>
  if (!products.length) return <div className="p-4">No products found</div>

  return (
    <section className="p-4">
      <h1 className="text-2xl font-bold mb-6">{decodedSubcategory}</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {products.map((product) => (
          <motion.div
            key={product._id}
            whileHover={{ scale: 1.03 }}
            transition={{ duration: 0.3 }}
            className="w-full"
          >
            <Card className="rounded-2xl shadow-md overflow-hidden h-full flex flex-col">
              <div className="relative w-full h-56">
                <Image
                  src={product.productImage?.[0]}
                  alt={product.productName}
                  fill
                  className="object-contain"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              </div>

              <CardContent className="p-4 flex flex-col gap-2 grow">
                <h2 className="text-base font-semibold line-clamp-2">{product.productName}</h2>
                <p className="text-xs text-muted-foreground">{product.brand}</p>

                <div className="flex items-center gap-2 text-sm">
                  <p className="font-bold text-primary">₹{product.discountPrice}</p>
                  <p className="line-through text-gray-500">₹{product.price}</p>
                  <Badge variant="destructive" className="ml-auto">{product.discount}% OFF</Badge>
                </div>

                <div className="flex items-center gap-1 mt-1">
                  {product.inStock ? (
                    <Badge variant="success" className="bg-green-100 text-green-800 flex items-center gap-1">
                      <CheckCircle size={14} /> In Stock
                    </Badge>
                  ) : (
                    <Badge variant="secondary" className="bg-red-100 text-red-700 flex items-center gap-1">
                      <XCircle size={14} /> Out of Stock
                    </Badge>
                  )}
                </div>

                <div
                  className="text-xs text-muted-foreground mt-2 line-clamp-3"
                  dangerouslySetInnerHTML={{ __html: product.productDescription }}
                />

                <Button className="mt-auto w-full">View Details</Button>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </section>
  )
}

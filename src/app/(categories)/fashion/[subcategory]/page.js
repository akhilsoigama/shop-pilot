'use client'

import { useParams } from 'next/navigation'
import { fashionCategories, fashionSlugMap } from '@/lib/category'
import ProductGrid from '@/components/productitem/Product-item'
import { useProducts } from '@/hooks/useProduct'

export default function SubcategoryPage() {
  const { subcategory: urlSlug } = useParams()
  
  // Normalize the URL slug and map to database subcategory name
  const normalizedSlug = urlSlug.toLowerCase().replace(/'/g, '')
  const dbSubcategory = fashionSlugMap[normalizedSlug] || urlSlug

  const { products, isLoading } = useProducts('Fashion & Apparel', dbSubcategory)

  // Find display name from fashionCategories
  const categoryData = fashionCategories.find(
    cat => cat.slug === urlSlug
  )
  
  const displayName = categoryData?.name || urlSlug.replace(/-/g, ' ')

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-white mb-6 capitalize">
        {displayName}
      </h1>
      
      {isLoading ? (
        <p className="text-white">Loading products...</p>
      ) : products.length === 0 ? (
        <p className="text-white">No products found in this category</p>
      ) : (
        <ProductGrid products={products} />
      )}
    </div>
  )
}
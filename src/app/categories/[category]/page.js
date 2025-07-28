'use client'

import { Subcategories } from '@/lib/category'
import { useRouter, useParams } from 'next/navigation'

export default function SubcategoryPage() {
  const router = useRouter()
  const { category } = useParams()
  const decodedCategory = decodeURIComponent(category)
  const subcatObj = Subcategories.find(sc => sc.name === decodedCategory)

  if (!subcatObj) return <div className="text-gray-800 dark:text-gray-100">No Subcategories Found</div>

  return (
    <div className="p-4 pt-[80px]">
      <h1 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">
        {decodedCategory} Subcategories
      </h1>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {subcatObj.subcategories.map((subcat) => (
          <button
            key={subcat}
            onClick={() =>
              router.push(`/categories/${encodeURIComponent(decodedCategory)}/${encodeURIComponent(subcat)}`)
            }
            className="p-4 rounded transition-colors bg-blue-100 hover:bg-blue-200 dark:bg-[#1a1832] dark:hover:bg-[#272455] text-gray-900 dark:text-gray-100"
          >
            {subcat}
          </button>
        ))}
      </div>
    </div>
  )
}

'use client'

import { Subcategories } from '@/lib/category'
import { useRouter, useParams } from 'next/navigation'
import Image from 'next/image'

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
        {subcatObj.subcategories.map((subcat, index) => (
          <button
            key={`${subcat.name}-${index}`} // Added index as fallback
            onClick={() =>
              router.push(
                `/categories/${encodeURIComponent(decodedCategory)}/${encodeURIComponent(subcat.name)}`
              )
            }
            className="group flex flex-col items-center p-4 rounded-lg transition-all bg-white dark:bg-[#1a1832] hover:bg-blue-50 dark:hover:bg-[#272455] border border-gray-200 dark:border-gray-700"
          >
            <div className="relative w-16 h-16 mb-2 overflow-hidden">
              <Image
                src={subcat.imageUrl}
                alt={subcat.name}
                fill
                className="object-contain transition-transform group-hover:scale-110"
                sizes="(max-width: 768px) 64px, 96px"
              />
            </div>
            <span className="text-sm font-medium text-gray-700 dark:text-gray-200 group-hover:text-blue-600 dark:group-hover:text-blue-400">
              {subcat.name}
            </span>
          </button>
        ))}
      </div>
    </div>
  )
}
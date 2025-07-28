'use client'
import { Subcategories } from '@/lib/category'
import { useRouter, useParams } from 'next/navigation'

export default function SubcategoryPage() {
  const router = useRouter()
  const { category } = useParams()

  const decodedCategory = decodeURIComponent(category)
  const subcatObj = Subcategories.find(sc => sc.name === decodedCategory)

  if (!subcatObj) return <div>No Subcategories Found</div>

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">{decodedCategory} Subcategories</h1>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {subcatObj.subcategories.map((subcat) => (
          <button
            key={subcat}
            onClick={() =>
              router.push(`/categories/${encodeURIComponent(decodedCategory)}/${encodeURIComponent(subcat)}`)
            }
            className="p-4 bg-blue-100 rounded hover:bg-blue-200"
          >
            {subcat}
          </button>
        ))}
      </div>
    </div>
  )
}

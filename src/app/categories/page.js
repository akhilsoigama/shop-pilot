'use client'
import { categories } from "@/lib/category"
import { useRouter } from "next/navigation"

export default function CategoriesPage() {
  const router = useRouter()

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4">
      {categories.map((cat) => (
        <button
          key={cat}
          onClick={() => router.push(`/categories/${encodeURIComponent(cat)}`)}
          className="p-4 bg-gray-200 rounded hover:bg-gray-300"
        >
          {cat}
        </button>
      ))}
    </div>
  )
}

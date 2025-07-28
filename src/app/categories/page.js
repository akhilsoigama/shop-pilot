'use client'

import { categories } from "@/lib/category"
import { useRouter } from "next/navigation"

export default function CategoriesPage() {
  const router = useRouter()

  return (
    <>
      <h1 className="text-xl font-bold mb-4 pt-[80px] ps-10 text-gray-900 dark:text-white">
        All Categories
      </h1>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => router.push(`/categories/${encodeURIComponent(cat)}`)}
            className="p-4 rounded transition-colors bg-gray-200 hover:bg-gray-300 dark:bg-[#131226] dark:hover:bg-[#1d1c36] text-gray-800 dark:text-gray-100"
          >
            {cat}
          </button>
        ))}
      </div>
    </>
  )
}

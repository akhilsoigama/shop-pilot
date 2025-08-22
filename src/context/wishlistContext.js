'use client'

import React, { createContext, useContext, useEffect, useState } from 'react'
import axios from "axios"
import { useAuth } from "@clerk/nextjs"
import { toast } from "sonner"

const WishlistContext = createContext()

export function useWishlist() {
  const context = useContext(WishlistContext)
  if (!context) {
    throw new Error('useWishlist must be used within a WishlistProvider')
  }
  return context
}

export function WishlistProvider({ children }) {
  const [wishlist, setWishlist] = useState([])
  const [isInitialized, setIsInitialized] = useState(false)
  const { getToken, userId } = useAuth()

  useEffect(() => {
    const storedWishlist = localStorage.getItem('wishlist')
    if (storedWishlist) {
      setWishlist(JSON.parse(storedWishlist))
    }
    setIsInitialized(true)
  }, [])

  useEffect(() => {
    if (isInitialized) {
      localStorage.setItem('wishlist', JSON.stringify(wishlist))
    }
  }, [wishlist, isInitialized])

  const addToWishlist = (product) => {
    setWishlist(prev => {
      const existingItem = prev.find(item => item._id === product._id)
      if (existingItem) return prev
      return [...prev, product]
    })
  }

  // 🚀 option to sync with server
  const removeFromWishlist = async (productId, { syncServer = false } = {}) => {
    setWishlist(prev => prev.filter(item => item._id !== productId))

    if (syncServer && userId) {
      try {
        const token = await getToken()
        await axios.patch(
          `/api/product/${productId}/like`,
          null,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'application/json'
            }
          }
        )
      } catch (err) {
        console.error("Error syncing remove:", err)
        toast.error("Failed to sync with server")
      }
    }
  }

  const isInWishlist = (productId) => {
    return wishlist.some(item => item._id === productId)
  }

  const value = {
    wishlist,
    addToWishlist,
    removeFromWishlist,
    isInWishlist,
    isInitialized
  }

  return (
    <WishlistContext.Provider value={value}>
      {children}
    </WishlistContext.Provider>
  )
}

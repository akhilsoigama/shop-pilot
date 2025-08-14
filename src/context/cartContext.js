'use client'
import { createContext, useContext, useState, useEffect } from 'react'
import { toast } from 'sonner'

const CartContext = createContext()

export function CartProvider({ children }) {
  const [cart, setCart] = useState([])
  const [isCartOpen, setIsCartOpen] = useState(false)

  useEffect(() => {
    const savedCart = localStorage.getItem('cart')
    if (savedCart) setCart(JSON.parse(savedCart))
  }, [])

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart))
  }, [cart])

  const addToCart = (product) => {
    setCart(prev => {
      // Check if variant exists
      const variantId = product.variantId || product._id
      
      const existing = prev.find(item => 
        item.variantId ? 
        item.variantId === variantId : 
        item._id === variantId
      )
      
      if (existing) {
        return prev.map(item => 
          (item.variantId && item.variantId === variantId) || 
          (!item.variantId && item._id === variantId) ? 
          { ...item, quantity: item.quantity + 1 } : 
          item
        )
      }
      
      toast.success("Added to cart successfully")
      return [...prev, { 
        ...product, 
        quantity: 1,
        variantId: variantId
      }]
    })
  }

  const removeFromCart = (productId) => {
    setCart(prev => prev.filter(item => 
      (item.variantId && item.variantId !== productId) || 
      (!item.variantId && item._id !== productId)
    ))
  }

  const updateQuantity = (productId, newQuantity) => {
    if (newQuantity < 1) return
    setCart(prev => 
      prev.map(item => 
        (item.variantId && item.variantId === productId) || 
        (!item.variantId && item._id === productId) ? 
        { ...item, quantity: newQuantity } : 
        item
      )
    )
  }

  const getTotalItems = () => cart.reduce((sum, item) => sum + item.quantity, 0)

  const getTotalPrice = () => cart.reduce((sum, item) => 
    sum + (item.discountPrice * item.quantity), 0)

  const toggleCart = () => setIsCartOpen(!isCartOpen)
  const closeCart = () => setIsCartOpen(false)

  return (
    <CartContext.Provider value={{
      cart,
      isCartOpen,
      addToCart,
      removeFromCart,
      updateQuantity,
      getTotalItems,
      getTotalPrice,
      toggleCart,
      closeCart
    }}>
      {children}
    </CartContext.Provider>
  )
}

export const useCart = () => useContext(CartContext)
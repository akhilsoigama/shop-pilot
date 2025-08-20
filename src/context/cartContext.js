'use client'
import { createContext, useContext, useState, useEffect } from 'react'
import { toast } from 'sonner'

const CartContext = createContext()

export function CartProvider({ children }) {
  const [cart, setCart] = useState([])
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [isInitialized, setIsInitialized] = useState(false) 

  useEffect(() => {
    const savedCart = localStorage.getItem('cart')
    if (savedCart) {
      try {
        setCart(JSON.parse(savedCart))
      } catch (error) {
        console.error('Error parsing cart from localStorage:', error)
        setCart([])
      }
    }
    setIsInitialized(true) 
  }, [])

  useEffect(() => {
    if (isInitialized) { 
      localStorage.setItem('cart', JSON.stringify(cart))
    }
  }, [cart, isInitialized])

  const addToCart = (product) => {
    setCart(prevCart => {
      const existingItemIndex = prevCart.findIndex(item =>
        item._id === product._id &&
        item.selectedVariant?._id === product.selectedVariant?._id
      );

      if (existingItemIndex !== -1) {
        const updatedCart = prevCart.map((item, index) =>
          index === existingItemIndex
            ? { ...item, quantity: item.quantity + (product.quantity || 1) }
            : item
        );
        toast.success("Quantity updated in cart");
        return updatedCart;
      }

      const newItem = {
        _id: product._id,
        productName: product.productName,
        brand: product.brand,
        price: product.price,
        discountPrice: product.discountPrice,
        productImage: product.productImage,
        quantity: product.quantity || 1,
        selectedVariant: product.selectedVariant,
        selectedOptions: product.selectedOptions,
        finalPrice: product.finalPrice
      };

      toast.success("Product added to cart");
      return [...prevCart, newItem];
    });
  };

  const removeFromCart = (productId, variantId = null) => {
    setCart(prev => prev.filter(item =>
      !(item._id === productId &&
        (variantId ? item.selectedVariant?._id === variantId : true))
    ))
    toast.success("Product removed from cart");
  }

  const updateQuantity = (productId, variantId = null, newQuantity) => {
    if (newQuantity < 1) {
      removeFromCart(productId, variantId);
      return;
    }
    
    setCart(prev =>
      prev.map(item =>
        (item._id === productId &&
          (variantId ? item.selectedVariant?._id === variantId : true)) ?
          { ...item, quantity: newQuantity } :
          item
      )
    );
    
    toast.success("Quantity updated");
  }

  const getTotalItems = () => cart.reduce((sum, item) => sum + item.quantity, 0)

  const getTotalPrice = () => cart.reduce((sum, item) =>
    sum + ((item.discountPrice || item.price) * item.quantity), 0)

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
      closeCart,
      isInitialized 
    }}>
      {children}
    </CartContext.Provider>
  )
}

export const useCart = () => useContext(CartContext)
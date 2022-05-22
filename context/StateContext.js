import React, { createContext, useContext, useState, useEffect } from 'react'
import { toast } from 'react-hot-toast'

export const Context = createContext()

export function StateContext({ children }) {
  const [showCart, setShowCart] = useState(false)
  const [cartItems, setCartItems] = useState([])
  const [totalPrice, setTotalPrice] = useState()
  const [totalQuantities, setTotalQuantities] = useState([0])
  const [qty, setQty] = useState(1)

  function incQty() {
    setQty(prev => prev + 1)
  }
  function decQty() {
    setQty(prev => {
      if (prev - 1 < 1) return 1

      return prev - 1
    })
  }

  function onAdd(product, quantity) {
    const checkProductInCart = cartItems.find(item => item._id === product._id)

    setTotalPrice(prevTotalPrice => prevTotalPrice + product.price * quantity)
    setTotalQuantities(prevTotalQuantities => prevTotalQuantities + quantity)

    if (checkProductInCart) {
      const updatedCartItems = cartItems.map(cartProduct => {
        if (cartProduct._id === product._id)
          return {
            ...cartProduct,
            quantity: cartProduct.quantity + quantity
          }
      })

      setCartItems(updatedCartItems)
    } else {
      product.quantity = quantity

      setCartItems([...cartItems, { ...product }])
    }

    toast.success(`${qty} ${product.name} added to the cart.`)
  }

  return (
    <Context.Provider
      value={{
        showCart,
        setShowCart,
        cartItems,
        totalPrice,
        totalQuantities,
        qty,
        incQty,
        decQty,
        onAdd
      }}
    >
      {children}
    </Context.Provider>
  )
}

export function useStateContext() {
  return useContext(Context)
}

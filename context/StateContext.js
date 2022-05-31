import React, { createContext, useContext, useState, useEffect } from 'react'
import { toast } from 'react-hot-toast'

export const Context = createContext()

export function StateContext({ children }) {
  const [showCart, setShowCart] = useState(false)
  const [cartItems, setCartItems] = useState([])
  const [totalPrice, setTotalPrice] = useState(0)
  const [totalQuantities, setTotalQuantities] = useState(0)
  const [qty, setQty] = useState(1)

  let foundProduct
  let index

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
        if (cartProduct._id === product._id) {
          return {
            ...cartProduct,
            quantity: cartProduct.quantity + quantity
          }
        }
        return {
          ...cartProduct
        }
      })

      setCartItems(updatedCartItems)
    } else {
      setCartItems([...cartItems, { ...product, quantity: quantity }])
    }

    toast.success(`${qty} ${product.name} added to the cart.`)
  }

  function onRemove(product) {
    foundProduct = cartItems.find(item => item._id === product._id)
    const newCartItems = cartItems.filter(item => item._id !== product._id)

    setTotalPrice(
      prevTotalPrice =>
        prevTotalPrice - foundProduct.price * foundProduct.quantity
    )

    setTotalQuantities(
      prevTotalQuantities => prevTotalQuantities - foundProduct.quantity
    )

    setCartItems(newCartItems)
  }

  function toggleCartItemQuantity(id, value) {
    index = cartItems.findIndex(product => product._id === id)

    if (value === 'inc') {
      console.log(cartItems)

      const newCartItems = cartItems.map((item, i) => {
        if (i === index) {
          return {
            ...item,
            quantity: item.quantity + 1
          }
        }
        return { ...item }
      })
      console.log(newCartItems)

      setCartItems(newCartItems)
    } else if (value === 'dec') {
    }
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
        setQty,
        onAdd,
        onRemove,
        toggleCartItemQuantity,
        setCartItems,
        setTotalPrice,
        setTotalQuantities
      }}
    >
      {children}
    </Context.Provider>
  )
}

export function useStateContext() {
  return useContext(Context)
}

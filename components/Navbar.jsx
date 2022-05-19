import React from 'react'
import Link from 'next/link'

import { AiOutlineShopping } from 'react-icons/ai'

export default function Navbar() {
  return (
    <div className="navbar-container">
      <p className="logo">
        <Link href="/">Charles Store</Link>
      </p>
      <button type="button" className="cart-icon">
        <AiOutlineShopping />
        <span className="cart-item-qty">1</span>
      </button>
    </div>
  )
}

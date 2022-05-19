import Link from 'next/link'
import React from 'react'

export default function HeroBanner() {
  return (
    <div className="hero-banner-container">
      <div>
        <p className="beats-solo">SMALL TEXT</p>
        <h3>MID TEXT</h3>
        <img src="" alt="headphones" className="hero-banner-image" />

        <div>
          <Link href="/product/ID">
            <button type="button">BUTTON TEXT</button>
          </Link>
          <div className="desc">
            <h5>Description</h5>
            <p>DESCRIPTIONS</p>
          </div>
        </div>
      </div>
    </div>
  )
}

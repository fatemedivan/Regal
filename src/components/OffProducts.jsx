'use client'
import React, { useRef } from 'react'
import ProductItemOff from './ProductItemOff'

export default function OffProducts() {
  const scrollRef = useRef(null)

  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -200, behavior: 'smooth' })
    }
  }

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 200, behavior: 'smooth' })
    }
  }

  return (
    <section className="container mt-17 mb-16 lg:mt-22">
      <div className="mx-5 mb-6 flex justify-between items-center lg:mx-12 lg:mb-10">
        <div className="flex items-center gap-2">
          <img className="lg:w-8 lg:h-8" src="/img/discount-shape.svg" alt="" />
          <h5 className="font-semibold leading-5 lg:text-30 lg:leading-9.5">محصولات تخفیف‌دار</h5>
        </div>
        <div className="flex items-center gap-2">
          <div
            onClick={scrollRight}
            className="p-3 border border-neutral-gray-4 rounded-lg cursor-pointer"
          >
            <img src="/img/arrow-right-2.svg" alt="" />
          </div>
          <div
            onClick={scrollLeft}
            className="p-3 border border-neutral-gray-8 rounded-lg cursor-pointer"
          >
            <img src="/img/arrow-left-4.svg" alt="" />
          </div>
        </div>
      </div>

      <div
        ref={scrollRef}
        className="mr-5 flex gap-3 overflow-x-auto scroll-smooth scrollbar-hide lg:gap-6 lg:mr-12"
      >
        <ProductItemOff img={"/img/product-off-1.png"} title={'لباس میدی رایا'} finalPrice={'۳,۵۰۲,۰۰۰'} price={'۴,۱۲۰,۰۰۰'} offPercent={'۱۵'} isMore={false} />
        <ProductItemOff img={"/img/product-off-2.png"} title={'لباس میدی فیال'} finalPrice={'۵,۰۲۲,۰۰۰'} price={'۵,۴۰۰,۰۰۰'} offPercent={'۷'} isMore={true} />
        <ProductItemOff img={"/img/product-off-3.png"} title={'لباس میدی مدرن مارال'} finalPrice={'۳,۸۶۴,۰۰۰'} price={'۴,۲۰۰,۰۰۰'} offPercent={'۸'} isMore={true} />
        <ProductItemOff img={"/img/product-off-4.png"} title={'لباس میدی تک شانه نولا'} finalPrice={'۳,۲۳۰,۰۰۰'} price={'۳,۸۰۰,۰۰۰'} offPercent={'۱۵'} isMore={false} />
      </div>
    </section>
  )
}

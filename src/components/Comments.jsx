'use client'
import React, { useRef } from 'react'
import CommentBox from './CommentBox'

export default function Comments() {
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
        <section className='container pr-5 py-16 lg:pr-38 lg:py-16 xl:pl-3 relative'>
            <div className='mx-5 flex justify-between items-center gap-4 mb-6 lg:mb-10 lg:mr-0 lg:ml-12'>
                <h5 className='font-semibold leading-5 text-black lg:text-30 lg:leading-9.5 lg:font-bold'>رضایت شما<br/>
                    ارزشمندترین دارایی ماست</h5>
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
            <div ref={scrollRef} className='flex gap-4 overflow-x-auto scrollbar-hide scroll-smooth lg:gap-6'>
                <CommentBox img={"/img/comment-1.svg"} name={'زهرا محمدی'} city={'تهران'} title={'سفارش راحت و بی‌دردسر'} desc={'همه‌چیز دقیقاً همون‌طوری بود که تصور می‌کردم! از انتخاب پارچه گرفته تا جزئیات مدل، می‌شد همه چیز رو طبق سلیقه شخصی تنظیم کنم، خرید راحت و بدون استرسی بود.'} rating={5}/>
                <CommentBox img={"/img/comment-2.svg"} name={'سیما پاشا'} city={'کرج'} title={'کیفیت، فراتر از انتظار'} desc={'واقعاً از کیفیت لباس‌هایی که سفارش دادم جا خوردم! پارچه‌ها همون‌قدر که گفته بودن باکیفیت بود، دوختشون هم خیلی خوب بود. حس خوبیه که یه فروشگاه اینقدر به کیفیت اهمیت می‌ده.'} rating={4}/>
                <CommentBox img={"/img/comment-3.svg"} name={'رها احمدی'} city={'کاشان'} title={'تحویل سریع'} desc={'خرید کردم و خیلی سریع به دستم رسید! بسته‌بندی خوب و مرتب بود و لباس‌ها سالم و تمیز بودن. این سرعت تو تحویل خیلی بهم حس اطمینان می‌ده.'} rating={5}/>
            </div>
        </section>
    )
}

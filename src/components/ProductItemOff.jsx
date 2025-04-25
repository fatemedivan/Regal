import React from 'react'

export default function ProductItemOff({ img, title, price, finalPrice, offPercent, isMore }) {
    return (
        <div className='min-w-41.75 lg:min-w-79.5'>
            <div className='w-41.75 h-60 lg:w-79.5 lg:h-119 relative object-cover'>
                <img className='w-full h-full' src={img} alt="" />
                <div className='absolute w-full top-3 lg:top-4 flex justify-between items-center px-3 lg:px-4'>
                    <img className='cursor-pointer' src="/img/favorite-icon.svg" alt="" />
                    <div className='bg-cognac-primery px-2 py-0.5 lg:px-3 lg:py-1 rounded-100 text-white text-xs leading-4.5'>
                        {offPercent}٪
                    </div>
                </div>
            </div>
            <div className='lg:flex lg:justify-between lg:items-center lg:mt-3 lg:mb-2 lg:max-w-79.5'>
                <p className='text-sm leading-6 my-2.5 lg:text-[1rem] lg:leading-7 lg:my-0'>{title}</p>
                <div className='flex items-center gap-1 mb-2.5 lg:mb-0'>
                    {isMore && <div className='hidden lg:block py-0.25 px-0.75 border border-neutral-gray-5 text-neutral-gray-12 rounded-sm leading-4.5 text-xs'>۲+</div>}
                    <div className={`w-5 h-5 rounded-sm bg-[#97AAB4] ${isMore && 'hidden'}`}></div>
                    <div className='w-5 h-5 rounded-sm bg-[#94999F]'></div>
                    <div className='w-5 h-5 rounded-sm bg-[#C2B1A5]'></div>
                    <div className='w-5 h-5 rounded-sm bg-[#F1AB90]'></div>
                </div>
            </div>
            <div className='flex items-center gap-2 text-black lg:justify-start'>
                <p className='text-neutral-gray-8 text-xs leading-4.5 lg:text-sm lg:leading-4.5 lg:line-through'>{price}</p>
                <p className='text-sm leading-6 lg:text-[1rem] lg:leading-7'> <span className='ml-1'>{finalPrice}</span>تومان</p>
            </div>
        </div>
    )
}

'use client'
import React, { useState } from 'react'

export default function Navbar() {
    const [isOpenMenu, setIsOpenMenu] = useState(false)

    return (
        <>
            <nav className='fixed top-0 left-0 right-0 w-full z-50 bg-white flex justify-between items-center p-5 border-b-1 border-neutral-gray-4 lg:py-6.25 lg:px-12 lg:border-none container'>
                <img src="/img/Logo.svg" alt="" />
                <ul className='hidden lg:flex justify-between items-center gap-12 px-10 py-2.5 text-neutral-gray-11 bg-neutral-gray-1 border-1 border-neutral-gray-3 rounded-100'>
                    <li ><a href="">صفحه اصلی</a></li>
                    <li className='flex justify-center items-center gap-2'>
                        <a href="">دسته‌بندی‌ها</a>
                        <img src="/img/arrow-down.svg" alt="" />
                    </li>
                    <li><a href="">تخفیف‌دار‌ها</a></li>
                    <li><a href="">درباره ما</a></li>
                </ul>

                <ul className='flex justify-center items-center lg:hidden'>
                    <li className='p-3.5'><a href=""><img src="/img/user.svg" alt="" /></a></li>
                    <li className='p-3.5'><a href=""><img src="/img/search-normal.svg" alt="" /></a></li>
                    {isOpenMenu ? <li className='p-3.5' onClick={e => setIsOpenMenu(false)}><img src="/img/Close Icon.svg" alt="" /></li> : <li className='p-3.5' onClick={e => setIsOpenMenu(true)}><img src="/img/menu.svg" alt="" /></li>}

                </ul>
                <ul className='hidden lg:flex justify-center items-center gap-1'>
                    <li className='p-3'><a href=""><img src="/img/search-normal.svg" alt="" /></a></li>
                    <li className='p-3'><a href=""><img src="/img/shopping-cart.svg" alt="" /></a></li>
                    <li className='p-3'><a href=""><img src="/img/heart.svg" alt="" /></a></li>
                    <li className='p-3'><a href=""><img src="/img/user.svg" alt="" /></a></li>
                </ul>
            </nav>
            {isOpenMenu &&
                <>
                    <div
                        className="fixed inset-0 bg-[#1E1E1E] opacity-50 z-40"
                        onClick={() => setIsOpenMenu(false)}
                    />

                    <div className='fixed top-20 left-0 w-full bg-white px-5 pt-6 pb-10 text-neutral-gray-13 lg:hidden z-50'>
                        <div className='flex justify-between items-center pb-4 border-b-1 border-neutral-gray-4'>
                            <a href="">صفحه اصلی</a>
                            <img src="/img/arrow-left-3.svg" alt="" />
                        </div>
                        <div className='flex justify-between items-center pb-4 mt-4 border-b-1 border-neutral-gray-4'>
                            <a href="">دسته‌بندی‌ها</a>
                            <img src="/img/arrow-left-3.svg" alt="" />
                        </div>
                        <div className='flex justify-between items-center pb-4 mt-4 border-b-1 border-neutral-gray-4'>
                            <a href="">تخفیف‌دارها</a>
                            <img src="/img/arrow-left-3.svg" alt="" />
                        </div>
                        <div className='flex justify-between items-center mt-4'>
                            <a href="">درباره ما</a>
                            <img src="/img/arrow-left-3.svg" alt="" />
                        </div>
                    </div>
                </>
            }



        </>
    )
}

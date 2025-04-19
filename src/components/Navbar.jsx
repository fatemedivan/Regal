//  'use client'
import React from 'react'

export default function Navbar() {
    //  const [isOpenMenu, setIsOpenMenu] = useState(false)
    //  console.log(isOpenMenu);
    
    return (
        <>
            <nav className='flex justify-between items-center p-5 border-b-1 border-neutral-gray4 lg:py-6.25 lg:px-12 lg:border-none'>
                <img src="/img/Logo Svg.svg" alt="" />
                <ul className='hidden lg:flex justify-between items-center gap-12 px-10 py-2.5 text-neutral-gray11 bg-neutral-gray1 border-1 border-neutral-gray3 rounded-100'>
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
                    {/* {isOpenMenu ? <li className='p-3.5' onClick={e => setIsOpenMenu(prev => !prev)}><a href=""><img src="img/Close Icon.svg" alt="" /></a></li> : <li className='p-3.5' onClick={e => setIsOpenMenu(prev => !prev)}><a href=""><img src="img/menu.svg" alt="" /></a></li>} */}

                </ul>
                <ul className='hidden lg:flex justify-center items-center gap-1'>
                    <li className='p-3'><a href=""><img src="img/search-normal.svg" alt="" /></a></li>
                    <li className='p-3'><a href=""><img src="img/shopping-cart.svg" alt="" /></a></li>
                    <li className='p-3'><a href=""><img src="img/heart.svg" alt="" /></a></li>
                    <li className='p-3'><a href=""><img src="img/user.svg" alt="" /></a></li>
                </ul>
            </nav>
          <div className='px-5 pt-6 pb-10 text-neutral-gray13 lg:hidden'>
                <div className='flex justify-between items-center pb-4 border-b-1 border-neutral-gray4'>
                    <a href="">صفحه اصلی</a>
                    <img src="/img/arrow-left.svg" alt="" />
                </div>
                <div className='flex justify-between items-center pb-4 mt-4 border-b-1 border-neutral-gray4'>
                    <a href="">دسته‌بندی‌ها</a>
                    <img src="/img/arrow-left.svg" alt="" />
                </div>
                <div className='flex justify-between items-center pb-4 mt-4 border-b-1 border-neutral-gray4'>
                    <a href="">تخفیف‌دارها</a>
                    <img src="/img/arrow-left.svg" alt="" />
                </div>
                <div className='flex justify-between items-center mt-4'>
                    <a href="">درباره ما</a>
                    <img src="/img/arrow-left.svg" alt="" />
                </div>
            </div>
            
           
        </>
    )
}

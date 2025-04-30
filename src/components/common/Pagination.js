import Image from 'next/image'
import React from 'react'

export default function Pagination() {
  return (
    <div className='flex justify-center items-center gap-3 mt-12'>
      <div className='p-3 rounded-sm bg-neutral-gray-2'>
        <Image width={16} height={16} src="/img/arrow-right-pagination.svg" alt="" />
      </div>
      <div className='w-10 h-10 flex justify-center items-center rounded-sm bg-neutral-gray-13 text-white text-sm leading-5'>۱</div>
      <div className='w-10 h-10 flex justify-center items-center rounded-sm bg-neutral-gray-2 text-neutral-gray-9 text-sm leading-5'>۲</div>
      <div className='w-10 h-10 flex justify-center items-center rounded-sm bg-neutral-gray-2 text-neutral-gray-9 text-sm leading-5'>۳</div>
      <div className='w-10 h-10 flex justify-center items-center text-neutral-gray-9 text-sm leading-5'>...</div>
      <div className='w-10 h-10 flex justify-center items-center rounded-sm bg-neutral-gray-2 text-neutral-gray-9 text-sm leading-5'>۹</div>
      <div className='p-3 rounded-sm bg-neutral-gray-2'>
        <Image width={16} height={16} src="/img/arrow-left-pagination.svg" alt="" />
      </div>
    </div>
  )
}

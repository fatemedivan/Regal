import React from 'react'

export default function ProductSceleton() {
  return (
    <div className='flex flex-col gap-2.5'>
      <div className='bg-neutral-gray-3 rounded-lg w-42 h-60 lg:w-79.5 lg:h-119'></div>
      <div className='bg-neutral-gray-3 rounded-lg w-42 h-6 lg:w-79.5 lg:h-7'></div>
      <div className='bg-neutral-gray-3 rounded-lg w-23 h-5 lg:hidden'></div>
      <div className='bg-neutral-gray-3 rounded-lg w-40 h-6.5 lg:w-46'></div>
    </div>
  )
}

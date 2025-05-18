import React from 'react'

export default function ErrBox({title}) {
  return (
    <div className='w-[80%] rounded-xl bg-red-600 text-white p-5 flex justify-center items-center text-xl'>
     <h1>هیچ {title} یافت نشد</h1>
    </div>
  )
}
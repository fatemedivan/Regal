'use client'
import React from 'react'

export default function error({error}) {
  return (
    <div className='flex justify-center items-center h-screen text-3xl'>
      <h1>{error.message} please refresh or try again later</h1>
    </div>
  )
}

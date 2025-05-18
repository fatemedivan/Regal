'use client'
import AddNewProduct from '@/components/admin/AddNewProduct';
import ProductsTable from '@/components/admin/ProductsTable';
import React, { useEffect, useState } from 'react'

export default function page() {
      const baseUrl = process.env.NEXT_PUBLIC_API_URL;
      const [products, setProducts] = useState()

    useEffect(()=>{
        const getProducts = async ()=>{
            const res = await fetch(`${baseUrl}/admin/products`)
            console.log(res);
            if (res.ok) {
                const data = await res.json()
                console.log(data);    
                setProducts(data)
            }
        }
        getProducts()
    },[])
  return (
    <div>
        <AddNewProduct/>
        <ProductsTable products={products}/>
    </div>
  )
}

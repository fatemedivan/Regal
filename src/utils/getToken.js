'use client'

export default function getToken (){
    if (typeof window === 'undefined') return null
    return localStorage.getItem('token')
}
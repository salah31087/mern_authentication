import React from 'react'

export default function Container({ children }) {
    return (
        <div className='font-inter flex flex-col items-center justify-center h-screen'>
            {children}
        </div>
    )
}

import React from 'react'

export default function Container({ children }) {
    return (
        <div className='h-screen pt-20 flex items-center justify-center w-full bg-gradient-to-b from-zinc-900 via-zinc-900/90 to-black'>
            <div className='relative'>
                {/* Background gradient */}
                <div className="fixed inset-0 flex justify-center">
                    <div className="h-[500px] w-[500px] bg-gradient-to-r from-purple-500/20 to-cyan-500/20 blur-[100px] rounded-full" />
                </div>

                {/* Content */}
                <div className='relative px-6'>
                    {children}
                </div>
            </div>
        </div>
    )
}

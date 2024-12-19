import { Button } from '@radix-ui/themes'
import React from 'react'
import { motion } from 'framer-motion'
import Container from '../components/Container'
import { NavLink } from 'react-router-dom'
import { Plus, LogIn } from 'lucide-react'

export default function Home() {
    return (
        <Container>
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className='flex flex-col items-center justify-center text-center -mt-32'
            >
                <h1 className='text-4xl font-semibold tracking-tight mb-3'>Welcome to Auth System</h1>
                <p className='text-white/60 max-w-md mb-8'>
                    A secure and modern authentication system built with React and Node.js.
                    Sign up now to get started.
                </p>
                
                <div className='flex gap-4 mt-4'>
                    <NavLink to='/login'>
                        <Button 
                            className='btn-primary !cursor-pointer flex items-center gap-2 px-6 py-2' 
                            variant="solid"
                        >
                            <LogIn size={18} />
                            <span>Login</span>
                        </Button>
                    </NavLink>
                    <NavLink to='/signup'>
                        <Button 
                            className='btn-outline !cursor-pointer flex items-center gap-2 px-6 py-2' 
                            variant="outline"
                        >
                            <Plus size={18} />
                            <span>Sign Up</span>
                        </Button>
                    </NavLink>
                </div>

                {/* Features Section */}
                <div className='grid grid-cols-3 gap-6 mt-16 max-w-4xl'>
                    <div className='card'>
                        <div className='text-2xl mb-2'>🔒</div>
                        <h3 className='text-lg font-medium mb-2'>Secure</h3>
                        <p className='text-sm text-white/60'>
                            Built with modern security practices and encryption
                        </p>
                    </div>
                    <div className='card'>
                        <div className='text-2xl mb-2'>⚡</div>
                        <h3 className='text-lg font-medium mb-2'>Fast</h3>
                        <p className='text-sm text-white/60'>
                            Optimized performance and quick response times
                        </p>
                    </div>
                    <div className='card'>
                        <div className='text-2xl mb-2'>🎨</div>
                        <h3 className='text-lg font-medium mb-2'>Modern UI</h3>
                        <p className='text-sm text-white/60'>
                            Clean and minimalist user interface design
                        </p>
                    </div>
                </div>
            </motion.div>
        </Container>
    )
}

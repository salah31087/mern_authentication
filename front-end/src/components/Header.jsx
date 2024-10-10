import React, { useContext } from 'react'
import { motion } from 'framer-motion'
import { NavLink } from 'react-router-dom'
import AuthContext from '../context/AuthProvider'
import { Button } from '@radix-ui/themes'



export default function Header() {
    const { auth, logout } = useContext(AuthContext)
    return (
        <header className='max-w-screen-md mx-auto glassmorphism mt-8'>
            <div className='flex justify-between items-center p-4'>
                <NavLink to='/' className='text-sm'>Mern Authentication</NavLink>
                <nav>
                    <ul className='flex items-center gap-4 text-sm'>
                        {!auth && <li><NavLink to="/login">Login</NavLink></li>}
                        {!auth && <li><NavLink to="/signup">Signup</NavLink></li>}
                        {auth && <li><NavLink to="/dashboard">Dashboard</NavLink></li>}
                        {auth && <li><Button className='!cursor-pointer' onClick={logout} variant="default">Logout</Button></li>}
                    </ul>
                </nav>
            </div>
        </header>
    )
}


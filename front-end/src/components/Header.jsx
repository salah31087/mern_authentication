import React, { useContext } from 'react'
import { motion } from 'framer-motion'
import { NavLink } from 'react-router-dom'
import AuthContext from '../context/AuthProvider'
import { Button } from '@radix-ui/themes'
import { LogIn, UserPlus, LayoutDashboard, LogOut } from 'lucide-react'

export default function Header() {
    const { auth, logout } = useContext(AuthContext)
    return (
        <motion.header
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className='fixed top-0 left-0 right-0 z-50'
        >
            <div className='max-w-screen-xl mx-auto px-6 py-2'>
                <div className='glassmorphism px-6 py-4'>
                    <div className='flex justify-between items-center'>
                        <NavLink to='/' className='text-lg font-semibold tracking-tight hover:text-white/90 transition-colors'>
                            Auth System
                        </NavLink>
                        <nav>
                            <ul className='flex items-center gap-6'>
                                {!auth && (
                                    <>
                                        <li>
                                            <NavLink 
                                                to="/login" 
                                                className={({ isActive }) => 
                                                    `flex items-center gap-2 text-sm ${isActive ? 'text-white' : 'text-white/60 hover:text-white/90'} transition-colors`
                                                }
                                            >
                                                <LogIn size={16} />
                                                <span>Login</span>
                                            </NavLink>
                                        </li>
                                        <li>
                                            <NavLink 
                                                to="/signup" 
                                                className={({ isActive }) => 
                                                    `flex items-center gap-2 text-sm ${isActive ? 'text-white' : 'text-white/60 hover:text-white/90'} transition-colors`
                                                }
                                            >
                                                <UserPlus size={16} />
                                                <span>Sign Up</span>
                                            </NavLink>
                                        </li>
                                    </>
                                )}
                                {auth && (
                                    <>
                                        <li>
                                            <NavLink 
                                                to="/dashboard" 
                                                className={({ isActive }) => 
                                                    `flex items-center gap-2 text-sm ${isActive ? 'text-white' : 'text-white/60 hover:text-white/90'} transition-colors`
                                                }
                                            >
                                                <LayoutDashboard size={16} />
                                                <span>Dashboard</span>
                                            </NavLink>
                                        </li>
                                        <li>
                                            <Button 
                                                onClick={logout} 
                                                className='btn-outline !cursor-pointer flex items-center gap-2'
                                            >
                                                <LogOut size={16} />
                                                <span>Logout</span>
                                            </Button>
                                        </li>
                                    </>
                                )}
                            </ul>
                        </nav>
                    </div>
                </div>
            </div>
        </motion.header>
    )
}

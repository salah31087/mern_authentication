import { Button } from '@radix-ui/themes'
import { IconLogin2, IconUserPlus } from '@tabler/icons-react'
import React from 'react'
import { motion } from 'framer-motion'
import Container from '../components/Container'
import { NavLink } from 'react-router-dom'


export default function Home() {
    return (
        <Container>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className='flex flex-col items-center -mt-32 bg-[#1a1a1a] border border-[#29292b] rounded-lg p-10'>
                <h1 className='text-3xl font-bold'>MERN Authentication</h1>
                <p className='text-center text-balance mt-2 max-w-2xl'>This is a boilerplate for MERN authentication that stores a JWT in an HTTP-Only cookie. It also uses Redux Toolkit and the React Radix library</p>
                <div className='flex gap-4 mt-4'>
                    <NavLink to='/login'>
                        <Button className='!cursor-pointer' variant="outline">
                            <IconLogin2 size={18} /> Login
                        </Button>
                    </NavLink>
                    <NavLink to='/signup'>
                        <Button className='!cursor-pointer'>
                            <IconUserPlus size={18} />Signup
                        </Button>
                    </NavLink>
                </div>
            </motion.div>
        </Container>
    )
}

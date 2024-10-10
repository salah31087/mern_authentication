import React, { useContext, useEffect } from 'react';
import Container from '../components/Container';
import { Navigate, NavLink } from 'react-router-dom';
import { Button } from '@radix-ui/themes';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import AuthContext from '../context/AuthProvider';

// Validation Schema using yup
const schema = yup.object().shape({
    email: yup.string().email('Invalid email format').required('Email is required'),
    password: yup.string().min(8, 'Password must be at least 6 characters').required('Password is required')
});

export default function Login() {
    const { login, errorMessage, auth, loading } = useContext(AuthContext)
    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema),
    });

    // Show a loader or nothing until the auth check is done
    if (loading) return <div>Loading...</div>;

    // Redirect to dashboard if the user is already authenticated
    if (auth) return <Navigate to='/dashboard' />;

    const onSubmit = async (data) => {
        try {
            await login(data.email, data.password);
        } catch (error) {
            console.error('Login error:', error);
        }
    };

    return (
        <Container>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className='bg-[#1a1a1a] border border-[#29292b] rounded-lg p-10 -mt-32'
            >
                <h1 className='text-3xl font-semibold'>Login</h1>
                <p className='text-balance mt-2 max-w-2xl text-white !text-opacity-40'>
                    Enter your email below to login to your account
                </p>

                <form onSubmit={handleSubmit(onSubmit)}>
                    {/* Email Field */}
                    <label htmlFor="email" className='text-white font-medium mt-5 block'>
                        Email
                    </label>
                    <input
                        type="text"
                        id="email"
                        placeholder='Enter your email'
                        {...register('email')}
                        className='w-full bg-[#1a1a1a] border border-[#29292b] rounded-sm px-3 py-2 mt-2 focus:outline-1 focus:outline-[#181818]'
                    />
                    {/* Show Email Error */}
                    {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}

                    {/* Password Field */}
                    <div className='flex justify-between items-center mt-5'>
                        <label htmlFor="password" className='text-white font-medium block'>
                            Password
                        </label>
                        <NavLink className='text-white text-opacity-40 hover:underline text-xs'>
                            Forgot your password?
                        </NavLink>
                    </div>
                    <input
                        type="password"
                        id="password"
                        placeholder='Enter your password'
                        {...register('password')}
                        className='w-full bg-[#1a1a1a] border border-[#29292b] rounded-sm px-3 py-2 mt-2 focus:outline-1 focus:outline-[#181818]'
                    />
                    {/* Show Password Error */}
                    {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>}

                    {/* Submit Button */}
                    <Button type='submit' className='!w-full !mt-5 !cursor-pointer'>
                        Login
                    </Button>
                </form>

                <p className='text-balance mt-5 max-w-2xl text-white !text-opacity-40'>
                    Don't have an account?{" "}
                    <NavLink to='/signup' className='text-white text-opacity-40 hover:underline'>
                        Sign up
                    </NavLink>
                </p>
                {errorMessage && <p className="text-red-500 mt-4 text-sm text-center">{errorMessage}</p>}

            </motion.div>
        </Container>
    );
}

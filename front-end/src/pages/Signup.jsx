import React, { useContext } from 'react';
import Container from '../components/Container';
import { Navigate, NavLink, useNavigate } from 'react-router-dom';
import { Button } from '@radix-ui/themes';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { motion } from 'framer-motion';
import AuthContext from '../context/AuthProvider';


// Validation schema using yup
const schema = yup.object().shape({
    username: yup.string().required('Username is required'),
    email: yup.string().email('Invalid email format').required('Email is required'),
    password: yup
        .string()
        .min(8, 'Password must be at least 8 characters')
        .required('Password is required'),
    confirmPassword: yup
        .string()
        .oneOf([yup.ref('password')], 'Passwords must match')
        .required('Confirm password is required'),
});

export default function Signup() {
    const { signup, errorMessage, auth, loading } = useContext(AuthContext);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schema),
    });

    // Show a loader or nothing until the auth check is done
    if (loading) return <div>Loading...</div>;

    // Redirect to dashboard if the user is already authenticated
    if (auth) return <Navigate to='/dashboard' />;

    const onSubmit = async (data) => {
        try {
            await signup(data.username, data.email, data.password);
        } catch (error) {
            console.error('Login error:', error);
        }
    };

    return (
        <Container>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className='bg-[#1a1a1a] border border-[#29292b] rounded-lg p-10 -mt-32'>
                <h1 className='text-3xl font-semibold'>Sign up</h1>
                <p className='text-balance mt-2 max-w-2xl text-white !text-opacity-40'>
                    Create a new account by entering your details below
                </p>

                <form onSubmit={handleSubmit(onSubmit)}>
                    {/* Username Field */}
                    <label htmlFor="username" className='text-white font-medium mt-5 block'>
                        Username
                    </label>
                    <input
                        type="text"
                        id="username"
                        placeholder="Enter your username"
                        className={`w-full bg-[#1a1a1a] border border-[#29292b] rounded-sm px-3 py-2 mt-2 focus:border-[#29292b] ${errors.username ? 'border-red-500' : ''
                            }`}
                        {...register('username')}
                    />
                    <p className="text-red-500 mt-1 text-xs">{errors.username?.message}</p>

                    {/* Email Field */}
                    <label htmlFor="email" className='text-white font-medium mt-5 block'>
                        Email
                    </label>
                    <input
                        type="email"
                        id="email"
                        placeholder="Enter your email"
                        className={`w-full bg-[#1a1a1a] border border-[#29292b] rounded-sm px-3 py-2 mt-2 focus:outline-1 focus:outline-[#181818] ${errors.email ? 'border-red-500' : ''
                            }`}
                        {...register('email')}
                    />
                    <p className="text-red-500 mt-1 text-xs">{errors.email?.message}</p>

                    {/* Password Field */}
                    <label htmlFor="password" className='text-white font-medium mt-5 block'>
                        Password
                    </label>
                    <input
                        type="password"
                        id="password"
                        placeholder="Enter your password"
                        className={`w-full bg-[#1a1a1a] border border-[#29292b] rounded-sm px-3 py-2 mt-2 focus:outline-1 focus:outline-[#181818] ${errors.password ? 'border-red-500' : ''
                            }`}
                        {...register('password')}
                    />
                    <p className="text-red-500 mt-1 text-xs">{errors.password?.message}</p>

                    {/* Confirm Password Field */}
                    <label htmlFor="confirmPassword" className='text-white font-medium mt-5 block'>
                        Confirm Password
                    </label>
                    <input
                        type="password"
                        id="confirmPassword"
                        placeholder="Confirm your password"
                        className={`w-full bg-[#1a1a1a] border border-[#29292b] rounded-sm px-3 py-2 mt-2 focus:outline-1 focus:outline-[#181818] ${errors.confirmPassword ? 'border-red-500' : ''
                            }`}
                        {...register('confirmPassword')}
                    />
                    <p className="text-red-500 mt-1 text-xs">{errors.confirmPassword?.message}</p>

                    <Button className="!w-full !mt-5 !cursor-pointer" type="submit">
                        Sign Up
                    </Button>

                </form>

                <p className="text-balance mt-5 max-w-2xl text-white !text-opacity-40">
                    Already have an account?{' '}
                    <NavLink to="/login" className="text-white text-opacity-40 underline">
                        Login
                    </NavLink>
                </p>
                {errorMessage && <p className="text-red-500 mt-4 text-sm text-center">{errorMessage}</p>}
            </motion.div>
        </Container>
    );
}

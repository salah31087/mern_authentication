import React, { useContext } from 'react';
import Container from '../components/Container';
import { Navigate, NavLink } from 'react-router-dom';
import { Button } from '@radix-ui/themes';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { motion } from 'framer-motion';
import AuthContext from '../context/AuthProvider';
import { UserPlus } from 'lucide-react';

const schema = yup.object().shape({
    username: yup.string()
        .required('Username is required')
        .min(3, 'Username must be at least 3 characters')
        .matches(/^[a-zA-Z0-9_]+$/, 'Username can only contain letters, numbers and underscores'),
    email: yup.string()
        .email('Invalid email format')
        .required('Email is required')
        .matches(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'Invalid email format'),
    password: yup.string()
        .required('Password is required')
        .min(8, 'Password must be at least 8 characters long')
        .matches(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
            'Password must contain at least one uppercase letter, lowercase letter, number and special character'
        ),
    confirmPassword: yup.string()
        .required('Please confirm your password')
        .oneOf([yup.ref('password')], 'Passwords must match')
});

export default function Signup() {
    const { signup, errorMessage, auth, loading } = useContext(AuthContext);
    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema),
    });

    if (loading) return <div>Loading...</div>;
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
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className='!w-full min-w-96 mx-auto -mt-24'
            >
                <div className="text-center mb-6">
                    <div className="w-12 h-12 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-3">
                        <UserPlus className="w-6 h-6 text-white/80" />
                    </div>
                    <h1 className="text-xl font-medium">Create account</h1>
                    <p className="text-sm text-white/60 mt-1">Join us today</p>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <div>
                        <input
                            type="text"
                            placeholder="Username"
                            {...register('username')}
                            className="w-full px-5 py-2 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-white/40 focus:outline-none focus:border-white/20 transition-colors"
                        />
                        {errors.username && (
                            <p className="text-red-400 text-xs mt-1">{errors.username.message}</p>
                        )}
                    </div>

                    <div>
                        <input
                            type="email"
                            placeholder="Email"
                            {...register('email')}
                            className="w-full px-5 py-2 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-white/40 focus:outline-none focus:border-white/20 transition-colors"
                        />
                        {errors.email && (
                            <p className="text-red-400 text-xs mt-1">{errors.email.message}</p>
                        )}
                    </div>

                    <div>
                        <input
                            type="password"
                            placeholder="Password"
                            {...register('password')}
                            className="w-full px-5 py-2 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-white/40 focus:outline-none focus:border-white/20 transition-colors"
                        />
                        {errors.password && (
                            <p className="text-red-400 text-xs mt-1">{errors.password.message}</p>
                        )}
                    </div>

                    <div>
                        <input
                            type="password"
                            placeholder="Confirm password"
                            {...register('confirmPassword')}
                            className="w-full px-5 py-2 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-white/40 focus:outline-none focus:border-white/20 transition-colors"
                        />
                        {errors.confirmPassword && (
                            <p className="text-red-400 text-xs mt-1">{errors.confirmPassword.message}</p>
                        )}
                    </div>

                    {errorMessage && (
                        <div className="p-2.5 rounded-2xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
                            {errorMessage}
                        </div>
                    )}

                    <Button
                        className="w-full !h-10 !bg-white/10 hover:!bg-white/15 !border-0 !rounded-2xl !cursor-pointer !transition-colors"
                        type="submit"
                    >
                        Create account
                    </Button>

                    <p className="text-sm text-center text-white/40">
                        Already have an account?{" "}
                        <NavLink to="/login" className="text-white hover:text-white/90">
                            Sign in
                        </NavLink>
                    </p>
                </form>
            </motion.div>
        </Container>
    );
}

import React, { useContext } from 'react';
import Container from '../components/Container';
import { Navigate, NavLink } from 'react-router-dom';
import { Button } from '@radix-ui/themes';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { motion } from 'framer-motion';
import AuthContext from '../context/AuthProvider';
import { LogIn } from 'lucide-react';

const schema = yup.object().shape({
    email: yup.string().email('Invalid email format').required('Email is required'),
    password: yup.string()
        .required('Password is required')
        .min(8, 'Password must be at least 8 characters long')
        .matches(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
            'Password must contain at least one uppercase letter, lowercase letter, number and special character'
        )
});

export default function Login() {
    const { login, errorMessage, auth, loading } = useContext(AuthContext);
    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema),
    });

    if (loading) return <div>Loading...</div>;
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
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className='!w-full min-w-96 mx-auto -mt-24'
            >
                <div className="text-center mb-6">
                    <div className="w-12 h-12 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-3">
                        <LogIn className="w-6 h-6 text-white/80" />
                    </div>
                    <h1 className="text-xl font-medium">Welcome back</h1>
                    <p className="text-sm text-white/60 mt-1">Sign in to continue</p>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
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

                    {errorMessage && (
                        <div className="p-2.5 rounded-2xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
                            {errorMessage}
                        </div>
                    )}

                    <Button
                        className="!w-full !h-10 !bg-white/10 hover:!bg-white/15 !border-0 !rounded-2xl !cursor-pointer !transition-colors"
                        type="submit"
                    >
                        Sign in
                    </Button>

                    <div className="text-sm text-center space-y-1.5">
                        <p className="text-white/40">
                            Don't have an account?{" "}
                            <NavLink to="/signup" className="text-white hover:text-white/90">
                                Create one
                            </NavLink>
                        </p>
                        <button type="button" className="text-white/40 hover:text-white/90">
                            Forgot password?
                        </button>
                    </div>
                </form>
            </motion.div>
        </Container>
    );
}

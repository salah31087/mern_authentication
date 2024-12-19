import React, { useState, useEffect, createContext, useCallback } from 'react';
import axios from '../configs/axios';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState(false);
    const [loading, setLoading] = useState(true);
    const [errorMessage, setErrorMessage] = useState('');
    const [csrf, setCsrf] = useState('');
    const navigate = useNavigate();

    // Function to handle unauthorized responses
    const handleUnauthorized = useCallback(() => {
        setAuth(false);
        setErrorMessage('Session expired. Please login again.');
        navigate('/login');
    }, [navigate]);

    // Add axios interceptors
    useEffect(() => {
        // Request interceptor for adding CSRF token
        const requestInterceptor = axios.interceptors.request.use(
            (config) => {
                if (csrf) {
                    config.headers['XSRF-TOKEN'] = csrf;
                }
                return config;
            },
            (error) => Promise.reject(error)
        );

        // Response interceptor for handling token expiration
        const responseInterceptor = axios.interceptors.response.use(
            (response) => response,
            (error) => {
                if (error.response?.status === 401) {
                    handleUnauthorized();
                }
                return Promise.reject(error);
            }
        );

        // Cleanup interceptors
        return () => {
            axios.interceptors.request.eject(requestInterceptor);
            axios.interceptors.response.eject(responseInterceptor);
        };
    }, [csrf, handleUnauthorized]);

    useEffect(() => {
        const checkAuth = async () => {
            try {
                await axios.get('/check-auth', { withCredentials: true }); // API that checks if the user is authenticated
                console.log('Authentication check successful');
                setAuth(true);  // User is authenticated
            } catch (error) {
                // Check if it's an Axios error and handle specific status codes
                if (error.response) {
                    // Server responded with a status other than 2xx
                    if (error.response.status === 401) {
                        console.error('Unauthorized: You are not logged in.');
                        // Optionally, redirect to login or display an appropriate message
                    } else if (error.response.status === 403) {
                        console.error('Forbidden: You do not have the right permissions.');
                    } else {
                        console.error(`Error ${error.response.status}: ${error.response.data.message || 'Something went wrong'}`);
                    }
                } else if (error.request) {
                    // No response from the server
                    console.error('No response from the server. Please check your network or try again later.');
                } else {
                    // Something went wrong in setting up the request
                    console.error('Error setting up the request:', error.message);
                }
                setAuth(false); // User is not authenticated
            } finally {
                setLoading(false);  // Auth check is done
            }
        };

        const getCsrf = async () => {
            try {
                const response = await axios.get('/csrf-token', { withCredentials: true });
                const { csrfToken } = response.data;
                setCsrf(csrfToken);
            } catch (error) {
                console.error('Error fetching CSRF token:', error);
            }
        };

        getCsrf();
        checkAuth();
    }, []);

    //? Login function
    const login = async (email, password) => {
        try {
            const response = await axios.post('/login', { email, password }, {
                withCredentials: true
            });
            const { token } = response.data;
            setAuth({ token });
            setErrorMessage('');
            navigate('/dashboard');
        } catch (error) {
            if (error.response) {
                const status = error.response.status;
                if (status === 401) {
                    setErrorMessage('Invalid email or password');
                } else if (status === 403) {
                    setErrorMessage('Access denied');
                } else if (status === 429) {
                    setErrorMessage('Too many attempts. Please try again later.');
                } else {
                    setErrorMessage(error.response.data.message || 'An error occurred');
                }
            } else if (error.request) {
                setErrorMessage('No response from server. Please check your connection.');
            } else {
                setErrorMessage('An unexpected error occurred');
            }
            console.error('Login error:', error);
        }
    };

    //? Signup function
    const signup = async (username, email, password) => {
        try {
            const response = await axios.post('/signup', { username, email, password }, {
                withCredentials: true
            });
            const { token } = response.data;
            setAuth({ token });
            setErrorMessage('');
            navigate('/dashboard');
        } catch (error) {
            if (error.response) {
                const status = error.response.status;
                if (status === 400) {
                    setErrorMessage(error.response.data.message || 'Invalid input');
                } else if (status === 409) {
                    setErrorMessage('Email already exists');
                } else if (status === 429) {
                    setErrorMessage('Too many attempts. Please try again later.');
                } else {
                    setErrorMessage(`Error: ${error.response.data.message || 'Signup failed'}`);
                }
            } else if (error.request) {
                setErrorMessage('No response from server. Please try again later.');
            } else {
                setErrorMessage('An unexpected error occurred');
            }
            console.error('Signup error:', error);
        }
    };

    //? Logout function
    const logout = async () => {
        try {
            await axios.post('/logout', {}, {
                withCredentials: true
            });
            setAuth(false);
            navigate('/login');
        } catch (error) {
            console.error('Logout error:', error);
            // Force logout on client side even if server request fails
            setAuth(false);
            navigate('/login');
        }
    };

    return (
        <AuthContext.Provider value={{ auth, setAuth, csrf, loading, login, signup, logout, errorMessage }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;

import React, { useState, useEffect, createContext } from 'react';
import axios from '../configs/axios';

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState(false);
    const [loading, setLoading] = useState(true);
    const [errorMessage, setErrorMessage] = useState('');
    const [csrf, setCsrf] = useState('')

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
                withCredentials: true,
                headers: { 'XSRF-TOKEN': csrf }
            });
            const { token } = response.data;
            setAuth({ token });
            console.log('Login successful');
            setErrorMessage(''); // Clear any previous error messages
        } catch (error) {
            // Enhanced error handling based on the response
            if (error.response) {
                const status = error.response.status;

                // Capture error messages based on status
                if (status === 401) {
                    setErrorMessage('Unauthorized: Invalid email or password');
                } else if (status === 403) {
                    setErrorMessage('Forbidden: Access denied');
                } else {
                    setErrorMessage(error.response.data.message || 'An error occurred');
                }
            } else if (error.request) {
                // Handle network errors
                setErrorMessage('No response from server. Please check your network connection.');
            } else {
                // General client-side error
                setErrorMessage(error.message);
            }
        }
    };

    //? Signup function
    const signup = async (username, email, password) => {
        try {
            const response = await axios.post('/signup', { username, email, password }, {
                withCredentials: true,
                headers: { 'XSRF-TOKEN': csrf }
            });

            const { token } = response.data;

            // Set authentication token (or any other auth-related state)
            setAuth({ token });

            console.log('Signup successful');
            setErrorMessage(''); // Clear error messages on successful signup
        } catch (error) {
            // Enhanced error handling
            if (error.response) {
                const status = error.response.status;
                if (status === 400) {
                    setErrorMessage(error.response.data.message || 'Invalid input');
                } else if (status === 409) {
                    setErrorMessage('User already exists');
                } else {
                    setErrorMessage(`Error ${status}: ${error.response.data.message || 'Signup failed'}`);
                }
            } else if (error.request) {
                setErrorMessage('No response from the server. Please try again later.');
            } else {
                setErrorMessage(error.message);
            }

            console.error('Signup failed:', error);
        }
    };

    //? Logout function
    const logout = async () => {
        try {
            await axios.post('/logout', {}, {
                withCredentials: true,
                headers: { 'XSRF-TOKEN': csrf }
            }); // Call your logout API if necessary
            setAuth(false); // Clear authentication state
            console.log('Logout successful');
        } catch (error) {
            console.error('Logout failed:', error);
        }
    };


    return (
        <AuthContext.Provider value={{ auth, setAuth, csrf, loading, login, signup, logout, errorMessage }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;


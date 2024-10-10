import csurf from 'csurf';
import { Router } from "express";
import { login, logout, signup } from "../controllers/authControllers.js";
import { protectRoute } from "../middlewares/authMiddleware.js";



//! CSRF protection middleware
// const csrfProtection = csurf({
//     cookie: {
//         httpOnly: true,  // Set cookie as HTTP-only
//         secure: process.env.NODE_ENV === 'production', // Secure in production
//         sameSite: 'Strict', // Prevent CSRF attacks
//     }
// });


const authRoutes = Router();

authRoutes.post('/signup', signup);
authRoutes.post('/login', login)
authRoutes.post('/logout', protectRoute, logout)




export default authRoutes
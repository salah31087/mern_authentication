import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import mongoose from './configs/db.js'; // Import DB configuration
import authRoutes from './routes/authRoutes.js';
import protectedRoutes from './routes/protectedRoutes.js';
import publicRoutes from './routes/publicRoutes.js';
import cookieParser from 'cookie-parser';
import csurf from 'csurf'; // Import CSRF middleware
import rateLimit from 'express-rate-limit';



const app = express();
app.use(express.json()); // Parse incoming JSON request bodies
//todo ====== RATE LIMITER CONFIGURATION ======
const limiter = rateLimit({
    windowMs: 2 * 60 * 1000, // 2 minutes
    max: 10, // Limit each IP to 100 requests per windowMs
    message: 'Too many requests from this IP, please try again after 2 minutes',
    headers: true, // Send rate limit information in headers
});
//todo ======= MIDDLEWARES =======
app.use(limiter);
app.use(cors({
    origin: 'http://localhost:5173', // Specify the origin for CORS
    credentials: true // Allow credentials (e.g., cookies) to be sent with requests
}));
app.use(express.static('public')); // Serve static files from the 'public' directory
app.use(cookieParser()); // Parse cookies attached to the request
app.use(helmet()); // Set security-related HTTP headers




//todo ======= DATABASE CONNECTION =======
mongoose.connection.on('connected', () => {
    console.log('Connected to MongoDB');
});

mongoose.connection.on('error', (error) => {
    console.error('MongoDB connection error:', error);
});
//todo ======= DATABASE CONNECTION =======




const csrfProtection = csurf({ cookie: true });
// todo ======= Get CSRF token =======
app.get('/csrf-token', csrfProtection, (req, res) => {
    res.json({ csrfToken: req.csrfToken() });
});
// todo ======= Get CSRF token =======



//todo ======= ROUTES =======
app.use(csrfProtection, authRoutes); // Authentication routes (login, signup, etc.) (with CSRF)
app.use(protectedRoutes); // Routes that require authentication
app.use(publicRoutes); // Routes that do not require authentication
//todo ======= ROUTES =======



//todo ======= CSRF error handling middleware =======
app.use((err, req, res, next) => {
    if (err.code === 'EBADCSRFTOKEN') {
        // Handle CSRF token errors
        return res.status(403).json({ message: 'Invalid CSRF token. Please reload the page and try again.' });
    }

    // Handle other errors
    console.error(err);
    return res.status(500).json({ message: 'An unexpected error occurred. Please try again later.' });
});



//todo ======= START SERVER =======
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

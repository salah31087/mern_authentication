import { Router } from "express";
import { protectRoute } from "../middlewares/authMiddleware.js";

const protectedRoutes = Router();


protectedRoutes.get('/check-auth', protectRoute, (req, res) => {
    res.send('You are logged in!');
});
export default protectedRoutes
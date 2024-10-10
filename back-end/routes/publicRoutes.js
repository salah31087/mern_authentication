import { Router } from "express";



const publicRoutes = Router();

publicRoutes.get('/random_1', (req, res) => {
    res.send('This is public route');
});
publicRoutes.get('/random_2', (req, res) => {
    res.send('This is public route');
})
publicRoutes.get('/random_3', (req, res) => {
    res.send('This is public route');
})


export default publicRoutes
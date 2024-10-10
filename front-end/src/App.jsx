import React from 'react'
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Header from './components/Header';
import Signup from './pages/Signup';
import { AnimatePresence } from 'framer-motion';
import Dashboard from './pages/Dashboard';
import ProtectedRoutes from './utils/ProtectedRoutes';


export default function App() {
  const location = useLocation();
  return (
    <>
      <Header />
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path='/' element={<Home />} />
          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<Signup />} />
          <Route element={<ProtectedRoutes />}>
            <Route path='/dashboard' element={<Dashboard />} />
          </Route>
        </Routes >
      </AnimatePresence>
    </>
  )
}

import React from 'react'
import Container from '../components/Container'
import { motion } from 'framer-motion';


export default function Dashboard() {
    return (
        <Container>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className='-mt-32 bg-[#1a1a1a] border border-[#29292b] rounded-md p-10'>
                <h1 className='text-3xl font-semibold'>Dashboard</h1>

                {/* User Info Section */}
                <div className="mt-8">
                    <h2 className="text-2xl font-medium text-white">Welcome back, John Doe!</h2>
                    <p className="text-white text-opacity-40 mt-1">Here’s a summary of your account activity:</p>
                </div>

                {/* Random Metrics Section */}
                <div className="grid grid-cols-3 gap-6 mt-6">
                    <div className="bg-[#2a2a2a] p-4 rounded-lg">
                        <h3 className="text-xl font-semibold text-white">Total Bookings</h3>
                        <p className="text-4xl font-bold text-green-400">120</p>
                        <p className="text-white text-opacity-40 mt-1">+15% from last month</p>
                    </div>
                    <div className="bg-[#2a2a2a] p-4 rounded-lg">
                        <h3 className="text-xl font-semibold text-white">Cars Available</h3>
                        <p className="text-4xl font-bold text-green-400">45</p>
                        <p className="text-white text-opacity-40 mt-1">4 cars added this week</p>
                    </div>
                    <div className="bg-[#2a2a2a] p-4 rounded-lg">
                        <h3 className="text-xl font-semibold text-white">Upcoming Reservations</h3>
                        <p className="text-4xl font-bold text-green-400">8</p>
                        <p className="text-white text-opacity-40 mt-1">Next reservation in 2 hours</p>
                    </div>
                </div>

                {/* Recent Activities Section */}
                <div className="mt-8">
                    <h2 className="text-2xl font-medium text-white">Recent Activities</h2>
                    <ul className="list-none mt-4">
                        <li className="text-white text-opacity-60 mb-2">✔️ You added a new car: <span className="font-bold text-white">Tesla Model S</span></li>
                        <li className="text-white text-opacity-60 mb-2">✔️ Reservation confirmed for <span className="font-bold text-white">Jane Smith</span></li>
                        <li className="text-white text-opacity-60 mb-2">✔️ Payment received: <span className="font-bold text-white">$350</span> from <span className="font-bold text-white">Michael Johnson</span></li>
                    </ul>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-4 mt-10">
                    <button className="bg-green-500 px-4 py-2 rounded-lg font-semibold text-white hover:bg-green-600">
                        Add New Car
                    </button>
                    <button className="bg-blue-500 px-4 py-2 rounded-lg font-semibold text-white hover:bg-blue-600">
                        View Reservations
                    </button>
                </div>
            </motion.div>
        </Container>
    );
}

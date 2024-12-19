import React from 'react'
import Container from '../components/Container'
import { motion } from 'framer-motion';
import { LayoutDashboard, Shield, Zap, Clock, Users, Activity } from 'lucide-react';

export default function Dashboard() {
    return (
        <Container>
            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className='w-full max-w-6xl mx-auto'
            >
                <div className="text-center mb-12">
                    <LayoutDashboard className="w-12 h-12 mx-auto mb-4 text-white/80" />
                    <h1 className="text-3xl font-semibold tracking-tight">Welcome back, John!</h1>
                    <p className="text-sm text-white/60 mt-2">Here's what's happening with your account</p>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <div className="card hover:bg-white/10 transition-colors">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-lg bg-purple-500/10 flex items-center justify-center">
                                <Users className="w-6 h-6 text-purple-500" />
                            </div>
                            <div>
                                <p className="text-sm text-white/60">Total Users</p>
                                <p className="text-2xl font-semibold">2,543</p>
                            </div>
                        </div>
                    </div>

                    <div className="card hover:bg-white/10 transition-colors">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-lg bg-cyan-500/10 flex items-center justify-center">
                                <Activity className="w-6 h-6 text-cyan-500" />
                            </div>
                            <div>
                                <p className="text-sm text-white/60">Active Now</p>
                                <p className="text-2xl font-semibold">143</p>
                            </div>
                        </div>
                    </div>

                    <div className="card hover:bg-white/10 transition-colors">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-lg bg-green-500/10 flex items-center justify-center">
                                <Clock className="w-6 h-6 text-green-500" />
                            </div>
                            <div>
                                <p className="text-sm text-white/60">Uptime</p>
                                <p className="text-2xl font-semibold">99.9%</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Features Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                    <div className="card hover:bg-white/10 transition-colors">
                        <Shield className="w-8 h-8 text-purple-400 mb-4" />
                        <h3 className="text-lg font-medium mb-2">Security First</h3>
                        <p className="text-sm text-white/60">
                            Your data is protected with industry-standard encryption and security measures.
                            We regularly update our security protocols to ensure your information stays safe.
                        </p>
                    </div>

                    <div className="card hover:bg-white/10 transition-colors">
                        <Zap className="w-8 h-8 text-cyan-400 mb-4" />
                        <h3 className="text-lg font-medium mb-2">Lightning Fast</h3>
                        <p className="text-sm text-white/60">
                            Experience blazing fast performance with our optimized infrastructure.
                            Quick response times and smooth interactions are our priority.
                        </p>
                    </div>
                </div>

                {/* Recent Activity */}
                <div className="card hover:bg-white/10 transition-colors">
                    <div className="flex items-center justify-between mb-6">
                        <h3 className="text-lg font-medium">Recent Activity</h3>
                        <button className="text-sm text-white/60 hover:text-white">View all</button>
                    </div>

                    <div className="space-y-4">
                        {[
                            { icon: Shield, text: "Security check completed", time: "2 hours ago" },
                            { icon: Users, text: "New team member added", time: "4 hours ago" },
                            { icon: Activity, text: "System update completed", time: "6 hours ago" }
                        ].map((item, i) => (
                            <div key={i} className="flex items-center justify-between py-3 border-b border-white/10 last:border-0">
                                <div className="flex items-center gap-4">
                                    <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center">
                                        <item.icon className="w-4 h-4 text-white/60" />
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium">{item.text}</p>
                                        <p className="text-xs text-white/60">{item.time}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </motion.div>
        </Container>
    );
}

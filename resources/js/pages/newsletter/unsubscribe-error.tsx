import React from 'react';
import { Head } from '@inertiajs/react';
import { motion } from 'framer-motion';
import { AlertCircle, Mail, Home, RefreshCw } from 'lucide-react';

interface Props {
    message: string;
}

export default function UnsubscribeError({ message }: Props) {
    return (
        <>
            <Head title="Fout bij uitschrijven nieuwsbrief" />
            
            <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50 flex items-center justify-center p-4">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 text-center"
                >
                    {/* Error Icon */}
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                        className="mx-auto w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-6"
                    >
                        <AlertCircle className="w-8 h-8 text-red-600" />
                    </motion.div>

                    {/* Title */}
                    <motion.h1
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.3 }}
                        className="text-2xl font-bold text-gray-800 mb-4"
                    >
                        Oeps!
                    </motion.h1>

                    {/* Message */}
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.4 }}
                        className="text-gray-600 mb-6"
                    >
                        {message}
                    </motion.p>

                    {/* Info */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5 }}
                        className="bg-orange-50 border border-orange-200 rounded-lg p-4 mb-8"
                    >
                        <p className="text-sm text-orange-800">
                            Mogelijke oorzaken:
                        </p>
                        <ul className="text-sm text-orange-700 mt-2 space-y-1">
                            <li>• Je bent al uitgeschreven</li>
                            <li>• De link is verlopen</li>
                            <li>• Er is een technische fout opgetreden</li>
                        </ul>
                    </motion.div>

                    {/* Action Buttons */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.6 }}
                        className="space-y-3"
                    >
                        <button
                            onClick={() => window.location.reload()}
                            className="w-full inline-flex items-center justify-center space-x-2 bg-orange-500 text-white px-6 py-3 rounded-full font-medium hover:bg-orange-600 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                        >
                            <RefreshCw className="w-4 h-4" />
                            <span>Opnieuw proberen</span>
                        </button>
                        
                        <a
                            href="/"
                            className="w-full inline-flex items-center justify-center space-x-2 bg-gray-500 text-white px-6 py-3 rounded-full font-medium hover:bg-gray-600 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                        >
                            <Home className="w-4 h-4" />
                            <span>Terug naar homepage</span>
                        </a>
                    </motion.div>

                    {/* Contact Info */}
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.7 }}
                        className="text-xs text-gray-500 mt-6"
                    >
                        Heb je vragen? Neem contact op via{' '}
                        <a href="mailto:info@kritterz.nl" className="text-orange-600 hover:text-orange-700">
                            info@kritterz.nl
                        </a>
                    </motion.p>
                </motion.div>
            </div>
        </>
    );
} 
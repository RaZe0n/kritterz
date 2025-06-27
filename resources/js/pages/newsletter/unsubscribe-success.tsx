import React from 'react';
import { Head } from '@inertiajs/react';
import { motion } from 'framer-motion';
import { CheckCircle, Mail, Home } from 'lucide-react';

interface Props {
    email: string;
    message: string;
}

export default function UnsubscribeSuccess({ email, message }: Props) {
    return (
        <>
            <Head title="Uitgeschreven van nieuwsbrief" />
            
            <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50 flex items-center justify-center p-4">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 text-center"
                >
                    {/* Success Icon */}
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                        className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-6"
                    >
                        <CheckCircle className="w-8 h-8 text-green-600" />
                    </motion.div>

                    {/* Title */}
                    <motion.h1
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.3 }}
                        className="text-2xl font-bold text-gray-800 mb-4"
                    >
                        Uitgeschreven
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

                    {/* Email Display */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5 }}
                        className="bg-gray-50 rounded-lg p-4 mb-6"
                    >
                        <div className="flex items-center justify-center space-x-2">
                            <Mail className="w-4 h-4 text-gray-500" />
                            <span className="text-sm text-gray-600">{email}</span>
                        </div>
                    </motion.div>

                    {/* Info */}
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.6 }}
                        className="text-sm text-gray-500 mb-8"
                    >
                        Je ontvangt geen verdere nieuwsbrieven meer. Je kunt je altijd opnieuw inschrijven via de website.
                    </motion.p>

                    {/* Home Button */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.7 }}
                    >
                        <a
                            href="/"
                            className="inline-flex items-center space-x-2 bg-gradient-to-r from-orange-500 to-red-600 text-white px-6 py-3 rounded-full font-medium hover:from-orange-600 hover:to-red-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                        >
                            <Home className="w-4 h-4" />
                            <span>Terug naar homepage</span>
                        </a>
                    </motion.div>
                </motion.div>
            </div>
        </>
    );
} 
import React from 'react';
import { Head } from '@inertiajs/react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { motion } from 'framer-motion';

interface Event {
    id: number;
    title: string;
    image: string;
    location: string;
    date_range: string;
    description: string;
    opening_hours?: string;
    ticket_info?: string;
    status: 'current' | 'upcoming' | 'past';
    start_date?: string;
    end_date?: string;
}

interface ExhibitionsProps {
    currentEvents: Event[];
    upcomingEvents: Event[];
    recentEvents: Event[];
}

const Exhibitions: React.FC<ExhibitionsProps> = ({ currentEvents, upcomingEvents, recentEvents }) => {
    return (
        <>
            <Head title="Exhibitions | Silvercraft" />
            <div className="min-h-screen bg-white">
                <Navbar />
                
                <main className="pt-16">
                    {/* Header */}
                    <section className="py-20 px-4 md:px-8 lg:px-16 bg-gray-50">
                        <div className="max-w-4xl mx-auto text-center">
                            <motion.h1 
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8 }}
                                className="text-4xl md:text-5xl font-light mb-6 text-gray-800"
                            >
                                Exposities
                            </motion.h1>
                            <motion.p
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8, delay: 0.2 }}
                                className="text-xl text-gray-600"
                            >
                                Ontdek waar mijn werk te zien is
                            </motion.p>
                        </div>
                    </section>

                    {/* Current Exhibitions */}
                    <section className="py-16 px-4 md:px-8 lg:px-16">
                        <div className="max-w-7xl mx-auto">
                            <motion.h2 
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8 }}
                                className="text-3xl font-light mb-12 text-gray-800"
                            >
                                Huidige Events
                            </motion.h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                {currentEvents.map((exhibition, index) => (
                                    <motion.div
                                        key={exhibition.id}
                                        initial={{ opacity: 0, y: 20 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.8, delay: index * 0.2 }}
                                        className="bg-white rounded-lg overflow-hidden shadow-lg"
                                    >
                                        <div className="relative pt-[56.25%]">
                                            <img
                                                src={exhibition.image}
                                                alt={exhibition.title}
                                                className="absolute inset-0 w-full h-full object-cover"
                                                onError={(e) => {
                                                    e.currentTarget.src = '/resources/images/placeholder.jpg';
                                                }}
                                            />
                                        </div>
                                        <div className="p-6">
                                            <h3 className="text-2xl font-light mb-2">{exhibition.title}</h3>
                                            <p className="text-gray-600 mb-4">{exhibition.description}</p>
                                            <div className="space-y-2 text-sm text-gray-600">
                                                <p><strong>Locatie:</strong> {exhibition.location}</p>
                                                <p><strong>Datum:</strong> {exhibition.date_range}</p>
                                                {exhibition.opening_hours && (
                                                    <p><strong>Openingstijden:</strong> {exhibition.opening_hours}</p>
                                                )}
                                                {exhibition.ticket_info && (
                                                    <p><strong>Entree:</strong> {exhibition.ticket_info}</p>
                                                )}
                                            </div>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    </section>

                    {/* Upcoming & Recent Exhibitions */}
                    <section className="py-16 px-4 md:px-8 lg:px-16 bg-gray-50">
                        <div className="max-w-7xl mx-auto">
                            {/* Upcoming */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8 }}
                                className="mb-16"
                            >
                                <h2 className="text-3xl font-light mb-12 text-gray-800">Aankomende Events</h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                    {upcomingEvents.map((exhibition, index) => (
                                        <motion.div
                                            key={exhibition.id}
                                            initial={{ opacity: 0, y: 20 }}
                                            whileInView={{ opacity: 1, y: 0 }}
                                            transition={{ duration: 0.8, delay: index * 0.2 }}
                                            className="bg-white rounded-lg overflow-hidden shadow-md"
                                        >
                                            <div className="relative pt-[75%]">
                                                <img
                                                    src={exhibition.image}
                                                    alt={exhibition.title}
                                                    className="absolute inset-0 w-full h-full object-cover"
                                                    onError={(e) => {
                                                        e.currentTarget.src = '/resources/images/placeholder.jpg';
                                                    }}
                                                />
                                            </div>
                                            <div className="p-6">
                                                <h3 className="text-xl font-light mb-2">{exhibition.title}</h3>
                                                <p className="text-gray-600 mb-4">{exhibition.description}</p>
                                                <div className="text-sm text-gray-600">
                                                    <p><strong>Locatie:</strong> {exhibition.location}</p>
                                                    <p><strong>Datum:</strong> {exhibition.date_range}</p>
                                                </div>
                                            </div>
                                        </motion.div>
                                    ))}
                                </div>
                            </motion.div>

                            {/* Recent */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8 }}
                            >
                                <h2 className="text-3xl font-light mb-12 text-gray-800">Recente Events</h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                    {recentEvents.map((exhibition, index) => (
                                        <motion.div
                                            key={exhibition.id}
                                            initial={{ opacity: 0, y: 20 }}
                                            whileInView={{ opacity: 1, y: 0 }}
                                            transition={{ duration: 0.8, delay: index * 0.2 }}
                                            className="bg-white rounded-lg overflow-hidden shadow-md opacity-80"
                                        >
                                            <div className="relative pt-[75%]">
                                                <img
                                                    src={exhibition.image}
                                                    alt={exhibition.title}
                                                    className="absolute inset-0 w-full h-full object-cover grayscale"
                                                    onError={(e) => {
                                                        e.currentTarget.src = '/resources/images/placeholder.jpg';
                                                    }}
                                                />
                                            </div>
                                            <div className="p-6">
                                                <h3 className="text-xl font-light mb-2">{exhibition.title}</h3>
                                                <p className="text-gray-600 mb-4">{exhibition.description}</p>
                                                <div className="text-sm text-gray-600">
                                                    <p><strong>Locatie:</strong> {exhibition.location}</p>
                                                    <p><strong>Datum:</strong> {exhibition.date_range}</p>
                                                </div>
                                            </div>
                                        </motion.div>
                                    ))}
                                </div>
                            </motion.div>
                        </div>
                    </section>
                </main>

                <Footer />
            </div>
        </>
    );
};

export default Exhibitions; 
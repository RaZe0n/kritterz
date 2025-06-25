import React, { useState, useEffect } from 'react';
import { Head } from '@inertiajs/react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { motion } from 'framer-motion';
import { FaEnvelope, FaPhone, FaMapMarkerAlt, FaInstagram, FaFacebook } from 'react-icons/fa';
import { gsap } from 'gsap';

const Contact = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    });

    const [activeField, setActiveField] = useState('');

    useEffect(() => {
        // Page transition animation
        gsap.fromTo('.page-content', 
            {
                opacity: 0,
                y: 30
            },
            {
                opacity: 1,
                y: 0,
                duration: 0.8,
                ease: "power2.out"
            }
        );
    }, []);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log('Form submitted:', formData);
        alert('Bedankt voor je bericht! Deze functie wordt binnenkort geïmplementeerd.');
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const contactInfo = [
        {
            icon: FaEnvelope,
            title: 'Email',
            content: 'kritterzart@gmail.com',
            link: 'mailto:kritterzart@gmail.com',
            description: 'Stuur een directe email'
        },
        {
            icon: FaPhone,
            title: 'Telefoon',
            content: '+31 6 50437633',
            link: 'tel:+31650437633',
            description: 'Bij voorkeur contact via email/sociale media'
        },
        {
            icon: FaMapMarkerAlt,
            title: 'Atelier',
            content: 'Zuidhorn, Groningen',
            link: 'https://maps.google.com/?q=Zuidhorn,Groningen',
            description: 'Bezoekadres op aanvraag'
        }
    ];

    const socialLinks = [
        {
            icon: FaInstagram,
            name: 'Instagram',
            link: 'https://www.instagram.com/kritterz.nl/',
            color: 'from-pink-500 to-purple-600'
        },
        {
            icon: FaFacebook,
            name: 'Facebook',
            link: 'https://www.facebook.com/kritterz.kritterz/',
            color: 'from-blue-500 to-blue-600'
        }
    ];

    return (
        <>
            <Head title="Contact | KritterZ" />
            <div className="min-h-screen bg-white">
                <Navbar />
                
                <main className="pt-16 page-content bg-gradient-to-br from-orange-50 via-white to-orange-50/30">
                    {/* Hero Section with Split Design */}
                    <section className="relative max-w-7xl mx-auto min-h-screen flex items-center">
                        {/* Left Side - Contact Info */}
                        <div className="w-full lg:w-1/2 p-8 lg:p-24">
                            <motion.div
                                initial={{ opacity: 0, x: -50 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.8 }}
                                className="max-w-lg mx-auto lg:ml-0"
                            >
                                <div className="w-16 h-1 bg-gradient-to-r from-orange-400 to-red-500 rounded-full mb-8"></div>
                                <h1 className="text-4xl lg:text-5xl font-light mb-6 text-gray-800">
                                    Kom in contact.
                                </h1>
                                <p className="text-xl text-gray-600 mb-12 leading-relaxed">
                                    Ben je geïnteresseerd in een unieke KritterZ of heb je vragen over mijn werk? 
                                    Ik hoor graag van je!
                                </p>

                                {/* Contact Cards */}
                                <div className="space-y-6 mb-12">
                                    {contactInfo.map((info, index) => (
                                        <motion.a
                                            key={info.title}
                                            href={info.link}
                                            target={info.icon === FaMapMarkerAlt ? "_blank" : undefined}
                                            rel={info.icon === FaMapMarkerAlt ? "noopener noreferrer" : undefined}
                                            initial={{ opacity: 0, x: -30 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ duration: 0.6, delay: index * 0.1 }}
                                            className="group flex items-center p-6 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-orange-200"
                                        >
                                            <div className="w-14 h-14 bg-gradient-to-br from-orange-100 to-red-100 rounded-xl flex items-center justify-center mr-6 group-hover:from-orange-200 group-hover:to-red-200 transition-all duration-300">
                                                <info.icon className="text-xl text-orange-600 group-hover:scale-110 transition-transform duration-300" />
                                            </div>
                                            <div>
                                                <h3 className="text-lg font-medium text-gray-800 mb-1">{info.title}</h3>
                                                <p className="text-gray-600 font-medium">{info.content}</p>
                                                <p className="text-sm text-orange-600">{info.description}</p>
                                            </div>
                                        </motion.a>
                                    ))}
                                </div>

                                {/* Social Links */}
                                <div>
                                    <h3 className="text-lg font-medium text-gray-800 mb-4">Volg me op social media</h3>
                                    <div className="flex space-x-4">
                                        {socialLinks.map((social, index) => (
                                            <motion.a
                                                key={social.name}
                                                href={social.link}
                                                initial={{ opacity: 0, y: 20 }}
                                                animate={{ opacity: 1, y: 0}}
                                                transition={{ duration: 0.6, delay: 0.5 + index * 0.1 }}
                                                className="group w-12 h-12 bg-gradient-to-r from-orange-100 to-red-100 rounded-xl flex items-center justify-center hover:from-orange-200 hover:to-red-200 transition-all duration-300"
                                            >
                                                <social.icon className="text-xl text-orange-600 group-hover:scale-110 transition-transform duration-300" />
                                            </motion.a>
                                        ))}
                                    </div>
                                </div>
                            </motion.div>
                        </div>

                        {/* Right Side - Contact Form */}
                        <div className="w-full lg:w-1/2 p-8 lg:p-24">
                            <motion.div
                                initial={{ opacity: 0, x: 50 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.8, delay: 0.2 }}
                                className="max-w-lg mx-auto lg:mr-0"
                            >
                                <div className="text-center mb-8">
                                    <div className="w-16 h-1 bg-gradient-to-r from-orange-400 to-red-500 rounded-full mx-auto mb-6"></div>
                                    <h2 className="text-3xl font-light mb-4 text-gray-800">Stuur een bericht</h2>
                                    <p className="text-gray-600">
                                        Vertel me over je project of vraag
                                    </p>
                                </div>

                                <form onSubmit={handleSubmit} className="space-y-6">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <motion.div
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ duration: 0.6, delay: 0.3 }}
                                        >
                                            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                                                Naam *
                                            </label>
                                            <div className="relative">
                                                <input
                                                    type="text"
                                                    id="name"
                                                    name="name"
                                                    value={formData.name}
                                                    onChange={handleChange}
                                                    onFocus={() => setActiveField('name')}
                                                    onBlur={() => setActiveField('')}
                                                    className={`w-full px-4 py-4 border-2 rounded-xl transition-all duration-300 bg-white ${
                                                        activeField === 'name' 
                                                            ? 'border-orange-500 shadow-lg shadow-orange-100' 
                                                            : 'border-gray-200 hover:border-orange-300'
                                                    }`}
                                                    required
                                                />
                                                {activeField === 'name' && (
                                                    <motion.div
                                                        initial={{ scale: 0 }}
                                                        animate={{ scale: 1 }}
                                                        className="absolute -top-2 -right-2 w-6 h-6 bg-orange-500 rounded-full flex items-center justify-center"
                                                    >
                                                        <div className="w-2 h-2 bg-white rounded-full"></div>
                                                    </motion.div>
                                                )}
                                            </div>
                                        </motion.div>

                                        <motion.div
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ duration: 0.6, delay: 0.4 }}
                                        >
                                            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                                                Email *
                                            </label>
                                            <div className="relative">
                                                <input
                                                    type="email"
                                                    id="email"
                                                    name="email"
                                                    value={formData.email}
                                                    onChange={handleChange}
                                                    onFocus={() => setActiveField('email')}
                                                    onBlur={() => setActiveField('')}
                                                    className={`w-full px-4 py-4 border-2 rounded-xl transition-all duration-300 bg-white ${
                                                        activeField === 'email' 
                                                            ? 'border-orange-500 shadow-lg shadow-orange-100' 
                                                            : 'border-gray-200 hover:border-orange-300'
                                                    }`}
                                                    required
                                                />
                                                {activeField === 'email' && (
                                                    <motion.div
                                                        initial={{ scale: 0 }}
                                                        animate={{ scale: 1 }}
                                                        className="absolute -top-2 -right-2 w-6 h-6 bg-orange-500 rounded-full flex items-center justify-center"
                                                    >
                                                        <div className="w-2 h-2 bg-white rounded-full"></div>
                                                    </motion.div>
                                                )}
                                            </div>
                                        </motion.div>
                                    </div>

                                    <motion.div
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.6, delay: 0.5 }}
                                    >
                                        <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                                            Onderwerp *
                                        </label>
                                        <div className="relative">
                                            <input
                                                type="text"
                                                id="subject"
                                                name="subject"
                                                value={formData.subject}
                                                onChange={handleChange}
                                                onFocus={() => setActiveField('subject')}
                                                onBlur={() => setActiveField('')}
                                                className={`w-full px-4 py-4 border-2 rounded-xl transition-all duration-300 bg-white ${
                                                    activeField === 'subject' 
                                                        ? 'border-orange-500 shadow-lg shadow-orange-100' 
                                                        : 'border-gray-200 hover:border-orange-300'
                                                }`}
                                                required
                                            />
                                            {activeField === 'subject' && (
                                                <motion.div
                                                    initial={{ scale: 0 }}
                                                    animate={{ scale: 1 }}
                                                    className="absolute -top-2 -right-2 w-6 h-6 bg-orange-500 rounded-full flex items-center justify-center"
                                                >
                                                    <div className="w-2 h-2 bg-white rounded-full"></div>
                                                </motion.div>
                                            )}
                                        </div>
                                    </motion.div>

                                    <motion.div
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.6, delay: 0.6 }}
                                    >
                                        <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                                            Bericht *
                                        </label>
                                        <div className="relative">
                                            <textarea
                                                id="message"
                                                name="message"
                                                value={formData.message}
                                                onChange={handleChange}
                                                onFocus={() => setActiveField('message')}
                                                onBlur={() => setActiveField('')}
                                                rows={6}
                                                className={`w-full px-4 py-4 border-2 rounded-xl transition-all duration-300 bg-white resize-none ${
                                                    activeField === 'message' 
                                                        ? 'border-orange-500 shadow-lg shadow-orange-100' 
                                                        : 'border-gray-200 hover:border-orange-300'
                                                }`}
                                                required
                                            />
                                            {activeField === 'message' && (
                                                <motion.div
                                                    initial={{ scale: 0 }}
                                                    animate={{ scale: 1 }}
                                                    className="absolute -top-2 -right-2 w-6 h-6 bg-orange-500 rounded-full flex items-center justify-center"
                                                >
                                                    <div className="w-2 h-2 bg-white rounded-full"></div>
                                                </motion.div>
                                            )}
                                        </div>
                                    </motion.div>

                                    <motion.div
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.6, delay: 0.7 }}
                                        className="pt-4"
                                    >
                                        <button
                                            type="submit"
                                            className="w-full bg-gradient-to-r from-orange-500 to-red-600 text-white py-4 rounded-xl font-medium hover:from-orange-600 hover:to-red-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                                        >
                                            Verstuur Bericht
                                        </button>
                                    </motion.div>
                                </form>
                            </motion.div>
                        </div>
                    </section>
                </main>

                <Footer />
            </div>
        </>
    );
};

export default Contact; 
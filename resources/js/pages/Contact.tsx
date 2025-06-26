import React, { useState, useEffect } from 'react';
import { Head, router } from '@inertiajs/react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { motion } from 'framer-motion';
import { FaEnvelope, FaPhone, FaMapMarkerAlt, FaInstagram, FaFacebook } from 'react-icons/fa';
import { gsap } from 'gsap';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';

interface ContactProps {
    auth?: {
        user?: {
            id: number;
            name: string;
            email: string;
            role: string;
        } | null;
    };
}

const Contact: React.FC<ContactProps> = ({ auth }) => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    });

    const [activeField, setActiveField] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [modalType, setModalType] = useState<'success' | 'error'>('success');
    const [modalMessage, setModalMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);

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

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        setIsLoading(true);
        
        try {
            const response = await fetch('/contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') || '',
                },
                body: JSON.stringify(formData)
            });

            const result = await response.json();

            if (result.success) {
                showSuccessModal(result.message);
                // Reset form
                setFormData({
                    name: '',
                    email: '',
                    subject: '',
                    message: ''
                });
            } else {
                showErrorModal(result.message || 'Er is een fout opgetreden.');
            }
        } catch (error) {
            console.error('Error:', error);
            showErrorModal('Er is een fout opgetreden. Probeer het later opnieuw.');
        } finally {
            setIsLoading(false);
        }
    };

    const showSuccessModal = (message: string) => {
        setModalType('success');
        setModalMessage(message);
        setShowModal(true);
    };

    const showErrorModal = (message: string) => {
        setModalType('error');
        setModalMessage(message);
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
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
                    <section className="relative max-w-7xl mx-auto py-12 lg:py-0 lg:min-h-screen lg:flex lg:items-center">
                        {/* Left Side - Contact Info */}
                        <div className="w-full lg:w-1/2 p-6 lg:p-24">
                            <motion.div
                                initial={{ opacity: 0, x: -50 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.8 }}
                                className="max-w-lg mx-auto lg:ml-0"
                            >
                                <div className="w-16 h-1 bg-gradient-to-r from-orange-400 to-red-500 rounded-full mb-6 lg:mb-8"></div>
                                <h1 className="text-3xl lg:text-4xl xl:text-5xl font-light mb-4 lg:mb-6 text-gray-800">
                                    Kom in contact.
                                </h1>
                                <p className="text-lg lg:text-xl text-gray-600 mb-8 lg:mb-12 leading-relaxed">
                                    Ben je geïnteresseerd in een unieke KritterZ of heb je vragen over mijn werk? 
                                    Ik hoor graag van je!
                                </p>

                                {/* Contact Cards */}
                                <div className="space-y-4 lg:space-y-6 mb-8 lg:mb-12">
                                    {contactInfo.map((info, index) => (
                                        <motion.a
                                            key={info.title}
                                            href={info.link}
                                            target={info.icon === FaMapMarkerAlt ? "_blank" : undefined}
                                            rel={info.icon === FaMapMarkerAlt ? "noopener noreferrer" : undefined}
                                            initial={{ opacity: 0, x: -30 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ duration: 0.6, delay: index * 0.1 }}
                                            className="group flex items-center p-4 lg:p-6 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-orange-200"
                                        >
                                            <div className="w-12 h-12 lg:w-14 lg:h-14 bg-gradient-to-br from-orange-100 to-red-100 rounded-xl flex items-center justify-center mr-4 lg:mr-6 group-hover:from-orange-200 group-hover:to-red-200 transition-all duration-300 flex-shrink-0">
                                                <info.icon className="text-lg lg:text-xl text-orange-600 group-hover:scale-110 transition-transform duration-300" />
                                            </div>
                                            <div className="min-w-0 flex-1">
                                                <h3 className="text-base lg:text-lg font-medium text-gray-800 mb-1">{info.title}</h3>
                                                <p className="text-sm lg:text-base text-gray-600 font-medium break-words">{info.content}</p>
                                                <p className="text-xs lg:text-sm text-orange-600">{info.description}</p>
                                            </div>
                                        </motion.a>
                                    ))}
                                </div>

                                {/* Social Links */}
                                <div>
                                    <h3 className="text-base lg:text-lg font-medium text-gray-800 mb-3 lg:mb-4">Volg me op social media</h3>
                                    <div className="flex space-x-3 lg:space-x-4">
                                        {socialLinks.map((social, index) => (
                                            <motion.a
                                                key={social.name}
                                                href={social.link}
                                                initial={{ opacity: 0, y: 20 }}
                                                animate={{ opacity: 1, y: 0}}
                                                transition={{ duration: 0.6, delay: 0.5 + index * 0.1 }}
                                                className="group w-10 h-10 lg:w-12 lg:h-12 bg-gradient-to-r from-orange-100 to-red-100 rounded-xl flex items-center justify-center hover:from-orange-200 hover:to-red-200 transition-all duration-300"
                                            >
                                                <social.icon className="text-lg lg:text-xl text-orange-600 group-hover:scale-110 transition-transform duration-300" />
                                            </motion.a>
                                        ))}
                                    </div>
                                </div>
                            </motion.div>
                        </div>

                        {/* Right Side - Contact Form */}
                        <div className="w-full lg:w-1/2 p-6 lg:p-24">
                            <motion.div
                                initial={{ opacity: 0, x: 50 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.8, delay: 0.2 }}
                                className="max-w-lg mx-auto lg:mr-0"
                            >
                                <div className="text-center mb-6 lg:mb-8">
                                    <div className="w-16 h-1 bg-gradient-to-r from-orange-400 to-red-500 rounded-full mx-auto mb-4 lg:mb-6"></div>
                                    <h2 className="text-2xl lg:text-3xl font-light mb-3 lg:mb-4 text-gray-800">Stuur een bericht</h2>
                                    <p className="text-sm lg:text-base text-gray-600">
                                        Vertel me over je project of vraag
                                    </p>
                                </div>

                                <form onSubmit={handleSubmit} className="space-y-4 lg:space-y-6">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6">
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
                                                    className={`w-full px-3 lg:px-4 py-3 lg:py-4 border-2 rounded-xl transition-all duration-300 bg-white text-sm lg:text-base ${
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
                                                    className={`w-full px-3 lg:px-4 py-3 lg:py-4 border-2 rounded-xl transition-all duration-300 bg-white text-sm lg:text-base ${
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
                                                className={`w-full px-3 lg:px-4 py-3 lg:py-4 border-2 rounded-xl transition-all duration-300 bg-white text-sm lg:text-base ${
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
                                                rows={5}
                                                className={`w-full px-3 lg:px-4 py-3 lg:py-4 border-2 rounded-xl transition-all duration-300 bg-white resize-none text-sm lg:text-base ${
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
                                        className="pt-2 lg:pt-4"
                                    >
                                        <button
                                            type="submit"
                                            disabled={isLoading}
                                            className="w-full bg-gradient-to-r from-orange-500 to-red-600 text-white py-3 lg:py-4 rounded-xl font-medium hover:from-orange-600 hover:to-red-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 text-sm lg:text-base disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none disabled:shadow-none"
                                        >
                                            {isLoading ? (
                                                <div className="flex items-center justify-center">
                                                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                                    </svg>
                                                    Versturen...
                                                </div>
                                            ) : (
                                                'Verstuur Bericht'
                                            )}
                                        </button>
                                    </motion.div>
                                </form>
                            </motion.div>
                        </div>
                    </section>
                </main>

                <Footer auth={auth} />
            </div>

            {showModal && (
                <Dialog open={showModal} onOpenChange={setShowModal}>
                    <DialogContent className="sm:max-w-md">
                        <DialogHeader>
                            <DialogTitle className={`text-center ${modalType === 'success' ? 'text-green-600' : 'text-red-600'}`}>
                                {modalType === 'success' ? 'Succes!' : 'Fout'}
                            </DialogTitle>
                            <DialogDescription className="text-center text-gray-600 mt-2">
                                {modalMessage}
                            </DialogDescription>
                        </DialogHeader>
                        <div className="flex justify-center mt-6">
                            <button
                                onClick={closeModal}
                                className={`px-6 py-2 rounded-full font-medium transition-all duration-300 ${
                                    modalType === 'success'
                                        ? 'bg-gradient-to-r from-green-500 to-green-600 text-white hover:from-green-600 hover:to-green-700'
                                        : 'bg-gradient-to-r from-red-500 to-red-600 text-white hover:from-red-600 hover:to-red-700'
                                }`}
                            >
                                Sluiten
                            </button>
                        </div>
                    </DialogContent>
                </Dialog>
            )}
        </>
    );
};

export default Contact; 
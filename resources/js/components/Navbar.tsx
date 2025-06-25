import React, { useState, useEffect } from 'react';
import { Link } from '@inertiajs/react';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isVisible, setIsVisible] = useState(true);
    const [lastScrollY, setLastScrollY] = useState(0);

    useEffect(() => {
        const controlNavbar = () => {
            if (window.scrollY > lastScrollY && window.scrollY > 100) { // Scrolling down & past 100px
                setIsVisible(false);
            } else { // Scrolling up or at top
                setIsVisible(true);
            }
            setLastScrollY(window.scrollY);
        };

        window.addEventListener('scroll', controlNavbar);

        return () => {
            window.removeEventListener('scroll', controlNavbar);
        };
    }, [lastScrollY]);

    return (
        <nav className={`bg-white/95 backdrop-blur-sm shadow-sm fixed w-full z-[100] -top-1 transition-transform duration-300 border-b border-orange-100 ${
            isVisible ? 'translate-y-0' : '-translate-y-full'
        }`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16">
                    <div className="flex items-center">
                        <Link href="/" className="text-xl font-light text-gray-800 group flex items-center space-x-2">
                            <i className="fas fa-dove text-orange-500 text-lg"></i>
                            <span className="relative">
                                Kritterz
                                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-orange-400 to-red-500 group-hover:w-full transition-all duration-300"></span>
                            </span>
                        </Link>
                    </div>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center space-x-8">
                        <Link 
                            href="/gallery" 
                            className="text-gray-600 hover:text-orange-600 transition-colors relative group"
                        >
                            Gallerij
                            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-orange-400 to-red-500 group-hover:w-full transition-all duration-300"></span>
                        </Link>
                        <Link 
                            href="/exhibitions" 
                            className="text-gray-600 hover:text-orange-600 transition-colors relative group"
                        >
                            Exposities
                            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-orange-400 to-red-500 group-hover:w-full transition-all duration-300"></span>
                        </Link>
                        <Link 
                            href="/about" 
                            className="text-gray-600 hover:text-orange-600 transition-colors relative group"
                        >
                            Over mij
                            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-orange-400 to-red-500 group-hover:w-full transition-all duration-300"></span>
                        </Link>
                        <Link 
                            href="/contact" 
                            className="text-gray-600 hover:text-orange-600 transition-colors relative group"
                        >
                            Contact
                            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-orange-400 to-red-500 group-hover:w-full transition-all duration-300"></span>
                        </Link>
                    </div>

                    {/* Mobile menu button */}
                    <div className="md:hidden flex items-center">
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-orange-600 hover:bg-orange-50 focus:outline-none transition-colors"
                        >
                            <span className="sr-only">Open main menu</span>
                            {!isOpen ? (
                                <svg className="block h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                                </svg>
                            ) : (
                                <svg className="block h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            )}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Navigation */}
            {isOpen && (
                <div className="md:hidden border-t border-orange-100">
                    <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                        <Link
                            href="/gallery"
                            className="block px-3 py-2 text-gray-600 hover:text-orange-600 hover:bg-orange-50 rounded-md transition-colors"
                        >
                            Gallerij
                        </Link>
                        <Link
                            href="/exhibitions"
                            className="block px-3 py-2 text-gray-600 hover:text-orange-600 hover:bg-orange-50 rounded-md transition-colors"
                        >
                            Exposities
                        </Link>
                        <Link
                            href="/about"
                            className="block px-3 py-2 text-gray-600 hover:text-orange-600 hover:bg-orange-50 rounded-md transition-colors"
                        >
                            Over mij
                        </Link>
                        <Link
                            href="/contact"
                            className="block px-3 py-2 text-gray-600 hover:text-orange-600 hover:bg-orange-50 rounded-md transition-colors"
                        >
                            Contact
                        </Link>
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar; 
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, PanInfo } from 'framer-motion';

interface CarouselImage {
    url: string;
    title: string;
    description: string;
    subtitle?: string;
    photographer?: string;
}

interface CarouselProps {
    images: CarouselImage[];
}

const Carousel = ({ images }: CarouselProps) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [direction, setDirection] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setDirection(1);
            setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
        }, 10000);

        return () => clearInterval(timer);
    }, [images.length]);

    const slideVariants = {
        enter: {
            opacity: 0,
            scale: 1.05
        },
        center: {
            opacity: 1,
            scale: 1
        },
        exit: {
            opacity: 0,
            scale: 0.95
        }
    };

    const swipeConfidenceThreshold = 10000;
    const swipePower = (offset: number, velocity: number) => {
        return Math.abs(offset) * velocity;
    };

    const paginate = (newDirection: number) => {
        setDirection(newDirection);
        setCurrentIndex((prevIndex) => (prevIndex + newDirection + images.length) % images.length);
    };

    return (
        <div className="relative w-full aspect-[21/9] max-h-[600px] overflow-hidden">
            <AnimatePresence mode="popLayout">
                <motion.div
                    key={currentIndex}
                    custom={direction}
                    variants={slideVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{
                        opacity: { duration: 0.3 },
                        scale: { duration: 0.4 }
                    }}
                    className="absolute inset-0"
                >
                    <div className="relative w-full h-full">
                        <div className="absolute inset-0">
                            <img
                                src={images[currentIndex].url}
                                alt={images[currentIndex].title}
                                className="w-full h-full object-contain bg-gray-100"
                                onError={(e) => {
                                    console.error('Carousel image failed to load:', images[currentIndex].url);
                                    e.currentTarget.style.backgroundColor = '#f3f4f6';
                                }}
                            />
                        </div>
                        <div className="absolute inset-0 bg-gradient-to-b from-black/5 via-transparent to-black/10 flex items-end justify-center pointer-events-none pb-16">
                            <div className="text-center text-white px-4 drop-shadow-2xl">
                                <motion.h2 
                                    initial={{ y: 10, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    exit={{ y: -10, opacity: 0 }}
                                    transition={{ duration: 0.3 }}
                                    className="text-4xl md:text-6xl font-light mb-2 drop-shadow-2xl font-semibold"
                                >
                                    {images[currentIndex].description}
                                </motion.h2>
                                {images[currentIndex].subtitle && (
                                    <motion.p
                                        initial={{ y: 10, opacity: 0 }}
                                        animate={{ y: 0, opacity: 1 }}
                                        exit={{ y: -10, opacity: 0 }}
                                        transition={{ duration: 0.3, delay: 0.1 }}
                                        className="text-xl md:text-2xl font-light drop-shadow-2xl text-white/90 mb-2"
                                    >
                                        {images[currentIndex].subtitle}
                                    </motion.p>
                                )}
                                {images[currentIndex].photographer && (
                                    <motion.p
                                        initial={{ y: 10, opacity: 0 }}
                                        animate={{ y: 0, opacity: 1 }}
                                        exit={{ y: -10, opacity: 0 }}
                                        transition={{ duration: 0.3, delay: 0.2 }}
                                        className="text-sm md:text-base font-light drop-shadow-2xl text-white/80 italic"
                                    >
                                        Foto: {images[currentIndex].photographer}
                                    </motion.p>
                                )}
                            </div>
                        </div>
                    </div>
                </motion.div>
            </AnimatePresence>

            {/* Navigation Arrows */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="relative w-full h-full flex items-center justify-between px-4">
                    <button
                        className="pointer-events-auto bg-black/20 hover:bg-black/40 rounded-full p-3 transition-all duration-300 backdrop-blur-sm"
                        onClick={() => paginate(-1)}
                    >
                        <svg className="w-6 h-6 text-white drop-shadow-lg" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                    </button>
                    <button
                        className="pointer-events-auto bg-black/20 hover:bg-black/40 rounded-full p-3 transition-all duration-300 backdrop-blur-sm"
                        onClick={() => paginate(1)}
                    >
                        <svg className="w-6 h-6 text-white drop-shadow-lg" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                    </button>
                </div>
            </div>

            {/* Dots Navigation */}
            <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-3 z-10">
                {images.map((_, index) => (
                    <button
                        key={index}
                        className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                            index === currentIndex 
                                ? 'bg-white scale-110' 
                                : 'bg-white/40 hover:bg-white/60'
                        }`}
                        onClick={() => {
                            setDirection(index > currentIndex ? 1 : -1);
                            setCurrentIndex(index);
                        }}
                    />
                ))}
            </div>
        </div>
    );
};

export default Carousel; 
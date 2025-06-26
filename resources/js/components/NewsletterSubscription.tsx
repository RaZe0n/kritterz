import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
} from '@/components/ui/dialog';

interface NewsletterSubscriptionProps {
    className?: string;
}

const NewsletterSubscription: React.FC<NewsletterSubscriptionProps> = ({ className = '' }) => {
    const [email, setEmail] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [modalType, setModalType] = useState<'success' | 'error'>('success');
    const [modalMessage, setModalMessage] = useState('');
    const [emailError, setEmailError] = useState('');
    const [isValidating, setIsValidating] = useState(false);

    // Comprehensive email validation function
    const validateEmail = (email: string): { isValid: boolean; error: string } => {
        const trimmedEmail = email.trim();
        
        // Check if email is empty
        if (!trimmedEmail) {
            return { isValid: false, error: 'E-mailadres is verplicht.' };
        }

        // Basic email format regex
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(trimmedEmail)) {
            return { isValid: false, error: 'Voer een geldig e-mailadres in (bijvoorbeeld: naam@domein.nl).' };
        }

        // More specific validation
        const parts = trimmedEmail.split('@');
        const localPart = parts[0];
        const domainPart = parts[1];

        // Check local part
        if (localPart.length < 1 || localPart.length > 64) {
            return { isValid: false, error: 'Het e-mailadres is te kort of te lang.' };
        }

        // Check domain part
        if (!domainPart || domainPart.length < 3 || domainPart.length > 253) {
            return { isValid: false, error: 'Het domein is ongeldig.' };
        }

        // Check for valid domain extension
        const domainParts = domainPart.split('.');
        if (domainParts.length < 2) {
            return { isValid: false, error: 'Het e-mailadres moet een geldig domein hebben.' };
        }

        const extension = domainParts[domainParts.length - 1];
        if (extension.length < 2 || extension.length > 6) {
            return { isValid: false, error: 'Het domein heeft een ongeldige extensie.' };
        }

        // Check for special characters that might cause issues
        const specialCharRegex = /[<>()[\]\\,;:\s"]/;
        if (specialCharRegex.test(localPart)) {
            return { isValid: false, error: 'Het e-mailadres bevat ongeldige tekens.' };
        }

        return { isValid: true, error: '' };
    };

    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newEmail = e.target.value;
        setEmail(newEmail);
        
        // Clear error when user starts typing
        if (emailError) {
            setEmailError('');
        }

        // Real-time validation (debounced)
        if (newEmail.length > 3) {
            setIsValidating(true);
            setTimeout(() => {
                const validation = validateEmail(newEmail);
                if (!validation.isValid) {
                    setEmailError(validation.error);
                } else {
                    setEmailError('');
                }
                setIsValidating(false);
            }, 500);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        // Final validation before submission
        const validation = validateEmail(email);
        if (!validation.isValid) {
            setEmailError(validation.error);
            showErrorModal(validation.error);
            return;
        }

        setIsLoading(true);

        try {
            const response = await fetch('/api/newsletter/subscribe', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') || '',
                },
                body: JSON.stringify({ email: email.trim() }),
            });

            const data = await response.json();

            if (data.success) {
                showSuccessModal(data.message);
                setEmail('');
                setEmailError('');
            } else {
                showErrorModal(data.message);
            }
        } catch (error) {
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

    const isFormValid = email.trim() && !emailError && !isValidating;

    return (
        <>
            <div className={`text-center ${className}`}>
                <div className="w-24 h-1 bg-gradient-to-r from-orange-400 to-red-500 rounded-full mx-auto mb-6"></div>
                <h2 className="text-4xl font-light mb-4 text-gray-800">Blijf op de hoogte</h2>
                <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
                    Schrijf je in voor mijn nieuwsbrief en ontvang 2 a 3 keer per jaar updates over nieuwe KritterZ en exposities
                </p>
                
                <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto mb-8">
                    <div className="flex-1 relative">
                        <input
                            type="email"
                            value={email}
                            onChange={handleEmailChange}
                            placeholder="Jouw e-mailadres"
                            className={`w-full px-6 py-4 border rounded-full focus:outline-none focus:ring-2 focus:border-transparent text-gray-800 transition-all duration-300 ${
                                emailError 
                                    ? 'border-red-300 focus:ring-red-500 bg-red-50' 
                                    : email && !emailError 
                                        ? 'border-green-300 focus:ring-green-500 bg-green-50' 
                                        : 'border-gray-300 focus:ring-orange-500'
                            }`}
                            disabled={isLoading}
                        />
                        {isValidating && (
                            <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
                                <svg className="animate-spin h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                            </div>
                        )}
                        {email && !emailError && !isValidating && (
                            <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
                                <svg className="h-5 w-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                            </div>
                        )}
                        {emailError && (
                            <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
                                <svg className="h-5 w-5 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </div>
                        )}
                    </div>
                    <button 
                        type="submit"
                        disabled={isLoading || !isFormValid}
                        className="bg-gradient-to-r from-orange-500 to-red-600 text-white px-8 py-4 rounded-full font-medium hover:from-orange-600 hover:to-red-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none disabled:shadow-none"
                    >
                        {isLoading ? (
                            <div className="flex items-center">
                                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                Inschrijven...
                            </div>
                        ) : (
                            'Inschrijven'
                        )}
                    </button>
                </form>

                {/* Error Message */}
                {emailError && (
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-red-600 text-sm mb-4 max-w-md mx-auto"
                    >
                        {emailError}
                    </motion.div>
                )}

                {/* Validation Info */}
                <div className="text-xs text-gray-500 mb-8 max-w-md mx-auto">
                    <p>Gebruik een geldig e-mailadres.</p>
                </div>
                
                {/* Social Media Links */}
                <div className="border-t border-gray-200 pt-8">
                    <p className="text-gray-600 mb-6">Of volg ons op social media</p>
                    <div className="flex justify-center space-x-8">
                        <a 
                            href="https://www.instagram.com/kritterz.nl/" 
                            className="flex items-center space-x-2 text-orange-600 hover:text-orange-700 transition-colors duration-300 group"
                        >
                            <div className="w-10 h-10 bg-gradient-to-br from-orange-100 to-red-100 rounded-full flex items-center justify-center group-hover:from-orange-200 group-hover:to-red-200 transition-all duration-300">
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                    <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
                                </svg>
                            </div>
                            <span className="font-medium">KritterZ</span>
                        </a>
                        <a 
                            href="https://www.facebook.com/kritterz.kritterz/" 
                            className="flex items-center space-x-2 text-orange-600 hover:text-orange-700 transition-colors duration-300 group"
                        >
                            <div className="w-10 h-10 bg-gradient-to-br from-orange-100 to-red-100 rounded-full flex items-center justify-center group-hover:from-orange-200 group-hover:to-red-200 transition-all duration-300">
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                    <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                                </svg>
                            </div>
                            <span className="font-medium">KritterZ</span>
                        </a>
                    </div>
                </div>
            </div>

            {/* Success/Error Modal */}
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
        </>
    );
};

export default NewsletterSubscription; 
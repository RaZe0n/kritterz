import React, { useState, useEffect } from 'react';
import { Head } from '@inertiajs/react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Carousel from '@/components/Carousel';
import NewsletterSubscription from '@/components/NewsletterSubscription';
import { motion } from 'framer-motion';

interface Event {
    image: any;
    id: number;
    title: string;
    location: string;
    date_range: string;
    description: string;
}

interface HomePageProps {
    currentEvents?: Event[];
    upcomingEvents?: Event[];
    auth?: {
        user?: {
            id: number;
            name: string;
            email: string;
            role: string;
        } | null;
    };
}

const HomePage: React.FC<HomePageProps> = ({ currentEvents = [], upcomingEvents = [], auth }) => {
    const [isVisible, setIsVisible] = useState(true);
    const [lastScrollY, setLastScrollY] = useState(0);

    useEffect(() => {
        const controlBirds = () => {
            if (window.scrollY > lastScrollY && window.scrollY > 100) { // Scrolling down & past 100px
                setIsVisible(false);
            } else { // Scrolling up or at top
                setIsVisible(true);
            }
            setLastScrollY(window.scrollY);
        };

        window.addEventListener('scroll', controlBirds);

        return () => {
            window.removeEventListener('scroll', controlBirds);
        };
    }, [lastScrollY]);

    // Random bird delays effect
    useEffect(() => {
        const assignRandomBirdDelays = () => {
            const birdContainers = document.querySelectorAll('.bird-container');
            birdContainers.forEach((container) => {
                const randomVariant = Math.floor(Math.random() * 5) + 1;
                container.classList.remove('variant-1', 'variant-2', 'variant-3', 'variant-4', 'variant-5');
                container.classList.add(`variant-${randomVariant}`);
            });
        };

        // Assign random delays on mount
        assignRandomBirdDelays();

        // Reassign random delays every 30 seconds for variety
        const interval = setInterval(assignRandomBirdDelays, 30000);

        return () => clearInterval(interval);
    }, []);

    const carouselImages = [
        {
            url: encodeURI('/resources/images/boomkruiper.jpg'),
            title: 'Silverware Symphony',
            description: 'Een harmonieuze mix van oude lepels en vorken'
        },
        {
            url: encodeURI('/resources/images/meeuw.jpg'),
            title: 'Levend bestek',
            description: 'Waar bestek tot leven komt'
        },
        {
            url: encodeURI('/resources/images/bf054056-87eb-46a6-b33c-36012ddef79f 2.JPG'),
            title: 'Artistic Alchemy',
            description: 'Het transformeren van alledaags bestek to kleine kunstwerkjes'
        },
        {
            url: encodeURI('/resources/images/e3a0e577-8c01-47ab-8f89-6f36f9e2c0cf 2.JPG'),
            title: 'Elegante expressies',
            description: 'Herkenbare en vrouwelijke interpretaties van de levende natuur'
        },
        {
            url: encodeURI('/resources/images/f2c2d198-f9ea-4511-8017-98666abe2c1e 2.JPG'),
            title: 'Tijdloze kunstwerken',
            description: 'Elke KritterZ is een uniek kunstwerk'
        },
        {
            url: encodeURI('/resources/images/7a7d4a6d-58f7-4dd6-a0a7-791230a58464 2.JPG'),
            title: "Poor man's Silver Stories",
            description: 'Verhalen geweven in metaal en herinneringen'
        },
        {
            url: encodeURI('/resources/images/a2fc32d3-065b-4f17-b0f2-6ec1d62b2e21 2.JPG'),
            title: 'Accessoires van bestek',
            description: 'Elegante hangers uit vintage bestek'
        }
    ];

    return (
        <>
            <Head title="Home | KritterZ">
                <link rel="stylesheet" href="/css/flying-birds.css" />
            </Head>
            <div className="min-h-screen bg-white pt-16">
                <Navbar />
                
                {/* Flying Birds */}
                <div 
                    className={`fixed inset-0 pointer-events-none overflow-hidden transition-opacity duration-300 ${
                        isVisible ? 'opacity-100' : 'opacity-0'
                    }`} 
                    style={{ zIndex: 99999 }}
                >
                    <div className="bird-container bird-container-one">
                        <div className="bird bird-one"></div>
                    </div>
                    <div className="bird-container bird-container-two">
                        <div className="bird bird-two"></div>
                    </div>
                    <div className="bird-container bird-container-three">
                        <div className="bird bird-three"></div>
                    </div>
                    <div className="bird-container bird-container-four">
                        <div className="bird bird-four"></div>
                    </div>
                </div>
                
                {/* Hero Carousel Section */}
                <section className="relative w-full bg-gray-100">
                    <Carousel images={carouselImages} />
                </section>

                {/* About Artist Section */}
                <section className="py-20 px-4 md:px-8 lg:px-16 bg-gradient-to-br from-gray-50 via-orange-50/30 to-gray-50">
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="max-w-4xl mx-auto"
                    >
                        <h2 className="text-4xl text-center font-light mb-12 text-gray-800">Hoi, ik ben Corine,</h2>
                        <div className="grid md:grid-cols-2 gap-12 items-center">
                            <div className="space-y-6">
                                <div className="w-16 h-1 bg-gradient-to-r from-orange-400 to-red-500 rounded-full mb-6"></div>
                                <p className="text-gray-600 leading-relaxed text-lg">
                                Op deze website deel ik graag mijn 'KritterZ' creaties met je. Ze zijn allemaal gemaakt van gerecycled bestek dat ik bij elkaar zoek in de kringloopwinkels en vervolgens slijp, polijst en soldeer. De meeste Kritterz stellen dieren, vooral vogels, voor. Soms fantasie, vaak zo realistisch mogelijk. Ik vind het heel leuk dat mensen genieten mijn KritterZ en ze regelmatig uitvliegen naar andere huisjes. 
                                </p>
                                <p className="text-gray-600 leading-relaxed">
                                    Wil je meer te weten komen over mij en mijn werkwijze? Klik dan op de knop hieronder.
                                </p>
                                <div className="pt-4">
                                    <a 
                                        href="/about" 
                                        className="inline-flex items-center bg-gradient-to-r from-orange-500 to-red-600 text-white px-8 py-3 rounded-full font-medium hover:from-orange-600 hover:to-red-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                                    >
                                        Meer over mij
                                        <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                        </svg>
                                    </a>
                                </div>
                            </div>
                            <div className="relative">
                                <div className="bg-gradient-to-br from-orange-200 to-red-200 rounded-3xl p-3 shadow-xl">
                                    <div className="relative h-[500px] bg-gray-200 rounded-2xl overflow-hidden">
                                        <img 
                                            src="/resources/images/cover.jpg" 
                                            alt="Artist portrait" 
                                            className="object-cover w-full h-full"
                                            style={{
                                                imageRendering: 'crisp-edges',
                                                backfaceVisibility: 'hidden',
                                                transform: 'translateZ(0)',
                                                willChange: 'transform',
                                            }}
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </section>

                {/* Workflow Section */}
                <section className="py-20 px-4 md:px-8 lg:px-16 bg-gradient-to-br from-white via-orange-50/20 to-white">
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="max-w-7xl mx-auto"
                    >
                        <div className="text-center mb-16">
                            <div className="w-24 h-1 bg-gradient-to-r from-orange-400 to-red-500 rounded-full mx-auto mb-6"></div>
                            <h2 className="text-4xl font-light mb-4 text-gray-800">Mijn werkwijze</h2>
                            <p className="text-gray-600 max-w-2xl mx-auto">
                                Van gerecycled materiaal tot unieke kunstwerken
                            </p>
                        </div>
                        
                        {/* Process Steps */}
                        <div className="grid md:grid-cols-3 gap-8 mb-16">
                            {/* Step 1: Recycled Materials */}
                            <motion.div 
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6 }}
                                className="group relative"
                            >
                                <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 group-hover:border-orange-200 group-hover:shadow-orange-100">
                                    <div className="w-16 h-16 bg-gradient-to-br from-orange-100 to-red-100 rounded-full flex items-center justify-center mb-6 group-hover:from-orange-200 group-hover:to-red-200 transition-all duration-300">
                                        <svg className="w-8 h-8 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                                        </svg>
                                    </div>
                                    <h3 className="text-xl font-semibold mb-4 text-gray-800">Gerecycled materiaal</h3>
                                    <p className="text-gray-600 leading-relaxed">
                                        Ik maak zoveel mogelijk gebruik van gerecycled materiaal. Het afstruinen van kringloopwinkels voor bestek, andere metalen materialen en gereedschap is een deel van de lol. Elke vondst vertelt een verhaal - van oude verzilverde lepels die ooit familie-erfstukken waren tot vergeten gereedschap dat een tweede leven verdient. Het is fascinerend om te zien hoe verschillende materialen samen kunnen komen om iets nieuws te creëren. Soms vind ik onverwachte schatten die perfect zijn voor een specifieke Kritter die ik al een tijdje in gedachten had.
                                    </p>
                                </div>
                            </motion.div>

                            {/* Step 2: Yarn from Karen */}
                            <motion.div 
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: 0.1 }}
                                className="group relative"
                            >
                                <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 group-hover:border-orange-200 group-hover:shadow-orange-100">
                                    <div className="w-16 h-16 bg-gradient-to-br from-orange-100 to-red-100 rounded-full flex items-center justify-center mb-6 group-hover:from-orange-200 group-hover:to-red-200 transition-all duration-300">
                                        <svg className="w-8 h-8 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zM21 5a2 2 0 00-2-2h-4a2 2 0 00-2 2v12a4 4 0 004 4h4a2 2 0 002-2V5z" />
                                        </svg>
                                    </div>
                                    <h3 className="text-xl font-semibold mb-4 text-gray-800">Inspiratie</h3>
                                    <p className="text-gray-600 leading-relaxed mb-4">
                                    Mijn inspiratie voor deze KritterZ komt uit de natuur en heeft zeker te maken met mijn opleiding als bioloog. Als kind was ik al gefascineerd door dieren en tijdens mijn studie kon ik diergedrag bestuderen en naar verre oorden reizen. De creativiteit raakte echter op de achtergrond tot de knop om moest. Het maakt me verdrietig dat de natuur wereldwijd onder druk staat en zoveel soorten verdwijnen. Ik hoop dat mensen in mijn KritterZ de schoonheid van die diversiteit zien en anders naar echte soorten en hun voortbestaan gaan kijken.
                                    </p>
                                </div>
                            </motion.div>

                            {/* Step 3: Crafting Process */}
                            <motion.div 
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: 0.2 }}
                                className="group relative"
                            >
                                <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 group-hover:border-orange-200 group-hover:shadow-orange-100">
                                    <div className="w-16 h-16 bg-gradient-to-br from-orange-100 to-red-100 rounded-full flex items-center justify-center mb-6 group-hover:from-orange-200 group-hover:to-red-200 transition-all duration-300">
                                        <svg className="w-8 h-8 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                        </svg>
                                    </div>
                                    <h3 className="text-xl font-semibold mb-4 text-gray-800">Slijpen, schuren en solderen</h3>
                                    <p className="text-gray-600 leading-relaxed mb-4">
                                        Met een bankschroef, flex, Dremel en schuurmachine kom je voor het maken van bestek KritterZ een heel eind. Daarna worden de stukken zoveel mogelijk natuurgetrouw aan elkaar gesoldeerd met zilver tin. Door schuren of polijsten worden verschillende looks gecreëerd. Om dit zo goed mogelijk te kunnen doen, heb ik geïnvesteerd in professionele apparatuur die me hierbij helpt. Elk stuk krijgt de tijd die het nodig heeft om tot zijn recht te komen, soms moet ik een stuk meerdere keren aanpassen tot het precies goed voelt. Het is een proces van geduld en precisie, waarbij elke Kritter zijn eigen karakter krijgt.
                                    </p>
                                </div>
                            </motion.div>
                        </div>

                        {/* Contact & Info Section */}
                        <motion.div 
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.3 }}
                            className="bg-gradient-to-br from-white to-orange-50/30 rounded-3xl p-8 md:p-12 shadow-xl border border-orange-100"
                        >
                            <div className="grid lg:grid-cols-2 gap-12">
                                {/* Left Side - Info */}
                                <div className="space-y-8">
                                    <div>
                                        <h3 className="text-2xl font-semibold mb-6 text-gray-800">Geïnteresseerd in een KritterZ?</h3>
                                        <div className="space-y-4 text-gray-600">
                                            <p className="leading-relaxed">
                                                Ik maak deze KritterZ vooral omdat ik daar zelf heel veel plezier aan beleef. Maar ik vind het natuurlijk heel leuk als anderen ze ook mooi vinden!
                                            </p>
                                            <p className="leading-relaxed">
                                                Ben je geïnteresseerd in een van mijn KritterZ? Dan hoor ik dat natuurlijk heel graag. Ik ben geen webwinkel maar in overleg kan vast van alles.
                                            </p>
                                        </div>
                                    </div>

                                    <div className="bg-gradient-to-r from-orange-50 to-red-50 rounded-2xl p-6 border border-orange-100 relative">
                                        <div className="absolute -top-4 -right-4 w-16 h-16 bg-gradient-to-br from-orange-100 to-red-100 rounded-full flex items-center justify-center shadow-lg transform rotate-12">
                                            <svg className="w-8 h-8 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" />
                                            </svg>
                                        </div>
                                        <h4 className="text-lg font-semibold mb-3 text-gray-800">Iemand een KritterZ kado geven?</h4>
                                        <p className="text-gray-600 leading-relaxed">
                                            Vind je het leuk om een gepersonaliseerde KritterZ aan iemand kado te geven? Neem gerust even contact op om de mogelijkheden te bespreken.
                                        </p>
                                        <p className="text-gray-600 leading-relaxed">
                                            Of wil je een KritterZ laten maken van je oude bestek? Neem gerust even contact op om de mogelijkheden te bespreken.
                                        </p>
                                    </div>
                                </div>

                                {/* Right Side - Contact & Location */}
                                <div className="space-y-8">
                                    <div className="bg-gradient-to-r from-orange-50 to-red-50 rounded-2xl p-6 border border-orange-100">
                                        <div className="flex items-center mb-4">
                                            <div className="w-12 h-12 bg-gradient-to-br from-orange-100 to-red-100 rounded-full flex items-center justify-center mr-4">
                                                <svg className="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                                </svg>
                                            </div>
                                            <h4 className="text-lg font-semibold text-gray-800">Locatie</h4>
                                        </div>
                                        <p className="text-gray-600 leading-relaxed">
                                            Ik werk thuis in mijn eigen "atelier". Mijn Woman Cave. Gevestigd in Zuidhorn.
                                        </p>
                                    </div>

                                    <div className="text-center bg-gradient-to-r from-orange-50 to-red-50 rounded-2xl p-8 border border-orange-100">
                                        <div className="w-16 h-16 bg-gradient-to-br from-orange-100 to-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                            <svg className="w-8 h-8 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                                            </svg>
                                        </div>
                                        <h4 className="text-xl font-semibold mb-3 text-gray-800">Neem contact op</h4>
                                        <p className="text-gray-600 mb-6">
                                            Ben je benieuwd of heb je vragen? Neem gerust contact op.
                                        </p>
                                        <button className="bg-gradient-to-r from-orange-500 to-red-600 text-white px-8 py-3 rounded-full font-medium hover:from-orange-600 hover:to-red-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1">
                                            Contact opnemen
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                </section>

                {/* Atelier Section */}
                <section className="py-20 px-4 md:px-8 lg:px-16 bg-white">
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="max-w-7xl mx-auto"
                    >
                        <div className="text-center mb-16">
                            <h2 className="text-4xl font-light mb-4 text-gray-800">Mijn "Atelier"</h2>
                            <p className="text-gray-600 max-w-2xl mx-auto">
                                Mijn Woman Cave - waar creativiteit en passie samenkomen
                            </p>
                        </div>

                        <div className="grid lg:grid-cols-2 gap-12 items-center mb-12">
                            {/* Text Content */}
                            <motion.div 
                                initial={{ opacity: 0, x: -30 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.8 }}
                                className="space-y-6"
                            >
                                <h3 className="text-2xl font-semibold text-gray-800">Mijn creatieve ruimte</h3>
                                <div className="space-y-4 text-gray-600 leading-relaxed">
                                    <p>
                                        In mijn atelier in Zuidhorn vind je alles wat ik nodig heb om mijn KritterZ te maken. 
                                    </p>
                                    <p>
                                        Inmiddels heb ik een flinke voorraad bestek verzameld, zowel uit de kringloopwinkels als ook gekregen van mensen die weten dat ik bestek spaar. Ook werk ik voor het solderen met verschillende flux materialen, afhankelijk van het type legering in het metaal dat ik gebruik. Dat is niet altijd aan de buitenkant te zien, maar blijkt in de praktijk al snel. 
                                    </p>
                                    <p>
                                        In mijn schuurtje heb ik samen met mijn oudste zoon een werkbank gemaakt en zelf een simpel afzuigsysteem geïnstalleerd. Met een lekker muziekje erbij vliegen de uren voorbij zonder dat ik het merk en kom ik helemaal tot rust.
                                    </p>
                                </div>
                            </motion.div>

                            {/* Main Atelier Image */}
                            <motion.div 
                                initial={{ opacity: 0, x: 30 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.8, delay: 0.2 }}
                                className="relative"
                            >
                                <div className="bg-gradient-to-br from-orange-100 to-red-100 rounded-3xl p-2">
                                    <div className="relative h-[400px] bg-gray-200 rounded-2xl overflow-hidden">
                                        <img 
                                            src="/resources/images/moeders-in-hut.jpg" 
                                            alt="Mijn atelier in Zuidhorn" 
                                            className="object-cover w-full h-full"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                                    </div>
                                </div>
                            </motion.div>
                        </div>

                        {/* Image Grid */}
                        <motion.div 
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.4 }}
                            className="grid md:grid-cols-3 gap-6"
                        >
                            {/* Image 1 */}
                            <div className="group relative overflow-hidden rounded-2xl">
                                <div className="aspect-square bg-gray-200">
                                    <img 
                                        src="/resources/images/bestek.jpg" 
                                        alt="Gereedschap en materialen" 
                                        className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-500"
                                    />
                                </div>
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                <div className="absolute bottom-4 left-4 right-4 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                    <p className="text-sm font-medium">Gereedschap & Materialen</p>
                                </div>
                            </div>

                            {/* Image 2 */}
                            <div className="group relative overflow-hidden rounded-2xl">
                                <div className="aspect-square bg-gray-200">
                                    <img 
                                        src="/resources/images/moeders-in-hut.jpg" 
                                        alt="Werkbank en creatieve ruimte" 
                                        className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-500"
                                    />
                                </div>
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                <div className="absolute bottom-4 left-4 right-4 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                    <p className="text-sm font-medium">Werkbank & Creatieve Ruimte</p>
                                </div>
                            </div>

                            {/* Image 3 */}
                            <div className="group relative overflow-hidden rounded-2xl">
                                <div className="aspect-square bg-gray-200">
                                    <img 
                                        src="/resources/images/bestek.jpg" 
                                        alt="Inspiratie en werk in uitvoering" 
                                        className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-500"
                                    />
                                </div>
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                <div className="absolute bottom-4 left-4 right-4 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                    <p className="text-sm font-medium">Inspiratie & Werk in Uitvoering</p>
                                </div>
                            </div>
                        </motion.div>

                        {/* Bottom CTA */}
                        <motion.div 
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.6 }}
                            className="text-center mt-12"
                        >
                        </motion.div>
                    </motion.div>
                </section>

                {/* Current Exhibitions Section */}
                <section className="py-20 px-4 md:px-8 lg:px-16">
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="max-w-4xl mx-auto"
                    >
                        <h2 className="text-4xl font-light mb-12 text-gray-800">Lopende exposities</h2>
                        <div className="grid md:grid-cols-2 gap-8">
                            {currentEvents.length > 0 ? (
                                currentEvents.map((exhibition, index) => (
                                    <div 
                                        key={exhibition.id}
                                        className="bg-white p-8 rounded-lg shadow-sm border border-gray-100"
                                    >
                                        {exhibition.image && (
                                            <img 
                                                src={exhibition.image} 
                                                alt={exhibition.title}
                                                className="w-full h-48 object-cover rounded-lg mb-6"
                                            />
                                        )}
                                        <h3 className="text-xl font-medium mb-2 text-gray-800">{exhibition.title}</h3>
                                        <p className="text-gray-500 mb-4">{exhibition.location}</p>
                                        <p className="text-gray-400 text-sm mb-4">{exhibition.date_range}</p>
                                        <p className="text-gray-600">{exhibition.description}</p>
                                    </div>
                                ))
                            ) : (
                                <div className="col-span-2 text-center py-12">
                                    <div className="w-16 h-16 bg-gradient-to-br from-orange-100 to-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                        <svg className="w-8 h-8 text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                                        </svg>
                                    </div>
                                    <h3 className="text-xl font-medium text-gray-800 mb-2">Geen lopende exposities</h3>
                                    <p className="text-gray-600">Er zijn momenteel geen lopende exposities. Bekijk de aankomende evenementen hieronder!</p>
                                </div>
                            )}
                        </div>
                    </motion.div>
                </section>

                {/* Upcoming Exhibitions Section */}
                <section className="py-20 px-4 md:px-8 lg:px-16 bg-gradient-to-br from-gray-50 via-orange-50/30 to-gray-50">
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="max-w-4xl mx-auto"
                    >
                        <h2 className="text-4xl font-light mb-12 text-gray-800">Binnenkort te zien</h2>
                        <div className="grid md:grid-cols-2 gap-8">
                            {upcomingEvents.length > 0 ? (
                                upcomingEvents.map((exhibition, index) => (
                                    <div 
                                        key={exhibition.id}
                                        className="bg-white p-8 rounded-lg shadow-sm border border-gray-100"
                                    >
                                        {exhibition.image && (
                                            <img 
                                                src={exhibition.image} 
                                                alt={exhibition.title}
                                                className="w-full h-48 object-cover rounded-lg mb-6"
                                            />
                                        )}
                                        <h3 className="text-xl font-medium mb-2 text-gray-800">{exhibition.title}</h3>
                                        <p className="text-gray-500 mb-4">{exhibition.location}</p>
                                        <p className="text-gray-400 text-sm mb-4">{exhibition.date_range}</p>
                                        <p className="text-gray-600">{exhibition.description}</p>
                                    </div>
                                ))
                            ) : (
                                <div className="col-span-2 text-center py-12">
                                    <div className="w-16 h-16 bg-gradient-to-br from-orange-100 to-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                        <svg className="w-8 h-8 text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                        </svg>
                                    </div>
                                    <h3 className="text-xl font-medium text-gray-800 mb-2">Geen aankomende evenementen</h3>
                                    <p className="text-gray-600">Er zijn momenteel geen aankomende evenementen gepland. Houd deze pagina in de gaten voor updates!</p>
                                </div>
                            )}
                        </div>
                    </motion.div>
                </section>

                {/* Newsletter Subscription Section */}
                <section className="py-20 px-4 md:px-8 lg:px-16 bg-white">
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="max-w-4xl mx-auto"
                    >
                        <NewsletterSubscription />
                    </motion.div>
                </section>

                <Footer auth={auth} />
            </div>
        </>
    );
};

export default HomePage; 
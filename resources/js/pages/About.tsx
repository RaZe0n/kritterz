import React from 'react';
import { Head } from '@inertiajs/react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { motion } from 'framer-motion';
import { FaSearch, FaPencilRuler, FaMagic } from 'react-icons/fa';

const About = () => {
    return (
        <>
            <Head title="About | KritterZ" />
            <div className="min-h-screen bg-white">
                <Navbar />
                
                <main className="pt-16">
                    {/* Hero Section */}
                    <section className="py-20 px-4 md:px-8 lg:px-16 bg-gradient-to-br from-gray-50 via-orange-50/30 to-gray-50">
                        <div className="max-w-4xl mx-auto text-center">
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8 }}
                                className="w-24 h-1 bg-gradient-to-r from-orange-400 to-red-500 rounded-full mx-auto mb-6"
                            ></motion.div>
                            <motion.h1 
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8, delay: 0.1 }}
                                className="text-4xl md:text-5xl font-light mb-6 text-gray-800"
                            >
                                Wie ben ik?
                            </motion.h1>
                            <motion.p
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8, delay: 0.2 }}
                                className="text-xl text-gray-600"
                            >
                                Het gezicht achter KritterZ
                            </motion.p>
                        </div>
                    </section>

                    {/* Main Content */}
                    <section className="py-16 px-4 md:px-8 lg:px-16 bg-gradient-to-br from-white via-orange-50/20 to-white">
                        <div className="max-w-7xl mx-auto">
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                                {/* Image */}
                                <motion.div
                                    initial={{ opacity: 0, x: -20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 0.8 }}
                                    className="relative"
                                >
                                    <div className="bg-gradient-to-br from-orange-200 to-red-200 rounded-3xl p-3 shadow-xl">
                                        <div className="relative aspect-[4/5] overflow-hidden rounded-2xl">
                                            <img
                                                src="/resources/images/moeders.jpg"
                                                alt="Portrait"
                                                className="absolute inset-0 w-full h-full object-cover"
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent"></div>
                                        </div>
                                    </div>
                                </motion.div>

                                {/* Text Content */}
                                <motion.div
                                    initial={{ opacity: 0, x: 20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 0.8 }}
                                    className="space-y-6"
                                >
                                    <div className="w-16 h-1 bg-gradient-to-r from-orange-400 to-red-500 rounded-full mb-6"></div>
                                    <h2 className="text-3xl font-light text-gray-800">Corine Eising</h2>
                                    <p className="text-gray-600 leading-relaxed">
                                        Dat is de naam van de kunstenaar achter KritterZ. 
                                    </p>
                                    <p className="text-gray-600 leading-relaxed">
                                    Terwijl ik aan het herstellen was van oververmoeidheid in 2019, sleepte een vriendin van me mij mee naar een cursus lassen. Heerlijk vond ik het; vuur, vlammen, slijpen en timmeren, eindelijk weer eens iets maken, creatief uitgedaagd worden. Daar hervond ik een stukje creativiteit waarvan ik al lang geleden was vergeten dat ik het had. Dat smaakte naar meer, maar lassen is niet iets dat je ' zo maar' even doet in een klein achtertuintje. Een andere vriendin, die heel creatief in borduren en ander 'frutsel-werk' is, stuurde mij links van verschillende sociale media platforms. Daar kwam ik al snel metalen creaties, vooral vogels, tegen die me fantastisch leken om te kunnen maken. Kleiner van stuk, dus waarom niet solderen in plaats van lassen? Als ik niet toevallig iemand uit Gronignen was tegengekomen die bereid was om me de geheimpjes van het bestek solderen te verklappen was het misschien niet gelukt maar inmiddels zijn we een heel aantal ' KritterZ' verder. Ik geloof dat ik inmiddels ook wel een eigen stijl hierin gevonden heb en mijn creaties wel als KritterZ herkenbaar zijn. Op voorstel van mijn man hebben we in onze tuin een schuurtje neergezet waar ik samen met m'n zoons een werkbank en afzuiginstallatie in heb geknutseld. Daar beleef ik heel veel plezier en voldoening aan het maken van m'n bestekkunst en ik hoop daar de komende periode nog meer tijd aan te kunnen besteden. Ik hoop dat jullie er net zo van kunnen genieten als ik! 
                                    </p>
                                    <p className="text-gray-600 leading-relaxed">
                                        Elk stuk bestek heeft zijn eigen verhaal en geschiedenis. Door deze te 
                                        transformeren in kunstwerken, geef ik ze een nieuw leven en een nieuwe betekenis. 
                                        Mijn werk is een reflectie van duurzaamheid en de schoonheid van hergebruik.
                                    </p>
                                </motion.div>
                            </div>
                        </div>
                    </section>

                    {/* Mission Section */}
                    <section className="py-16 px-4 md:px-8 lg:px-16 bg-gradient-to-br from-gray-50 via-orange-50/30 to-gray-50">
                        <div className="max-w-7xl mx-auto">
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8 }}
                                className="bg-gradient-to-br from-white to-orange-50/30 rounded-3xl p-8 md:p-12 shadow-xl border border-orange-100"
                            >
                                <div className="text-center max-w-3xl mx-auto">
                                    <div className="w-24 h-1 bg-gradient-to-r from-orange-400 to-red-500 rounded-full mx-auto mb-6"></div>
                                    <h2 className="text-3xl font-light mb-8 text-gray-800">Mijn passie</h2>
                                    <p className="text-gray-600 leading-relaxed mb-6">
                                        Ik ben begonnen met het maken van de KritterZ omdat ik daar zelf heel veel plezier aan beleef(de). Inmiddels is dat uitgebroeid tot een 'hobby' waar ik ook anderen blij mee kan maken. 
                                    </p>
                                    <p className="text-gray-600 leading-relaxed">
                                        Ik streef ernaar om met mijn kunst bij te dragen aan een duurzamere wereld, 
                                        waar hergebruik en creativiteit hand in hand gaan.  Ik vind het daarbij wel steeds belangrijker worden dat mensen in mijn werken ook de schoonheid en het unieke van de natuur zien. Ik hoop dat mijn werk op die manier een beetje bijdraagt aan natuurbehoud en herstel. 
                                    </p>
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

export default About; 
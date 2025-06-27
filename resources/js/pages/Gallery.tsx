import React, { useState, useMemo } from 'react';
import { Head } from '@inertiajs/react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { motion } from 'framer-motion';

interface Tag {
    id: number;
    name: string;
    color: string;
    description: string;
}

interface Artwork {
    id: number;
    title: string;
    image: string;
    description: string;
    status: 'for sale' | 'sold';
    tags: Tag[];
}

interface GalleryProps {
    artworks: Artwork[];
    tags: Tag[];
    auth?: {
        user?: {
            id: number;
            name: string;
            email: string;
            role: string;
        } | null;
    };
}

const Gallery: React.FC<GalleryProps> = ({ artworks, tags, auth }) => {
    // Find the Recent tag and set it as initial selection if it exists
    const recentTag = tags.find(tag => tag.name.toLowerCase() === 'recent');
    const [selectedTag, setSelectedTag] = useState<number | null>(recentTag ? recentTag.id : null);

    // Group artworks by tag
    const groupedArtworks = useMemo(() => {
        const grouped: { [key: string]: { tag: Tag; artworks: Artwork[] } } = {};
        
        // Initialize groups for all tags
        tags.forEach(tag => {
            grouped[tag.name] = { tag, artworks: [] };
        });
        
        // Add untagged group
        grouped['Untagged'] = { 
            tag: { id: 0, name: 'Untagged', color: '#9CA3AF', description: 'Artworks without tags' }, 
            artworks: [] 
        };
        
        // Distribute artworks to their respective groups
        artworks.forEach(artwork => {
            if (artwork.tags && artwork.tags.length > 0) {
                artwork.tags.forEach(tag => {
                    if (grouped[tag.name]) {
                        grouped[tag.name].artworks.push(artwork);
                    }
                });
            } else {
                grouped['Untagged'].artworks.push(artwork);
            }
        });
        
        // Filter out empty groups and apply custom sorting
        const groups = Object.values(grouped).filter(group => group.artworks.length > 0);
        
        // Custom sorting: Vogels first, then Zoogdieren, then alphabetically
        return groups.sort((a, b) => {
            // Special ordering for specific tags
            if (a.tag.name === 'Vogels') return -1;
            if (b.tag.name === 'Vogels') return 1;
            if (a.tag.name === 'Zoogdieren') return -1;
            if (b.tag.name === 'Zoogdieren') return 1;
            
            // Default alphabetical sorting
            return a.tag.name.localeCompare(b.tag.name);
        });
    }, [artworks, tags]);

    // Filter groups if a tag is selected
    const filteredGroups = useMemo(() => {
        if (selectedTag === null) {
            return groupedArtworks;
        }
        return groupedArtworks.filter(group => group.tag.id === selectedTag);
    }, [groupedArtworks, selectedTag]);

    // Create ordered tag list for filter buttons
    const orderedTags = useMemo(() => {
        const recentTag = tags.find(tag => tag.name.toLowerCase() === 'recent');
        const otherTags = tags.filter(tag => tag.name.toLowerCase() !== 'recent');
        
        const result = [];
        
        // Add Recent first if it exists
        if (recentTag) {
            result.push(recentTag);
        }
        
        // Add other tags
        result.push(...otherTags);
        
        return result;
    }, [tags]);

    return (
        <>
            <Head title="Gallery | Silvercraft" />
            <div className="min-h-screen bg-white">
                <Navbar />
                
                <main className="pt-16">
                    {/* Gallery Header */}
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
                                Portfolio
                            </motion.h1>
                            <motion.p
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8, delay: 0.2 }}
                                className="text-xl text-gray-600 mb-8"
                            >
                                Bekijk hier wat van mijn gemaakte kunst.
                            </motion.p>
                            
                            {/* Tag Filter */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8, delay: 0.4 }}
                                className="flex flex-wrap justify-center gap-2"
                            >
                                {/* Show ordered tags first */}
                                {orderedTags.map((tag) => (
                                    <button
                                        key={tag.id}
                                        onClick={() => setSelectedTag(selectedTag === tag.id ? null : tag.id)}
                                        className={`px-4 py-2 rounded-full text-sm font-medium transition-colors`}
                                        style={{
                                            backgroundColor: selectedTag === tag.id ? tag.color : '#f3f4f6',
                                            color: selectedTag === tag.id ? 'white' : '#374151',
                                        }}
                                    >
                                        {tag.name}
                                    </button>
                                ))}
                                
                                {/* Show "All artworks" button last */}
                                <button
                                    onClick={() => setSelectedTag(null)}
                                    className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                                        selectedTag === null
                                            ? 'bg-gray-800 text-white'
                                            : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                                    }`}
                                >
                                    Alle kunstwerken
                                </button>
                            </motion.div>
                        </div>
                    </section>

                    {/* Gallery Sections */}
                    <section className="py-20 px-4 md:px-8 lg:px-16">
                        <div className="max-w-8xl mx-auto space-y-16">
                            {filteredGroups.map((group, groupIndex) => (
                                <motion.div
                                    key={group.tag.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.8, delay: groupIndex * 0.1 }}
                                    className="space-y-8"
                                >
                                    {/* Section Header */}
                                    <div className="text-center">
                                        <h2 
                                            className="text-3xl md:text-4xl font-light mb-4"
                                            style={{ color: group.tag.color }}
                                        >
                                            {group.tag.name}
                                        </h2>
                                        {group.tag.description && (
                                            <p className="text-gray-600 max-w-2xl mx-auto">
                                                {group.tag.description}
                                            </p>
                                        )}
                                    </div>

                                    {/* Artworks Grid */}
                                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
                                        {group.artworks.map((artwork, index) => (
                                            <motion.div
                                                key={artwork.id}
                                                initial={{ opacity: 0, y: 20 }}
                                                whileInView={{ opacity: 1, y: 0 }}
                                                transition={{ duration: 0.8, delay: index * 0.1 }}
                                                className="group relative overflow-hidden rounded-lg"
                                            >
                                                <a 
                                                    href={artwork.image} 
                                                    target="_blank" 
                                                    rel="noopener noreferrer"
                                                    className="block w-full"
                                                >
                                                    <div className="relative">
                                                        <img
                                                            src={artwork.image}
                                                            alt={artwork.title}
                                                            className="w-full h-auto max-h-80 object-contain transition-transform duration-500 ease-in-out group-hover:scale-105 cursor-pointer"
                                                            onError={(e) => {
                                                                console.error('Image failed to load:', artwork.image);
                                                                e.currentTarget.style.backgroundColor = '#f3f4f6';
                                                            }}
                                                            loading="lazy"
                                                        />
                                                        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center backdrop-blur-sm pointer-events-none">
                                                            <div className="text-center text-white translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 px-4">
                                                                <h3 className="text-2xl font-light mb-2">{artwork.title}</h3>
                                                                <p className="text-sm mb-2">{artwork.description}</p>
                                                                <span className={`inline-block px-3 py-1 rounded-full text-sm ${
                                                                    artwork.status === 'sold' 
                                                                    ? 'bg-red-500/90' 
                                                                    : 'bg-green-500/90'
                                                                }`}>
                                                                    {artwork.status === 'sold' ? 'Verkocht' : 'Beschikbaar'}
                                                                </span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </a>
                                            </motion.div>
                                        ))}
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </section>
                </main>

                <Footer auth={auth} />
            </div>
        </>
    );
};

export default Gallery; 
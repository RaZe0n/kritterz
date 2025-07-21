import React, { useState, useMemo, useEffect } from 'react';
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

    // Add state for 'for sale' filter
    const [forSaleOnly, setForSaleOnly] = useState(false);

    // Mobile overlay state
    const [activeArtworkId, setActiveArtworkId] = useState<number | null>(null);
    const [isMobile, setIsMobile] = useState(false);
    useEffect(() => {
        const checkMobile = () => setIsMobile(window.matchMedia('(max-width: 768px)').matches);
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

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

    // Filter groups if a tag is selected and/or forSaleOnly is checked
    const filteredGroups = useMemo(() => {
        let groups = groupedArtworks;
        if (selectedTag !== null) {
            groups = groups.filter(group => group.tag.id === selectedTag);
        }
        if (forSaleOnly) {
            groups = groups
                .map(group => ({
                    ...group,
                    artworks: group.artworks.filter(artwork => artwork.status === 'for sale'),
                }))
                .filter(group => group.artworks.length > 0);
        }
        return groups;
    }, [groupedArtworks, selectedTag, forSaleOnly]);

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
            <Head title="KritterZ | Gallerij" />
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
                                Bekijk hieronder al mijn diverse creaties.
                            </motion.p>
                            
                            {/* Tag Filter */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8, delay: 0.4 }}
                                className="flex flex-wrap justify-center gap-2 items-center"
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
                                {/* Beschikbaar checkbox */}
                                <label className="flex items-center ml-4 text-sm text-black select-none cursor-pointer">
                                    <input
                                        type="checkbox"
                                        checked={forSaleOnly}
                                        onChange={e => setForSaleOnly(e.target.checked)}
                                        className="form-checkbox h-4 w-4 text-green-600 transition duration-150 mr-2"
                                    />
                                    Toon alleen beschikbare kunstwerken
                                </label>
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
                                                    tabIndex={-1}
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
                                                            onClick={e => {
                                                                if (isMobile) {
                                                                    if (activeArtworkId !== artwork.id) {
                                                                        e.preventDefault();
                                                                        setActiveArtworkId(artwork.id);
                                                                    } else {
                                                                        // Overlay is open, allow default (open image)
                                                                        setActiveArtworkId(null); // Optionally close overlay after
                                                                    }
                                                                }
                                                            }}
                                                        />
                                                        <div
                                                            className={
                                                                `absolute inset-0 bg-black/60 transition-all duration-300 flex items-center justify-center backdrop-blur-sm px-4 ` +
                                                                (
                                                                    isMobile
                                                                        ? (activeArtworkId === artwork.id ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none')
                                                                        : 'opacity-0 group-hover:opacity-100 pointer-events-none'
                                                                )
                                                            }
                                                            style={{ zIndex: 2 }}
                                                            onClick={e => isMobile && e.stopPropagation()}
                                                        >
                                                            <div className={
                                                                `text-center text-white transition-all duration-300 ` +
                                                                (
                                                                    isMobile
                                                                        ? (activeArtworkId === artwork.id ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0')
                                                                        : 'translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100'
                                                                )
                                                            }>
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
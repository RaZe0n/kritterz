import React from 'react';
import { Head, Link, router } from '@inertiajs/react';
import { motion } from 'framer-motion';
import { Plus, Edit, Trash2, Eye } from 'lucide-react';

interface Tag {
    id: number;
    name: string;
    color: string;
    description: string;
    artworks_count: number;
}

interface TagsIndexProps {
    tags: Tag[];
}

const TagsIndex: React.FC<TagsIndexProps> = ({ tags }) => {
    const handleDelete = (tagId: number) => {
        if (confirm('Are you sure you want to delete this tag?')) {
            router.delete(route('dashboard.tags.destroy', tagId));
        }
    };

    return (
        <>
            <Head title="Tags | Dashboard" />
            <div className="min-h-screen bg-gray-50">
                <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
                    {/* Header */}
                    <div className="px-4 py-6 sm:px-0">
                        <div className="flex justify-between items-center">
                            <div>
                                <h1 className="text-3xl font-light text-gray-900">Tags</h1>
                                <p className="mt-2 text-gray-600">Manage your gallery tags</p>
                            </div>
                            <div className="flex items-center gap-2">
                                <Link
                                    href={route('dashboard')}
                                    className="inline-flex items-center px-4 py-2 bg-gray-600 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-gray-700 focus:bg-gray-700 active:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition ease-in-out duration-150"
                                >
                                    Dashboard
                                </Link>
                                <Link
                                    href={route('dashboard.tags.create')}
                                    className="inline-flex items-center px-4 py-2 bg-blue-600 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-blue-700 focus:bg-blue-700 active:bg-blue-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition ease-in-out duration-150"
                                >
                                    <Plus className="w-4 h-4 mr-2" />
                                    New Tag
                                </Link>
                            </div>
                        </div>
                    </div>

                    {/* Tags Grid */}
                    <div className="px-4 py-6 sm:px-0">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {tags.map((tag, index) => (
                                <motion.div
                                    key={tag.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.5, delay: index * 0.1 }}
                                    className="bg-white overflow-hidden shadow rounded-lg"
                                >
                                    <div className="p-6">
                                        <div className="flex items-center justify-between mb-4">
                                            <div className="flex items-center">
                                                <div
                                                    className="w-4 h-4 rounded-full mr-3"
                                                    style={{ backgroundColor: tag.color }}
                                                />
                                                <h3 className="text-lg font-medium text-gray-900">
                                                    {tag.name}
                                                </h3>
                                            </div>
                                            <div className="flex space-x-2">
                                                <Link
                                                    href={route('dashboard.tags.show', tag.id)}
                                                    className="text-gray-400 hover:text-gray-600 transition-colors"
                                                >
                                                    <Eye className="w-4 h-4" />
                                                </Link>
                                                <Link
                                                    href={route('dashboard.tags.edit', tag.id)}
                                                    className="text-gray-400 hover:text-blue-600 transition-colors"
                                                >
                                                    <Edit className="w-4 h-4" />
                                                </Link>
                                                <button
                                                    onClick={() => handleDelete(tag.id)}
                                                    className="text-gray-400 hover:text-red-600 transition-colors"
                                                >
                                                    <Trash2 className="w-4 h-4" />
                                                </button>
                                            </div>
                                        </div>
                                        
                                        {tag.description && (
                                            <p className="text-gray-600 text-sm mb-4">
                                                {tag.description}
                                            </p>
                                        )}
                                        
                                        <div className="flex items-center justify-between">
                                            <span className="text-sm text-gray-500">
                                                {tag.artworks_count} artwork{tag.artworks_count !== 1 ? 's' : ''}
                                            </span>
                                            <div
                                                className="px-3 py-1 rounded-full text-xs font-medium"
                                                style={{
                                                    backgroundColor: tag.color + '20',
                                                    color: tag.color,
                                                }}
                                            >
                                                {tag.name}
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>

                        {tags.length === 0 && (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="text-center py-12"
                            >
                                <div className="text-gray-400 mb-4">
                                    <Plus className="w-16 h-16 mx-auto" />
                                </div>
                                <h3 className="text-lg font-medium text-gray-900 mb-2">No tags yet</h3>
                                <p className="text-gray-600 mb-6">Create your first tag to start organizing your gallery.</p>
                                <Link
                                    href={route('dashboard.tags.create')}
                                    className="inline-flex items-center px-4 py-2 bg-blue-600 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-blue-700 focus:bg-blue-700 active:bg-blue-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition ease-in-out duration-150"
                                >
                                    <Plus className="w-4 h-4 mr-2" />
                                    Create First Tag
                                </Link>
                            </motion.div>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
};

export default TagsIndex; 